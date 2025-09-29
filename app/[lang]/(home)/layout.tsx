import React from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { baseOptions } from '@/app/[lang]/layout.config';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
