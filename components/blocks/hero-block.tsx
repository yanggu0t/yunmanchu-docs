'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';

import { Floating, FloatingElement } from '@/components/ui/parallax-floating';
import { TextRotate } from '@/components/ui/text-rotate';

import { BookingDialog } from '../web/booking-dialog';

const exampleImages = [
  {
    url: 'https://qmq1tsxpep.ufs.sh/f/cmdfn1sbJFz4VGWJbMBnHPa6ik5gfbBMmsEQI8R0xvtqJ7z2',
    title: '大廳',
  },
  {
    url: 'https://qmq1tsxpep.ufs.sh/f/cmdfn1sbJFz4nsMe8JffjZwMH94VKQ6q1DNoWPxJtSzgrv2a',
    title: '招牌',
  },
  {
    url: 'https://qmq1tsxpep.ufs.sh/f/cmdfn1sbJFz4W6aIqoLJFB9qUgjeoLklS26w5yhpMDO7YiZn',
    title: '門口植栽',
  },
  {
    url: 'https://qmq1tsxpep.ufs.sh/f/cmdfn1sbJFz4koCMiW88f1jrwqcdlEuYDLG3Fp6WxN5izMTP',
    title: '附近的田',
  },
  {
    url: 'https://qmq1tsxpep.ufs.sh/f/cmdfn1sbJFz4uGglZjmToBWJ6lZnpmEQDCt1Vusjicr8ShwI',
    title: '茶跟花藝',
  },
];

function LandingHero() {
  return (
    <section className="relative grid min-h-[calc(100vh-3.5rem)] w-full place-content-center overflow-hidden lg:min-h-[calc(100vh-3rem)]">
      <Floating sensitivity={-0.5} className="top-14 lg:top-12">
        <FloatingElement
          depth={0.5}
          className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative h-12 w-16 transition-transform hover:scale-105 sm:h-16 sm:w-24 md:h-20 md:w-28 lg:h-24 lg:w-32"
          >
            <Image
              fill
              src={exampleImages[0].url}
              alt={exampleImages[0].title}
              className="-rotate-[3deg] rounded-xl object-cover shadow-2xl"
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative h-28 w-40 transition-transform hover:scale-105 sm:h-36 sm:w-48 md:h-44 md:w-56 lg:h-48 lg:w-60"
          >
            <Image
              fill
              src={exampleImages[1].url}
              alt={exampleImages[1].title}
              className="-rotate-12 rounded-xl object-cover shadow-2xl"
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="relative h-40 w-40 transition-transform hover:scale-105 sm:h-48 sm:w-48 md:h-60 md:w-60 lg:h-64 lg:w-64"
          >
            <Image
              fill
              src={exampleImages[2].url}
              alt={exampleImages[2].title}
              className="-rotate-[4deg] rounded-xl object-cover shadow-2xl"
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="relative h-36 w-40 transition-transform hover:scale-105 sm:h-44 sm:w-48 md:h-52 md:w-60 lg:h-56 lg:w-64"
          >
            <Image
              fill
              src={exampleImages[3].url}
              alt={exampleImages[3].title}
              className="rotate-[6deg] rounded-xl object-cover shadow-2xl"
            />
          </motion.div>
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="relative h-44 w-44 transition-transform hover:scale-105 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80"
          >
            <Image
              fill
              src={exampleImages[4].url}
              alt={exampleImages[4].title}
              className="rotate-[19deg] rounded-xl object-cover shadow-2xl"
            />
          </motion.div>
        </FloatingElement>
      </Floating>
      <div className="pointer-events-auto z-10 flex w-[250px] flex-col items-center justify-center sm:w-[300px] md:w-[500px] lg:w-[700px]">
        <motion.h1
          className="flex w-full flex-col items-center justify-center space-y-1 text-center text-4xl leading-tight tracking-tight whitespace-pre sm:text-5xl md:space-y-4 md:text-6xl lg:text-7xl 2xl:text-8xl"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut', delay: 0.3 }}
        >
          <span>蘊慢築民宿</span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              >
                前來體驗{' '}
              </motion.span>
              <TextRotate
                texts={[
                  '🍵 茶香時光',
                  '🌸 花藝雅趣',
                  '🌿 植栽靜謐',
                  '☕ 咖啡香氣',
                  '🥗 蔬食美味',
                ]}
                mainClassName="overflow-hidden pr-3 text-primary py-0 pb-2 md:pb-4 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="font-overusedGrotesk pt-4 text-center text-base sm:pt-8 sm:text-lg md:pt-10 md:text-xl lg:pt-12 2xl:text-2xl"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut', delay: 0.5 }}
        >
          以茶香、花藝與自然共生，打造回歸純粹生活的療癒空間，讓每位旅人感受慢活之美
        </motion.p>

        <div className="mt-10 flex flex-row items-center justify-center space-x-4 text-base sm:mt-16 md:mt-20 lg:mt-20">
          <motion.button
            className="text-background bg-foreground z-20 rounded-full px-4 py-2 font-semibold tracking-tight shadow-2xl sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-3 lg:text-xl"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: 'spring', damping: 30, stiffness: 400 },
            }}
          >
            <Link href="/docs/introductions">查看更多</Link>
          </motion.button>
          <BookingDialog />
        </div>
      </div>
    </section>
  );
}

export { LandingHero };
