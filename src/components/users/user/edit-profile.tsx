import React from 'react';

import { UserTypes } from '@/@interfaces/zod/user';
import {
  TabsVertical,
  TabsVerticalContent,
  TabsVerticalList,
  TabsVerticalTrigger,
} from '@/components/ui/tabs-vertical';

import EditUserEmail from './edit-email-form';
import EditUserGeneral from './edit-general-form';

const EditProfile = ({ user }: { user: UserTypes['user'] }) => {
  return (
    <div>
      <TabsVertical defaultValue="account" className="grid grid-cols-5 gap-10">
        <TabsVerticalList className="flex-col">
          <TabsVerticalTrigger value="change-data">
            Nome/Imagem
          </TabsVerticalTrigger>
          <TabsVerticalTrigger value="change-email">
            Alterar email
          </TabsVerticalTrigger>
          <TabsVerticalTrigger value="change-password">
            Alterar senha
          </TabsVerticalTrigger>
        </TabsVerticalList>

        <TabsVerticalContent value="change-data" className="col-span-4">
          <EditUserGeneral user={user} />
        </TabsVerticalContent>
        <TabsVerticalContent value="change-email" className="col-span-4">
          <EditUserEmail user={user} />
        </TabsVerticalContent>
        <TabsVerticalContent value="change-password" className="col-span-4">
          <EditUserGeneral user={user} />
        </TabsVerticalContent>
      </TabsVertical>
    </div>
  );
};

export default EditProfile;
