import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import {
  ChangeBalanceParams,
  UserResponseDto,
} from 'src/internal/internal-account.types';

@Injectable()
export class InternalAccountService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async changeBalance(params: ChangeBalanceParams) {
    const url = `${this.configService.get('ACCOUNT_URL')}/user/balance`;
    const res = await this.httpService.axiosRef.post<UserResponseDto>(url, {
      params,
    });
    return res.data;
  }
}
