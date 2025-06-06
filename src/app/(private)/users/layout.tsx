import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'Lista de usuários',
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default layout;
