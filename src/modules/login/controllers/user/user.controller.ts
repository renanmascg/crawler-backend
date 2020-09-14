import { Controller, Post, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserService } from 'modules/login/services/create-user/create-user.service';
import { LoginUserService } from 'modules/login/services/login-user/login-user.service';

@Controller('user')
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private loginUserService: LoginUserService,
  ) {}

  @Post('')
  async createGroup(@Req() req: Request, @Res() res: Response) {
    try {
      const { email, password, name, area, grupo } = req.body;

      const data = await this.createUserService.exec({
        email,
        password,
        name,
        area,
        grupo,
      });

      delete data.user.password;

      return res.json(data);
    } catch (e) {
      return res.status(e.status).json({ err: e.message });
    }
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      const { email, password } = req.body;

      const data = await this.loginUserService.exec({
        email,
        password,
      });

      delete data.user.password;

      return res.json(data);
    } catch (e) {
      return res.status(e.status).json({ err: e.message });
    }
  }
}
