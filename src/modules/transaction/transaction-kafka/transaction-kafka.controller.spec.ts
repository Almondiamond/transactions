import { Test, TestingModule } from '@nestjs/testing';
import { TransactionKafkaController } from './transaction-kafka.controller';

describe('TransactionKafkaController', () => {
  let controller: TransactionKafkaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionKafkaController],
    }).compile();

    controller = module.get<TransactionKafkaController>(TransactionKafkaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
