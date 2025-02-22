/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from 'next/navigation';

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

import { getGetUserByEmailQueryKey } from './get-by-email';

/**
 * @function useEditUserEmail
 * @summary Hook para editar o e-mail de um usuário.
 *
 * @param {Object} [options] - Opções para customizar a mutação e a requisição HTTP.
 * @returns {UseMutationResult<ApiResponse<UserTypes['edit-user-email']>, ErrorType<ApiResponse<unknown>>, { data: BodyType<UserTypes['edit-user-email']>; userEmail: string }, TContext>} Objeto contendo os métodos e estados da mutação.
 */

export const useEditUserEmail = <TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    ApiResponse<UserTypes['edit-user-email']>,
    ErrorType<ApiResponse<unknown>>,
    { data: BodyType<UserTypes['edit-user-email']>; userEmail: string },
    TContext
  >;
  request?: SecondParameter<typeof http>;
}): UseMutationResult<
  ApiResponse<UserTypes['edit-user-email']>,
  ErrorType<ApiResponse<unknown>>,
  { data: BodyType<UserTypes['edit-user-email']>; userEmail: string },
  TContext
> => {
  const mutationOptions = getEditUserMutationOptions(options);
  return useMutation(mutationOptions);
};

/**
 * @function editUserEmail
 * @summary Função para fazer a requisição HTTP e editar o e-mail do usuário.
 *
 * @param {BodyType<UserTypes['edit-user-email']>} EditUserBody - Dados do usuário para edição do e-mail.
 * @param {string} userEmail - E-mail do usuário a ser editado.
 * @param {SecondParameter<typeof http>} [options] - Configurações adicionais para a requisição HTTP.
 * @param {AbortSignal} [signal] - Sinal para abortar a requisição, se necessário.
 * @returns {Promise<ApiResponse<UserTypes['edit-user-email']>>} Promise com a resposta da API.
 */

const editUserEmail = (
  EditUserBody: BodyType<UserTypes['edit-user-email']>,
  userEmail: string,
  options?: SecondParameter<typeof http>,
  signal?: AbortSignal,
) => {
  return http<ApiResponse<UserTypes['edit-user-email']>>(
    {
      url: `/users/update_email/${userEmail}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: EditUserBody,
      signal,
    },
    options,
  );
};

/**
 * @function getEditUserMutationOptions
 * @summary Define as opções da mutação para a edição do e-mail do usuário.
 *
 * @param {Object} [options] - Opções para customizar a mutação e a requisição HTTP.
 * @returns {UseMutationOptions<ApiResponse<UserTypes['edit-user-email']>, ErrorType<ApiResponse<unknown>>, { data: BodyType<UserTypes['edit-user-email']>; userEmail: string }, TContext>} Opções configuradas para a mutação.
 */

const getEditUserMutationOptions = <TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    ApiResponse<UserTypes['edit-user-email']>,
    ErrorType<ApiResponse<unknown>>,
    { data: BodyType<UserTypes['edit-user-email']>; userEmail: string },
    TContext
  >;
  request?: SecondParameter<typeof http>;
}) => {
  const mutationKey = ['editUser'];
  const { mutation: mutationOptions, request: requestOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined };

  const mutationFn: MutationFunction<
    ApiResponse<UserTypes['edit-user-email']>,
    { data: BodyType<UserTypes['edit-user-email']>; userEmail: string }
  > = ({ data, userEmail }) => {
    return editUserEmail(data, userEmail, requestOptions);
  };
  const router = useRouter();
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
      router.push(`/users/${variables.data.email}`);
      mutationOptions?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido';
      toast.error(errorMessage);
      console.error('Erro ao editar o email do usuário:', errorMessage);
      mutationOptions?.onError?.(error, variables, context);
    },
  } as UseMutationOptions<
    ApiResponse<UserTypes['edit-user-email']>,
    ErrorType<ApiResponse<unknown>>,
    { data: BodyType<UserTypes['edit-user-email']>; userEmail: string },
    TContext
  >;
};
