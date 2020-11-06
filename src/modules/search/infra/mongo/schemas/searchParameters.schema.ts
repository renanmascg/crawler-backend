import { Schema } from 'mongoose';


export const searchParameters = new Schema({
  q: {
    type: String,
    required: true,
  },
  google_domain: {
    type: String,
    required: true,
  },
});