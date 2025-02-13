'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetUserByEmail } from '@/hooks/user/get-by-email';
import { MdLocationPin } from 'react-icons/md';

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
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(user);
  return (
    <div className=" mx-auto ">
      <div
        className=" text-white p-5 flex items-center gap-6"
        style={{
          backgroundImage: `url(/profile-bg.png)`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      >
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
        <Button className="ml-auto bg-green-500 hover:bg-green-600">
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="p-4">
          <h2 className="font-semibold">Complete Your Profile</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: '30%' }}
            ></div>
          </div>
        </Card>

        <Card className="col-span-2 p-4">
          <h2 className="font-semibold">About</h2>
          <p className="text-sm mt-2">
            {user?.data?.bio || 'No bio available.'}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="p-4">
          <h2 className="font-semibold">Info</h2>
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
        </Card>

        <Card className="col-span-2 p-4">
          <h2 className="font-semibold">Recent Activity</h2>
          <p className="text-sm mt-2">No recent activity available.</p>
        </Card>
      </div>
    </div>
  );
};

export default Page;
