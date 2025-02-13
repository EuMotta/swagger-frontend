import { AxiosError } from 'axios';

export interface ApiResponse<T> {
  /** Indicates if the request was successful or not */
  error: boolean;
  /** Message associated with the API response */
  message: string;
  /** The data returned by the API */
  data: T;
}
interface Meta {
  /** The current page number */
  page: string;
  /** The number of items per page */
  limit: string;
  /** The total number of items available */
  item_count: number;
  /** The total number of pages available */
  page_count: number;
  /** Indicates if there is a previous page */
  has_previous_page: boolean;
  /** Indicates if there is a next page */
  has_next_page: boolean;
}

export interface Pagination<T> {
  /** Metadata about the pagination */
  meta: Meta;
  /** The paginated data */
  data: T;
}

export type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
