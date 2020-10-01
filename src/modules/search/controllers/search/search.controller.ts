import { Controller, Post, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { SearchEnterpriseService } from 'modules/search/services/search-enterprise/search-enterprise.service';

@Controller('search')
export class SearchController {
  constructor(private searchEnterpriseService: SearchEnterpriseService) {}

  @Post('')
  async createGroup(@Req() req: Request, @Res() res: Response) {
    try {
      const { empresas, tags, useTagsDefault } = req.body;
      const { id, grupoId } = req.user;

      console.log(req.user);

      const enterprises = await this.searchEnterpriseService.exec({
        userId: id,
        groupId: grupoId,
        empresas,
        tags,
        useTagsDefault,
      });

      return res.json(enterprises);
    } catch (e) {
      console.error(e);
      return res.status(e.status).json({ err: e.message });
    }
  }
}
