'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { cn, normalizeList } from '@/lib/utils';
import { getAllReviews } from '@/service/reviews';

import { Marquee } from '../ui/marquee';
import { ReviewCard } from './review-card';

interface IProps {
  className?: string;
}

export const ReviewMarquee = ({ className }: IProps) => {
  const { data } = useQuery({
    queryKey: ['get-reviews'],
    queryFn: getAllReviews,
  });

  const { reviews = [] } = data ?? {};

  const normalizedReviews = normalizeList(reviews, 3);
  const rowLength = normalizedReviews.length / 3;

  const firstRow = normalizedReviews.slice(0, rowLength);
  const secondRow = normalizedReviews.slice(rowLength, rowLength * 2);
  const thirdRow = normalizedReviews.slice(rowLength * 2);

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden py-4',
        className
      )}
    >
      <Marquee pauseOnHover className="p-0 [--duration:40s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.reviewId} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="p-0 [--duration:40s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.reviewId} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="p-0 [--duration:40s]">
        {thirdRow.map((review) => (
          <ReviewCard key={review.reviewId} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
};
