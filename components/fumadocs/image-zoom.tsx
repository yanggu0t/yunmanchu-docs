'use client';

import React, { type ImgHTMLAttributes } from 'react';
import Image, { type ImageProps } from 'next/image';
import Zoom, { type ControlledProps } from 'react-medium-image-zoom';

import '@/components/fumadocs/image-zoom.css';

import { cn } from '@/lib/utils';

export type ImageZoomProps = ImageProps & {
  aspectRatio: string;
  /**
   * Image props when zoom in
   */
  zoomInProps?: ImgHTMLAttributes<HTMLImageElement>;

  /**
   * Props for `react-medium-image-zoom`
   */
  rmiz?: ControlledProps;
};

function getImageSrc(src: ImageProps['src']): string {
  if (typeof src === 'string') return src;
  if ('default' in src) return src.default.src;
  return src.src;
}

const getZoomMargin = () => {
  if (typeof window === 'undefined') return 60;
  const width = window.innerWidth;

  if (width < 640) return 20; // sm
  if (width < 768) return 55; // md
  if (width < 1024) return 70; // lg
  if (width < 1280) return 85; // xl
  return 100;
};

export function ImageZoom({
  zoomInProps,
  children,
  rmiz,
  aspectRatio,
  ...props
}: ImageZoomProps) {
  return (
    <Zoom
      {...rmiz}
      wrapElement="span"
      classDialog="group relative h-full w-full"
      zoomMargin={getZoomMargin()}
      zoomImg={{
        src: getImageSrc(props.src),
        sizes: undefined,
        ...zoomInProps,
      }}
      ZoomContent={ZoomedContent}
    >
      <div className={cn('relative w-full', aspectRatio)}>
        {children ?? (
          <Image
            {...props}
            alt={props.alt}
            className={cn('!my-0', props.className)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
            width={undefined}
            height={undefined}
          />
        )}
      </div>
    </Zoom>
  );
}

const ZoomedContent = (
  data: Parameters<Required<ControlledProps>['ZoomContent']>[0]
) => {
  return (
    <div className="group">
      {data.img}
      {data.buttonUnzoom}
    </div>
  );
};
