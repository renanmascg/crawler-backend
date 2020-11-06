import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateGroupController } from './controllers/create-group/create-group.controller';
import { UserController } from './controllers/user/user.controller';
import { PreferencesController } from './controllers/preferences/preferences.controller';

import { GroupSchema } from './infra/mongo/schemas/groups.schema';
import { UserSchema } from './infra/mongo/schemas/users.schema';
import { PreferencesSchema } from './infra/mongo/schemas/preferences.schema';

import { CreateUserService } from './services/create-user/create-user.service';

import { LoginUserService } from './services/login-user/login-user.service';
import { UpdatePreferencesService } from './services/update-preferences/update-preferences.service';
import { CreateGroupService } from './services/create-group/create-group.service';
import { GetPreferencesService } from './services/get-preferences/get-preferences.service';
import ensureAuthenticated from 'shared/infra/http/middleware/ensureAuthenticated.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'crw-group', schema: GroupSchema },
      { name: 'crw-users', schema: UserSchema },
      { name: 'crw-preferences', schema: PreferencesSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: 'crw-group', schema: GroupSchema },
      { name: 'crw-users', schema: UserSchema },
      { name: 'crw-preferences', schema: PreferencesSchema },
    ]),
  ],
  controllers: [CreateGroupController, UserController, PreferencesController],
  providers: [
    CreateGroupService,
    CreateUserService,
    LoginUserService,
    UpdatePreferencesService,
    GetPreferencesService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ensureAuthenticated).forRoutes(PreferencesController,'/user/validate-token');
  }
}
