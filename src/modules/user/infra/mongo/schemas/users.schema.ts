import { Schema, Document } from 'mongoose';

export class User extends Document {
	email: string;
	password: string;
	name: string;
	area: string;
	grupo: string;
}

export const UserSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: { type: String, required: true },
    name: { type: String, required: true },
    area: {
      type: String,
      required: true,
    },
		grupo: {
			type: Schema.Types.ObjectId,
			ref: 'crw-group',
			required: true,
		},
	},
	{
		timestamps: true,
	},
);