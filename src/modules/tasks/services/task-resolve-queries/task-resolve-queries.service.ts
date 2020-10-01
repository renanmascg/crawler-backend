import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { SearchEnterprise } from 'modules/search/infra/mongo/schemas/searchEnterprise.schema';
import { InjectModel } from '@nestjs/mongoose';
import ISearchArchive from 'modules/tasks/dtos/ISearchArchive';
import { api } from 'modules/search/infra/http/api';
import ISerpResponse from 'modules/search/dtos/ISerpResponse';
import { AxiosResponse } from 'axios';

@Injectable()
export class TaskResolveQueriesService {
  private readonly logger = new Logger(TaskResolveQueriesService.name);

  constructor(
    @InjectModel('crw-enterprise-search')
    private enterpriseSearchModel: Model<SearchEnterprise>,
  ) {}

  @Cron('* */30 * * * *')
  async handleCron() {
    try {
      const enterprises = await this.getAllEnterprisesQueued();

      const params = enterprises.map<ISearchArchive>(ent => {
        return {
          search_id: ent.apiId,
          api_key: process.env.API_KEY,
        };
      });

      const responses = await this.getQueriedSearches(params);

      await this.updateDatabase(responses);

      this.logger.log('==========PROCESS ENDED SUCCESSFULYY==========')
    } catch (error) {
      this.logger.error(
        '==========ERRO OCURRED TRYING TO SOLVE QUERY SEARCH==========',
      );
      this.logger.error(error);
    }
  }

  private async getAllEnterprisesQueued(): Promise<SearchEnterprise[]> {
    try {
      const enterprises = await this.enterpriseSearchModel.find({
        $or: [
          { 'search_metadata.status': 'Queued' },
          { 'search_metadata.status': 'Processing' },
        ],
      });

      return enterprises;
    } catch (e) {
      this.logger.error(
        `ERROR GETTING ENTERPRISE QUEUED FROM DATABASE\nERROR: \n${e}`,
      );
      throw Error('ERROR ON: getAllEnterprisesQueued');
    }
  }

  private async getQueriedSearches(
    params: ISearchArchive[],
  ): Promise<AxiosResponse<ISerpResponse>[]> {
    try {
      const requests = params.map(param => {
        return api.get<ISerpResponse>(`/searches/${param.search_id}.json`, {
          params: param,
        });
      });
      const responses = await Promise.all(requests);

      return responses;
    } catch (e) {
      this.logger.error(
        `ERROR GETTING ENTERPRISE QUEUED FROM SERPAPI\nERROR: \n${e}`,
      );
      throw Error('ERROR ON: getQueriedSearches');
    }
  }

  private async updateDatabase(
    responses: AxiosResponse<ISerpResponse>[],
  ): Promise<void> {
    try {
      const listUpdate = responses.map(res => {
        console.log(res.data);
        return this.enterpriseSearchModel.findOneAndUpdate(
          {
            apiId: res.data.search_metadata.id,
          },
          {
            search_metadata: res.data.search_metadata,
            organic_result: res.data.organic_results,
          },
        );
      });

      await Promise.all(listUpdate);
    } catch (e) {
      this.logger.error(
        `ERROR UPDATING DATABASE WITH QUERIED DATA\nERROR: \n${e}`,
      );
      throw Error('ERROR ON: saveDatabase');
    }
  }
}
