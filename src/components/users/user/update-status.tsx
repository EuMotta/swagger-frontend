import { AiOutlineLoading } from 'react-icons/ai';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  getGetUserByEmailQueryKey,
  useUpdateUserStatus,
} from '@/http/generated/api';
import { User } from '@/http/generated/api.schemas';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
const UpdateStatus = ({ user }: { user: User }) => {
  const updateStatus = useUpdateUserStatus();
  const queryClient = useQueryClient();
  const onUpdate = async () => {
    updateStatus.mutate(
      { data: { status: true }, email: user.email },
      {
        onSuccess: (response) => {
          toast.success(response.message);

          queryClient.invalidateQueries({
            queryKey: getGetUserByEmailQueryKey(encodeURIComponent(user.email)),
          });
        },

        onError: (error) => {
          toast.error(error.response?.data?.message ?? error.message);
        },
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {user?.is_active ? 'Desativar' : 'Ativar'}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja {user?.is_active ? 'desativar' : 'ativar'} o
            usuário?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onUpdate()}
            disabled={updateStatus.isPending}
          >
            {updateStatus.isPending && (
              <AiOutlineLoading className="mr-2 h-5 w-5 animate-spin" />
            )}{' '}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateStatus;
