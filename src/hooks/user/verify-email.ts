/* eslint-disable react-hooks/rules-of-hooks */

import { ApiResponse } from '@/@interfaces/api';
import type { ErrorType } from '@/@interfaces/api';
import { SecondParameter } from '@/@interfaces/api';
import { UserTypes } from '@/@interfaces/zod/user';
import { http } from '@/http/client';
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { getGetUserByEmailQueryKey } from './get-by-email';

/**
 * @function useEmailVerify
 * @summary Hook para verificar o e-mail do usuário.
 *
 * Este hook encapsula a lógica de verificação de e-mail utilizando o React Query.
 * Ele configura e executa a mutação que envia uma requisição HTTP para o endpoint `/email_verify`,
 * tratando os casos de sucesso e erro com feedback visual e invalidando a query associada.
 *
 * @param {Object} [options] - Configurações opcionais para a mutação e a requisição HTTP.
 * @param {UseMutationOptions<ApiResponse<UserTypes['edit-user-email']>, ErrorType<ApiResponse<unknown>>, { userEmail: string }, TContext>} [options.mutation] - Opções do React Query para customizar a mutação.
 * @param {SecondParameter<typeof http>} [options.request] - Configurações adicionais para a requisição HTTP.
 *
 * @returns {UseMutationResult<ApiResponse<UserTypes['edit-user-email']>, ErrorType<ApiResponse<unknown>>, { userEmail: string }, TContext>} Objeto com os métodos e estados da mutação.
 */

export const useEmailVerify = <TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    ApiResponse<UserTypes['edit-user-email']>,
    ErrorType<ApiResponse<unknown>>,
    { userEmail: string },
    TContext
  >;
  request?: SecondParameter<typeof http>;
}): UseMutationResult<
  ApiResponse<UserTypes['edit-user-email']>,
  ErrorType<ApiResponse<unknown>>,
  { userEmail: string },
  TContext
> => {
  const mutationOptions = getVerifyEmailMutationOptions(options);
  return useMutation(mutationOptions);
};

/**
 * @function verifyEmail
 * @summary Realiza a requisição HTTP para verificar o e-mail do usuário.
 *
 * Esta função envia uma requisição POST para o endpoint `/email_verify`
 * com o e-mail informado, retornando uma Promise que resolve com a resposta da API.
 *
 * @param {string} userEmail - O e-mail do usuário a ser verificado.
 * @param {SecondParameter<typeof http>} [options] - Configurações adicionais para a requisição HTTP.
 * @param {AbortSignal} [signal] - Sinal para abortar a requisição, se necessário.
 *
 * @returns {Promise<ApiResponse<UserTypes['edit-user-email']>>} Promise com os dados da verificação do e-mail.
 */

const verifyEmail = (
  userEmail: string,
  options?: SecondParameter<typeof http>,
  signal?: AbortSignal,
) => {
  return http<ApiResponse<UserTypes['edit-user-email']>>(
    {
      url: `/email_verify`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { email: userEmail },

      signal,
    },
    options,
  );
};

/**
 * @function getVerifyEmailMutationOptions
 * @summary Configura as opções da mutação para a verificação do e-mail.
 *
 * Esta função define as opções que serão utilizadas pela mutação do React Query,
 * incluindo a função de mutação que chama `verifyEmail`, o tratamento dos casos de sucesso e erro,
 * e a invalidação de queries relacionadas ao usuário.
 *
 * @param {Object} [options] - Configurações opcionais contendo as opções de mutação e de requisição HTTP.
 * @param {UseMutationOptions<ApiResponse<UserTypes['edit-user-email']>, ErrorType<ApiResponse<unknown>>, { userEmail: string }, TContext>} [options.mutation] - Opções parciais para customizar a mutação.
 * @param {SecondParameter<typeof http>} [options.request] - Configurações adicionais para a requisição HTTP.
 *
 * @returns {UseMutationOptions<ApiResponse<UserTypes['edit-user-email']>, ErrorType<ApiResponse<unknown>>, { userEmail: string }, TContext>} Objeto com as opções de mutação configuradas.
 */

const getVerifyEmailMutationOptions = <TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    ApiResponse<UserTypes['edit-user-email']>,
    ErrorType<ApiResponse<unknown>>,
    { userEmail: string },
    TContext
  >;
  request?: SecondParameter<typeof http>;
}) => {
  const mutationKey = ['verify-email'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    ApiResponse<UserTypes['edit-user-email']>,
    { userEmail: string }
  > = ({ userEmail }) => {
    return verifyEmail(userEmail, requestOptions);
  };
  const queryClient = useQueryClient();

  return {
    mutationFn,
    ...mutationOptions,
    onSuccess: async (data, variables, context) => {
      const { userEmail } = variables;
      toast.success(data.message);

      const queryKey = getGetUserByEmailQueryKey(userEmail);
      console.log(queryKey);
      await queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido';
      toast.error(errorMessage);
      console.error('Erro ao enviar a verificação do email:', errorMessage);
      mutationOptions?.onError?.(error, variables, context);
    },
  } as UseMutationOptions<
    ApiResponse<UserTypes['edit-user-email']>,
    ErrorType<ApiResponse<unknown>>,
    { userEmail: string },
    TContext
  >;
};
