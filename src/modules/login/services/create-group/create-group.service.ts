import { Injectable } from '@nestjs/common';
import AppError from 'shared/infra/http/error/appError';
import { Group } from '../../infra/mongo/schemas/groups.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface IRequestDTO {
  name: string;
  address: string;
}

@Injectable()
export class CreateGroupService {
  constructor(
    @InjectModel('crw-group') private groupModel: Model<Group>,
  ) {}

  async exec({ name, address }: IRequestDTO) {
    if (!name || !address) {
      throw new AppError('Variables not send');
    }

    try {
      return await this.groupModel.create({ name, address });
    } catch (e) {
      throw new AppError('Error creating data');
    }
  }
}
