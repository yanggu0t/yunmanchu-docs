'use client';

import React from 'react';

import { ROOMS_LIST } from '@/lib/room-data';
import { cn, PERIOD_LABELS, type PricingPeriod } from '@/lib/utils';
import { Tab } from '@/components/ui/pricing-tab';
import { RoomPricingCard } from '@/components/ui/room-pricing-card';
import { ScrollReveal, StaggeredReveal } from '@/components/ui/scroll-reveal';

import { Section } from '../web/page-container';

interface RoomPricingSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

// Use centralized period labels
const PRICING_PERIODS = Object.entries(PERIOD_LABELS).map(([key, label]) => ({
  key: key as PricingPeriod,
  label,
}));

export function RoomPricingSection({
  title = '房型價格',
  subtitle = '每個房間都有獨特的特色與舒適的環境，選擇最適合您的房型',
  className,
}: RoomPricingSectionProps) {
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<PricingPeriod>('weekday');

  return (
    <Section className={cn('flex flex-col items-center gap-10', className)}>
      <ScrollReveal animation="slideUp" delay={0.2} threshold={0.3}>
        <div className="space-y-7">
          <div className="space-y-4 text-center">
            <h1 className="text-foreground dark:text-foreground text-3xl font-medium sm:text-4xl md:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground dark:text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
              {subtitle}
            </p>
          </div>

          {/* Period Selector */}
          <div className="bg-muted dark:bg-muted border-border dark:border-border mx-auto flex w-fit max-w-xs rounded-full border p-1.5 shadow-sm sm:max-w-sm">
            {PRICING_PERIODS.map((period) => (
              <Tab
                key={period.key}
                text={period.label}
                selected={selectedPeriod === period.key}
                setSelected={() => setSelectedPeriod(period.key)}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Room Cards Grid  */}
      <StaggeredReveal
        staggerDelay={0.2}
        animation="slideUp"
        className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4 xl:gap-4"
      >
        {ROOMS_LIST.map((room) => (
          <RoomPricingCard
            key={room.id}
            room={room}
            selectedPeriod={selectedPeriod}
          />
        ))}
      </StaggeredReveal>

      {/* Additional Info */}
      <ScrollReveal animation="slideUp" delay={0.4} threshold={0.3}>
        <div className="bg-muted/50 dark:bg-muted/30 border-border/50 dark:border-border/30 max-w-2xl rounded-lg border p-6 text-center">
          <h3 className="text-foreground dark:text-foreground mb-2 font-medium">
            價格說明
          </h3>
          <p className="text-muted-foreground dark:text-muted-foreground text-sm">
            • 平日：週日至週四入住 • 假日：週五、週六及國定假日 •
            過年：農曆春節期間
            <br />
            所有房型均含早餐，可依需求加床（需額外收費）
          </p>
        </div>
      </ScrollReveal>
    </Section>
  );
}
