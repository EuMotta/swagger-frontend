'use client';

import { DataTableDemo } from '@/components/users/users-table';

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="min-h-[100vh] flex-1 rounded-xl  md:min-h-min">
        <DataTableDemo />
      </div>
    </div>
  );
}
