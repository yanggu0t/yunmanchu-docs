'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

import { ContentSection } from './content-section';

interface StoryCard {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

const stories: StoryCard[] = [
  {
    title: '花藝',
    subtitle: '曾老師 — 花藝教授',
    description:
      '蘊慢築民宿的男主人曾老師於1996年取得中華花藝文教基金會教授證照，擁有20年以上花藝教學經驗。他曾帶領學員完成多場中大型花藝特展，現在將專業知識轉化為民宿經營，與更多人分享花藝之美。',
    image: 'https://i.imgur.com/WqB1l9Z.png',
    imageAlt: '花藝作品展示',
  },
  {
    title: '茶藝',
    subtitle: '邱姐 — 茶藝師',
    description:
      '蘊慢築民宿的女主人邱姐是茶藝師，退休後與曾老師一起深入學習茶藝。在廣泛的旅行和學習中，他們深入了解不同的茶文化和種類，決定將熱愛和專業知識分享給更多人。',
    image: 'https://i.imgur.com/G3WLwjz.jpeg',
    imageAlt: '茶藝展示',
  },
];

export function AboutSection() {
  return (
    <ContentSection
      title="關於我們"
      subtitle="認識蘊慢築民宿的茶藝花藝專業主人"
    >
      <div className="space-y-16 md:space-y-24">
        {stories.map((story, index) => (
          <ScrollReveal
            key={story.title}
            animation="slideUp"
            delay={0.2 + index * 0.1}
            threshold={0.2}
          >
            <div
              className={cn(
                'grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16',
                index % 2 === 1 && 'md:[direction:rtl]'
              )}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div
                className={cn(
                  'space-y-4',
                  index % 2 === 1 && 'md:[direction:ltr]'
                )}
              >
                <div className="space-y-2">
                  <span className="text-primary text-sm font-medium tracking-wider uppercase">
                    {story.title}
                  </span>
                  <h3 className="text-2xl font-semibold md:text-3xl">
                    {story.subtitle}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </ContentSection>
  );
}
