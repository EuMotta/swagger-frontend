import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

import { editUserBody } from '@/@interfaces/zod/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdateUserEmail, useVerifyUserEmail } from '@/http/generated/api';
import { UpdateUserEmailResponse, UserDto } from '@/http/generated/api.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';

const EditUserEmail = ({ user }: { user: UserDto }) => {
  const form = useForm<UpdateUserEmailResponse>({
    resolver: zodResolver(editUserBody),
    defaultValues: {
      email: user.email ?? '',
    },
  });

  const editUser = useUpdateUserEmail();
  const verifyEmail = useVerifyUserEmail();
  const onSubmit = async (data: UpdateUserEmailResponse) => {
    editUser.mutate(
      { data, email: user.email },
      {
        onSuccess: (response) => {
          toast.success(response.message);
        },
        onError: (error) => {
          toast.error(error.response.data.message[0] ?? error.message);
        },
      },
    );
  };
  const onSubmitVerifyEmail = async () => {
    verifyEmail.mutate({ data: { email: user.email } });
  };

  return (
    <div className="mx-auto p-6 bg-sidebar shadow rounded-lg max-w-lg">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Insira seu email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={editUser.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <div className="flex-shrink-0 mt-8">
                  {user.is_email_verified ? (
                    <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                      Verificado
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => onSubmitVerifyEmail()}
                    >
                      Verificar Email
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Button
              disabled={editUser.isPending}
              type="submit"
              className="w-full"
            >
              {editUser.isPending && (
                <AiOutlineLoading className="mr-2 h-5 w-5 animate-spin" />
              )}
              Atualizar Email
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditUserEmail;
