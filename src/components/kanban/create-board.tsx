'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getGetAllBoardsQueryKey, useCreateBoard } from '@/http/generated/api';
import { CreateBoardDto } from '@/http/generated/api.schemas';
import { createBoardBody } from '@/http/generated/schemas/board/board.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { UsersMultiSelect } from '../multi-selects/users';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

const CreateBoard = ({ params }: { params: any }) => {
  const form = useForm<CreateBoardDto>({
    resolver: zodResolver(createBoardBody),
  });

  const createBoard = useCreateBoard();
  const queryClient = useQueryClient();

  const onSubmit = async (data: CreateBoardDto) => {
    createBoard.mutate(
      { data },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          form.reset();

          const queryKey = getGetAllBoardsQueryKey(params);
          queryClient.invalidateQueries({ queryKey });
        },
        onError: (error) => {
          toast.error(error.response?.data?.message?.[0] ?? error.message);
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Criar Novo Board</Button>
      </DialogTrigger>
      <DialogContent className="p-6 space-y-4">
        <DialogHeader>
          <DialogTitle>Criar Novo Board</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Board</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do board" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <UsersMultiSelect label="Participantes" />

            <Button
              type="submit"
              className="w-full"
              disabled={createBoard.isPending}
            >
              {createBoard.isPending ? 'Criando...' : 'Criar Board'}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
