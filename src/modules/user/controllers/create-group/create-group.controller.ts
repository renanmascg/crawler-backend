import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateGroupService } from 'modules/user/services/create-group/create-group.service';

@Controller('group')
export class CreateGroupController {
  constructor(
    private createGroupService: CreateGroupService
  ) {}

  @Post('')
  async createGroup(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { name, address } = req.body;

      const data = await this.createGroupService.exec({
        name, 
        address
      })

      return res.json(data);
    } catch (e) { 
      return res.status(e.status).json({ err: e.message });
    }
  }

}
