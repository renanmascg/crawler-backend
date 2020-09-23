import { Injectable } from '@nestjs/common';
import IUserPreferences from 'modules/user/dtos/IUserPreferences';
import { Model } from 'mongoose';
import { Preferences } from 'modules/user/infra/mongo/schemas/preferences.schema';
import { InjectModel } from '@nestjs/mongoose';
import AppError from 'shared/infra/http/error/appError';

@Injectable()
export class GetPreferencesService {
  constructor(@InjectModel('crw-preferences') private preferencesModel: Model<Preferences> ) {}

  async exec(id: string): Promise<IUserPreferences> {
    
    try {
      const preferences = await this.preferencesModel.findOne({ userId: id });

      return preferences;
    } catch (error) {
      console.error('error');
      throw new AppError('Error Getting User Preferences');
    }
  }
}
