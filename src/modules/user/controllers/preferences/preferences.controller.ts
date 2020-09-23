import { Controller, Put, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { UpdatePreferencesService } from 'modules/user/services/update-preferences/update-preferences.service';


@Controller('preferences')
export class PreferencesController {
  constructor(private updatePreferencesService: UpdatePreferencesService) {}

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
        urlRemove
      })

      return res.send();
    } catch (error) {
      return res.status(error.status).json({ err: error.message });
    }
  }
}
