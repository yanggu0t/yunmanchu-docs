import { Variants } from 'framer-motion';

export interface ScrollRevealConfig {
  /** Animation type to use */
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'scaleDown' | 'rotateIn';
  /** Custom animation variants */
  variants?: Variants;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Animation duration (in seconds) */
  duration?: number;
  /** When to trigger the animation (0-1, where 1 means fully visible) */
  threshold?: number;
  /** Whether animation should trigger only once */
  once?: boolean;
  /** Whether to add stagger to child elements */
  stagger?: boolean;
  /** Stagger delay between children (in seconds) */
  staggerDelay?: number;
  /** Custom easing function */
  ease?: string | number[];
}

export interface ScrollRevealProps extends ScrollRevealConfig {
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Additional motion props */
  motionProps?: Record<string, any>;
}

export interface ScrollRevealSectionProps extends ScrollRevealProps {
  /** Section semantic tag */
  as?: 'section' | 'div' | 'article' | 'main';
}

export interface UseScrollRevealOptions {
  threshold?: number;
  once?: boolean;
}

export interface UseScrollRevealReturn {
  ref: React.RefObject<HTMLElement | null>;
  isInView: boolean;
  controls: any; // Framer Motion AnimationControls
}