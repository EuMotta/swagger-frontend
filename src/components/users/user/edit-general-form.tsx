'use client';

import * as React from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FileWithPreview, ImageCropper } from '@/components/ui/image-cropper';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateUserByEmail } from '@/http/generated/api';
import { UpdateUserResponse, UserDto } from '@/http/generated/api.schemas';
import { updateUserByEmailBody } from '@/http/generated/schemas/users/users.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';

const accept = {
  'image/*': [],
};

const ROLES = [
  { label: 'Administrador', value: 'ADMIN' },
  { label: 'Usuário', value: 'USER' },
  { label: 'Gerente', value: 'MANAGER' },
  { label: 'Fundador', value: 'FOUNDER' },
];

const EditUserGeneral = ({ user }: { user: UserDto }) => {
  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert('Selected image is too large!');
      return;
    }

    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    setSelectedFile(fileWithPreview);
    setDialogOpen(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  const form = useForm<UpdateUserResponse>({
    resolver: zodResolver(updateUserByEmailBody),
    defaultValues: {
      name: user.name ?? '',
      last_name: user.last_name ?? '',
      role: user.role ?? 'USER',
    },
  });

  const editUser = useUpdateUserByEmail();
  const onSubmit = async (data: UpdateUserResponse) => {
    console.log('chegou');
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

  return (
    <div className="mx-auto p-6 bg-sidebar shadow rounded-lg max-w-xls">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            {selectedFile ? (
              <ImageCropper
                dialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            ) : (
              <Avatar
                {...getRootProps()}
                className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
              >
                <input {...getInputProps()} />
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}

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
                          disabled={editUser.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Usuário</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cargo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ROLES.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={editUser.isPending} type="submit">
              {editUser.isPending && (
                <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
              )}
              Editar
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditUserGeneral;
