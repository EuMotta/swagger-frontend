import { MutationOptions, UseMutationResult } from '@tanstack/react-query';
import { toast } from 'sonner';

export const globalMutationOverride = <TData, TError, TVariables>(
  useMutation: (
    options?: MutationOptions<TData, TError, TVariables>,
  ) => UseMutationResult<TData, TError, TVariables>,
) => {
  return (options?: MutationOptions<TData, TError, TVariables>) =>
    useMutation({
      ...options,
      onSuccess: (data, variables, context) => {
        const message =
          (data as any)?.message || 'Operação realizada com sucesso!';
        toast.success(message);
        options?.onSuccess?.(data, variables, context);
      },
      onError: (error: any, variables, context) => {
        const errorMessage =
          error.response?.data?.message || 'Ocorreu um erro inesperado.';
        toast.error(errorMessage);
        options?.onError?.(error, variables, context);
      },
    });
};
