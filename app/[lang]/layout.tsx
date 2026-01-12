import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider';
import { Analytics } from '@vercel/analytics/next';
import { GeistSans } from 'geist/font/sans';

import {
  generateBusinessStructuredData,
  generateCommonMetadata,
} from '@/lib/seo';
import { SearchDialog } from '@/components/fumadocs/dialog';
import { AnnouncementCard } from '@/components/web/announcement-card';
import { QueryProvider } from '@/components/web/query-provider';
import { ScrollToTop } from '@/components/web/scroll-to-top';

import '@/styles/global.css';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-tc',
});

// Base metadata for the homestay
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang;

  return {
    metadataBase: new URL('https://yunmanchu.com'),
    ...generateCommonMetadata({}),
    title: {
      default: '蘊慢築民宿 | 苗栗公館特色民宿',
      template: '%s | 蘊慢築民宿',
    },
    alternates: {
      canonical: 'https://yunmanchu.com',
      languages: {
        'zh-TW': 'https://yunmanchu.com/zh',
        'en-US': 'https://yunmanchu.com/en',
      },
    },
  };
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;

  // Generate structured data for local business
  const businessJsonLd = generateBusinessStructuredData();

  return (
    <html
      lang={lang}
      className={`${GeistSans.variable} ${notoSansTC.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body className="relative flex min-h-screen flex-col">
        <QueryProvider>
          <AnnouncementCard position="top-right" />

          <RootProvider
            i18n={{
              locale: lang,
            }}
            search={{
              SearchDialog,
              options: {
                delayMs: 500,
                allowClear: true,
              },
              links: [
                ['基本介紹', '/docs/introductions'],
                ['關於我們', '/docs/introductions/about'],
                ['房間介紹', '/docs/introductions/rooms'],
                ['住宿指南', '/docs/guides'],
                ['入住須知', '/docs/guides/check_in'],
                ['訂房須知', '/docs/guides/booking'],
                ['交通方式', '/docs/guides/transport'],
                ['常見問題', '/docs/guides/faq'],
              ],
            }}
          >
            {children}
          </RootProvider>

          <ScrollToTop />
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
