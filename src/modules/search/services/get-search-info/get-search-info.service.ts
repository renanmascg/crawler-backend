import { Injectable, Logger } from '@nestjs/common';
import { SearchEnterprise } from 'modules/search/infra/mongo/schemas/searchEnterprise.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AppError from 'shared/infra/http/error/appError';

interface IResponseDTO {
  enterprise: SearchEnterprise;
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

    const enterprise = await this.getEnterpriseInfo(infoId);

    if (!enterprise) {
      throw new AppError('Info not available.')
    }

    return {
      enterprise,
    };
  }

  private async getEnterpriseInfo(infoId: string): Promise<SearchEnterprise> {
    try {
      const enterprise = await this.enterpriseSearchModel.findOne({ _id: infoId });

      return enterprise;
    } catch (e) {
      this.logger.error(e);
      throw new AppError('Error getting enterprises consulted by the user');
    }
  }
}
