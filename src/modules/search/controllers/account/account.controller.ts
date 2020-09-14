import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GetAccountInfoService } from 'modules/search/services/get-account-info/get-account-info.service';

@Controller('account')
export class AccountController {
  constructor(
    private accountInfoService: GetAccountInfoService
  ) {}

  @Get('')
  async getAccountInfo(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const account = await this.accountInfoService.exec();
      
      return res.json(account);
    } catch (err) {
      return res.status(err.status).json({ message: err.message});
    }
  }

}
