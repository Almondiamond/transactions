export enum TransactionTypeEnum {
  WITHDRAWL = 'WITHDRAWL',
  DEPOSIT = 'DEPOSIT',
  TRANSFER = 'TRANSFER',
}

export enum TransactionStatusEnum {
  INPROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum BalanceChangedStatusEnum {
  COMPLETE = 'COMPLETE',
  FAILED = 'FAILED',
}

export interface EventTransactionSavedData {
  userId: string;
  amount: number;
  transactionId: string;
  transactionType: TransactionTypeEnum;
}

export interface EventBalanceChangedData {
  transactionId: string;
  status: TransactionStatusEnum;
}

export enum EventNameEnum {
  TransactionSaved = 'TransactionSaved',
  BalanceChanged = 'BalanceChanged',
}
