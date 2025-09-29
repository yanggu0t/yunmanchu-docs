'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: () => void;
  discount?: boolean;
}

export function Tab({
  text,
  selected,
  setSelected,
  discount = false,
}: TabProps) {
  return (
    <button
      onClick={setSelected}
      className={cn(
        'relative w-fit min-w-[70px] px-4 py-2.5 text-sm font-semibold capitalize sm:min-w-[100px] sm:px-6 sm:py-3 sm:text-base',
        'text-foreground dark:text-foreground transition-all duration-200',
        'hover:text-primary dark:hover:text-primary active:scale-95',
        discount && 'flex items-center justify-center gap-2.5'
      )}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-background dark:bg-background border-border dark:border-border absolute inset-0 z-0 rounded-full border shadow-md dark:shadow-lg"
        />
      )}
      {discount && (
        <Badge
          variant="secondary"
          className={cn(
            'relative z-10 whitespace-nowrap shadow-none',
            selected && 'bg-muted'
          )}
        >
          Save 35%
        </Badge>
      )}
    </button>
  );
}
