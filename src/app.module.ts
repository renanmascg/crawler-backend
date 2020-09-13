import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [LoginModule, MongooseModule.forRoot(process.env.MONGO_URI)],
})
export class AppModule {}
