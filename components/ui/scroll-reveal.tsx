'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

import {
  ScrollRevealProps,
  ScrollRevealSectionProps,
  UseScrollRevealOptions,
  UseScrollRevealReturn,
} from '@/types/scroll-reveal';

// Animation variants for different types
const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
} as const;

export type AnimationType = keyof typeof animationVariants;

export function ScrollReveal({
  children,
  animation = 'slideUp',
  variants,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  className,
  stagger = false,
  staggerDelay = 0.1,
  ease = [0.25, 0.4, 0.25, 1],
  motionProps = {},
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });
  const controls = useAnimation();

  const selectedVariants = variants || animationVariants[animation];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className={className}
        {...motionProps}
      >
        {Array.isArray(children)
          ? children.map((child, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: selectedVariants.hidden,
                  visible: {
                    ...selectedVariants.visible,
                    transition: {
                      duration,
                      ease,
                    },
                  },
                }}
              >
                {child}
              </motion.div>
            ))
          : children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: selectedVariants.hidden,
        visible: {
          ...selectedVariants.visible,
          transition: {
            duration,
            ease,
            delay,
          },
        },
      }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// Hook version for more advanced use cases
export function useScrollReveal({
  threshold = 0.1,
  once = true,
}: UseScrollRevealOptions = {}): UseScrollRevealReturn {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { amount: threshold, once });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  return { ref, isInView, controls };
}

// Wrapper component for sections

export function ScrollRevealSection({
  children,
  as: Component = 'section',
  animation = 'slideUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  className,
  ...props
}: ScrollRevealSectionProps) {
  return (
    <ScrollReveal
      animation={animation}
      delay={delay}
      duration={duration}
      threshold={threshold}
      className={className}
      {...props}
    >
      <Component className="w-full">{children}</Component>
    </ScrollReveal>
  );
}

// Pre-configured components for common use cases
export const FadeInOnScroll = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <ScrollReveal animation="fadeIn" delay={delay} className={className}>
    {children}
  </ScrollReveal>
);

export const SlideUpOnScroll = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <ScrollReveal animation="slideUp" delay={delay} className={className}>
    {children}
  </ScrollReveal>
);

export const ScaleOnScroll = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <ScrollReveal animation="scale" delay={delay} className={className}>
    {children}
  </ScrollReveal>
);

// Staggered animation wrapper
export const StaggeredReveal = ({
  children,
  staggerDelay = 0.1,
  animation = 'slideUp',
  className,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  animation?: AnimationType;
  className?: string;
}) => (
  <ScrollReveal
    animation={animation}
    stagger={true}
    staggerDelay={staggerDelay}
    className={className}
  >
    {children}
  </ScrollReveal>
);
