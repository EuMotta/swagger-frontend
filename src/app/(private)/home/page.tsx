'use client';

import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session } = useSession();
  return <div>{session?.user?.name}</div>;
};

export default Page;
