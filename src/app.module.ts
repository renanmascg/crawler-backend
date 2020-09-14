import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [LoginModule, MongooseModule.forRoot(process.env.MONGO_URI)],
})
export class AppModule {}
