import { Schema } from 'mongoose';

export const organicResultSchema = new Schema({
  position: {
    type: Number,
  },
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  displayed_link: {
    type: String,
  },
  snippet: {
    type: String,
  },
});
