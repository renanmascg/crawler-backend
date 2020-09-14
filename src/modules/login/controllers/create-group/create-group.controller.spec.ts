import { Test, TestingModule } from '@nestjs/testing';
import { CreateGroupController } from './create-group.controller';

describe('CreateGroupController', () => {
  let controller: CreateGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateGroupController],
    }).compile();

    controller = module.get<CreateGroupController>(CreateGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
