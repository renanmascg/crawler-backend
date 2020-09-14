import { Controller, Post, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { SearchEnterpriseService } from 'modules/search/services/search-enterprise/search-enterprise.service';

@Controller('search')
export class SearchController {
  constructor(private searchEnterpriseService: SearchEnterpriseService) {}

  @Post('')
  async createGroup(@Req() req: Request, @Res() res: Response) {
    try {
      const { email, password, name, area, grupo } = req.body;

      const data = await this.searchEnterpriseService.exec();

      return res.json(data);
    } catch (e) {
      return res.status(e.status).json({ err: e.message });
    }
  }
}
