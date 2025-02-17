'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';

export const ScrollToTop = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showScrollTop) return null;

  return (
    <BlurFade className="fixed right-8 bottom-8" duration={0.3} offset={0}>
      <Button
        className="h-12 w-12 rounded-full"
        size="icon"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </BlurFade>
  );
};
