import { Test, TestingModule } from '@nestjs/testing';
import { TransactionbService } from './transactionb.service';

describe('TransactionbService', () => {
  let service: TransactionbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionbService],
    }).compile();

    service = module.get<TransactionbService>(TransactionbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
