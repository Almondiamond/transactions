import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createTransactionSchemaType } from 'src/modules/transaction/dto/create-transaction.dto';
import {
  EventNameEnum,
  EventTransactionSavedData,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from 'src/modules/transaction/enum/transaction-type.enum';
import { KafkaService } from 'src/config/kafka/kafka.service';

@Injectable()
export class TransactionbService {
  constructor(
    private prisma: PrismaService,
    private kafkaService: KafkaService,
  ) {}

  async create(params: createTransactionSchemaType) {
    const { userId, amount, transactionType, recipientId } = params;

    if (transactionType === TransactionTypeEnum.TRANSFER && recipientId) {
      return this.createTransferTransaction(params);
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        amount,
        transactionType,
      },
    });

    const payload: EventTransactionSavedData = {
      userId,
      amount,
      transactionType,
      transactionId: transaction.id + '',
    };

    await this.kafkaService.produce({
      data: payload,
      eventName: EventNameEnum.TransactionSaved,
    });
  }

  async updateStatus(id: string, status: TransactionStatusEnum) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: +id },
    });

    if (!transaction) {
      throw new NotFoundException('Транзакция не найдена');
    }

    if (transaction?.status === status) {
      throw new ConflictException('Данная смена статуса невозможна');
    }

    return this.prisma.transaction.update({
      where: { id: +id },
      data: { status },
    });
  }

  async createTransferTransaction(payload: createTransactionSchemaType) {
    const { userId, amount, recipientId, transactionType } = payload;

    return this.prisma.$transaction(async (tx) => {
      const from = await tx.transaction.create({
        data: {
          userId,
          transactionType,
          amount: -amount,
        },
      });

      const to = await tx.transaction.create({
        data: {
          userId: recipientId,
          transactionType,
          amount,
        },
      });

      const dataFrom: EventTransactionSavedData = {
        userId,
        amount,
        transactionId: from.id.toString(),
        transactionType: TransactionTypeEnum.WITHDRAWL,
      };

      const dataTo: EventTransactionSavedData = {
        userId,
        amount,
        transactionId: to.id.toString(),
        transactionType: TransactionTypeEnum.DEPOSIT,
      };

      await this.kafkaService.produce({
        data: dataFrom,
        eventName: EventNameEnum.TransactionSaved,
      });
      await this.kafkaService.produce({
        data: dataTo,
        eventName: EventNameEnum.TransactionSaved,
      });

      return {
        from,
        to,
      };
    });
  }
}
