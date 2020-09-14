import { Module } from '@nestjs/common';
import { SearchController } from './controllers/search/search.controller';
import { SearchEnterpriseService } from './services/search-enterprise/search-enterprise.service';
import { AccountController } from './controllers/account/account.controller';
import { GetAccountInfoService } from './services/get-account-info/get-account-info.service';

@Module({
  controllers: [SearchController, AccountController],
  providers: [SearchEnterpriseService, GetAccountInfoService]
})
export class SearchModule {}
