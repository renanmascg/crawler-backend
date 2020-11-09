import { Test, TestingModule } from '@nestjs/testing';
import { UpdateOrganicResultsService } from './update-organic-results.service';

describe('UpdateOrganicResultsService', () => {
  let service: UpdateOrganicResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateOrganicResultsService],
    }).compile();

    service = module.get<UpdateOrganicResultsService>(UpdateOrganicResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
