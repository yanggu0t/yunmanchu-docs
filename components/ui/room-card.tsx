'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, Users } from 'lucide-react';

import type { CarouselImage } from '@/lib/images';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageCarousel } from '@/components/web/image-carousel';

import { RoomFeatures, type RoomFeature } from './room-features';
import { RoomPricing, type RoomPricingData } from './room-pricing';

export interface RoomCardData {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  images: CarouselImage[];
  pricing: RoomPricingData;
  features: RoomFeature[];
  highlights?: string[];
  cta?: {
    text: string;
    url?: string;
    external?: boolean;
  };
}

interface RoomCardProps {
  room: RoomCardData;
  layout?: 'vertical' | 'horizontal';
  showPricing?: boolean;
  showFeatures?: boolean;
  className?: string;
}

export function RoomCard({
  room,
  layout = 'vertical',
  showPricing = true,
  showFeatures = true,
  className,
}: RoomCardProps) {
  const handleCTAClick = () => {
    if (room.cta?.url) {
      if (room.cta.external) {
        window.open(room.cta.url, '_blank');
      } else {
        window.location.href = room.cta.url;
      }
    }
  };

  if (layout === 'horizontal') {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <div className="grid gap-0 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative">
            <ImageCarousel
              images={room.images}
              aspectRatio="aspect-[4/3]"
              className="h-full"
            />
            {room.highlights && room.highlights.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {room.highlights.map((highlight, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-primary bg-white/90"
                  >
                    {highlight}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="space-y-6 p-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  {room.subtitle && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      {room.subtitle}
                    </p>
                  )}
                </div>
                <Badge variant="outline" className="flex-shrink-0">
                  <Users className="mr-1 h-3 w-3" />
                  {room.pricing.capacity}人房
                </Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {room.description}
              </p>
            </div>

            {showPricing && (
              <RoomPricing
                roomName={room.name}
                pricing={room.pricing}
                compact
              />
            )}

            {showFeatures && room.features.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">房間特色</h4>
                <RoomFeatures
                  features={room.features.slice(0, 4)}
                  layout="list"
                  showIcons={false}
                />
              </div>
            )}

            {room.cta && (
              <Button
                onClick={handleCTAClick}
                className="w-full"
                variant="default"
              >
                {room.cta.text}
                {room.cta.external && <ExternalLink className="ml-2 h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Vertical layout (default)
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="space-y-0">
        {/* Image Section */}
        <div className="relative">
          <ImageCarousel images={room.images} aspectRatio="aspect-[4/3]" />
          {room.highlights && room.highlights.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {room.highlights.map((highlight, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-primary bg-white/90"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-6 p-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{room.name}</h3>
                {room.subtitle && (
                  <p className="text-muted-foreground mt-1 text-sm">
                    {room.subtitle}
                  </p>
                )}
              </div>
              <Badge variant="outline" className="flex-shrink-0">
                <Users className="mr-1 h-3 w-3" />
                {room.pricing.capacity}人房
              </Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {room.description}
            </p>
          </div>

          {showFeatures && room.features.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">房間特色</h4>
              <RoomFeatures features={room.features} layout="grid" />
            </div>
          )}

          {showPricing && (
            <RoomPricing roomName={room.name} pricing={room.pricing} />
          )}

          {room.cta && (
            <Button
              onClick={handleCTAClick}
              className="w-full"
              variant="default"
            >
              {room.cta.text}
              {room.cta.external && <ExternalLink className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// Quick room summary component for use in lists
export function RoomSummary({
  room,
  onClick,
  className,
}: {
  room: RoomCardData;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        'hover:border-primary/50 cursor-pointer p-4 transition-all hover:shadow-md',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={room.images[0]?.src || ''}
            alt={room.images[0]?.alt || room.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="truncate font-medium">{room.name}</h4>
              {room.subtitle && (
                <p className="text-muted-foreground mt-1 text-xs">
                  {room.subtitle}
                </p>
              )}
            </div>
            <Badge variant="outline" className="flex-shrink-0 text-xs">
              <Users className="mr-1 h-3 w-3" />
              {room.pricing.capacity}人
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
            {room.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm font-medium">
              平日 ${room.pricing.weekday.toLocaleString()}
            </div>
            {room.highlights && room.highlights.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {room.highlights[0]}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
