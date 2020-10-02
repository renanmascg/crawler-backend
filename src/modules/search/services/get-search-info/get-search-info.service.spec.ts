import { Test, TestingModule } from '@nestjs/testing';
import { GetSearchInfoService } from './get-search-info.service';

describe('GetSearchInfoService', () => {
  let service: GetSearchInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSearchInfoService],
    }).compile();

    service = module.get<GetSearchInfoService>(GetSearchInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
