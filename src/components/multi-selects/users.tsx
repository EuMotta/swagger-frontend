import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetAllUsers } from '@/http/generated/api';

import getInitialsCharacters from '@/utils/get-initials-characters';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { MultiSelect } from '../ui/multi-select';

interface UsersMultiSelectProps {
  label?: string;
}

export function UsersMultiSelect({
  label = 'Usuários',
}: UsersMultiSelectProps) {
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsers({
    page: 1,
    limit: 50,
    search: '',
  });

  const form = useFormContext();

  return (
    <div className="space-y-1.5">
      {isLoadingUsers ? (
        <p>Loading users...</p>
      ) : (
        users &&
        users.data &&
        users.data.data &&
        users?.data?.data?.length > 0 && (
          <FormField
            control={form.control}
            name={'members'}
            render={({ field }) => {
              const selectedValues = Array.isArray(field.value)
                ? field.value
                : [];
              return (
                <FormItem className="space-y-1.5">
                  <FormLabel>{label}</FormLabel>

                  <MultiSelect
                    {...field}
                    options={
                      users.data.data
                        .map((user) => ({
                          value: user.id,
                          label: `${user.name} ${user.last_name}`,
                          avatar: user.image,
                          email: user.email,
                          role: user.role,
                        }))
                        .sort((a, b) =>
                          a.label.localeCompare(b.label, undefined, {
                            sensitivity: 'base',
                          }),
                        ) || []
                    }
                    selected={selectedValues.map((value: string) => {
                      const user = users.data.data.find(
                        (user) => user.id === value,
                      );
                      return user
                        ? {
                            value: user.id,
                            label: `${user.name} ${user.last_name}`,
                            avatar: user.image,
                            email: user.email,
                            role: user.role,
                          }
                        : { value, label: '', avatar: '', email: '', role: '' };
                    })}
                    onChange={(selectedOptions) => {
                      const newSelectedValues = selectedOptions.map(
                        (option) => option.value,
                      );
                      field.onChange(newSelectedValues);
                    }}
                    isLoading={isLoadingUsers}
                    isAvatar
                    renderOption={(option) => (
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center">
                          <Avatar className="border-muted border-1 size-10">
                            <AvatarImage src={option.avatar} />
                            <AvatarFallback>
                              {getInitialsCharacters(option.label)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-2">
                            <strong>{option.label}</strong>
                            <br />
                            <span className="text-sm text-muted-foreground">
                              {option.email}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="ml-auto text-xs text-muted-foreground"
                        >
                          {option.role}
                        </Badge>
                      </div>
                    )}
                  />

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )
      )}
    </div>
  );
}
