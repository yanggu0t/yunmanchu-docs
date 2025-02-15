import type { ReactNode } from 'react';
import { Noto_Sans_TC } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider';
import { GeistSans } from 'geist/font/sans';

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
      <body className="flex min-h-screen flex-col">
        <RootProvider
          search={{
            options: {
              delayMs: 500,
              allowClear: true,
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
