import { Schema, Document } from 'mongoose';
import { searchMetadataSchema, SearchMetadata } from './searchMetadata.schema';
import { organicResultSchema, OrganicResult } from './organicResult.schema';

export class SearchEnterprise extends Document {
  userId: string;
  search_metadata: SearchMetadata;
  organic_result: OrganicResult;
}

export const SearchEnterpriseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
			ref: 'crw-users',
			required: true,
    },
    search_metadata: {
      type: searchMetadataSchema,
    },
    organic_result: {
      type: [organicResultSchema]
    }
  },
  {
    timestamps: true,
  },
);

