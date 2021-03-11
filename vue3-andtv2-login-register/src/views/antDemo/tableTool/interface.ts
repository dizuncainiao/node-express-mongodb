import { AxiosResponse } from 'axios'

export interface ResDesc extends AxiosResponse {
  code?: number;
  newslist?: never;
}
