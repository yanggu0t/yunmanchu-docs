'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { useDialog } from '@/context/dialog-context';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import { Line, WhatsApp } from '../ui/icon';
import { ClientOnly } from './client-only';

const links = [
  {
    url: 'https://www.booking.com/hotel/tw/yun-man-zhu.zh-tw.html',
    label: 'Booking.',
  },
  {
    url: 'https://line.me/ti/p/HDv0iSYPzX',
    label: 'Line',
    Icon: Line,
  },
  {
    url: 'https://wa.me/qr/CDSGZA3VPUFEC1',
    label: 'WhatsApp',
    Icon: WhatsApp,
  },
  {
    url: 'tel:+886-910-517-860',
    label: 'Phone',
    Icon: Phone,
  },
];

export const BookingDialog = () => {
  const { isOpen, setIsOpen } = useDialog();
  const isMobile = useIsMobile();
  const preventScroll = (e: Event) => {
    // Only prevent default on desktop dialog to avoid fighting with Drawer's own scroll handling
    if (!isMobile) {
      e.preventDefault();
    }
  };

  const content = (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-accent flex items-center justify-center gap-2 rounded-lg border p-4"
        >
          {link.label !== 'Booking.' && <link.Icon className="h-5 w-5" />}
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );

  const triggerButton = (
    <motion.button
      className="text-background bg-foreground z-20 rounded-full px-4 py-2 font-semibold tracking-tight shadow-2xl sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-3 lg:text-xl"
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
        delay: 0.7,
        scale: { duration: 0.2 },
      }}
      whileHover={{
        scale: 1.05,
        transition: { type: 'spring', damping: 30, stiffness: 400 },
      }}
    >
      立即訂房
    </motion.button>
  );

  if (isMobile) {
    return (
      <ClientOnly>
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>請選擇訂房渠道</DrawerTitle>
              <DrawerDescription>
                您可以透過以下任一管道與我們聯繫訂房，我們會盡快回覆您。若您選擇透過
                Booking.com 訂房，可直接完成線上付款與訂房確認。
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pt-0">{content}</div>
          </DrawerContent>
        </Drawer>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent onCloseAutoFocus={preventScroll}>
          <DialogTitle>請選擇訂房渠道</DialogTitle>
          <DialogDescription>
            您可以透過以下任一管道與我們聯繫訂房，我們會盡快回覆您。若您選擇透過
            Booking.com 訂房，可直接完成線上付款與訂房確認。
          </DialogDescription>
          {content}
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};
