'use client';

import {
  Bath,
  Bike,
  Coffee,
  CreditCard,
  Flower2,
  Languages,
  ParkingCircle,
  Salad,
  Sparkles,
  TreePine,
  Wifi,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { ScrollReveal, StaggeredReveal } from '@/components/ui/scroll-reveal';

import { ContentSection } from './content-section';

interface FacilityItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

interface FacilityCategory {
  name: string;
  items: FacilityItem[];
}

const facilities: FacilityCategory[] = [
  {
    name: '住宿體驗',
    items: [
      {
        icon: <Coffee className="h-6 w-6" />,
        title: '茶藝體驗',
        description: '品茗賞茶，體驗茶席禮儀',
        highlight: true,
      },
      {
        icon: <Flower2 className="h-6 w-6" />,
        title: '花藝課程',
        description: '專業老師帶領創作',
        highlight: true,
      },
      {
        icon: <Salad className="h-6 w-6" />,
        title: '蔬食早餐',
        description: '健康美味的早晨',
      },
    ],
  },
  {
    name: '便利設施',
    items: [
      {
        icon: <Wifi className="h-6 w-6" />,
        title: 'Wi-Fi',
        description: '全館無線網路',
      },
      {
        icon: <Bike className="h-6 w-6" />,
        title: '自行車',
        description: '免費租借探索周邊',
      },
      {
        icon: <ParkingCircle className="h-6 w-6" />,
        title: '停車場',
        description: '專屬停車空間',
      },
    ],
  },
  {
    name: '貼心服務',
    items: [
      {
        icon: <Bath className="h-6 w-6" />,
        title: '乾濕分離',
        description: '舒適的衛浴空間',
      },
      {
        icon: <TreePine className="h-6 w-6" />,
        title: '庭園花園',
        description: '親近自然的環境',
      },
      {
        icon: <Sparkles className="h-6 w-6" />,
        title: '兒童友善',
        description: '嬰兒床、玩具提供',
      },
    ],
  },
  {
    name: '付款與語言',
    items: [
      {
        icon: <CreditCard className="h-6 w-6" />,
        title: '多元付款',
        description: '現金、轉帳、信用卡',
      },
      {
        icon: <Languages className="h-6 w-6" />,
        title: '中文服務',
        description: '親切的在地服務',
      },
    ],
  },
];

export function BentoFeatureGrid() {
  return (
    <ContentSection
      title="設施與服務"
      subtitle="為您準備完善的住宿體驗"
      variant="alternate"
    >
      <div className="space-y-12">
        {facilities.map((category, categoryIndex) => (
          <ScrollReveal
            key={category.name}
            animation="fadeIn"
            delay={0.1 + categoryIndex * 0.1}
            threshold={0.2}
          >
            <div className="space-y-4">
              <h3 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                {category.name}
              </h3>
              <StaggeredReveal
                staggerDelay={0.1}
                animation="slideUp"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {category.items.map((item) => (
                  <BentoCard key={item.title} {...item} />
                ))}
              </StaggeredReveal>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </ContentSection>
  );
}

function BentoCard({ icon, title, description, highlight }: FacilityItem) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border p-6 transition-all duration-300',
        'hover:border-primary/20 hover:shadow-lg',
        highlight ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors',
            highlight
              ? 'bg-primary/10 text-primary'
              : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
          )}
        >
          {icon}
        </div>
        <div className="space-y-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
