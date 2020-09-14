import { Injectable } from '@nestjs/common';
import { IAccount } from '../../dtos/AccountDTO';
import { api } from 'modules/search/infra/http/api';
import AppError from 'shared/infra/http/error/appError';

@Injectable()
export class GetAccountInfoService {
  async exec(): Promise<IAccount> {
    try {
      console.log(process.env.API_KEY);
      const { data: account } = await api.get<IAccount>('/account', {
        params: {
          api_key: process.env.API_KEY,
        },
      });

      delete account.api_key;
      delete account.account_id;
      delete account.account_email;

      return account;
    } catch (e) {
      console.log(e);
      throw new AppError('Error consulting account info');
    }
  }
}
