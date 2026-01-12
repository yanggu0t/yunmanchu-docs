'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

import { Section } from '../web/page-container';

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  variant?: 'default' | 'alternate' | 'feature';
  className?: string;
  children: ReactNode;
}

export function ContentSection({
  title,
  subtitle,
  variant = 'default',
  className,
  children,
}: ContentSectionProps) {
  return (
    <Section
      className={cn(
        'space-y-8',
        variant === 'alternate' && 'bg-muted/30',
        className
      )}
    >
      <ScrollReveal animation="slideUp" delay={0.2} threshold={0.3}>
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-medium sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground mx-auto max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </ScrollReveal>
      {children}
    </Section>
  );
}
