import { Body, Controller, Param, Post } from '@nestjs/common';
import { TransactionbService } from 'src/modules/transaction/transaction-service/transactionb.service';
import type { createTransactionSchemaType } from 'src/modules/transaction/dto/create-transaction.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateTransactionStatusSwagger } from 'src/modules/transaction/dto/update-transaction-status';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionsService: TransactionbService) {}

  @Post()
  create(@Body() payload: createTransactionSchemaType) {
    return this.transactionsService.create(payload);
  }

  @ApiOperation({ description: 'Изменение статуса транзакции' })
  @Post(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() payload: UpdateTransactionStatusSwagger,
  ) {
    return this.transactionsService.updateStatus(id, payload.status);
  }
}
