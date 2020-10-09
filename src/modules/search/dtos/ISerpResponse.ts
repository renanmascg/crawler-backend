import ISearchMetadata from "./ISearchMetadata";
import IOrganicResult from "./IOrganicResult";

export default interface ISerpResponse {
  search_metadata: ISearchMetadata;
  search_parameters: ISearchParameters;
  organic_results?: IOrganicResult[];
}

interface ISearchParameters {
  q: string;
  google_domain: string;
}