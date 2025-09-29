'use client';

import React from 'react';
import {
  Bath,
  Refrigerator,
  Bed,
  Sparkles,
  Users,
  Plus,
  Sofa,
  Mountain,
  Car,
  Wifi,
  Coffee,
  AirVent
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export interface RoomFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlight?: boolean;
}

interface RoomFeaturesProps {
  features: RoomFeature[];
  className?: string;
  layout?: 'grid' | 'list';
  showIcons?: boolean;
}

export function RoomFeatures({
  features,
  className,
  layout = 'grid',
  showIcons = true
}: RoomFeaturesProps) {
  if (layout === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
              {showIcons && (
                <div className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
                  feature.highlight
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  <Icon className="w-4 h-4" />
                </div>
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  {feature.highlight && (
                    <Badge variant="secondary" className="text-xs">特色</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn(
      'grid gap-4',
      features.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' :
      features.length <= 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' :
      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      className
    )}>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card key={index} className={cn(
            'p-4 transition-all hover:shadow-md',
            feature.highlight && 'ring-2 ring-primary/20 bg-primary/5'
          )}>
            <div className="space-y-3">
              {showIcons && (
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  feature.highlight
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{feature.title}</h4>
                  {feature.highlight && (
                    <Badge variant="secondary" className="text-xs">特色</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// Common room features data
export const COMMON_ROOM_FEATURES: RoomFeature[] = [
  {
    icon: Bath,
    title: '乾濕分離浴室',
    description: '浴室配有冷暖風乾燥機，廁所及衛浴之間設有乾濕分離設計，使用更舒適衛生。'
  },
  {
    icon: Refrigerator,
    title: '小冰箱',
    description: '房間內配有小冰箱，可以放心帶著需要冷藏的東西來入住，保持食物新鮮。'
  },
  {
    icon: Bed,
    title: '舒適寢具',
    description: '我們採用的床和棉被軟硬適中，多數來過的客人都給予好評，歡迎入住體驗。'
  },
  {
    icon: Sparkles,
    title: '有機盥洗用品',
    description: '民宿提供的衛浴盥洗用品有：有機產品的沐浴乳、洗髮乳和修容組。'
  }
];

// Individual room features
export const ROOM_SPECIFIC_FEATURES = {
  '筆筒樹': [
    {
      icon: Mountain,
      title: '獨立露台',
      description: '露台有一套木頭桌椅，走到室外享受綠植環境，享受月光灑下的光暈。',
      highlight: true
    },
    {
      icon: Plus,
      title: '加床選項',
      description: '可以加兩人，並且加兩張單床，加床與加人的費用請聯繫後確認。'
    }
  ],
  '海金沙': [
    {
      icon: Sofa,
      title: '沙發區',
      description: '海金沙房配有沙發區，可以跟家人們可以在沙發區一同看電視一邊聊天。',
      highlight: true
    },
    {
      icon: Bed,
      title: '適合長輩',
      description: '房間配備床架，適合長輩入住，窗外可欣賞自然景致。',
      highlight: true
    },
    {
      icon: Plus,
      title: '加床選項',
      description: '可以加一人，並且加一張單床，加床與加人的費用請聯繫後確認。'
    }
  ],
  '兔腳蕨': [
    {
      icon: Sofa,
      title: '沙發區',
      description: '兔腳蕨房配有沙發區，可以跟家人們可以在沙發區一同看電視一邊聊天。',
      highlight: true
    },
    {
      icon: Mountain,
      title: '景觀衛浴',
      description: '衛浴間有對外窗能看到屋外的景色，早晨看著自然風光洗漱。',
      highlight: true
    },
    {
      icon: Users,
      title: '家庭友善',
      description: '寬敞空間最適合家庭入住，六人房可舒適容納大家庭。',
      highlight: true
    },
    {
      icon: Plus,
      title: '加床選項',
      description: '可以加一人，並且加一張單床，加床與加人的費用請聯繫後確認。'
    }
  ]
} as const;

// Additional amenities
export const ADDITIONAL_AMENITIES: RoomFeature[] = [
  {
    icon: Wifi,
    title: '免費WiFi',
    description: '全館提供免費高速無線網路，讓您保持聯繫。'
  },
  {
    icon: Coffee,
    title: '早餐服務',
    description: '包含豐盛早餐，為您開啟美好的一天。'
  },
  {
    icon: Car,
    title: '免費停車',
    description: '提供免費停車位，自駕旅客無需擔心停車問題。'
  },
  {
    icon: AirVent,
    title: '空調設備',
    description: '房間配有冷暖空調，一年四季都能享受舒適溫度。'
  }
];