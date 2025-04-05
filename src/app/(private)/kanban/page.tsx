'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import Container from '@/components/common/container';
import CreateBoard from '@/components/kanban/create-board';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { useGetAllBoards } from '@/http/generated/api';
import { GetAllBoardsParams } from '@/http/generated/api.schemas';
import { Users } from 'lucide-react';
import { z } from 'zod';
import Link from 'next/link';

const Page = () => {
  const searchParams = useSearchParams();
  const params: GetAllBoardsParams = {
    page: z.number().parse(Number(searchParams.get('page') ?? '1')),
    limit: z.number().parse(Number(searchParams.get('limit') ?? '10')),
    search: z.string().parse(searchParams.get('search') ?? ''),
  };

  const { data: boards, isLoading, isError, error } = useGetAllBoards(params);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  console.log(boards);

  return (
    <Container className="grid grid-cols-5 gap-5 p-5">
      {boards?.data?.data.map((item) => (
        <Link key={item.short_link} href={item.short_link}>
          <Card
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('https://img.freepik.com/fotos-gratis/fundo-abstrato-dos-blocos-de-voronoi-extrudados-parede-corporativa-limpa-com-luz-minima-ilustracao-3d-da-superficie-geometrica-deslocamento-de-elementos-poligonais_1217-2503.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className=" shadow-md rounded-md h-32 flex flex-col justify-between"
          >
            <CardHeader className="relative z-10 text-white px-4 py-2">
              <h5 className="text-lg font-bold">{item.name}</h5>
            </CardHeader>

            <CardFooter className="flex items-center gap-2 p-2">
              <Users className="w-5 h-5 mr-1 text-white" />

              <p className="text-muted">+{item.member_qty}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
      <CreateBoard params={params} />
    </Container>
  );
};

export default Page;
