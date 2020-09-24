export default interface IQueryInterface {
  engine: string;
  q: string;
  location?: string;
  google_domain?: string;
  gl?: string;
  hl?: string;
  num?: string;
  filter?: string;
  nfpr?: string;
}