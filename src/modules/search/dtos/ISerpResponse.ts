import ISearchMetadata from "./ISearchMetadata";
import IOrganicResult from "./IOrganicResult";

export default interface ISerpResponse {
  search_metadata: ISearchMetadata;
  organic_results?: IOrganicResult[];
}