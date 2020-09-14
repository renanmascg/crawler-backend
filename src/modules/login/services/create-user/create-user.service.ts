import { Injectable } from '@nestjs/common';
import AppError from 'shared/infra/http/error/appError';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'modules/login/infra/mongo/schemas/users.schema';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IUserInterface } from 'modules/login/dtos/IUserInterface';

interface IRequestDTO {
  email: string;
  password: string;
  name: string;
  area: string;
  grupo: string;
}

interface IResponse {
  user: IUserInterface;
  token: string;
}

@Injectable()
export class CreateUserService {
  constructor(@InjectModel('crw-users') private userModel: Model<User>) {}

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

      const token = sign({}, process.env.JWT_SECRET, {
        subject: user.id,
        expiresIn: process.env.EXPIRES_IN,
      });

      return { user: user.toObject(), token };
    } catch (e) {
      throw new Error('Error saving data');
    }
  }
}
