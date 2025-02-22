import { ApiResponse } from '@/@interfaces/api';
import { UserTypes } from '@/@interfaces/zod/user';
import { http } from '@/http/client';
import { useQuery, QueryFunction, UseQueryResult } from '@tanstack/react-query';

/**
 * @function getUserByEmail
 * @summary Realiza uma requisição HTTP para buscar um usuário pelo e-mail.
 *
 * Envia uma requisição GET para o endpoint `/users/{email}`, retornando uma Promise com a resposta da API contendo os dados do usuário.
 *
 * @param {string} email - O e-mail do usuário a ser buscado.
 * @param {AbortSignal} [signal] - Sinal para abortar a requisição, se necessário.
 *
 * @returns {Promise<ApiResponse<UserTypes['user']>>} Promise com os dados do usuário.
 */

const getUserByEmail = (email: string, signal?: AbortSignal) =>
  http<ApiResponse<UserTypes['user']>>({
    url: `/users/${email}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal,
  });

/**
 * @function getGetUserByEmailQueryKey
 * @summary Gera a query key para buscar um usuário pelo e-mail.
 *
 * Esta função decodifica o e-mail recebido e o utiliza como chave única para a query.
 *
 * @param {string} email - O e-mail do usuário.
 *
 * @returns {string} A query key para ser utilizada na cache do React Query.
 */
export const getGetUserByEmailQueryKey = (email: string) => {
  return decodeURIComponent(email);
};

/**
 * @function useGetUserByEmail
 * @summary Hook para buscar um usuário pelo e-mail.
 *
 * Utiliza o React Query para executar uma query que busca um usuário através do e-mail informado.
 * A query só é habilitada se um e-mail válido for fornecido.
 *
 * @template TData, TError
 * @param {string} email - O e-mail do usuário a ser buscado.
 *
 * @returns {UseQueryResult<TData, TError>} Objeto contendo o status, dados e métodos para manipulação da query.
 */

export function useGetUserByEmail<
  TData = Awaited<ReturnType<typeof getUserByEmail>>,
  TError = Error,
>(email: string): UseQueryResult<TData, TError> {
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserByEmail>>> = ({
    signal,
  }) => getUserByEmail(email, signal);

  const queryKey = getGetUserByEmailQueryKey(email);
  console.log('gbe', queryKey);
  return useQuery({
    queryKey: [queryKey, email],
    queryFn,
    enabled: !!email,
  });
}
