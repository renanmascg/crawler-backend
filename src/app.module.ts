import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './modules/search/search.module';
import 'dotenv/config';

@Module({
  imports: [UserModule, MongooseModule.forRoot(process.env.MONGO_URI), SearchModule],
})
export class AppModule {}
