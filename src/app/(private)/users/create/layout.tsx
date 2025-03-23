import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Criar usuário',
  description: 'Criação de usuário',
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default layout;
