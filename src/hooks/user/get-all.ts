import { ApiResponse, Pagination, SecondParameter } from '@/@interfaces/api';
import { http } from '@/http/client';
import { UserDto } from '@/http/generated/api.schemas';
import {
  DataTag,
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

/**
 * @function getAllUsers
 * @summary Realiza uma requisição HTTP para buscar uma lista de usuários paginada.
 *
 * Envia uma requisição GET para o endpoint `/users` com parâmetros para paginação, pesquisa, status e ordenação.
 *
 * @param {number} page - Número da página.
 * @param {number} limit - Quantidade de registros por página.
 * @param {string} [search] - Termo para pesquisa.
 * @param {string} [status] - Filtro de status do usuário.
 * @param {string} [orderBy] - Campo para ordenação.
 * @param {string} [order] - Ordem da ordenação (ASC ou DESC).
 * @param {SecondParameter<typeof http>} [options] - Configurações adicionais para a requisição HTTP.
 * @param {AbortSignal} [signal] - Sinal para abortar a requisição, se necessário.
 *
 * @returns {Promise<ApiResponse<Pagination<UserDto[]>>>} Promise com a resposta da API contendo os usuários.
 */

const getAllUsers = (
  page: number,
  limit: number,
  search?: string,
  status?: string,
  orderBy?: string,
  order?: string,
  options?: SecondParameter<typeof http>,
  signal?: AbortSignal,
) => {
  console.log('order', order);
  return http<ApiResponse<Pagination<UserDto[]>>>(
    {
      url: `/users`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      params: {
        page,
        limit,
        search,
        status,
        orderBy,
        order: order === 'ASC' || order === 'DESC' ? order : undefined,
      },
      signal,
    },
    options,
  );
};

/**
 * @function getGetAllUsersQueryKey
 * @summary  Gera a query key para a listagem de usuários.
 *
 * Utiliza os parâmetros de paginação, pesquisa, status e ordenação para compor uma chave única para o cache do React Query.
 *
 * @param {number} page - Número da página.
 * @param {number} limit - Quantidade de registros por página.
 * @param {string} [search] - Termo para pesquisa.
 * @param {string} [status] - Filtro de status do usuário.
 * @param {string} [orderBy] - Campo para ordenação.
 * @param {string} [order] - Ordem da ordenação.
 *
 * @returns {readonly [string, number, number, (string|undefined), (string|undefined), (string|undefined), (string|undefined)]} Chave única para a query.
 */

const getGetAllUsersQueryKey = (
  page: number,
  limit: number,
  search?: string,
  status?: string,
  orderBy?: string,
  order?: string,
) => {
  return [`/users`, page, limit, search, status, orderBy, order] as const;
};

/**
 * @function getGetAllUsersQueryOptions
 * @summary Configura as opções da query para buscar todos os usuários.
 *
 * Define a query key e a função de query para a listagem de usuários, integrando parâmetros de paginação, pesquisa, status e ordenação.
 * Permite customizações adicionais através de opções de query e de requisição HTTP.
 *
 * @template TData, TError
 * @param {number} page - Número da página.
 * @param {number} limit - Quantidade de registros por página.
 * @param {string} [search] - Termo para pesquisa.
 * @param {string} [status] - Filtro de status do usuário.
 * @param {string} [orderBy] - Campo para ordenação.
 * @param {string} [order] - Ordem da ordenação.
 * @param {Object} [options] - Opções adicionais para configuração da query e da requisição HTTP.
 * @param {Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData>>} [options.query] - Opções parciais para a query.
 * @param {SecondParameter<typeof http>} [options.request] - Configurações adicionais para a requisição HTTP.
 *
 * @returns {UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }} Opções configuradas para a query.
 */

const getGetAllUsersQueryOptions = <
  TData = Awaited<ReturnType<typeof getAllUsers>>,
  TError = void,
>(
  page: number,
  limit: number,
  search?: string,
  status?: string,
  orderBy?: string,
  order?: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData>
    >;
    request?: SecondParameter<typeof http>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getGetAllUsersQueryKey(page, limit, search, status, orderBy, order);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllUsers>>> = ({
    signal,
  }) =>
    getAllUsers(
      page,
      limit,
      search,
      status,
      orderBy,
      order,
      requestOptions,
      signal,
    );

  return {
    queryKey,
    queryFn,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getAllUsers>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

/**
 * @function useGetAllUsers
 * @summary Hook para buscar todos os usuários.
 *
 * Utiliza o React Query para executar uma query que busca uma lista de usuários com base em parâmetros de paginação, pesquisa, status e ordenação.
 * A query é habilitada somente se os parâmetros necessários forem fornecidos.
 *
 * @template TData, TError
 * @param {number} page - Número da página.
 * @param {number} limit - Quantidade de registros por página.
 * @param {string} [search] - Termo para pesquisa.
 * @param {string} [status] - Filtro de status do usuário.
 * @param {string} [orderBy] - Campo para ordenação.
 * @param {string} [order] - Ordem da ordenação.
 * @param {Object} [options] - Opções adicionais para a query e requisição HTTP.
 * @param {Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData>>} [options.query] - Opções parciais para a query.
 * @param {SecondParameter<typeof http>} [options.request] - Configurações adicionais para a requisição HTTP.
 *
 * @returns {UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }} Objeto com os dados, status e métodos da query.
 */

export function useGetAllUsers<
  TData = Awaited<ReturnType<typeof getAllUsers>>,
  TError = Error,
>(
  page: number,
  limit: number,
  search?: string,
  status?: string,
  orderBy?: string,
  order?: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getAllUsers>>, TError, TData>
    >;
    request?: SecondParameter<typeof http>;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetAllUsersQueryOptions(
    page,
    limit,
    search,
    status,
    orderBy,
    order,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
