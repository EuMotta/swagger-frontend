'use client';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const buildHref = (index: number) =>
    '/' + segments.slice(0, index + 1).join('/');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => (
          <BreadcrumbItem key={index}>
            {index < segments.length - 1 ? (
              <BreadcrumbLink href={buildHref(index)}>{segment}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{segment}</BreadcrumbPage>
            )}
            {index < segments.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
