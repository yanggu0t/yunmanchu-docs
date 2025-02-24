import Link from 'next/link';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { Container } from '@/components/web/page-container';
import { ReviewMarquee } from '@/components/web/review-marquee';
import { getAllReviews } from '@/service/reviews';

export default async function HomePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['get-reviews'],
    queryFn: getAllReviews,
  });

  return (
    <Container className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
      <p className="text-fd-muted-foreground">
        You can open{' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{' '}
        and see the documentation.
      </p>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReviewMarquee className="border-muted-foreground rounded-xl border" />
      </HydrationBoundary>
    </Container>
  );
}
