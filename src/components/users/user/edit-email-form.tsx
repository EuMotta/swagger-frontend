import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

import { editUserBody, UserTypes } from '@/@interfaces/zod/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditUserEmail } from '@/hooks/user/edit-email';
import { useEmailVerify } from '@/hooks/user/verify-email';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';

const EditUserEmail = ({ user }: { user: UserTypes['user'] }) => {
  const form = useForm<UserTypes['edit-user-email']>({
    resolver: zodResolver(editUserBody),
    defaultValues: {
      email: user.email ?? '',
    },
  });

  const editUser = useEditUserEmail();
  const verifyEmail = useEmailVerify();
  const onSubmit = async (data: UserTypes['edit-user-email']) => {
    editUser.mutate({ data, userEmail: user.email });
  };
  const onSubmitVerifyEmail = async () => {
    verifyEmail.mutate({ userEmail: user.email });
  };

  return (
    <div className=" mx-auto p-6  ">
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
                <div className="flex-shrink-0">
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
