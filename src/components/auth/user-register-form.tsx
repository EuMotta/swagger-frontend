'use client';

import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateUser } from '@/hooks/auth/register-user';
import { CreateUserResponse } from '@/http/generated/api.schemas';
import { createUserBody } from '@/http/generated/schemas/users/users.zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<CreateUserResponse>({
    resolver: zodResolver(createUserBody),
  });

  const createUser = useCreateUser();
  const onSubmit = async (data: CreateUserResponse) => {
    const result = createUser.mutate({ data });
    console.log(result);
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <div className="flex gap-2">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="John"
                          autoCapitalize="none"
                          autoComplete="name"
                          autoCorrect="off"
                          disabled={createUser.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobrenome</FormLabel>
                      <FormControl>
                        <Input
                          id="last_name"
                          placeholder="Doe"
                          autoCapitalize="none"
                          autoComplete="last_name"
                          autoCorrect="off"
                          disabled={createUser.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={createUser.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="Sua senha"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="current-password"
                        autoCorrect="off"
                        disabled={createUser.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={createUser.isPending} type="submit">
              {createUser.isPending && (
                <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cadastrar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
