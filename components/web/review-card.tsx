import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { GoogleReview } from '@/types/reviews';
import Star from '@/assets/star.svg';

export const ReviewCard = ({
  reviewer: { profilePhotoUrl, displayName },
  starRating,
  comment,
  dialogMode = false,
}: GoogleReview & { dialogMode?: boolean }) => {
  return (
    <figure
      className={cn(
        'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 select-none',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10]',
        {
          'cursor-default md:min-h-[400px] md:w-[750px]': dialogMode,
          'hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.15]': !dialogMode,
        }
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="size-9 rounded-full"
          width={32}
          height={32}
          alt={`reviewer-${displayName}-avatar`}
          src={profilePhotoUrl}
        />
        <div className="flex flex-col">
          <figcaption
            className={cn(
              'overflow-hidden text-start text-base font-medium dark:text-white',
              {
                'line-clamp-1': !dialogMode,
              }
            )}
          >
            {displayName}
          </figcaption>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={cn(
                  'h-4 w-4',
                  index < starRating ? 'text-yellow-400' : 'text-gray-300'
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <blockquote
        className={cn('mt-2 overflow-hidden text-start text-sm', {
          'line-clamp-6': !dialogMode,
        })}
      >
        {comment}
      </blockquote>
    </figure>
  );
};
