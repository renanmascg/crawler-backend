import { Injectable, Logger } from '@nestjs/common';
import { SearchEnterprise } from 'modules/search/infra/mongo/schemas/searchEnterprise.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AppError from 'shared/infra/http/error/appError';

interface IResponseDTO {
  enterprises: SearchEnterprise[];
}

@Injectable()
export class GetSearchInfoService {
  constructor(
    @InjectModel('crw-enterprise-search')
    private enterpriseSearchModel: Model<SearchEnterprise>,
  ) {}

  private readonly logger = new Logger(GetSearchInfoService.name);

  async exec(infoId: string): Promise<IResponseDTO> {
    if (!infoId) {
      throw new AppError('Mandatory Variables not sent');
    }

    const enterprises = await this.getEnterpriseInfo(infoId);

    if (!enterprises) {
      throw new AppError('Info not available.')
    }

    return {
      enterprises,
    };
  }

  private async getEnterpriseInfo(infoId: string): Promise<SearchEnterprise[]> {
    try {
      const enterprises = await this.enterpriseSearchModel.find({ enterpriseId: infoId });

      return enterprises;
    } catch (e) {
      this.logger.error(e);
      throw new AppError('Error getting enterprises consulted by the user');
    }
  }
}
