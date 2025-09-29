'use client';

import React from 'react';
import NumberFlow from '@number-flow/react';
import { Calendar, TrendingDown, Users } from 'lucide-react';

import { getPricingComparison, PRICING_RULES } from '@/lib/room-data';
import {
  cn,
  formatCapacityRange,
  PRICE_FORMAT_CONFIG,
  type PricingPeriod,
} from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PricingComparisonProps {
  className?: string;
  showPerPersonPricing?: boolean;
  highlightBestValue?: boolean;
}

export function PricingComparison({
  className,
  showPerPersonPricing = true,
  highlightBestValue = true,
}: PricingComparisonProps) {
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<PricingPeriod>('weekday');
  const pricingData = getPricingComparison();

  // Find best value (lowest price per person)
  const bestValueRoom = React.useMemo(() => {
    if (!highlightBestValue) return null;

    return pricingData.reduce((best, current) => {
      const currentPricePerPerson = current.pricePerPerson[selectedPeriod];
      const bestPricePerPerson = best.pricePerPerson[selectedPeriod];
      return currentPricePerPerson < bestPricePerPerson ? current : best;
    });
  }, [pricingData, selectedPeriod, highlightBestValue]);

  return (
    <Card className={cn('p-6', className)}>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">房型價格比較</h3>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              即時價格
            </Badge>
          </div>

          {/* Period Selector */}
          <div className="bg-muted flex w-fit gap-1 rounded-lg p-1">
            {Object.entries(PRICING_RULES.periods).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedPeriod === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(key as PricingPeriod)}
                className="text-xs"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left font-medium">房型</th>
                <th className="py-3 text-center font-medium">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4" />
                    人數
                  </div>
                </th>
                <th className="py-3 text-right font-medium">總價</th>
                {showPerPersonPricing && (
                  <th className="py-3 text-right font-medium">平均每人</th>
                )}
                <th className="py-3 text-center font-medium">最佳選擇</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((room, index) => {
                const isBestValue = bestValueRoom?.name === room.name;
                const totalPrice = room.pricing[selectedPeriod];
                const pricePerPerson = room.pricePerPerson[selectedPeriod];

                return (
                  <tr
                    key={index}
                    className={cn(
                      'border-b transition-colors',
                      isBestValue && 'bg-primary/5 border-primary/20'
                    )}
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{room.name}</span>
                        {isBestValue && (
                          <Badge variant="secondary" className="text-xs">
                            <TrendingDown className="mr-1 h-3 w-3" />
                            最划算
                          </Badge>
                        )}
                      </div>
                    </td>

                    <td className="py-4 text-center">
                      <Badge variant="outline">
                        {formatCapacityRange(room.capacity, room.maxCapacity)}
                      </Badge>
                    </td>

                    <td className="py-4 text-right">
                      <NumberFlow
                        format={PRICE_FORMAT_CONFIG}
                        value={totalPrice}
                        className="font-semibold"
                      />
                    </td>

                    {showPerPersonPricing && (
                      <td className="py-4 text-right">
                        <div className="space-y-1">
                          <NumberFlow
                            format={PRICE_FORMAT_CONFIG}
                            value={pricePerPerson}
                            className="text-muted-foreground text-sm"
                          />
                          <div className="text-muted-foreground text-xs">
                            每人
                          </div>
                        </div>
                      </td>
                    )}

                    <td className="py-4 text-center">
                      {isBestValue ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          推薦
                        </Badge>
                      ) : room.capacity >= 6 ? (
                        <Badge variant="secondary">
                          <Users className="mr-1 h-3 w-3" />
                          大家庭
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Additional Info */}
        <div className="space-y-3 border-t pt-4">
          <h4 className="text-sm font-medium">價格說明</h4>
          <div className="text-muted-foreground grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>
                加床費用：平日/假日 ${PRICING_RULES.extraBed.weekday}，春節 $
                {PRICING_RULES.extraBed.lunar}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>{PRICING_RULES.deposit}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>價格包含早餐與基本設施</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3 pt-2">
          <Button className="flex-1">立即預訂</Button>
          <Button variant="outline" className="flex-1">
            聯繫諮詢
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Simple price summary component
export function PriceSummary({
  roomName,
  className,
}: {
  roomName: string;
  className?: string;
}) {
  const room = getPricingComparison().find((r) => r.name.includes(roomName));

  if (!room) return null;

  return (
    <div
      className={cn(
        'bg-muted flex items-center justify-between rounded-lg p-3',
        className
      )}
    >
      <div>
        <div className="text-sm font-medium">{room.name}</div>
        <div className="text-muted-foreground text-xs">
          {formatCapacityRange(room.capacity, room.maxCapacity)}
        </div>
      </div>
      <div className="text-right">
        <NumberFlow
          format={PRICE_FORMAT_CONFIG}
          value={room.pricing.weekday}
          className="text-sm font-semibold"
        />
        <div className="text-muted-foreground text-xs">平日起</div>
      </div>
    </div>
  );
}
