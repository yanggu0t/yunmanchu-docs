'use client';

import React from 'react';
import NumberFlow from '@number-flow/react';
import { Calendar, Users, TrendingDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getPricingComparison, PRICING_RULES } from '@/lib/room-data';

interface PricingComparisonProps {
  className?: string;
  showPerPersonPricing?: boolean;
  highlightBestValue?: boolean;
}

export function PricingComparison({
  className,
  showPerPersonPricing = true,
  highlightBestValue = true
}: PricingComparisonProps) {
  const [selectedPeriod, setSelectedPeriod] = React.useState<'weekday' | 'weekend' | 'lunar'>('weekday');
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
              <Calendar className="w-3 h-3" />
              即時價格
            </Badge>
          </div>

          {/* Period Selector */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
            {Object.entries(PRICING_RULES.periods).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedPeriod === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(key as 'weekday' | 'weekend' | 'lunar')}
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
                <th className="text-left py-3 font-medium">房型</th>
                <th className="text-center py-3 font-medium">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="w-4 h-4" />
                    人數
                  </div>
                </th>
                <th className="text-right py-3 font-medium">總價</th>
                {showPerPersonPricing && (
                  <th className="text-right py-3 font-medium">平均每人</th>
                )}
                <th className="text-center py-3 font-medium">最佳選擇</th>
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
                            <TrendingDown className="w-3 h-3 mr-1" />
                            最划算
                          </Badge>
                        )}
                      </div>
                    </td>

                    <td className="text-center py-4">
                      <Badge variant="outline">
                        {room.capacity}
                        {room.maxCapacity && room.maxCapacity > room.capacity &&
                          `~${room.maxCapacity}`
                        }人
                      </Badge>
                    </td>

                    <td className="text-right py-4">
                      <NumberFlow
                        format={{
                          style: 'currency',
                          currency: 'TWD',
                          trailingZeroDisplay: 'stripIfInteger',
                        }}
                        value={totalPrice}
                        className="font-semibold"
                      />
                    </td>

                    {showPerPersonPricing && (
                      <td className="text-right py-4">
                        <div className="space-y-1">
                          <NumberFlow
                            format={{
                              style: 'currency',
                              currency: 'TWD',
                              trailingZeroDisplay: 'stripIfInteger',
                            }}
                            value={pricePerPerson}
                            className="text-muted-foreground text-sm"
                          />
                          <div className="text-xs text-muted-foreground">每人</div>
                        </div>
                      </td>
                    )}

                    <td className="text-center py-4">
                      {isBestValue ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          推薦
                        </Badge>
                      ) : room.capacity >= 6 ? (
                        <Badge variant="secondary">
                          <Users className="w-3 h-3 mr-1" />
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
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-medium text-sm">價格說明</h4>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>加床費用：平日/假日 ${PRICING_RULES.extraBed.weekday}，過年 ${PRICING_RULES.extraBed.lunar}</span>
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
          <Button className="flex-1">
            立即預訂
          </Button>
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
  className
}: {
  roomName: string;
  className?: string;
}) {
  const room = getPricingComparison().find(r => r.name.includes(roomName));

  if (!room) return null;

  return (
    <div className={cn('flex items-center justify-between p-3 bg-muted rounded-lg', className)}>
      <div>
        <div className="font-medium text-sm">{room.name}</div>
        <div className="text-xs text-muted-foreground">{room.capacity}人房</div>
      </div>
      <div className="text-right">
        <div className="font-semibold">
          ${room.pricing.weekday.toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground">平日起</div>
      </div>
    </div>
  );
}