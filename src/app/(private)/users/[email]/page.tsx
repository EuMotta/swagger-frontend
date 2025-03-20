'use client';

import { useRouter } from 'next/navigation';
import { MdLocationPin } from 'react-icons/md';

import { LoadingResponse, Response } from '@/components/common/response';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditProfile from '@/components/users/user/edit-profile';
import { useGetUserByEmail } from '@/http/generated/api';

interface Params {
  params: {
    email: string;
  };
}

const Page = ({ params }: Params) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserByEmail(params.email);
  const router = useRouter();
  if (isLoading)
    return (
      <LoadingResponse
        image="/stickers/loading-happy.png"
        secondaryImage="/stickers/loading-sad.png"
        title="Carregando usuários"
        description="Carregando usuários"
        secondaryDescription="Eu sei que está demorando, ja vai!"
      />
    );

  console.log(user);
  if (isError)
    return (
      <div>
        <Response
          image="/stickers/system.png"
          title={error?.response?.data?.message || error?.message}
          description="Pedimos desculpas pelo transtorno"
          buttonText="Voltar para a lista de usuários"
          onButtonClick={() => router.push('/users')}
        />
      </div>
    );
  if (!user || !user?.data) return <div>usuário não encontrado</div>;

  return (
    <div className="bg-background">
      <div
        className=" text-muted p-5 "
        style={{
          backgroundImage: `url(/profile-bg.png)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center gap-6">
          <Avatar className="w-20 h-20 border-2 border-white">
            <AvatarImage src={user?.data?.image} alt={user?.data?.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-10">
            <div>
              <h1 className="text-2xl font-bold">
                {user?.data?.name} {user?.data?.last_name}
              </h1>
              <p className="text-sm">Owner & Founder</p>
            </div>
            <p className="flex items-center gap-1 text-xs text-muted/70">
              <MdLocationPin />
              California, United States
            </p>
          </div>
          <Button variant={'secondary'} className="ml-auto ">
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="p-5">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Geral</TabsTrigger>
            <TabsTrigger value="data">Alterar dados</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="p-4">
                <h5 className="font-semibold text-muted-foreground">
                  Atividades esse mês
                </h5>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: '30%' }}
                  ></div>
                </div>
              </Card>

              <Card className="col-span-2 p-4">
                <h5 className="font-semibold text-muted-foreground">About</h5>
                <p className="text-xs text-muted-foreground mt-2">
                  Hi Im Anna Adame, It will be as simple as Occidental; in fact,
                  it will be Occidental. To an English person, it will seem like
                  simplified English, as a skeptical Cambridge friend of mine
                  told me what Occidental is European languages are members of
                  the same family. You always want to make sure that your fonts
                  work well together and try to limit the number of fonts you
                  use to three or less. Experiment and play around with the
                  fonts that you already have in the software you’re working
                  with reputable font websites. This may be the most commonly
                  encountered tip I received from the designers I spoke with.
                  They highly encourage that you use different fonts in one
                  design, but do not over-exaggerate and go overboard.
                </p>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="p-4 space-y-5">
                <h5 className="font-semibold text-muted-foreground">Info</h5>
                <div className="space-y-5 text-xs text-muted-foreground w-3/4">
                  <p>
                    <strong>Full Name:</strong> {user?.data?.name}
                  </p>
                  <p>
                    <strong>Mobile:</strong> +55 123121212
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.data?.email}
                  </p>
                  <p>
                    <strong>Location:</strong> Brazil
                  </p>
                  <p>
                    <strong>Joining Date:</strong> 24 Nov 2021
                  </p>
                </div>
              </Card>

              <Card className="col-span-2 p-4">
                <h2 className="font-semibold">Recent Activity</h2>
                <p className="text-sm mt-2">No recent activity available.</p>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="data">
            <EditProfile user={user?.data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
