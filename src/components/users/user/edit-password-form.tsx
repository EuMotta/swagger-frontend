'use client';

import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { useUpdateUserPassword } from '@/http/generated/api';
import { UpdateUserPasswordResponse } from '@/http/generated/api.schemas';
import { updateUserPasswordBody } from '@/http/generated/schemas/users/users.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';

const EditUserPassword = ({ user }: { user: { email: string } }) => {
  const form = useForm<UpdateUserPasswordResponse>({
    resolver: zodResolver(updateUserPasswordBody),
  });

  const editUser = useUpdateUserPassword();

  const onSubmit = async (data: UpdateUserPasswordResponse) => {
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
    editUser.reset();
  };

  return (
    <div className="mx-auto p-6 bg-sidebar shadow rounded-lg max-w-md">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <PasswordInput disabled={editUser.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={editUser.isPending}
              type="submit"
              className="w-full"
            >
              {editUser.isPending && (
                <AiOutlineLoading className="mr-2 h-5 w-5 animate-spin" />
              )}
              Atualizar Senha
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditUserPassword;
