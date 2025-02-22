/* eslint-disable react-hooks/rules-of-hooks */
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { ApiResponse } from '@/@interfaces/api';
import type { ErrorType, BodyType } from '@/@interfaces/api';
import { SecondParameter } from '@/@interfaces/api';
import { http } from '@/http/client';
import { CreateUserResponse } from '@/http/generated/api.schemas';
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
 * @summary Hook para criar um novo usuário
 *
 * Utiliza o `useMutation` do React Query para gerenciar a mutação de criação de um usuário.
 *
 * @template TContext - Tipo opcional para o contexto do React Query.
 * @param {Object} options - Opções para personalizar a mutação.
 * @returns {UseMutationResult<ApiResponse<CreateUserResponse>, ErrorType<ApiResponse<unknown>>, { data: BodyType<CreateUserResponse> }, TContext>}
 */

export const useCreateUser = <TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    ApiResponse<CreateUserResponse>,
    ErrorType<ApiResponse<unknown>>,
    { data: BodyType<CreateUserResponse> },
    TContext
  >;
  request?: SecondParameter<typeof http>;
}): UseMutationResult<
  ApiResponse<CreateUserResponse>,
  ErrorType<ApiResponse<unknown>>,
  { data: BodyType<CreateUserResponse> },
  TContext
> => {
  const mutationOptions = getCreateUserMutationOptions(options);
  return useMutation(mutationOptions);
};

/**
 * @function createUser
 * @summary Função para fazer a requisição HTTP e criar o usuário
 *
 * Realiza a requisição HTTP para criar um novo usuário utilizando o método `POST`.
 *
 * @param {BodyType<CreateUserResponse>} createUserResponse - Dados para criação do usuário.
 * @param {SecondParameter<typeof http>} [options] - Opções adicionais para a requisição.
 * @param {AbortSignal} [signal] - Sinal para cancelamento da requisição.
 * @returns {Promise<ApiResponse<CreateUserResponse>>} - Resposta da API com os detalhes do usuário criado.
 */

export const createUser = (
  createUserResponse: BodyType<CreateUserResponse>,
  options?: SecondParameter<typeof http>,
  signal?: AbortSignal,
) => {
  return http<ApiResponse<CreateUserResponse>>(
    {
      url: `/users`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: createUserResponse,
      signal,
    },
    options,
  );
};

/**
 * @function getCreateUserMutationOptions
 * @summary Define as opções da Mutação para a criação do usuário
 *
 * Cria as configurações para o `useMutation`, lidando com as ações de sucesso, erro e atualização do cache.
 *
 * @template TContext - Tipo opcional para o contexto do React Query.
 * @param {Object} options - Opções para personalizar a mutação.
 * @returns {UseMutationOptions<ApiResponse<CreateUserResponse>, ErrorType<ApiResponse<unknown>>, { data: BodyType<CreateUserResponse> }, TContext>}
 */

export const getCreateUserMutationOptions = <TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    ApiResponse<CreateUserResponse>,
    ErrorType<ApiResponse<unknown>>,
    { data: BodyType<CreateUserResponse> },
    TContext
  >;
  request?: SecondParameter<typeof http>;
}) => {
  const mutationKey = ['createUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  /**
   * @summary Define a função da mutação que será usada pelo `useMutation`
   */

  const mutationFn: MutationFunction<
    ApiResponse<CreateUserResponse>,
    { data: BodyType<CreateUserResponse> }
  > = (props) => {
    const { data } = props ?? {};
    return createUser(data, requestOptions);
  };
  const router = useRouter();
  const queryClient = useQueryClient();

  return {
    mutationFn,
    ...mutationOptions,
    onSuccess: async (data, variables, context) => {
      toast.success(data.message);

      const loginResponse = await signIn('credentials', {
        redirect: false,
        email: variables.data.email,
        password: variables.data.password,
      });

      if (loginResponse?.error) {
        toast.error('Erro ao fazer login após cadastro!');
        console.error('Erro ao fazer login:', loginResponse.error);
      } else {
        router.push('/home');
      }

      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido';
      toast.error(errorMessage);
      console.error('Erro ao criar usuário:', errorMessage);
      mutationOptions?.onError?.(error, variables, context);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: 'user-login' });
    },
  } as UseMutationOptions<
    ApiResponse<CreateUserResponse>,
    ErrorType<ApiResponse<unknown>>,
    { data: BodyType<CreateUserResponse> },
    TContext
  >;
};

/**
 * @summary Tipos auxiliares para reutilização
 */

export type CreateUserMutationResult = ApiResponse<CreateUserResponse>;
export type CreateUserMutationBody = BodyType<CreateUserResponse>;
export type CreateUserMutationError = ErrorType<ApiResponse<unknown>>;
