import { Module } from '@nestjs/common';
import { CreateGroupController } from './controllers/create-group/create-group.controller';
import { CreateGroupService } from './services/create-group/create-group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from './infra/mongo/schemas/groups.schema';
import { UserSchema } from './infra/mongo/schemas/users.schema';
import { CreateUserService } from './services/create-user/create-user.service';
import { UserController } from './controllers/user/user.controller';
import { LoginUserService } from './services/login-user/login-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'crw-group', schema: GroupSchema },
      { name: 'crw-users', schema: UserSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: 'crw-group', schema: GroupSchema },
      { name: 'crw-users', schema: UserSchema },
    ]),
  ],
  controllers: [CreateGroupController, UserController],
  providers: [CreateGroupService, CreateUserService, LoginUserService],
})
export class LoginModule {}
