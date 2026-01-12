'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { createPortal } from 'react-dom';

import type { CarouselImage } from '@/lib/images';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

interface ImageGalleryProps {
  images: CarouselImage[];
  className?: string;
}

// ============================================================================
// ImageGallery - Main Component
// ============================================================================

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Track scroll position to update indicators
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const { scrollLeft, clientWidth } = container;
    const center = scrollLeft + clientWidth / 2;

    let bestIndex = 0;
    let minDiff = Infinity;

    Array.from(container.children).forEach((child, i) => {
      const el = child as HTMLElement;
      // Calculate distance from center of view to center of item
      const itemCenter = el.offsetLeft + el.offsetWidth / 2;
      const diff = Math.abs(itemCenter - center);

      if (diff < minDiff) {
        minDiff = diff;
        bestIndex = i;
      }
    });

    setCurrentIndex(bestIndex);
  }, []);

  // Scroll to specific image
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const child = container.children[index] as HTMLElement;

    if (child) {
      // Scroll to center the item
      const scrollLeft =
        child.offsetLeft - (container.clientWidth - child.offsetWidth) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, []);

  // Open lightbox
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <>
      <div className={cn('relative w-full', className)}>
        {/* Scrollable container with native scroll-snap */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="gallery-scroll scrollbar-hide flex gap-4 overflow-x-auto pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {images.map((image, index) => (
            <button
              key={image.key}
              type="button"
              onClick={() => openLightbox(index)}
              className="gallery-item group focus-visible:ring-primary flex-shrink-0 cursor-zoom-in focus:outline-none focus-visible:ring-2"
              style={{
                scrollSnapAlign: 'start',
              }}
              aria-label={`查看圖片：${image.alt}`}
            >
              {/* Bento-style card - clean rounded corners, soft shadow */}
              <div className="relative flex h-48 w-auto items-center justify-center overflow-hidden rounded-2xl shadow-lg ring-1 shadow-black/5 ring-black/5 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-black/10 md:h-56 dark:ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-auto max-w-none object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-3 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                'size-2 rounded-full transition-all duration-200 ease-out',
                currentIndex === index
                  ? 'scale-125 bg-neutral-800 dark:bg-white'
                  : 'bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500'
              )}
              aria-label={`前往第 ${index + 1} 張圖片`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Portal */}
      {lightboxOpen && (
        <ImageGalleryLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Hide scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-scroll {
            scroll-behavior: auto;
          }
          .gallery-item,
          .gallery-item > div {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}

// ============================================================================
// ImageGalleryLightbox - Fullscreen Viewer
// ============================================================================

interface LightboxProps {
  images: CarouselImage[];
  initialIndex: number;
  onClose: () => void;
}

function ImageGalleryLightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount check for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll to initial index on mount
  useEffect(() => {
    if (scrollRef.current && mounted) {
      const itemWidth = window.innerWidth;
      scrollRef.current.scrollLeft = initialIndex * itemWidth;
    }
  }, [initialIndex, mounted]);

  // Track scroll for current index
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const itemWidth = window.innerWidth;
    const index = Math.round(scrollLeft / itemWidth);
    setCurrentIndex(Math.min(Math.max(index, 0), images.length - 1));
  }, [images.length]);

  // Scroll to specific index
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const itemWidth = window.innerWidth;
    scrollRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth',
    });
  }, []);

  // Navigation
  const goNext = useCallback(() => {
    const next = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(next);
  }, [currentIndex, images.length, scrollToIndex]);

  const goPrev = useCallback(() => {
    const prev = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    scrollToIndex(prev);
  }, [currentIndex, images.length, scrollToIndex]);

  // Close with animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, goNext, goPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  const lightboxContent = (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-md',
        isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
      )}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="圖片瀏覽器"
    >
      {/* Header */}
      <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between p-4">
        {/* Counter */}
        <div className="rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 ease-out hover:scale-105 hover:bg-white/20 active:scale-95"
          aria-label="關閉"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Main image carousel with native scroll-snap */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full w-full overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.key}
            className="flex h-full w-screen flex-shrink-0 items-center justify-center p-4 md:p-16"
            style={{ scrollSnapAlign: 'center' }}
          >
            {/* Native img for correct click target size */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[85vh] max-w-[90vw] cursor-default object-contain shadow-2xl drop-shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows - Hidden on mobile */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute top-1/2 left-4 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 ease-out hover:scale-110 hover:bg-white/25 active:scale-95 md:left-6 md:flex"
        aria-label="上一張"
      >
        <ChevronLeft className="size-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute top-1/2 right-4 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 ease-out hover:scale-110 hover:bg-white/25 active:scale-95 md:right-6 md:flex"
        aria-label="下一張"
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 px-4 py-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              scrollToIndex(index);
            }}
            className={cn(
              'size-2 rounded-full transition-all duration-200 ease-out',
              currentIndex === index
                ? 'scale-125 bg-white'
                : 'bg-white/40 hover:bg-white/60'
            )}
            aria-label={`前往第 ${index + 1} 張圖片`}
          />
        ))}
      </div>

      {/* Inline animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 0.2s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-fadeOut {
            animation: none !important;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );

  return createPortal(lightboxContent, document.body);
}

// ============================================================================
// Re-export for backwards compatibility
// ============================================================================

export { ImageGallery as default };
