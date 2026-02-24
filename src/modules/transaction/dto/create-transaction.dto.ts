import { z } from 'zod';
import { TransactionTypeEnum } from 'src/modules/transaction/enum/transaction-type.enum';

export const createTransactionSchema = z.object({
  userId: z.string().nonempty(),
  amount: z.int().nonoptional(),
  transactionType: z.enum(TransactionTypeEnum).nonoptional(),
  recipientId: z.string().nonempty(),
});

export type createTransactionSchemaType = z.infer<
  typeof createTransactionSchema
>;

