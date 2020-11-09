import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import IOrganicResult from 'modules/search/dtos/IOrganicResult';
import { SearchEnterprise } from 'modules/search/infra/mongo/schemas/searchEnterprise.schema';
import { Model } from 'mongoose';
import AppError from 'shared/infra/http/error/appError';

interface IRequestDTO {
  apiId: string,
  organicId: string,
  isGood: boolean,
}

@Injectable()
export class UpdateOrganicResultsService {
  constructor(
    @InjectModel('crw-enterprise-search')
    private enterpriseSearchModel: Model<SearchEnterprise>,
  ) {}

  private readonly logger = new Logger(UpdateOrganicResultsService.name);

  async exec({
    apiId,
    organicId,
    isGood
  }: IRequestDTO) {

      if (!apiId || !organicId || isGood === undefined) {
        throw new AppError('Variables must be sent');
      }

      const enterprise = await this.getEnterpriseInfo(apiId);

      const orgResults = enterprise.organic_result.map(org => {
        if (org._id.toString() === organicId) {
          org.isGood = isGood;
        }
        return org;
      });

      const newEnt = await this.updateEnterpriseInfo(apiId, orgResults);

      return newEnt;
  }

  private async getEnterpriseInfo(apiId: string): Promise<SearchEnterprise> {
    try {
      const enterprise = await this.enterpriseSearchModel.findOne({ apiId: apiId });

      return enterprise;
    } catch (e) {
      this.logger.error(e);
      throw new AppError('Error getting enterprises consulted by the user');
    }
  }

  private async updateEnterpriseInfo(apiId: string, orgResult: IOrganicResult[]): Promise<SearchEnterprise> {
    try {
      const newEnt = await this.enterpriseSearchModel.findOneAndUpdate({ apiId: apiId }, {
        organic_result: orgResult,
      }, {
        new: true,
      });

      return newEnt;
    } catch (e) {
      this.logger.error(e);
      throw new AppError('Error updating enterprise organic result');
    }
  }


}
