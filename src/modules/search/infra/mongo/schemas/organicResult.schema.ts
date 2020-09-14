import { Schema, Document } from 'mongoose';

export class OrganicResult extends Document {
  position: number;
  title: string;
  link: string;
  displayed_link: string;
  snippet: string;
}

export const organicResultSchema = new Schema({
  position: {
    type: Number,
  },
  title: {
    type: String
  },
  link: {
    type: String,
  },
  displayed_link: {
    type: String,
  },
  snippet: {
    type: String
  }
})