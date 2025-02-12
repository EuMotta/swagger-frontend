/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getSession } from 'next-auth/react';

import Axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({ baseURL: process.env.API_URL }); // use your own URL here or environment variable

// add a second `options` argument here if you want to pass extra options to each generated query
export const http = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};
AXIOS_INSTANCE.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session?.token) {
    request.headers.Authorization = `Bearer ${session.token}`;
  }

  return request;
});
