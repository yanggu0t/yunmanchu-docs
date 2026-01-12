'use client';

/**
 * ImageCarousel - Backwards compatibility wrapper
 *
 * NOTE: This file re-exports ImageGallery for API compatibility.
 * All new code should import from image-gallery.tsx directly.
 */
import type { CarouselImage } from '@/lib/images';

import { ImageGallery } from './image-gallery';

export interface ImageCarouselProps {
  images: CarouselImage[];
  /** @deprecated aspectRatio is no longer used */
  aspectRatio?: string;
  className?: string;
}

export function ImageCarousel({
  images,
  // aspectRatio is deprecated and ignored
  className,
}: ImageCarouselProps) {
  return <ImageGallery images={images} className={className} />;
}
