import { Metadata } from 'next';
import React from 'react';

type Props = {
  params: { email: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Visualizar usuário - ${params.email}`,
    description: `Visualizar usuário ${params.email}`,
  };
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default Layout;
