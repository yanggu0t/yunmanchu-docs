'use client';

import React from 'react';
import NumberFlow from '@number-flow/react';
import { Calendar, Plus, Users } from 'lucide-react';

import {
  cn,
  formatAdditionalCapacity,
  formatExtraBedPriceRange,
  formatPeriodLabel,
  formatRoomCapacity,
  getPeriodColorClasses,
  PERIOD_LABELS,
  PRICE_FORMAT_CONFIG,
  type PricingPeriod,
} from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export interface RoomPricingData {
  weekday: number;
  weekend: number;
  lunar: number;
  capacity: number;
  maxCapacity?: number;
  extraBedPrice?: {
    weekday: number;
    weekend: number;
    lunar: number;
  };
}

interface RoomPricingProps {
  roomName: string;
  pricing: RoomPricingData;
  className?: string;
  compact?: boolean;
}

// Using centralized period labels and colors from utils

export function RoomPricing({
  roomName,
  pricing,
  className,
  compact = false,
}: RoomPricingProps) {
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<PricingPeriod>('weekday');

  if (compact) {
    return (
      <Card className={cn('p-4', className)}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground text-sm font-medium">
              {roomName} 房價
            </h3>
            <Badge variant="outline" className="text-xs">
              <Users className="mr-1 h-3 w-3" />
              {formatRoomCapacity(pricing.capacity)}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {(Object.keys(PERIOD_LABELS) as Array<PricingPeriod>).map(
              (period) => (
                <div key={period} className="space-y-1">
                  <div
                    className={cn(
                      'rounded-full px-2 py-1 text-xs',
                      getPeriodColorClasses(period)
                    )}
                  >
                    {PERIOD_LABELS[period]}
                  </div>
                  <NumberFlow
                    format={PRICE_FORMAT_CONFIG}
                    value={pricing[period]}
                    className="text-sm font-medium"
                  />
                </div>
              )
            )}
          </div>

          {formatAdditionalCapacity(pricing.capacity, pricing.maxCapacity) && (
            <div className="text-muted-foreground border-t pt-2 text-xs">
              <div className="flex items-center gap-1">
                <Plus className="h-3 w-3" />
                {formatAdditionalCapacity(
                  pricing.capacity,
                  pricing.maxCapacity
                )}
                {pricing.extraBedPrice && (
                  <span className="ml-1">
                    (加床 {formatExtraBedPriceRange(pricing.extraBedPrice)})
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{roomName} 房價</h3>
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <Badge variant="outline">
              <Users className="mr-1 h-3 w-3" />
              {formatRoomCapacity(pricing.capacity)}
            </Badge>
          </div>
        </div>

        {/* Period Selector */}
        <div className="bg-muted flex gap-1 rounded-lg p-1">
          {(Object.keys(PERIOD_LABELS) as Array<PricingPeriod>).map(
            (period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={cn(
                  'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all',
                  selectedPeriod === period
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {PERIOD_LABELS[period]}
              </button>
            )
          )}
        </div>

        {/* Selected Price Display */}
        <div className="space-y-2 text-center">
          <div
            className={cn(
              'inline-flex rounded-full px-3 py-1 text-sm font-medium',
              getPeriodColorClasses(selectedPeriod)
            )}
          >
            {formatPeriodLabel(selectedPeriod, '價格')}
          </div>
          <div className="text-3xl font-bold">
            <NumberFlow
              format={PRICE_FORMAT_CONFIG}
              value={pricing[selectedPeriod]}
            />
          </div>
          <p className="text-muted-foreground text-sm">
            基本{pricing.capacity}人入住
          </p>
        </div>

        {/* Additional Info */}
        {formatAdditionalCapacity(pricing.capacity, pricing.maxCapacity) && (
          <div className="space-y-2 border-t pt-4">
            <div className="flex items-center gap-2 text-sm">
              <Plus className="text-muted-foreground h-4 w-4" />
              <span>可加人至{pricing.maxCapacity}人</span>
            </div>
            {pricing.extraBedPrice && (
              <div className="text-muted-foreground text-sm">
                加床費用：平日/假日 ${pricing.extraBedPrice.weekday}，春節 $
                {pricing.extraBedPrice.lunar}
              </div>
            )}
          </div>
        )}

        {/* All Prices Summary */}
        <div className="border-t pt-4">
          <h4 className="text-muted-foreground mb-3 text-sm font-medium">
            完整價格表
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {(Object.keys(PERIOD_LABELS) as Array<PricingPeriod>).map(
              (period) => (
                <div key={period} className="space-y-1 text-center">
                  <div
                    className={cn(
                      'rounded-full px-2 py-1 text-xs',
                      getPeriodColorClasses(period)
                    )}
                  >
                    {PERIOD_LABELS[period]}
                  </div>
                  <NumberFlow
                    format={PRICE_FORMAT_CONFIG}
                    value={pricing[period]}
                    className="block text-sm font-medium"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Import room pricing data from centralized location
export { ROOM_PRICING_DATA } from '@/lib/room-data';
