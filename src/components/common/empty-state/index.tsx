'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ResponseProps {
  image: string;
  secondaryImage?: string;
  title?: string;
  subtitle?: string;
  label?: string;
  showReset?: boolean;
  reset?: () => void;
}

const EmptyState: React.FC<ResponseProps> = ({
  image,
  secondaryImage,
  title = 'Aconteceu um problema!',
  subtitle = 'Não sei ainda o que é, mas vou descobrir!',
  label = 'Tente novamente',
  showReset,
  reset,
}) => {
  const [currentImage, setCurrentImage] = useState(image);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (secondaryImage) {
      timer = setTimeout(() => {
        setCurrentImage(secondaryImage);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [secondaryImage]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full !border-none !shadow-none">
        <CardHeader className="text-center space-y-3 p-6">
          <img
            src={currentImage}
            alt={title}
            className="mx-auto h-32 w-32 object-contain transition-all duration-500"
          />
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </CardHeader>

        <CardContent className="flex justify-center gap-4 pb-6">
          {showReset && (
            <Button variant="outline" onClick={reset}>
              {label}
            </Button>
          )}
          <Button variant="outline" onClick={() => router.back()}>
            Voltar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyState;
