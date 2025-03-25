import React from 'react';

export const Container = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'main'>) => {
  return (
    <main className="flex flex-1 flex-col items-center" {...props}>
      {children}
    </main>
  );
};
