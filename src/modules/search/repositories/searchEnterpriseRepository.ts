import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SearchEnterprise } from '../infra/mongo/schemas/searchEnterprise.schema';
import { Model } from 'mongoose';
import ISearchEnterprise from '../dtos/ISearchEnterprise';
import AppError from 'shared/infra/http/error/appError';

@Injectable()
class SearchEnterpriseRepository {
  constructor(
    @InjectModel('crw-enterprise-search')
    private searchEnterpriseModel: Model<SearchEnterprise>,
  ) {}

  async create(enterprises: ISearchEnterprise[]): Promise<void> {
    try {
      await this.searchEnterpriseModel.create(enterprises);
    } catch (e) {
      console.error(e);
      throw new AppError('Erro salvando no banco de dados do search enterprise model');
    }

  }
}

export default SearchEnterpriseRepository;
