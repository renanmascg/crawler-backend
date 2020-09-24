import { Schema } from 'mongoose';


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