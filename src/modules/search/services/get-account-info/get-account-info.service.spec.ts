import { Test, TestingModule } from '@nestjs/testing';
import { GetAccountInfoService } from './get-account-info.service';

describe('GetAccountInfoService', () => {
  let service: GetAccountInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAccountInfoService],
    }).compile();

    service = module.get<GetAccountInfoService>(GetAccountInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
