import { Injectable } from '@nestjs/common';
import AppError from 'shared/infra/http/error/appError';
import { InjectModel } from '@nestjs/mongoose';
import { Preferences } from '../../infra/mongo/schemas/preferences.schema';
import { Model } from 'mongoose';

interface IRequestDTO {
  id: string;
  tagsDefault: string[];
  urlRemove: string[];
}

@Injectable()
export class UpdatePreferencesService {
  constructor(
    @InjectModel('crw-preferences')
    private preferencesModel: Model<Preferences>,
  ) {}

  async exec({ id, tagsDefault, urlRemove }: IRequestDTO): Promise<void> {
    if (!id || !tagsDefault || !urlRemove) {
      throw new AppError('Mndatory variables not sent');
    }

    try {
      await this.preferencesModel.findOneAndUpdate(
        {
          userId: id,
        },
        {
          tagsDefault,
          urlRemove,
        },
        {
          new: true,
        },
      );
    } catch (e) {
      throw new AppError('Error Updating Preferences. Try Again');
    }
  }
}
