'use client';

import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ResponseProps {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

interface LoadingResponseProps {
  image: string;
  title: string;
  description: string;
  secondaryImage: string;
  secondaryDescription: string;
}

export const Response: React.FC<ResponseProps> = ({
  image,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full !border-none !shadow-none">
        <CardHeader className="text-center space-y-3 p-6">
          <img
            src={image}
            alt={title}
            className="mx-auto h-32 w-32 object-contain"
          />
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        {buttonText && onButtonClick && (
          <CardContent className="flex justify-center pb-6">
            <Button variant="outline" onClick={onButtonClick}>
              {buttonText}
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export const LoadingResponse: React.FC<LoadingResponseProps> = ({
  image,
  secondaryImage,
  secondaryDescription,
  title,
  description,
}) => {
  const [currentImage, setCurrentImage] = useState(image);
  const [currentDescription, setCurrentDescription] = useState(description);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (secondaryImage && secondaryDescription) {
      timer = setTimeout(() => {
        setCurrentImage(secondaryImage);
        setCurrentDescription(secondaryDescription);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [secondaryImage, secondaryDescription]);

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
          <p className="text-muted-foreground">{currentDescription}</p>
        </CardHeader>
      </Card>
    </div>
  );
};
