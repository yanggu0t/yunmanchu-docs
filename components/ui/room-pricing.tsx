'use client';

import React from 'react';
import NumberFlow from '@number-flow/react';
import { Calendar, Users, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
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

const PERIOD_LABELS = {
  weekday: '平日',
  weekend: '假日',
  lunar: '過年'
} as const;

const PERIOD_COLORS = {
  weekday: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  weekend: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  lunar: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
} as const;

export function RoomPricing({
  roomName,
  pricing,
  className,
  compact = false
}: RoomPricingProps) {
  const [selectedPeriod, setSelectedPeriod] = React.useState<keyof typeof PERIOD_LABELS>('weekday');

  if (compact) {
    return (
      <Card className={cn('p-4', className)}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm text-muted-foreground">{roomName} 房價</h3>
            <Badge variant="outline" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              {pricing.capacity}人房
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {(Object.keys(PERIOD_LABELS) as Array<keyof typeof PERIOD_LABELS>).map((period) => (
              <div key={period} className="space-y-1">
                <div className={cn('text-xs px-2 py-1 rounded-full', PERIOD_COLORS[period])}>
                  {PERIOD_LABELS[period]}
                </div>
                <NumberFlow
                  format={{
                    style: 'currency',
                    currency: 'TWD',
                    trailingZeroDisplay: 'stripIfInteger',
                  }}
                  value={pricing[period]}
                  className="text-sm font-medium"
                />
              </div>
            ))}
          </div>

          {pricing.maxCapacity && pricing.maxCapacity > pricing.capacity && (
            <div className="text-xs text-muted-foreground border-t pt-2">
              <div className="flex items-center gap-1">
                <Plus className="w-3 h-3" />
                可加{pricing.maxCapacity - pricing.capacity}人
                {pricing.extraBedPrice && (
                  <span className="ml-1">
                    (加床 ${pricing.extraBedPrice.weekday}-${pricing.extraBedPrice.lunar})
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
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Badge variant="outline">
              <Users className="w-3 h-3 mr-1" />
              {pricing.capacity}人房
            </Badge>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {(Object.keys(PERIOD_LABELS) as Array<keyof typeof PERIOD_LABELS>).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={cn(
                'flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all',
                selectedPeriod === period
                  ? 'bg-background shadow-sm text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {PERIOD_LABELS[period]}
            </button>
          ))}
        </div>

        {/* Selected Price Display */}
        <div className="text-center space-y-2">
          <div className={cn('inline-flex px-3 py-1 rounded-full text-sm font-medium', PERIOD_COLORS[selectedPeriod])}>
            {PERIOD_LABELS[selectedPeriod]}價格
          </div>
          <div className="text-3xl font-bold">
            <NumberFlow
              format={{
                style: 'currency',
                currency: 'TWD',
                trailingZeroDisplay: 'stripIfInteger',
              }}
              value={pricing[selectedPeriod]}
            />
          </div>
          <p className="text-sm text-muted-foreground">基本{pricing.capacity}人入住</p>
        </div>

        {/* Additional Info */}
        {pricing.maxCapacity && pricing.maxCapacity > pricing.capacity && (
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4 text-muted-foreground" />
              <span>可加人至{pricing.maxCapacity}人</span>
            </div>
            {pricing.extraBedPrice && (
              <div className="text-sm text-muted-foreground">
                加床費用：平日/假日 ${pricing.extraBedPrice.weekday}，過年 ${pricing.extraBedPrice.lunar}
              </div>
            )}
          </div>
        )}

        {/* All Prices Summary */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">完整價格表</h4>
          <div className="grid grid-cols-3 gap-4">
            {(Object.keys(PERIOD_LABELS) as Array<keyof typeof PERIOD_LABELS>).map((period) => (
              <div key={period} className="text-center space-y-1">
                <div className={cn('text-xs px-2 py-1 rounded-full', PERIOD_COLORS[period])}>
                  {PERIOD_LABELS[period]}
                </div>
                <NumberFlow
                  format={{
                    style: 'currency',
                    currency: 'TWD',
                    trailingZeroDisplay: 'stripIfInteger',
                  }}
                  value={pricing[period]}
                  className="text-sm font-medium block"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Individual room pricing data
export const ROOM_PRICING_DATA = {
  '海金沙': {
    weekday: 4680,
    weekend: 5280,
    lunar: 6280,
    capacity: 4,
    maxCapacity: 5,
    extraBedPrice: {
      weekday: 800,
      weekend: 800,
      lunar: 1000
    }
  },
  '筆筒樹': {
    weekday: 4980,
    weekend: 5680,
    lunar: 6680,
    capacity: 4,
    maxCapacity: 6,
    extraBedPrice: {
      weekday: 800,
      weekend: 800,
      lunar: 1000
    }
  },
  '兔腳蕨': {
    weekday: 6680,
    weekend: 7280,
    lunar: 8280,
    capacity: 6,
    maxCapacity: 7,
    extraBedPrice: {
      weekday: 800,
      weekend: 800,
      lunar: 1000
    }
  }
} as const;