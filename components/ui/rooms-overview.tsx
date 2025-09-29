'use client';

import React from 'react';
import { DollarSign, Search, Users } from 'lucide-react';

import { getPricingComparison } from '@/lib/room-data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface RoomsOverviewProps {
  layout?: 'cards' | 'list';
  showFilters?: boolean;
  showComparison?: boolean;
  className?: string;
}

export function RoomsOverview({
  layout = 'cards',
  showFilters = true,
  showComparison = true,
  className,
}: RoomsOverviewProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCapacity, setSelectedCapacity] = React.useState<number | null>(
    null
  );
  const [priceSort, setPriceSort] = React.useState<'asc' | 'desc' | null>(null);

  // Mock rooms list for demo (replace with actual data when available)
  const mockRooms = React.useMemo(() => [], []);

  // Filter and sort rooms
  const filteredRooms = React.useMemo(() => {
    return mockRooms; // Return empty array for now
  }, [mockRooms]);

  const pricingComparison = getPricingComparison();

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">房型總覽</h2>
        <p className="text-muted-foreground">
          選擇最適合您的房型，每個房間都有獨特的特色與舒適的環境
        </p>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="搜尋房型..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={selectedCapacity === 4 ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  setSelectedCapacity(selectedCapacity === 4 ? null : 4)
                }
              >
                <Users className="mr-1 h-4 w-4" />
                4人房
              </Button>
              <Button
                variant={selectedCapacity === 6 ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  setSelectedCapacity(selectedCapacity === 6 ? null : 6)
                }
              >
                <Users className="mr-1 h-4 w-4" />
                6人房
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={priceSort === 'asc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceSort(priceSort === 'asc' ? null : 'asc')}
              >
                <DollarSign className="mr-1 h-4 w-4" />
                價格低到高
              </Button>
              <Button
                variant={priceSort === 'desc' ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  setPriceSort(priceSort === 'desc' ? null : 'desc')
                }
              >
                <DollarSign className="mr-1 h-4 w-4" />
                價格高到低
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Pricing Comparison Table */}
      {showComparison && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">價格比較表</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">房型</th>
                  <th className="py-2 text-center">人數</th>
                  <th className="py-2 text-right">平日</th>
                  <th className="py-2 text-right">假日</th>
                  <th className="py-2 text-right">過年</th>
                  <th className="py-2 text-right">平日/人</th>
                </tr>
              </thead>
              <tbody>
                {pricingComparison.map((room, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{room.name}</td>
                    <td className="py-3 text-center">
                      <Badge variant="outline">
                        {room.capacity}
                        {room.maxCapacity && `~${room.maxCapacity}`}人
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      ${room.pricing.weekday.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      ${room.pricing.weekend.toLocaleString()}
                    </td>
                    <td className="py-3 text-right">
                      ${room.pricing.lunar.toLocaleString()}
                    </td>
                    <td className="text-muted-foreground py-3 text-right">
                      ${room.pricePerPerson.weekday.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Rooms Display */}
      {layout === 'cards' ? (
        <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2">
          {/* Room cards would be displayed here when room data is available */}
          <div className="text-muted-foreground col-span-full p-8 text-center">
            房型卡片功能開發中，請查看上方的價格比較表
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Room summaries would be displayed here when room data is available */}
          <div className="text-muted-foreground p-8 text-center">
            房型列表功能開發中，請查看上方的價格比較表
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredRooms.length === 0 && (
        <Card className="p-8 text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">沒有找到符合條件的房型</h3>
            <p className="text-muted-foreground">
              請嘗試調整搜尋條件或聯繫我們了解更多資訊
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCapacity(null);
                setPriceSort(null);
              }}
            >
              清除所有篩選
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

// Compact room selector for booking forms
export function RoomSelector({
  selectedRoom,
  onRoomSelect,
  className,
}: {
  selectedRoom?: string;
  onRoomSelect?: (roomId: string) => void;
  className?: string;
}) {
  const mockRooms = getPricingComparison();

  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="font-medium">選擇房型</h4>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mockRooms.map((room, index) => (
          <Card
            key={index}
            className={cn(
              'cursor-pointer p-4 transition-all hover:shadow-md',
              selectedRoom === room.name
                ? 'ring-primary bg-primary/5 ring-2'
                : 'hover:border-primary/50'
            )}
            onClick={() => onRoomSelect?.(room.name)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h5 className="font-medium">{room.name}</h5>
                <Badge variant="outline" className="text-xs">
                  <Users className="mr-1 h-3 w-3" />
                  {room.capacity}人
                </Badge>
              </div>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                基本{room.capacity}人入住，最多可容納{room.maxCapacity}人
              </p>
              <div className="text-sm">
                <span className="text-muted-foreground">平日起 </span>
                <span className="font-medium">
                  ${room.pricing.weekday.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
