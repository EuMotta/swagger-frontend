import { signIn } from 'next-auth/react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * @summary Define a função da mutação que será usada pelo `useMutation`
 */
const createUserFn = async (authUser: { email: string; password: string }) => {
  const response = await signIn('credentials', {
    redirect: false,
    email: authUser.email,
    password: authUser.password,
  });
  if (response && !response.ok) {
    throw new Error(response.error ?? 'Erro desconhecido');
  }
  return response;
};

/**
 * @summary Hook para autenticar o usuário
 */

export function useAuthUser(reset: () => void) {
  return useMutation({
    mutationFn: createUserFn,
    onSuccess: () => {
      reset();
      toast.success('Usuário logado com sucesso, encaminhando....');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}

/* export function useAuthUser(reset: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: 'user-login' });
    },
    onSuccess: () => {
      reset();
      toast.success('Usuário logado com sucesso, encaminhando....');
    },
    onError: (err, context?: any) => {
      toast.error(err.message);
      if (context?.previousUsers) {
        queryClient.setQueryData(['user-login'], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: 'user-login' });
    },
  }); */
