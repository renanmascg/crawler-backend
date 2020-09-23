import { Test, TestingModule } from '@nestjs/testing';
import { GetPreferencesService } from './get-preferences.service';

describe('GetPreferencesService', () => {
  let service: GetPreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetPreferencesService],
    }).compile();

    service = module.get<GetPreferencesService>(GetPreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
