import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './modules/search/search.module';
import 'dotenv/config';

@Module({
  imports: [LoginModule, MongooseModule.forRoot(process.env.MONGO_URI), SearchModule],
})
export class AppModule {}
