'use client';

import { ExternalLink, MapPin } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ScrollReveal, StaggeredReveal } from '@/components/ui/scroll-reveal';

import { ContentSection } from './content-section';

interface Location {
  name: string;
  distance: number;
  link: string;
  category: 'attraction' | 'restaurant' | 'transport';
}

const locations: Location[] = [
  // 景點
  {
    name: '苗栗特色館',
    distance: 0.6,
    link: 'https://maps.google.com/?q=苗栗特色館',
    category: 'attraction',
  },
  {
    name: '龍騰斷橋',
    distance: 15,
    link: 'https://maps.google.com/?q=苗栗縣三義鄉龍騰斷橋',
    category: 'attraction',
  },
  {
    name: '勝興車站',
    distance: 15.5,
    link: 'https://maps.google.com/?q=苗栗縣三義鄉勝興車站',
    category: 'attraction',
  },
  {
    name: '銅鑼天空步道',
    distance: 8.5,
    link: 'https://maps.google.com/?q=苗栗縣銅鑼鄉天空步道',
    category: 'attraction',
  },
  // 餐廳
  {
    name: '鵝家庄',
    distance: 0.29,
    link: 'https://maps.google.com/?q=苗栗縣公館鄉鵝家庄',
    category: 'restaurant',
  },
  {
    name: '棗莊',
    distance: 1.6,
    link: 'https://maps.google.com/?q=苗栗縣公館鄉棗莊紅棗餐廳',
    category: 'restaurant',
  },
  // 交通
  {
    name: '銅鑼火車站',
    distance: 6.4,
    link: 'https://maps.google.com/?q=銅鑼火車站',
    category: 'transport',
  },
  {
    name: '苗栗高鐵站',
    distance: 16.6,
    link: 'https://maps.google.com/?q=台灣高鐵苗栗站',
    category: 'transport',
  },
];

const categoryLabels = {
  attraction: '熱門景點',
  restaurant: '美食推薦',
  transport: '交通樞紐',
};

const categoryColors = {
  attraction: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  restaurant: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  transport: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
};

export function LocationCardGrid() {
  const groupedLocations = locations.reduce(
    (acc, location) => {
      if (!acc[location.category]) {
        acc[location.category] = [];
      }
      acc[location.category].push(location);
      return acc;
    },
    {} as Record<string, Location[]>
  );

  return (
    <ContentSection title="周邊探索" subtitle="探索民宿周圍的精彩景點與美食">
      <div className="space-y-10">
        {Object.entries(groupedLocations).map(
          ([category, locs], categoryIndex) => (
            <ScrollReveal
              key={category}
              animation="fadeIn"
              delay={0.1 + categoryIndex * 0.1}
              threshold={0.2}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-medium',
                      categoryColors[category as keyof typeof categoryColors]
                    )}
                  >
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </span>
                </div>
                <StaggeredReveal
                  staggerDelay={0.08}
                  animation="slideUp"
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {locs.map((location) => (
                    <LocationCard key={location.name} {...location} />
                  ))}
                </StaggeredReveal>
              </div>
            </ScrollReveal>
          )
        )}
      </div>
    </ContentSection>
  );
}

function LocationCard({ name, distance, link }: Location) {
  const formattedDistance =
    distance < 1 ? `${Math.round(distance * 1000)} 公尺` : `${distance} 公里`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-xl border p-5',
        'bg-card border-border transition-all duration-300',
        'hover:border-primary/20 hover:-translate-y-1 hover:shadow-lg'
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="leading-tight font-medium">{name}</h4>
          <ExternalLink className="text-muted-foreground h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5" />
          <span>{formattedDistance}</span>
        </div>
      </div>
    </a>
  );
}
