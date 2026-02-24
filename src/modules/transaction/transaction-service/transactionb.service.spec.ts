import { Test, TestingModule } from '@nestjs/testing';
import { TransactionbService } from './transactionb.service';
import { PrismaService } from 'src/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient, TransactionStatus } from '@prisma/client';
import { KafkaService } from 'src/config/kafka/kafka.service';
import {
  EventNameEnum,
  TransactionTypeEnum,
} from 'src/modules/transaction/enum/transaction-type.enum';

export type PrismaMock = DeepMockProxy<PrismaClient>;

export const createPrismaMock = (): PrismaMock => mockDeep<PrismaClient>();

describe('TransactionbService', () => {
  let service: TransactionbService;
  let prisma: DeepMockProxy<PrismaClient>;
  let kafka: KafkaService;

  beforeEach(async () => {
    prisma = createPrismaMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionbService,
        { provide: PrismaService, useValue: prisma },
        { provide: KafkaService, useValue: { produce: jest.fn() } },
      ],
    }).compile();

    service = module.get<TransactionbService>(TransactionbService);
    kafka = module.get(KafkaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create transaction', async () => {
      const createTransactionDto = {
        amount: 100,
        userId: 'userId',
        transactionType: TransactionTypeEnum.DEPOSIT,
        recipientId: 'test',
      };
      const expectPrismaCalledWith = {
        amount: createTransactionDto.amount,
        userId: createTransactionDto.userId,
        transactionType: createTransactionDto.transactionType,
      };
      const createdTransaction = {
        id: 1,
        amount: 100,
        userId: '2',
        transactionType: TransactionTypeEnum.DEPOSIT,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: TransactionStatus.IN_PROGRESS,
      };

      prisma.transaction.create.mockResolvedValue(createdTransaction);
      jest.spyOn(kafka, 'produce').mockImplementation();

      await service.create(createTransactionDto);

      expect(prisma.transaction.create).toHaveBeenCalledWith({
        data: expectPrismaCalledWith,
      });
      expect(kafka.produce).toHaveBeenCalledWith({
        eventName: EventNameEnum.TransactionSaved,
        data: {
          userId: createTransactionDto.userId,
          amount: createdTransaction.amount,
          transactionId: '' + createdTransaction.id,
          transactionType: createdTransaction.transactionType,
        },
      });
    });
  });
});
