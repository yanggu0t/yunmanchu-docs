import React from 'react';

import { cn } from '@/lib/utils';

interface PageProps {
  className?: string;
  children: React.ReactNode;
}

export const Container = ({ children, className }: PageProps) => {
  return (
    <main
      className={cn(
        'flex flex-1 flex-col items-center justify-center text-center',
        className
      )}
    >
      {children}
    </main>
  );
};

export const Wrapper = ({ children, className }: PageProps) => {
  return (
    <div
      className={cn(
        'flex max-w-[1080px] min-w-[250px] flex-col items-center justify-center',
        className
      )}
    >
      {children}
    </div>
  );
};
