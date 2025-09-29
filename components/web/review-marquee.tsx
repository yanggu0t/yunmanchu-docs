'use client';

import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';

import { cn, normalizeList } from '@/lib/utils';
import { GoogleReview } from '@/types/reviews';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useReviews } from '@/context/review-context';
import { getAllReviews } from '@/service/reviews';

import { Star } from '../ui/icon';
import { Marquee } from '../ui/marquee';
import { Section } from './page-container';
import { ReviewCard } from './review-card';

interface IProps {
  className?: string;
}

export const ReviewMarquee = ({ className }: IProps) => {
  const { setSelectedPost, setIsOpen, isOpen } = useReviews();
  const { isLoading, data } = useQuery({
    queryKey: ['get-reviews'],
    queryFn: getAllReviews,
  });

  const { reviews = [] } = data ?? {};

  const normalizedReviews = normalizeList(reviews, 3);
  const rowLength = normalizedReviews.length / 3;
  const firstRow = normalizedReviews.slice(0, rowLength);
  const secondRow = normalizedReviews.slice(rowLength, rowLength * 2);
  const thirdRow = normalizedReviews.slice(rowLength * 2, rowLength * 3);

  const handleReviewClick = (review: GoogleReview) => {
    setSelectedPost(review);
    setIsOpen(true);
  };

  return (
    <>
      <Section className={cn('relative space-y-6 sm:space-y-7', className)}>
        <ScrollReveal animation="slideUp" delay={0.2} threshold={0.3}>
          <div className="space-y-3 text-center sm:space-y-4">
            <h1 className="text-3xl font-medium sm:text-4xl md:text-5xl">
              住客評論
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              住客分享他們在蘊慢築的美好回憶與真實體驗
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeIn" delay={0.4} threshold={0.2}>
          <div className="flex w-full flex-col gap-2 overflow-hidden sm:gap-3">
            <Marquee
              pauseOnHover
              className="p-0 [--duration:75s] [--gap:0.5rem] sm:[--duration:60s] sm:[--gap:0.75rem]"
            >
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <ReviewCard
                        key={`skeleton-1-${index}`}
                        isLoading={true}
                      />
                    ))
                : firstRow.map((review) => (
                    <ReviewCard
                      key={review.reviewId}
                      isLoading={false}
                      onClick={handleReviewClick}
                      {...review}
                    />
                  ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="p-0 [--duration:75s] [--gap:0.5rem] sm:[--duration:60s] sm:[--gap:0.75rem]"
            >
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <ReviewCard
                        key={`skeleton-2-${index}`}
                        isLoading={true}
                      />
                    ))
                : secondRow.map((review) => (
                    <ReviewCard
                      key={review.reviewId}
                      isLoading={false}
                      onClick={handleReviewClick}
                      {...review}
                    />
                  ))}
            </Marquee>
            <Marquee
              pauseOnHover
              className="p-0 [--duration:75s] [--gap:0.5rem] sm:[--duration:60s] sm:[--gap:0.75rem]"
            >
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <ReviewCard
                        key={`skeleton-3-${index}`}
                        isLoading={true}
                      />
                    ))
                : thirdRow.map((review) => (
                    <ReviewCard
                      key={review.reviewId}
                      isLoading={false}
                      onClick={handleReviewClick}
                      {...review}
                    />
                  ))}
            </Marquee>
          </div>
        </ScrollReveal>

        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r sm:left-4 sm:w-16 lg:left-12 lg:w-24"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l sm:right-4 sm:w-16 lg:right-12 lg:w-24"></div>
      </Section>
      <AnimatePresence>{isOpen && <ReviewPost />}</AnimatePresence>
    </>
  );
};

export const ReviewPost = () => {
  const { selectedPost, exit } = useReviews();

  if (!selectedPost) return null;

  const formattedDate = format(
    new Date(selectedPost.updateTime),
    'yyyy年MM月dd日',
    {
      locale: zhTW,
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="bg-background fixed inset-0 z-50 overflow-hidden"
    >
      <motion.div
        initial={{
          clipPath: `circle(0% at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
        }}
        animate={{
          clipPath: `circle(150% at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
        }}
        exit={{
          clipPath: `circle(0% at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="h-full w-full overflow-y-auto"
      >
        <div className="relative mx-auto h-full max-w-4xl p-4 sm:p-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="absolute top-4 right-4 rounded-full p-2 hover:bg-emerald-50 sm:top-6 sm:right-6 dark:hover:bg-emerald-50/20"
            onClick={exit}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="pt-10 sm:pt-12"
          >
            <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <Image
                className="size-12 rounded-full sm:size-16"
                width={64}
                height={64}
                alt={`reviewer-${selectedPost.reviewer.displayName}-avatar`}
                src={selectedPost.reviewer.profilePhotoUrl}
              />
              <div className="space-y-1">
                <h2 className="text-xl font-medium sm:text-2xl">
                  {selectedPost.reviewer.displayName}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={cn(
                          'h-5 w-5',
                          index < selectedPost.starRating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 pb-8 sm:space-y-6 sm:pb-10"
            >
              <p className="text-base leading-relaxed text-gray-700 sm:text-lg dark:text-gray-200">
                {selectedPost.comment}
              </p>

              {selectedPost.reviewReply && (
                <div className="mt-8 rounded-lg bg-emerald-50 p-4 dark:bg-emerald-800/20">
                  <h3 className="mb-2 font-medium">民宿回覆</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedPost.reviewReply.comment}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {format(
                      new Date(selectedPost.reviewReply.updateTime),
                      'yyyy年MM月dd日',
                      {
                        locale: zhTW,
                      }
                    )}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
