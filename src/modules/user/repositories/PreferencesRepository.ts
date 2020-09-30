import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Preferences } from "../infra/mongo/schemas/preferences.schema";
import IUserPreferences from "../dtos/IUserPreferences";
import AppError from "shared/infra/http/error/appError";

@Injectable()
class PreferencesRepository {
  constructor(
    @InjectModel('crw-preferences')
    private preferencesModel: Model<Preferences>,
  ) {}

  async getPreferencesOfUser(userId: string): Promise<IUserPreferences> {
    try {
      const userPreferences = await this.preferencesModel.findOne({ userId });

      return userPreferences;

    } catch (e) {
      throw new AppError('User does not exists');
    }
  }
}

export default PreferencesRepository;