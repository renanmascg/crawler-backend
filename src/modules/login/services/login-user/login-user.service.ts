import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from 'shared/infra/http/error/appError';
import { IUserInterface } from 'modules/login/dtos/IUserInterface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'modules/login/infra/mongo/schemas/users.schema';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: IUserInterface;
  token: string;
}

@Injectable()
export class LoginUserService {
  constructor(@InjectModel('crw-users') private userModel: Model<User>) {}

  async exec({ email, password }: IRequestDTO): Promise<IResponse> {
    if (!email || !password) {
      throw new AppError('Variables not send');
    }

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new AppError('Incorrect email/password combination.');
    }

    try {
      const userObj: IUserInterface = user.toObject();

      const passwordMatched = await compare(password, userObj.password);

      if (!passwordMatched) {
        throw new Error('Incorrect email/password combination.');
      }

      const token = sign({}, process.env.JWT_SECRET, {
        subject: user.id,
        expiresIn: process.env.EXPIRES_IN,
      });

      return { user: userObj, token };
    } catch (e) {
      throw new AppError('Incorrect email/password combination.');
    }
  }
}
