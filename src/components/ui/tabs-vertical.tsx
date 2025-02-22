'use client';

import * as React from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const TabsVertical: React.FC<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
> = (props) => <TabsPrimitive.Root orientation="vertical" {...props} />;

const TabsVerticalList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex rounded-lg  p-1 text-muted-foreground',
      className,
    )}
    {...props}
  />
));
TabsVerticalList.displayName = TabsPrimitive.List.displayName;

const TabsVerticalTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:underline data-[state=active]:text-primary ',
      className,
    )}
    {...props}
  />
));
TabsVerticalTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsVerticalContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsVerticalContent.displayName = TabsPrimitive.Content.displayName;

export {
  TabsVertical,
  TabsVerticalList,
  TabsVerticalTrigger,
  TabsVerticalContent,
};
