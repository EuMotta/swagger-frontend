/* eslint-disable react-hooks/rules-of-hooks */

import { ApiResponse } from '@/@interfaces/api';
import type { ErrorType, BodyType } from '@/@interfaces/api';
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

/**
 * @function useCreateUser
 * @summary Hook para criar um usuário
 *
 * @param {object} [options] - Opções para customizar a mutação e a requisição HTTP.
 * @returns {UseMutationResult<ApiResponse<UserTypes['create-user']>, ErrorType<ApiResponse<unknown>>, { data: BodyType<UserTypes['create-user']> }, TContext>} Objeto contendo métodos e estados da mutação.
 */

export const useCreateUser = <TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    ApiResponse<UserTypes['create-user']>,
    ErrorType<ApiResponse<unknown>>,
    { data: BodyType<UserTypes['create-user']> },
    TContext
  >;
  request?: SecondParameter<typeof http>;
}): UseMutationResult<
  ApiResponse<UserTypes['create-user']>,
  ErrorType<ApiResponse<unknown>>,
  { data: BodyType<UserTypes['create-user']> },
  TContext
> => {
  const mutationOptions = getCreateUserMutationOptions(options);
  return useMutation(mutationOptions);
};

/**
 * @function createUser
 * @summary Função para fazer a requisição HTTP e criar o usuário
 *
 * @param {BodyType<UserTypes['create-user']>} CreateUserBody - Dados do usuário para edição.
 * @param {string} userEmail - E-mail do usuário a ser criado.
 * @param {SecondParameter<typeof http>} [options] - Configurações adicionais para a requisição HTTP.
 * @param {AbortSignal} [signal] - Sinal para abortar a requisição, se necessário.
 * @returns {Promise<ApiResponse<UserTypes['create-user']>>} Promise com a resposta da API.
 */

const createUser = (
  CreateUserBody: BodyType<UserTypes['create-user']>,

  options?: SecondParameter<typeof http>,
  signal?: AbortSignal,
) => {
  return http<ApiResponse<UserTypes['create-user']>>(
    {
      url: `/users`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: CreateUserBody,
      signal,
    },
    options,
  );
};

/**
 * @function getEditUserMutationOptions
 * @summary Define as opções da Mutação para a edição do usuário
 *
 * @param {object} [options] - Opções para customizar a mutação e a requisição HTTP.
 * @returns {UseMutationOptions<ApiResponse<UserTypes['create-user']>, ErrorType<ApiResponse<unknown>>, { data: BodyType<UserTypes['create-user']> }, TContext>} Opções configuradas para a mutação.
 */

const getCreateUserMutationOptions = <TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    ApiResponse<UserTypes['create-user']>,
    ErrorType<ApiResponse<unknown>>,
    { data: BodyType<UserTypes['create-user']> },
    TContext
  >;
  request?: SecondParameter<typeof http>;
}) => {
  const mutationKey = ['create-user'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    ApiResponse<UserTypes['create-user']>,
    { data: BodyType<UserTypes['create-user']> }
  > = ({ data }) => {
    return createUser(data, requestOptions);
  };

  const queryClient = useQueryClient();

  return {
    mutationFn,
    ...mutationOptions,
    onSuccess: async (data, variables, context) => {
      toast.success(data.message);

      await queryClient.invalidateQueries({
        queryKey: ['create-user'],
      });

      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido';
      toast.error(errorMessage);
      console.error('Erro ao criar usuário:', errorMessage);
      mutationOptions?.onError?.(error, variables, context);
    },
  } as UseMutationOptions<
    ApiResponse<UserTypes['create-user']>,
    ErrorType<ApiResponse<unknown>>,
    { data: BodyType<UserTypes['create-user']> },
    TContext
  >;
};
