'use client';

import CreateUser from '@/components/users/user/create-user';

export const UserProfile = () => {
  return (
    <div className="p-6 rounded-lg shadow-lg">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Criar usuário</h1>
        <p className="text-sm text-muted-foreground">Crie um novo usuário</p>
      </header>

      <CreateUser />
    </div>
  );
};

export default UserProfile;
