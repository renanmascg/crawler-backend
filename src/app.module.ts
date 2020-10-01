import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchModule } from './modules/search/search.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import 'dotenv/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    SearchModule,
    TasksModule,
  ],
})
export class AppModule {}
