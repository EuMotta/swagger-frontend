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
