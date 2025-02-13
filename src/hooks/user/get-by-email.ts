import { ApiResponse, SecondParameter } from '@/@interfaces/api';
import { http } from '@/http/client';
import { CreateUserResponse, UserDto } from '@/http/generated/api.schemas';
import {
  DataTag,
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
const getUserByEmail = (
  email: string,
  options?: SecondParameter<typeof http>,
  signal?: AbortSignal,
) => {
  return http<ApiResponse<UserDto>>(
    {
      url: `/users/${email}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal,
    },
    options,
  );
};

const getGetUserByEmailQueryKey = (email: string) => {
  return [`/users/${email}`] as const;
};

const getGetUserByEmailQueryOptions = <
  TData = Awaited<ReturnType<typeof getUserByEmail>>,
  TError = Error,
>(
  email: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getUserByEmail>>, TError, TData>
    >;
    request?: SecondParameter<typeof http>;
  },
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUserByEmailQueryKey(email);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserByEmail>>> = ({
    signal,
  }) => getUserByEmail(email, requestOptions, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!email,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getUserByEmail>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData, TError> };
};

export function useGetUserByEmail<
  TData = Awaited<ReturnType<typeof getUserByEmail>>,
  TError = Error,
>(
  email: string,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof getUserByEmail>>, TError, TData>
    >;
    request?: SecondParameter<typeof http>;
  },
): UseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData, TError>;
} {
  const queryOptions = getGetUserByEmailQueryOptions(email, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData, TError>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
