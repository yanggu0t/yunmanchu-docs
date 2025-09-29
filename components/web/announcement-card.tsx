'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Megaphone, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAnnouncement } from '@/hooks/use-announcement';
import { ClientOnly } from '@/components/web/client-only';

interface AnnouncementCardProps {
  className?: string;
  position?: 'top-center' | 'top-right' | 'bottom-right';
}

/**
 * Modern card-style announcement component
 * Features:
 * - Floating card design
 * - Smooth slide and fade animations
 * - Auto-dismiss option
 * - Multiple position options
 */
function AnnouncementCardContent({
  className,
  position = 'top-center',
}: AnnouncementCardProps) {
  // 在手機版強制使用 top-center
  const [actualPosition, setActualPosition] = useState(position);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 640) {
        setActualPosition('top-center');
      } else {
        setActualPosition(position);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [position]);
  const { data: announcement, isLoading, error } = useAnnouncement();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (announcement && announcement.visible && !isDismissed) {
      // Delay showing to avoid flash
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [announcement, isDismissed]);

  // Auto-hide after 10 seconds (optional)
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsDismissed(true);
        setIsVisible(false);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (error || !announcement || !announcement.visible || isLoading) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 300);
  };

  const positionClasses = {
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const animationVariants = {
    'top-center': {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    },
    'top-right': {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 },
    },
    'bottom-right': {
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 100 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && !isDismissed && (
        <motion.div
          key="announcement-card"
          {...animationVariants[actualPosition]}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className={cn(
            'fixed z-[100]',
            positionClasses[actualPosition],
            className
          )}
        >
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl shadow-2xl',
              'bg-gradient-to-br from-green-50 to-emerald-50',
              'dark:from-green-900/30 dark:to-emerald-900/30',
              'border border-green-200/50 dark:border-green-700/30',
              'backdrop-blur-xl',
              'w-[90vw] max-w-md sm:w-auto'
            )}
          >
            {/* Decorative gradient background */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-green-300/30 to-emerald-300/30 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-300/30 to-green-300/30 blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative px-4 py-3 sm:px-6 sm:py-5">
              {/* Header */}
              <div className="mb-2 flex items-start justify-between sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="rounded-full bg-green-100 p-1.5 sm:p-2 dark:bg-green-800/50">
                    <Megaphone className="h-4 w-4 text-green-600 sm:h-5 sm:w-5 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-green-900 sm:text-sm dark:text-green-100">
                      最新公告
                    </h3>
                    <p className="text-[10px] text-green-600 sm:text-xs dark:text-green-400">
                      {new Date().toLocaleDateString('zh-TW')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className={cn(
                    'rounded-lg p-1.5 transition-all duration-200',
                    'hover:bg-green-100 dark:hover:bg-green-800/50',
                    'text-green-600 dark:text-green-400',
                    'hover:scale-110 active:scale-95'
                  )}
                  aria-label="關閉公告"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <p className="text-xs leading-relaxed text-green-800 sm:text-sm dark:text-green-200">
                  {announcement.announcement}
                </p>
              </div>

              {/* Progress bar (auto-dismiss indicator) */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-400 dark:from-green-600 dark:to-emerald-600"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 10, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AnnouncementCard(props: AnnouncementCardProps) {
  return (
    <ClientOnly>
      <AnnouncementCardContent {...props} />
    </ClientOnly>
  );
}
