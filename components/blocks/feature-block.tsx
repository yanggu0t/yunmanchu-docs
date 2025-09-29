import {
  Bike,
  Coffee,
  Flower,
  ParkingCircle,
  Salad,
  Toilet,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { ScrollReveal, StaggeredReveal } from '@/components/ui/scroll-reveal';

import { Section } from '../web/page-container';

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: '茶藝',
      description: '體驗台灣傳統茶道文化，品味清香茗茶的優雅時光。',
      icon: <Coffee />,
    },
    {
      title: '花藝',
      description: '專業花藝師帶您進入花藝世界，創作屬於自己的美麗作品。',
      icon: <Flower />,
    },
    {
      title: '蔬食早餐',
      description: '每日新鮮製作的健康蔬食早餐，讓您活力滿滿地開始新的一天。',
      icon: <Salad />,
    },
    {
      title: '腳踏車',
      description: '提供免費腳踏車租借服務，讓您輕鬆探索周邊景點。',
      icon: <Bike />,
    },
    {
      title: '免治馬桶',
      description: '配備高級免治馬桶，提供賓客最佳的如廁體驗。',
      icon: <Toilet />,
    },
    {
      title: '停車場',
      description: '寬敞的專屬停車場，為自駕旅客提供安全便利的停車空間。',
      icon: <ParkingCircle />,
    },
  ];
  return (
    <Section className="space-y-7">
      <ScrollReveal animation="slideUp" delay={0.2} threshold={0.3}>
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-medium md:text-5xl">民宿特色</h1>
          <p className="text-muted-foreground">
            為您介紹蘊慢築民宿的特色與服務內容
          </p>
        </div>
      </ScrollReveal>

      <StaggeredReveal
        staggerDelay={0.15}
        animation="slideUp"
        className="relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </StaggeredReveal>
    </Section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'group/feature relative flex flex-col py-10 lg:border-r dark:border-neutral-800',
        (index === 0 || index === 3) && 'lg:border-l dark:border-neutral-800',
        index < 3 && 'lg:border-b dark:border-neutral-800'
      )}
    >
      {index < 3 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 3 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="group-hover/feature:bg-primary absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
};
