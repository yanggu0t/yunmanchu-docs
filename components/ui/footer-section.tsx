'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, MapPin, Moon, Phone, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import Line from '@/assets/line.svg';
import WhatsApp from '@/assets/whats-app.svg';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollReveal, StaggeredReveal } from '@/components/ui/scroll-reveal';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { ClientOnly } from '../web/client-only';

function Footer() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';
  const handleThemeChange = (bool: boolean) => {
    setTheme(bool ? 'dark' : 'light');
  };

  return (
    <ClientOnly>
      <footer className="bg-background text-foreground relative mx-auto max-w-7xl border-t px-8 transition-colors duration-300 sm:px-12 lg:px-16">
        <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
          <StaggeredReveal
            staggerDelay={0.1}
            animation="slideUp"
            className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
          >
            <div>
              <h3 className="mb-4 text-lg font-semibold">更多內容</h3>
              <nav className="space-y-2 text-sm">
                <Link
                  href="/"
                  className="hover:text-primary block transition-colors"
                >
                  首頁
                </Link>
                <Link
                  href="/docs/introductions/about"
                  className="hover:text-primary block transition-colors"
                >
                  關於我們
                </Link>
                <Link
                  href="/docs/introductions/rooms"
                  className="hover:text-primary block transition-colors"
                >
                  房間介紹
                </Link>
                <Link
                  href="/docs/guides/check_in"
                  className="hover:text-primary block transition-colors"
                >
                  入住須知
                </Link>
                <Link
                  href="/docs/guides/booking"
                  className="hover:text-primary block transition-colors"
                >
                  訂房須知
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">聯繫我們</h3>
              <address className="space-y-2 text-sm not-italic">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <a
                    href="https://maps.google.com/?q=苗栗縣公館鄉福星村8鄰262-5號"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    苗栗縣公館鄉福星村8鄰262-5號
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a
                    href="tel:+886910517860"
                    className="hover:text-primary transition-colors"
                  >
                    +886-910-517-860
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg>
                  <a
                    href="mailto:support@yunmanchu.com"
                    className="hover:text-primary transition-colors"
                  >
                    support@yunmanchu.com
                  </a>
                </p>
              </address>
            </div>
            <div className="relative">
              <h3 className="mb-4 text-lg font-semibold">追蹤我們</h3>
              <div className="mb-6 flex space-x-4">
                <TooltipProvider>
                  {socialLinks.map((props) => (
                    <TooltipLink key={props.label} {...props} />
                  ))}
                </TooltipProvider>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch
                  className="data-[state=checked]:bg-foreground"
                  checked={isDark}
                  onCheckedChange={handleThemeChange}
                />
                <Moon className="h-4 w-4" />
                <Label htmlFor="dark-mode" className="sr-only">
                  Toggle dark mode
                </Label>
              </div>
            </div>
          </StaggeredReveal>

          <ScrollReveal animation="fadeIn" delay={0.4} threshold={0.8}>
            <div className="mt-12 border-t pt-8 text-center">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} 蘊慢築民宿 版權所有
              </p>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </ClientOnly>
  );
}

export { Footer };

export const socialLinks: TooltipLinkProps[] = [
  {
    url: 'https://www.facebook.com/yun.man.zhu.homestay',
    label: 'Facebook',
    tooltip: '透過 Facebook 聯絡我們',
    Icon: Facebook,
  },
  {
    url: 'https://www.instagram.com/yunmanchu.homestay/',
    label: 'Instagram',
    tooltip: '透過 Instagram 聯絡我們',
    Icon: Instagram,
  },
  {
    url: 'https://line.me/ti/p/HDv0iSYPzX',
    label: 'Line',
    tooltip: '透過 Line 聯絡我們',
    Icon: Line,
  },
  {
    url: 'https://wa.me/qr/CDSGZA3VPUFEC1',
    label: 'WhatsApp',
    tooltip: '透過 WhatsApp 聯絡我們',
    Icon: WhatsApp,
  },
  {
    url: 'https://goo.gl/maps/z3zGaxUbRZu6BEfy5',
    label: 'Map',
    tooltip: '查看民宿在地圖上的位置',
    Icon: MapPin,
  },
  {
    url: 'tel:+886-910-517-860',
    label: '電話',
    tooltip: '透過電話聯絡我們',
    Icon: Phone,
  },
];

interface TooltipLinkProps {
  label: string;
  url: string;
  tooltip: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const TooltipLink = ({ label, Icon, tooltip, url }: TooltipLinkProps) => {
  return (
    <Tooltip key={label}>
      <TooltipTrigger asChild>
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer rounded-full"
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{label}</span>
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
