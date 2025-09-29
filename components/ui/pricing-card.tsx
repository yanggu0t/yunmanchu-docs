'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import NumberFlow from '@number-flow/react';
import { ArrowRight, BadgeCheck } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useDialog } from '@/context/dialog-context';

export interface PricingTier {
  name: string;
  price: Record<string, number | string>;
  description: string;
  features: string[];
  cta: CTA;
  highlighted?: boolean;
  popular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  paymentFrequency: string;
}

interface CTA {
  text: string;
  url?: string;
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const router = useRouter();
  const { setIsOpen } = useDialog();

  const price = tier.price[paymentFrequency];
  const isHighlighted = tier.highlighted;
  const isPopular = tier.popular;

  const handleCardClick = () => {
    if (!tier.cta.url) {
      setIsOpen(true);
      return;
    }
    router.push(tier.cta.url);
  };

  return (
    <Card
      className={cn(
        'relative flex flex-col gap-8 overflow-hidden px-8 py-14',
        isHighlighted
          ? 'bg-foreground text-background'
          : 'bg-background text-foreground',
        isPopular && 'ring-primary ring-2'
      )}
    >
      {isHighlighted && <HighlightedBackground />}
      {isPopular && <PopularBackground />}

      <h2 className="flex items-center gap-3 text-xl font-medium capitalize">
        {tier.name}
        {isPopular && (
          <Badge variant="secondary" className="z-10 mt-1">
            🔥 Most Popular
          </Badge>
        )}
      </h2>

      <div className="relative h-12">
        {typeof price === 'number' ? (
          <>
            <NumberFlow
              format={{
                style: 'currency',
                currency: 'TWD',
                trailingZeroDisplay: 'stripIfInteger',
              }}
              value={price}
              className="text-4xl font-medium"
            />
          </>
        ) : (
          <h1 className="text-4xl font-medium">{price}</h1>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="text-sm font-medium">{tier.description}</h3>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                isHighlighted ? 'text-background' : 'text-muted-foreground'
              )}
            >
              <BadgeCheck className="h-4 w-4" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={isHighlighted ? 'secondary' : 'default'}
        className="z-10 w-full cursor-pointer"
        onClick={handleCardClick}
      >
        {tier.cta.text}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
}

const HighlightedBackground = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(128_128_128/0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgb(128_128_128/0.2)_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,rgb(79_79_79/0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgb(79_79_79/0.2)_1px,transparent_1px)]" />
);

const PopularBackground = () => (
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
);
