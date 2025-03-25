'use client';

import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type AnimationVariant =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'zoomIn'
  | 'scaleIn';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const getVariantClasses = (variant: AnimationVariant): string => {
  const variants = {
    fadeIn: 'opacity-0 [&.is-visible]:opacity-100',
    fadeInUp:
      'opacity-0 translate-y-10 [&.is-visible]:translate-y-0 [&.is-visible]:opacity-100',
    fadeInLeft:
      'opacity-0 -translate-x-10 [&.is-visible]:translate-x-0 [&.is-visible]:opacity-100',
    fadeInRight:
      'opacity-0 translate-x-10 [&.is-visible]:translate-x-0 [&.is-visible]:opacity-100',
    zoomIn:
      'opacity-0 scale-95 [&.is-visible]:scale-100 [&.is-visible]:opacity-100',
    scaleIn:
      'opacity-0 scale-105 [&.is-visible]:scale-100 [&.is-visible]:opacity-100',
  };

  return variants[variant];
};

export function ScrollReveal({
  children,
  className,
  variant = 'fadeInUp',
  delay = 0,
  duration = 700,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        root: null,
        rootMargin: '0px',
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, once]);

  const variantClass = getVariantClasses(variant);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all will-change-transform',
        variantClass,
        isVisible && 'is-visible',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
