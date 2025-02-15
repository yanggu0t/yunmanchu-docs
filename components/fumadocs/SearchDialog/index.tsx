'use client';

import dynamic from 'next/dynamic';

export const SearchDialog = dynamic(() => import('../SearchDialog/default'), {
  ssr: false,
});
