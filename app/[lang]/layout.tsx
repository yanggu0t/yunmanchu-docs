import { Noto_Sans_TC } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider';
import { Analytics } from '@vercel/analytics/next';
import { GeistSans } from 'geist/font/sans';

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

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;
  return (
    <html
      lang={lang}
      className={`${GeistSans.variable} ${notoSansTC.variable}`}
      suppressHydrationWarning
    >
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
