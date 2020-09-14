export interface IAccount {
  account_id: string;
  api_key: string;
  account_email: string;
  plan_id: string;
  plan_name: string;
  searches_per_month: number;
  plan_searches_left: number;
  extra_credits: number;
  total_searches_left: number;
  this_month_usage: number;
  this_hour_searches: number;
  last_hour_searches: number;
  account_rate_limit_per_hour: number;
}