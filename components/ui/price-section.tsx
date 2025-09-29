'use client';

import React from 'react';

import { PricingCard, type PricingTier } from '@/components/ui/pricing-card';
import { Tab } from '@/components/ui/pricing-tab';
import { ScrollReveal, StaggeredReveal } from '@/components/ui/scroll-reveal';

import { Section } from '../web/page-container';

interface PricingSectionProps {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
  frequencies: string[];
}

export function PricingSection({
  title,
  subtitle,
  tiers,
  frequencies,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(
    frequencies[0]
  );

  return (
    <Section className="flex flex-col items-center gap-10">
      <ScrollReveal animation="slideUp" delay={0.2} threshold={0.3}>
        <div className="space-y-7">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-medium md:text-5xl">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <div className="bg-muted mx-auto flex w-fit rounded-full p-1">
            {frequencies.map((freq) => (
              <Tab
                key={freq}
                text={freq}
                selected={selectedFrequency === freq}
                setSelected={setSelectedFrequency}
                discount={freq === 'yearly'}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>

      <StaggeredReveal
        staggerDelay={0.2}
        animation="slideUp"
        className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {tiers.map((tier) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            paymentFrequency={selectedFrequency}
          />
        ))}
      </StaggeredReveal>
    </Section>
  );
}
