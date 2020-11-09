import { Controller, Post, Res, Req, Get, Param, Put } from '@nestjs/common';
import { Request, Response } from 'express';
import { SearchEnterpriseService } from 'modules/search/services/search-enterprise/search-enterprise.service';
import { GetUserSearchService } from 'modules/search/services/get-user-search/get-user-search.service';
import { GetSearchInfoService } from 'modules/search/services/get-search-info/get-search-info.service';
import { UpdateOrganicResultsService } from 'modules/search/services/update-organic-results/update-organic-results.service';

@Controller('search')
export class SearchController {
  constructor(
    private searchEnterpriseService: SearchEnterpriseService,
    private getUserSearch: GetUserSearchService,
    private getSearchInfo: GetSearchInfoService,
    private updateOrganic: UpdateOrganicResultsService,
  ) {}

  @Post('')
  async create(@Req() req: Request, @Res() res: Response) {
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

  @Get('')
  async getSearch(@Req() req: Request, @Res() res: Response) {
    try {
      const { id } = req.user;

      console.log(req.user);

      const enterprises = await this.getUserSearch.exec(id);

      return res.json(enterprises);
    } catch (e) {
      console.error(e);
      return res.status(e.status).json({ err: e.message });
    }
  }

  @Get('/:id')
  async getSearchedInfo(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    try {
      const enterprise = await this.getSearchInfo.exec(id);

      return res.json(enterprise);
    } catch (e) {
      console.error(e);
      return res.status(e.status).json({ err: e.message });
    }
  }

  @Put('')
  async updateOrganicResults( @Req() req: Request, @Res() res: Response) {
    try {
      const { apiId, organicId, isGood } = req.body;

      const newEnterprise = await this.updateOrganic.exec({
        apiId,
        organicId,
        isGood
      });

      return res.json(newEnterprise);
    } catch (e) {
      console.error(e);
      return res.status(e.status).json({ err: e.message });
    }
  }
}
