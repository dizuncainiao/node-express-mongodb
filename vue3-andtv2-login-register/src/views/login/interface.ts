import { AxiosResponse } from 'axios'

export interface Book {
  user: string;
  password: string;
}

export interface ResDesc extends AxiosResponse {
  code?: number;
}
