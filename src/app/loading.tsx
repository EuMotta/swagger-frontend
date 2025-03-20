import { LoadingResponse } from '@/components/common/response';

export default function Loading() {
  return (
    <div className="h-screen">
      <LoadingResponse
        image="/stickers/loading-happy.png"
        secondaryImage="/stickers/loading-sad.png"
        title="Carregando página"
        description="Aguarde um momento"
        secondaryDescription="Eu sei que está demorando, ja vai!"
      />
    </div>
  );
}
