import { Schema, Document } from 'mongoose';

export class Group extends Document {
  name: string;
  address: string;
}

export const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    }

  },
  {
    timestamps: true,
  },
);