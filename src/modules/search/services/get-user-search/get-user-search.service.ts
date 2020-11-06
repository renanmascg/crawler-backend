import { Injectable, Logger } from '@nestjs/common';
import { SearchEnterprise } from 'modules/search/infra/mongo/schemas/searchEnterprise.schema';
import AppError from 'shared/infra/http/error/appError';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enterprise } from 'modules/search/infra/mongo/schemas/enterprises.schema';

interface IResponseDTO {
  enterprises: SearchEnterprise[];
}

@Injectable()
export class GetUserSearchService {
  constructor(
    @InjectModel('crw-enterprise-search')
    private enterpriseSearchModel: Model<SearchEnterprise>,
    @InjectModel('crw-enterprise')
    private enterpriseModel: Model<Enterprise>,
  ) {}

  private readonly logger = new Logger(GetUserSearchService.name);

  async exec(userId: string): Promise<IResponseDTO> {
    const enterprises = await this.getEnterprises(userId);

    return {
      enterprises,
    };
  }

  private async getEnterprises(userId: string): Promise<SearchEnterprise[]> {
    try {
      const enterprises = await this.enterpriseModel.find({ userId });

      const ents: SearchEnterprise[] = enterprises.map(ent => ent.toObject())

      return ents;
    } catch (e) {
      this.logger.error(e);
      throw new AppError('Error getting enterprises consulted by the user');
    }
  }
}
