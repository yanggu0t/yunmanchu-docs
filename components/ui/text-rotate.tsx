'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AnimatePresence,
  AnimatePresenceProps,
  motion,
  MotionProps,
  Transition,
} from 'motion/react';

import { cn } from '@/lib/utils';

interface TextRotateProps {
  texts: string[];
  rotationInterval?: number;
  initial?: MotionProps['initial'];
  animate?: MotionProps['animate'];
  exit?: MotionProps['exit'];
  animatePresenceMode?: AnimatePresenceProps['mode'];
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | number | 'random';
  transition?: Transition;
  loop?: boolean; // Whether to start from the first text when the last one is reached
  auto?: boolean; // Whether to start the animation automatically
  splitBy?: 'words' | 'characters' | 'lines' | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

const TextRotate: React.FC<TextRotateProps> = ({
  texts,
  transition = { type: 'spring', damping: 25, stiffness: 300 },
  initial = { y: '100%', opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: '-120%', opacity: 0 },
  animatePresenceMode = 'wait',
  animatePresenceInitial = false,
  rotationInterval = 2000,
  staggerDuration = 0,
  staggerFrom = 'first',
  loop = true,
  auto = true,
  splitBy = 'characters',
  onNext,
  mainClassName,
  splitLevelClassName,
  elementLevelClassName,
  ...props
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // handy function to split text into characters with support for unicode and emojis
  const splitIntoCharacters = (text: string): string[] => {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(text), ({ segment }) => segment);
    }
    // Fallback for browsers that don't support Intl.Segmenter
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === 'characters') {
      const text = currentText.split(' ');
      return text.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== text.length - 1,
      }));
    }
    return splitBy === 'words'
      ? currentText.split(' ')
      : splitBy === 'lines'
        ? currentText.split('\n')
        : currentText.split(splitBy);
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index: number, totalChars: number) => {
      const total = totalChars;
      if (staggerFrom === 'first') return index * staggerDuration;
      if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
      if (staggerFrom === 'center') {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === 'random') {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  // Helper function to handle index changes and trigger callback
  const handleIndexChange = useCallback(
    (newIndex: number) => {
      setCurrentTextIndex(newIndex);
      onNext?.(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;

    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span
      className={cn('flex whitespace-pre-wrap', mainClassName)}
      {...props}
      layout
      transition={transition}
    >
      <span className="sr-only">{texts[currentTextIndex]}</span>

      <AnimatePresence
        mode={animatePresenceMode}
        initial={animatePresenceInitial}
      >
        <motion.div
          key={currentTextIndex}
          className={cn('flex', splitBy === 'lines' && 'w-full flex-col')}
          layout
          aria-hidden="true"
        >
          {(splitBy === 'characters'
            ? (elements as WordObject[])
            : (elements as string[]).map((el, i) => ({
                characters: [el],
                needsSpace: i !== elements.length - 1,
              }))
          ).map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);

            return (
              <span
                key={wordIndex}
                className={cn('inline-flex', splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    key={charIndex}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce(
                          (sum, word) => sum + word.characters.length,
                          0
                        )
                      ),
                    }}
                    className={cn('inline-block', elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && (
                  <span className="whitespace-pre"> </span>
                )}
              </span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
};

TextRotate.displayName = 'TextRotate';

export { TextRotate };
