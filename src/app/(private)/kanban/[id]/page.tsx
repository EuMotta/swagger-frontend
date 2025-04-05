'use client';

import { usePathname } from 'next/navigation';

import { KanbanBoard } from '@/components/kanban/kanban-board';
import { useGetBoard } from '@/http/generated/api';
import { LoadingResponse } from '@/components/common/response';

const Page = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split('/');
  const lastSegment = pathSegments?.[pathSegments.length - 1];
  const {
    data: board,
    isLoading: isLoadingBoard,
    isError: isErrorBoard,
    error: errorBoard,
  } = useGetBoard(lastSegment);

  if (isLoadingBoard)
    return (
      <div>
        <LoadingResponse
          image="/stickers/loading-happy.png"
          secondaryImage="/stickers/loading-sad.png"
          title="Carregando Quadro"
          description="Aguarde um momento"
          secondaryDescription="Eu sei que está demorando, ja vai!"
        />
      </div>
    );
  if (isErrorBoard) return <div>Error: {errorBoard?.message}</div>;
  return (
    <div
      style={{
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'url(https://static.vecteezy.com/system/resources/previews/004/243/021/non_2x/abstract-template-background-white-and-bright-blue-squares-overlapping-with-halftone-and-texture-free-vector.jpg)',
      }}
      className="h-full flex items-center justify-center"
    >
      {board && board.data && <KanbanBoard kanban={board.data} />}
    </div>
  );
};

export default Page;
