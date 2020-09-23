import { Schema, Document } from 'mongoose';

export class Preferences extends Document {
  userId: string;
  urlRemove: string[];
  tagsDefault: string[];
}

export const PreferencesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'crw-users',
    required: true,
  },
  urlRemove: {
    type: [String],
    default: [],
  },
  tagsDefault: {
    type: [String],
    default: [],
  },
});
