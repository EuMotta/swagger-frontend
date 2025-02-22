/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getSession } from 'next-auth/react';

import Axios, { AxiosRequestConfig } from 'axios';

/**
 * @function AXIOS_INSTANCE
 * @summary Instância pré-configurada do Axios
 *
 * Cria uma instância do Axios com um `baseURL` definido. Pode ser ajustado conforme necessário.
 */
export const AXIOS_INSTANCE = Axios.create({ baseURL: process.env.API_URL });

/**
 * @function http
 * @summary Função para realizar requisições HTTP com Axios
 *
 * Cria uma instância do Axios e permite realizar chamadas HTTP com suporte a cancelamento.
 *
 * @template T - Tipo esperado na resposta da requisição.
 * @param {AxiosRequestConfig} config - Configurações básicas da requisição (URL, método, etc.).
 * @param {AxiosRequestConfig} [options] - Configurações adicionais opcionais para a requisição.
 * @returns {Promise<T>} - Uma promessa que resolve com os dados da resposta.
 */

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

/**
 * @function interceptors.request
 * @summary Interceptor para adicionar o token de autenticação
 *
 * Intercepta as requisições para incluir o token JWT do usuário autenticado (caso exista).
 */

AXIOS_INSTANCE.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (session?.token) {
    request.headers.Authorization = `Bearer ${session.token}`;
  }

  return request;
});
