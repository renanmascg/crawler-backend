import { Module } from '@nestjs/common';
import { TaskResolveQueriesService } from './services/task-resolve-queries/task-resolve-queries.service';
import { SearchModule } from 'modules/search/search.module';

@Module({
  imports: [SearchModule],
  providers: [TaskResolveQueriesService]
})
export class TasksModule {}
