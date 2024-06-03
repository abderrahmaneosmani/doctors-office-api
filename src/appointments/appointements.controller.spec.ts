import { Test, TestingModule } from '@nestjs/testing';
import { AppointementsController } from './appointments.controller';
import { AppointementsService } from './appointments.service';

describe('AppointementsController', () => {
  let controller: AppointementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointementsController],
      providers: [AppointementsService],
    }).compile();

    controller = module.get<AppointementsController>(AppointementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
