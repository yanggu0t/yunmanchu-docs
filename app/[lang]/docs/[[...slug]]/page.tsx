import { notFound } from 'next/navigation';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';

import { source } from '@/lib/source';
import { FeatureTable } from '@/components/fumadocs/feature-table';
import { ImageCarousel } from '@/components/web/image-carousel';
import { RoomPricing } from '@/components/ui/room-pricing';
import { RoomFeatures } from '@/components/ui/room-features';
import { RoomCard, RoomSummary } from '@/components/ui/room-card';
import { RoomsOverview, RoomSelector } from '@/components/ui/rooms-overview';
import { PricingComparison, PriceSummary } from '@/components/ui/pricing-comparison';

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            img: (props) => <ImageZoom {...props} />,
            Step,
            Steps,
            FeatureTable,
            ImageCarousel,
            RoomPricing,
            RoomFeatures,
            RoomCard,
            RoomSummary,
            RoomsOverview,
            RoomSelector,
            PricingComparison,
            PriceSummary,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
