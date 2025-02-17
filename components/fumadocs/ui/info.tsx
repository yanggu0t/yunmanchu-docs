import React from 'react';
import { InfoIcon } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/fumadocs/ui/popover';

export function Info({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="prose prose-no-margin max-h-[400px] max-w-[400px] overflow-auto p-2 text-sm md:p-4">
        {children}
      </PopoverContent>
    </Popover>
  );
}
