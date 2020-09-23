import { Schema, Document } from 'mongoose';

export class SearchMetadata extends Document {
  id: number;
  status: string;
  created_at: string;
  processed_at: string;
}

export const searchMetadataSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
  },
  processed_at: {
    type: String,
  }
});