import { Controller, Put, Req, Res, Get } from '@nestjs/common';
import { Response, Request } from 'express';
import { UpdatePreferencesService } from 'modules/user/services/update-preferences/update-preferences.service';
import { GetPreferencesService } from 'modules/user/services/get-preferences/get-preferences.service';

@Controller('preferences')
export class PreferencesController {
  constructor(
    private updatePreferencesService: UpdatePreferencesService,
    private getPreferencesService: GetPreferencesService,
  ) {}

  @Get()
  async getPreferences(@Req() req: Request, @Res() res: Response) {
    try {
      const { id } = req.user;

      const preferences = await this.getPreferencesService.exec(id);

      return res.json(preferences);

    } catch (e) {
      return res.status(e.status).json({ err: e.message });
    }
  }

  @Put()
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const {
        body: { tagsDefault, urlRemove },
        user: { id },
      } = req;

      await this.updatePreferencesService.exec({
        id,
        tagsDefault,
        urlRemove,
      });

      return res.send();
    } catch (error) {
      return res.status(error.status).json({ err: error.message });
    }
  }
}
