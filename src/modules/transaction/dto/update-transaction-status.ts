import { z } from 'zod';
import { TransactionStatusEnum } from 'src/modules/transaction/enum/transaction-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export const updateTransactionStatusSchema = z.object({
  status: z.enum(TransactionStatusEnum).nonoptional(),
});

export type UpdateTransactionStatusSchemaType = z.infer<
  typeof updateTransactionStatusSchema
>;

export class UpdateTransactionStatusSwagger {
  @ApiProperty({
    description: 'Статус на который нужно изменить текущий статус транзакции',
    enum: TransactionStatusEnum,
    enumName: 'TransactionStatusEnum',
  })
  status: TransactionStatusEnum;
}
