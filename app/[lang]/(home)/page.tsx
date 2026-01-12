import type { Metadata } from 'next';

import { Footer } from '@/components/ui/footer-section';
import { AboutSection } from '@/components/blocks/about-section';
import { BentoFeatureGrid } from '@/components/blocks/bento-feature-grid';
import { FeaturesSectionWithHoverEffects } from '@/components/blocks/feature-block';
import { LandingHero } from '@/components/blocks/hero-block';
import { LocationCardGrid } from '@/components/blocks/location-card-grid';
import { Container } from '@/components/web/page-container';
import { PricingSectionBlock } from '@/components/web/price-card';
import { ReviewMarquee } from '@/components/web/review-marquee';
import { DialogProvider } from '@/context/dialog-context';
import { ReviewsProvider } from '@/context/review-context';

export const metadata: Metadata = {
  title: '苗栗公館住宿首選',
  description:
    '蘊慢築民宿位於苗栗公館，提供溫馨舒適的四人房、六人房及包棟服務。享受專業茶藝花藝體驗，品嚐蔬食早餐。鄰近苗栗特色館、龍騰斷橋、勝興車站等熱門景點，是苗栗住宿、公館民宿的最佳選擇。',
  keywords: [
    '苗栗住宿首選',
    '公館民宿推薦',
    '苗栗包棟',
    '親子民宿',
    '茶藝體驗',
    '花藝課程',
    '苗栗特色民宿',
    '家庭旅遊住宿',
  ],
  openGraph: {
    title: '苗栗公館住宿首選 | 蘊慢築民宿',
    description:
      '蘊慢築民宿提供溫馨舒適的住宿環境，專業茶藝花藝體驗，鄰近苗栗熱門景點。苗栗住宿、公館民宿首選。',
    images: [
      {
        url: '/homepage-hero.jpg',
        width: 1200,
        height: 630,
        alt: '蘊慢築民宿外觀與庭園景觀',
      },
    ],
  },
  alternates: {
    canonical: 'https://yunmanchu.com',
  },
};

export default function Home() {
  return (
    <Container>
      <DialogProvider>
        <LandingHero />
        <FeaturesSectionWithHoverEffects />
        <AboutSection />
        <BentoFeatureGrid />
        <PricingSectionBlock />
        <LocationCardGrid />
      </DialogProvider>

      <ReviewsProvider>
        <ReviewMarquee />
      </ReviewsProvider>
      <Footer />
    </Container>
  );
}
