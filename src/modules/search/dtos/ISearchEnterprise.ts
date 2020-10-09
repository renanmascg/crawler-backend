import ISearchMetadata from "./ISearchMetadata";
import IOrganicResult from "./IOrganicResult";

export default interface ISearchEnterprise {
  apiId: string;
  enterpriseId: string;
  search_metadata: ISearchMetadata;
  organic_result?: IOrganicResult[];
}