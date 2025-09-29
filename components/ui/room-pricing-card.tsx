'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NumberFlow from '@number-flow/react';
import { ArrowRight } from 'lucide-react';

import type { RoomDataForPricing } from '@/lib/room-data';
import {
  cn,
  formatMaxCapacity,
  formatPeriodLabel,
  PRICE_FORMAT_CONFIG,
  type PricingPeriod,
} from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RoomPricingCardProps {
  room: RoomDataForPricing;
  selectedPeriod: PricingPeriod;
  className?: string;
}

export function RoomPricingCard({
  room,
  selectedPeriod,
  className,
}: RoomPricingCardProps) {
  const price = room.pricing[selectedPeriod];

  return (
    <>
      <Card
        className={cn(
          'group bg-card dark:bg-card border-border dark:border-border overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/25',
          className
        )}
      >
        {/* Room Image */}
        <div className="relative h-48 overflow-hidden sm:h-64 md:h-56">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="bg-card dark:bg-card space-y-4 p-6">
          {/* Room Info */}
          <div className="space-y-2">
            <h3 className="text-card-foreground dark:text-card-foreground group-hover:text-primary dark:group-hover:text-primary text-xl font-semibold transition-colors">
              {room.name}
            </h3>
            <p className="text-muted-foreground dark:text-muted-foreground text-sm">
              {room.subtitle}
            </p>
            <p className="text-muted-foreground dark:text-muted-foreground line-clamp-2 text-sm leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Pricing Display */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground dark:text-muted-foreground text-sm">
                {formatPeriodLabel(selectedPeriod, '價格')}
              </div>
              <div className="text-muted-foreground dark:text-muted-foreground text-xs">
                {formatMaxCapacity(
                  room.pricing.capacity,
                  room.pricing.maxCapacity
                )}
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <NumberFlow
                format={PRICE_FORMAT_CONFIG}
                value={price}
                className="text-foreground dark:text-foreground text-2xl font-bold sm:text-3xl"
              />
              <span className="text-muted-foreground dark:text-muted-foreground text-sm">
                / 晚
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <Link href={room.cta.url} className="block">
            <Button
              variant="outline"
              className="group-hover:bg-primary group-hover:text-primary-foreground dark:group-hover:bg-primary dark:group-hover:text-primary-foreground border-border dark:border-border hover:border-primary dark:hover:border-primary w-full transition-colors"
            >
              {room.cta.text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </>
  );
}
