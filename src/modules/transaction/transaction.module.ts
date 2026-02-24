import { Module } from '@nestjs/common';
import { TransactionbService } from './transaction-service/transactionb.service';
import { TransactionController } from './transaction-controller/transaction.controller';
import { TransactionKafkaController } from './transaction-kafka/transaction-kafka.controller';
import { PrismaService } from 'src/prisma.service';
import { KafkaModule } from 'src/config/kafka/kafka.module';
import { InternalAccountModule } from 'src/internal/internal-account.module';

@Module({
  providers: [TransactionbService, PrismaService],
  controllers: [TransactionController, TransactionKafkaController],
  imports: [KafkaModule, InternalAccountModule],
})
export class TransactionModule {}
