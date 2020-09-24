import { Schema, Document } from 'mongoose';
import { searchMetadataSchema } from './searchMetadata.schema';
import { organicResultSchema } from './organicResult.schema';
import ISearchMetadata from 'modules/search/dtos/ISearchMetadata';
import IOrganicResult from 'modules/search/dtos/IOrganicResult';

export class SearchEnterprise extends Document {
  apiId: string;
  userId: string;
  groupId: string;
  search_metadata: ISearchMetadata;
  organic_result?: IOrganicResult[];
}

export const SearchEnterpriseSchema = new Schema(
  {
    apiId: {
      type: String,
      required: true,
    },
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
    search_metadata: {
      type: searchMetadataSchema,
    },
    organic_result: {
      type: [organicResultSchema],
    },
  },
  {
    timestamps: true,
  },
);
