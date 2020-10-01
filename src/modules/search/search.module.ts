import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SearchController } from './controllers/search/search.controller';
import { SearchEnterpriseService } from './services/search-enterprise/search-enterprise.service';
import { AccountController } from './controllers/account/account.controller';
import { GetAccountInfoService } from './services/get-account-info/get-account-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchEnterpriseSchema } from './infra/mongo/schemas/searchEnterprise.schema';
import SearchEnterpriseRepository from './repositories/searchEnterpriseRepository';
import { UserModule } from 'modules/user/user.module';
import ensureAuthenticated from 'shared/infra/http/middleware/ensureAuthenticated.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'crw-enterprise-search', schema: SearchEnterpriseSchema },
    ]),
    UserModule,
  ],
  exports: [
    MongooseModule.forFeature([
      { name: 'crw-enterprise-search', schema: SearchEnterpriseSchema },
    ])
  ],
  controllers: [SearchController, AccountController],
  providers: [
    SearchEnterpriseService,
    GetAccountInfoService,
    SearchEnterpriseRepository,
  ],
})
export class SearchModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ensureAuthenticated).forRoutes(SearchController);
  }
}
