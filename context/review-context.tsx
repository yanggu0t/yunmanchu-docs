'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import { GoogleReview } from '@/types/reviews';

type ReviewsContextType = {
  selectedPost: GoogleReview | null;
  setSelectedPost: (post: GoogleReview | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  exit: () => void;
};

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [selectedPost, setSelectedPost] = useState<GoogleReview | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const exit = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedPost(null);
    }, 200);
  };

  return (
    <ReviewsContext.Provider
      value={{ selectedPost, setSelectedPost, isOpen, setIsOpen, exit }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context)
    throw new Error('useReviews must be used within ReviewsProvider');
  return context;
};
