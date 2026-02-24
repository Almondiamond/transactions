import { Controller } from '@nestjs/common';
import { TransactionbService } from 'src/modules/transaction/transaction-service/transactionb.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventNameEnum } from 'src/modules/transaction/enum/transaction-type.enum';
import type { EventBalanceChangedData } from 'src/modules/transaction/enum/transaction-type.enum';

@Controller()
export class TransactionKafkaController {
  constructor(
    private readonly transactionService: TransactionbService
  ) {
  }

  @EventPattern(EventNameEnum.BalanceChanged)
  async handleBalanceChanged(@Payload() message: EventBalanceChangedData) {
    return this.transactionService.updateStatus(message.transactionId, message.status)
  }
}
