import React from 'react';

import {
  TabsVertical,
  TabsVerticalContent,
  TabsVerticalList,
  TabsVerticalTrigger,
} from '@/components/ui/tabs-vertical';
import { User } from '@/http/generated/api.schemas';

import EditUserEmail from './edit-email-form';
import EditUserGeneral from './edit-general-form';
import EditUserPassword from './edit-password-form';

const EditProfile = ({ user }: { user: User }) => {
  return (
    <div>
      <TabsVertical
        defaultValue="change-data"
        className="grid grid-cols-5 gap-10"
      >
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
          <EditUserPassword user={user} />
        </TabsVerticalContent>
      </TabsVertical>
    </div>
  );
};

export default EditProfile;
