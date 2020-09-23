import { Injectable } from '@nestjs/common';
import AppError from 'shared/infra/http/error/appError';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'modules/user/infra/mongo/schemas/users.schema';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IUserInterface } from 'modules/user/dtos/IUserInterface';
import { Preferences } from 'modules/user/infra/mongo/schemas/preferences.schema';
import IUserPreferences from 'modules/user/dtos/IUserPreferences';

interface IRequestDTO {
  email: string;
  password: string;
  name: string;
  area: string;
  grupo: string;
}

interface IResponse {
  user: IUserInterface;
  preferences: IUserPreferences;
  token: string;
}

@Injectable()
export class CreateUserService {
  constructor(
    @InjectModel('crw-users') private userModel: Model<User>,
    @InjectModel('crw-preferences')
    private preferencesModel: Model<Preferences>,
  ) {}

  async exec({
    email,
    password,
    name,
    area,
    grupo,
  }: IRequestDTO): Promise<IResponse> {
    if (!email || !password || !name || !area || !grupo) {
      throw new AppError('Variables must be sent');
    }

    const checkUserExists = await this.userModel.findOne({ email });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    try {
      const hashedPassword = await hash(password, 8);

      const user = await this.userModel.create({
        name,
        email,
        area,
        grupo,
        password: hashedPassword,
      });

      const token = sign(
        {
          groupId: grupo,
        },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: process.env.EXPIRES_IN,
        },
      );

      const defaultPreferences = await this.createNewPreferences(user.id);

      return { user: user.toObject(), preferences: defaultPreferences, token };
    } catch (e) {
      throw new Error('Error saving data');
    }
  }

  private async createNewPreferences(id: string): Promise<IUserPreferences> {
    try {
      const prefDoc = await this.preferencesModel.create({
        userId: id,
        tagsDefault: [],
        urlRemove: [],
      });

      return prefDoc.toObject();
    } catch (err) {
      throw new AppError('Error creating new user default preferences');
    }
  }
}
