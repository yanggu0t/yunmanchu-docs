import { Footer } from '@/components/ui/footer-section';
import { FeaturesSectionWithHoverEffects } from '@/components/blocks/feature-block';
import { LandingHero } from '@/components/blocks/hero-block';
import { Container } from '@/components/web/page-container';
import { PricingSectionBlock } from '@/components/web/price-card';
import { ReviewMarquee } from '@/components/web/review-marquee';
import { DialogProvider } from '@/context/dialog-context';
import { ReviewsProvider } from '@/context/review-context';

export default function Home() {
  return (
    <Container>
      <DialogProvider>
        <LandingHero />
        <FeaturesSectionWithHoverEffects />
        <PricingSectionBlock />
      </DialogProvider>

      <ReviewsProvider>
        <ReviewMarquee />
      </ReviewsProvider>
      <Footer />
    </Container>
  );
}
