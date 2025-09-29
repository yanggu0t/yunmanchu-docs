import React from 'react';

import { cn } from '@/lib/utils';

export const Container = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'main'>) => {
  return (
    <main className="flex flex-1 flex-col" {...props}>
      {children}
    </main>
  );
};

export const Section = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'section'>) => {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-7xl overflow-hidden px-3 py-8 sm:px-8 sm:py-10 lg:px-16',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
