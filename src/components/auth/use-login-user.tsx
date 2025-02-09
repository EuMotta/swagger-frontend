import { signIn } from 'next-auth/react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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

export function useCreateUser(reset: () => void) {
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
      queryClient.setQueryData(['user-login'], context.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: 'user-login' });
    },
  });
}
