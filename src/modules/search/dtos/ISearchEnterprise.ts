import ISearchMetadata from "./ISearchMetadata";
import IOrganicResult from "./IOrganicResult";

export default interface ISearchEnterprise {
  userId: string;
  search_metadata: ISearchMetadata;
  organic_result: IOrganicResult;
}