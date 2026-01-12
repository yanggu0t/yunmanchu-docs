import React from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { source } from '@/lib/source';
import { baseOptions } from '@/app/[lang]/layout.config';

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const { lang } = await params;

  // Breadcrumb structured data for docs
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "蘊慢築民宿",
        "item": "https://yunmanchu.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "服務介紹",
        "item": `https://yunmanchu.com/${lang}/docs`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DocsLayout
        tree={source.pageTree[lang]}
        {...{ ...baseOptions, links: undefined }}
      >
        {children}
      </DocsLayout>
    </>
  );
}
