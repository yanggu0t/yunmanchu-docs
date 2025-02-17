'use client';

import React from 'react';

import { CarouselImage } from '@/lib/images';
import { cn } from '@/lib/utils';

import { ImageZoom } from '../fumadocs/image-zoom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  type CarouselProps,
} from '../ui/carousel';

export const ImageCarousel = ({
  images,
  aspectRatio,
  ...props
}: React.ComponentProps<'div'> &
  CarouselProps & { images: Array<CarouselImage>; aspectRatio: string }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      {...props}
      opts={{
        loop: true,
        dragFree: true,
        align: 'start',
      }}
      setApi={setApi}
      className="w-full max-w-5xl"
    >
      <CarouselContent className="-ml-3">
        {images.map((image) => (
          <CarouselItem
            key={image.key}
            className="pl-3 md:basis-1/2 lg:basis-1/3"
          >
            <div className="border-fd-muted-foreground overflow-hidden rounded-xl border p-2">
              <div className={cn('w-full', aspectRatio)}>
                <ImageZoom
                  className="rounded-lg object-cover"
                  aspectRatio={aspectRatio}
                  src={image.src}
                  alt={image.alt}
                  fill
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-2 flex justify-center gap-2 py-2">
        {Array.from({ length: images.length }).map((_, index) => (
          <button
            key={index}
            className={cn(
              'size-2.5 rounded-full transition-colors duration-200',
              current - 1 === index
                ? 'bg-foreground dark:bg-white'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/70 dark:bg-muted-foreground/50 dark:hover:bg-muted-foreground/80'
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/8 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/8 bg-gradient-to-l"></div>
    </Carousel>
  );
};
