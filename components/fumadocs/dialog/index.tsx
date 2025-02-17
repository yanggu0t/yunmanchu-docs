'use client';

import dynamic from 'next/dynamic';

export const SearchDialog = dynamic(() => import('./default'), {
  ssr: false,
});
