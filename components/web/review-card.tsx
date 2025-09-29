import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { GoogleReview } from '@/types/reviews';
import Star from '@/assets/star.svg';

import { Skeleton } from '../ui/skeleton';

interface ReviewCardLoadingProps {
  isLoading: true;
}

interface ReviewCardContentProps
  extends Omit<
    GoogleReview,
    'createTime' | 'updateTime' | 'reviewReply' | 'name'
  > {
  isLoading: false;
  onClick?: (review: GoogleReview) => void;
  createTime?: string;
  updateTime?: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
  name?: string;
}

type ReviewCardProps = ReviewCardLoadingProps | ReviewCardContentProps;

export const ReviewCard = ({ isLoading, ...props }: ReviewCardProps) => {
  if (isLoading) return <SkeletonReviewCard />;

  const {
    reviewer: { profilePhotoUrl, displayName },
    starRating,
    comment,
    onClick,
  } = props as ReviewCardContentProps;

  return (
    <motion.figure
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(
        'xs:min-w-[240px] xs:max-w-[280px] relative h-full w-full max-w-[calc(100vw-6rem)] min-w-[calc(100vw-8rem)] cursor-pointer overflow-hidden rounded-xl border p-4 select-none hover:bg-gray-950/[.05] sm:max-w-[320px] sm:min-w-[280px] lg:max-w-[360px] lg:min-w-[300px] dark:hover:bg-gray-50/[.15]',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10]'
      )}
      onClick={() => onClick?.(props as GoogleReview)}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="size-9 rounded-full"
          width={32}
          height={32}
          alt={`reviewer-${displayName}-avatar`}
          src={profilePhotoUrl}
        />
        <div className="flex flex-col gap-2">
          <figcaption
            className={cn(
              'line-clamp-1 overflow-hidden text-start text-xs font-medium sm:text-sm md:text-base dark:text-white'
            )}
          >
            {displayName}
          </figcaption>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={cn(
                  'h-3 w-3 sm:h-4 sm:w-4',
                  index < starRating ? 'text-yellow-400' : 'text-gray-300'
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <blockquote
        className={cn(
          'mt-2 line-clamp-3 overflow-hidden text-start text-[11px] leading-relaxed sm:text-xs md:line-clamp-4 md:text-sm lg:line-clamp-6'
        )}
      >
        {comment}
      </blockquote>
    </motion.figure>
  );
};

const SkeletonReviewCard = () => {
  return (
    <div className="xs:min-w-[240px] xs:max-w-[280px] relative h-full w-full max-w-[calc(100vw-6rem)] min-w-[calc(100vw-8rem)] overflow-hidden rounded-xl border p-4 sm:max-w-[320px] sm:min-w-[280px] lg:max-w-[360px] lg:min-w-[300px]">
      <div className="flex flex-row items-center gap-2">
        <Skeleton className="size-9 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="mt-2 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[80%]" />
        <Skeleton className="h-3 w-[90%]" />
      </div>
    </div>
  );
};
