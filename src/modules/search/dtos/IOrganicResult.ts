export default interface IOrganicResult {
  _id: string;
  position: number;
  title: string;
  link: string;
  displayed_link: string;
  snippet: string;
  isGood?: boolean;
}