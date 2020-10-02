export default interface IQueryInterface {
  engine: string;
  q: string;
  api_key: string;
  async?: boolean;
  location?: string;
  tbs?: string;
  google_domain?: string;
  gl?: string;
  hl?: string;
  num?: string;
  filter?: string;
  nfpr?: string;
  device?: string;
}
