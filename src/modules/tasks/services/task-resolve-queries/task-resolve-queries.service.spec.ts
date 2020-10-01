import { Test, TestingModule } from '@nestjs/testing';
import { TaskResolveQueriesService } from './task-resolve-queries.service';

describe('TaskResolveQueriesService', () => {
  let service: TaskResolveQueriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskResolveQueriesService],
    }).compile();

    service = module.get<TaskResolveQueriesService>(TaskResolveQueriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
