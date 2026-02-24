import { TransactionTypeEnum } from 'src/modules/transaction/enum/transaction-type.enum';

export interface ChangeBalanceParams {
  amount: number;
  transactionType: TransactionTypeEnum;
}

export interface UserResponseDto {
  email: string;
  firstName: string;
  lastName: string;
  login: string;
  middleName: string;
  passwordHash: string;
  phone: string;
}
