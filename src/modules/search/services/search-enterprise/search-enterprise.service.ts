import { Injectable } from '@nestjs/common';
import AppError from 'shared/infra/http/error/appError';
import { api } from 'modules/search/infra/http/api';
import IQueryInterface from 'modules/search/dtos/IQueryParams';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preferences } from 'modules/user/infra/mongo/schemas/preferences.schema';
import IUserPreferences from 'modules/user/dtos/IUserPreferences';
import { AxiosResponse } from 'axios';
import { SearchEnterprise } from 'modules/search/infra/mongo/schemas/searchEnterprise.schema';
import ISerpResponse from 'modules/search/dtos/ISerpResponse';
import ISearchEnterprise from 'modules/search/dtos/ISearchEnterprise';
import { Enterprise } from 'modules/search/infra/mongo/schemas/enterprises.schema';
import IEnterprise from 'modules/search/dtos/IEnterprise';

interface IRequestDTO {
  userId: string;
  groupId: string;
  empresas: string[];
  tags: string[];
  useTagsDefault: boolean;
}

interface ISaveEnterpriseDatabaseDTO {
  userId: string;
  groupId: string;
  enterprises: string[];
  tags: string[];
}

interface ISaveDatabaseDTO {
  responses: AxiosResponse<ISerpResponse>[];
  enterprises: Enterprise[];
}

@Injectable()
export class SearchEnterpriseService {
  constructor(
    @InjectModel('crw-preferences')
    private preferencesModel: Model<Preferences>,
    @InjectModel('crw-enterprise-search')
    private enterpriseSearchModel: Model<SearchEnterprise>,
    @InjectModel('crw-enterprise')
    private enterpriseModel: Model<Enterprise>,
  ) {}

  async exec({
    userId,
    groupId,
    empresas,
    tags,
    useTagsDefault,
  }: IRequestDTO): Promise<SearchEnterprise[]> {
    if (
      !userId ||
      !groupId ||
      !empresas ||
      !tags ||
      useTagsDefault === undefined
    ) {
      throw new AppError('Mandatory variables missing');
    }

    let appTags = [...tags];

    const preferences = await this.getUserPreferences(userId);

    if (useTagsDefault) {
      appTags.push(...preferences.tagsDefault);
      appTags = appTags.map(v => v.toUpperCase());
      appTags = [...new Set(appTags)];
    }

    const enterprises = await this.saveEnterpriseDatabase({
      userId,
      groupId,
      tags: appTags,
      enterprises: empresas,
    });

    const params = this.buildParams(empresas, appTags);

    const responses = await this.makeRequests(params);

    const queries = await this.saveDatabase({
      responses,
      enterprises,
    });

    return queries;
  }

  private buildParams(empresas: string[], tags: string[]): IQueryInterface[] {
    const sendQuery = [];

    for (let i = 0; i < empresas.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        sendQuery.push(
          this.buildQueryParams(
            `\"${empresas[i].toUpperCase()}\" + \"${tags[j].toUpperCase()}\"`,
          ),
        );
      }
    }

    return sendQuery;
  }

  private async getUserPreferences(userId: string): Promise<IUserPreferences> {
    try {
      const preferences = await this.preferencesModel.findOne({ userId });

      return preferences.toObject();
    } catch (e) {
      console.error(e);
      throw new AppError('Error consulting user preferences');
    }
  }

  private buildQueryParams(query: string): IQueryInterface {
    return {
      q: query,
      engine: 'google',
      async: true,
      api_key: process.env.API_KEY,
      google_domain: 'google.com',
      tbs: 'cdr:1,cd_min:1/1/2017,li:1',
      hl: 'br',
      gl: 'us',
      num: '40',
      filter: '0',
      nfpr: '1',
      device: 'desktop',
    };
  }

  private async makeRequests(
    params: IQueryInterface[],
  ): Promise<AxiosResponse<ISerpResponse>[]> {
    try {
      const requests = params.map(param => {
        return api.get<ISerpResponse>('/search', {
          params: param,
        });
      });

      return await Promise.all(requests);
    } catch (e) {
      console.error(e);
      throw new AppError('Error sending requests');
    }
  }

  private async saveEnterpriseDatabase({
    userId,
    groupId,
    enterprises,
    tags,
  }: ISaveEnterpriseDatabaseDTO): Promise<Enterprise[]> {
    try {
      const enterprisesModel: IEnterprise[] = enterprises.map(ent => {
        return {
          name: ent.toUpperCase(),
          status: 'Queued',
          groupId,
          userId,
          tags,
        };
      });

      const saveEnterprises = await this.enterpriseModel.create(
        enterprisesModel,
      );

      return saveEnterprises;
    } catch (e) {}
  }

  private async saveDatabase({
    responses,
    enterprises,
  }: ISaveDatabaseDTO): Promise<SearchEnterprise[]> {
    try {
      const saveList: ISearchEnterprise[] = responses.map(res => {
        const ent = enterprises.find(item =>
          res.data.search_parameters.q.includes(item.name.toUpperCase()),
        );

        return {
          apiId: res.data.search_metadata.id,
          enterpriseId: ent.id,
          search_metadata: res.data.search_metadata,
        };
      });

      const enterprisesSearch = await this.enterpriseSearchModel.create(
        saveList,
      );
      return enterprisesSearch;
    } catch (e) {
      console.error(e);
      throw new AppError('Error saving search api into database');
    }
  }
}
