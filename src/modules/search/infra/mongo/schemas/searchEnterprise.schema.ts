import { Schema, Document } from 'mongoose';
import { searchMetadataSchema } from './searchMetadata.schema';
import { organicResultSchema } from './organicResult.schema';
import ISearchMetadata from 'modules/search/dtos/ISearchMetadata';
import IOrganicResult from 'modules/search/dtos/IOrganicResult';
import { searchParameters } from './searchParameters.schema';

export class SearchEnterprise extends Document {
  apiId: string;
  enterpriseId: string;
  search_metadata: ISearchMetadata;
  organic_result?: IOrganicResult[];
}

export const SearchEnterpriseSchema = new Schema(
  {
    apiId: {
      type: String,
      required: true,
    },
    enterpriseId: {
      type: Schema.Types.ObjectId,
      ref: 'crw-enterprise',
      required: true,
    },
    search_parameters: {
      type: searchParameters
    },
    search_metadata: {
      type: searchMetadataSchema,
    },
    organic_result: {
      type: [organicResultSchema],
    }
  },
  {
    timestamps: true,
  },
);
