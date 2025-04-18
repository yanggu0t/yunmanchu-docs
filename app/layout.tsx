import type { ReactNode } from 'react';
import { Noto_Sans_TC } from 'next/font/google';
import Script from 'next/script';
import { RootProvider } from 'fumadocs-ui/provider';
import { GeistSans } from 'geist/font/sans';

import { SearchDialog } from '@/components/fumadocs/dialog';
import { PostHogProvider } from '@/components/web/post-dog-provider';
import { QueryProvider } from '@/components/web/query-provider';
import { ScrollToTop } from '@/components/web/scroll-to-top';

import '@/styles/global.css';

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-tc',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh-tw"
      className={`${GeistSans.variable} ${notoSansTC.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          type="text/javascript"
          src="/webfont.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <PostHogProvider>
          <QueryProvider>
            <RootProvider
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
                  ['體驗課程', '/docs/experiences'],
                  ['插花體驗', '/docs/experiences/floral'],
                  ['品茶體驗', '/docs/experiences/tea'],
                ],
              }}
            >
              {children}
            </RootProvider>

            <ScrollToTop />
          </QueryProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
