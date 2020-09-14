import { Test, TestingModule } from '@nestjs/testing';
import { CreateGroupService } from './create-group.service';

describe('CreateGroupService', () => {
  let service: CreateGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateGroupService],
    }).compile();

    service = module.get<CreateGroupService>(CreateGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
