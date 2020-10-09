import { Schema, Document } from 'mongoose';

export class Enterprise extends Document {
  userId: string;
  groupId: string;
  name: string;
  tags: string[];
  status: string;
}

export const EnterpriseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'crw-users',
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: 'crw-group',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Queued'
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
