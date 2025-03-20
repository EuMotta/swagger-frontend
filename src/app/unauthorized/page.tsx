import EmptyState from '@/components/common/empty-state';

const UnauthorizeState = () => {
  return (
    <EmptyState
      title="Não autorizado!"
      subtitle={'Você não tem autorização para acessar esta página'}
      showReset
      image="/stickers/sad.png"
    />
  );
};

export default UnauthorizeState;
