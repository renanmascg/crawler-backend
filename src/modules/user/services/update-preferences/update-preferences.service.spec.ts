import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePreferencesService } from './update-preferences.service';

describe('UpdatePreferencesService', () => {
  let service: UpdatePreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatePreferencesService],
    }).compile();

    service = module.get<UpdatePreferencesService>(UpdatePreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
