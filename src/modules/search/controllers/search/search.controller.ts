import { Controller, Post, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { SearchEnterpriseService } from 'modules/search/services/search-enterprise/search-enterprise.service';

@Controller('search')
export class SearchController {
  constructor(private searchEnterpriseService: SearchEnterpriseService) {}

  @Post('')
  async createGroup(@Req() req: Request, @Res() res: Response) {
    try {
      const { empresa, tags, useTagDefault } = req.body;
      const { id } = req.user;

      // const data = await this.searchEnterpriseService.exec({});

      return res.json({ message: 'ok' });
    } catch (e) {
      return res.status(e.status).json({ err: e.message });
    }
  }
}
