import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { source } from '@/lib/source';
import { baseOptions } from '@/app/[lang]/layout.config';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  return (
    <DocsLayout
      tree={source.pageTree[lang]}
      {...{ ...baseOptions, links: undefined }}
    >
      {children}
    </DocsLayout>
  );
}
