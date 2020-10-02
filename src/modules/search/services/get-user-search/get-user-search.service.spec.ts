import { Test, TestingModule } from '@nestjs/testing';
import { GetUserSearchService } from './get-user-search.service';

describe('GetUserSearchService', () => {
  let service: GetUserSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUserSearchService],
    }).compile();

    service = module.get<GetUserSearchService>(GetUserSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
