import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { SearchEnterprise } from 'modules/search/infra/mongo/schemas/searchEnterprise.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskResolveQueriesService {
  private readonly logger = new Logger(TaskResolveQueriesService.name);

  constructor(
    @InjectModel('crw-enterprise-search')
    private enterpriseSearchModel: Model<SearchEnterprise>,
  ) {}

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }
}
