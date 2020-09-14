import { Test, TestingModule } from '@nestjs/testing';
import { SearchEnterpriseService } from './search-enterprise.service';

describe('SearchEnterpriseService', () => {
  let service: SearchEnterpriseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchEnterpriseService],
    }).compile();

    service = module.get<SearchEnterpriseService>(SearchEnterpriseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
