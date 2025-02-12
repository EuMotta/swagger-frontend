import { AxiosError } from 'axios';

export interface ApiResponse<T> {
  /** Indicates if the request was successful or not */
  error: boolean;
  /** Message associated with the API response */
  message: string;
  /** The data returned by the API */
  data: T;
}

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
