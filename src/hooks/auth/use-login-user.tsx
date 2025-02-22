import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * @function createUserFn
 * @summary Define a função da mutação que será usada pelo `useMutation`.
 *
 * Esta função realiza a autenticação do usuário utilizando as credenciais fornecidas. Em caso de falha, lança um erro com a mensagem apropriada.
 *
 * @param {Object} authUser - Objeto contendo as credenciais do usuário.
 * @param {string} authUser.email - E-mail do usuário.
 * @param {string} authUser.password - Senha do usuário.
 * @returns {Promise<any>} Retorna a resposta da autenticação.
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
 * @function useAuthUser
 * @summary Hook para autenticar o usuário.
 *
 * Utiliza o `useMutation` para gerenciar a autenticação do usuário. Em caso de sucesso, redireciona o usuário para a página de `/users`. Em caso de erro, exibe uma mensagem de erro.
 *
 * @param {Function} reset - Função para redefinir o estado do formulário ou limpar dados relacionados.
 * @returns {UseMutationResult} Retorna o resultado da mutação do `useMutation`.
 */

export function useAuthUser(reset: () => void) {
  const router = useRouter();
  return useMutation({
    mutationFn: createUserFn,
    onSuccess: () => {
      reset();
      toast.success('Usuário logado com sucesso, encaminhando....');
      router.push('/users');
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
