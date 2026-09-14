import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import LotusSVG from './LotusSVG';

export default function Hero() {
  const words = ["I'm", "Sorry,", "Chiku"];

  const letterContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const scrollToNext = () => {
    const el = document.getElementById('apology');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-between py-8 sm:py-12 px-4 text-center hero-gradient-bg overflow-hidden select-none">
      {/* Soft background ambient radial orbs */}
      <div className="absolute top-1/4 -left-12 sm:-left-20 w-56 sm:w-72 h-56 sm:h-72 bg-pink-soft/25 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-12 sm:-right-20 w-60 sm:w-80 h-60 sm:h-80 bg-lavender-pink/35 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />

      <div className="m-auto flex flex-col items-center justify-center max-w-3xl z-10 w-full pt-4 sm:pt-8">
        {/* Animated Heading with Word-Grouped Wrapping for Perfect Mobile Layout */}
        <motion.h1
          variants={letterContainerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-magenta-deep tracking-tight heading-glow mb-2 sm:mb-4 flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 gap-y-1"
        >
          {words.map((word, wIdx) => (
            <span key={wIdx} className="inline-flex">
              {word.split('').map((char, cIdx) => (
                <motion.span key={cIdx} variants={letterVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
          <motion.span
            variants={letterVariants}
            className="inline-block text-3xl sm:text-5xl md:text-6xl filter drop-shadow-md ml-0.5"
          >
            🪷
          </motion.span>
        </motion.h1>

        {/* Centerpiece Blooming Lotus - responsive sizing */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="my-1 sm:my-3"
        >
          <div className="block sm:hidden">
            <LotusSVG size={185} isBloomed={true} interactive={true} />
          </div>
          <div className="hidden sm:block">
            <LotusSVG size={240} isBloomed={true} interactive={true} />
          </div>
        </motion.div>

        {/* Dancing Script Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: 'easeOut' }}
          className="font-script text-2xl sm:text-3xl md:text-4xl text-magenta-deep/85 font-medium tracking-wide mt-1"
        >
          a little letter, just for you
        </motion.p>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="z-10 pb-4 flex flex-col items-center cursor-pointer group"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="font-sans text-xs tracking-widest uppercase text-magenta-deep/70 mb-1 group-hover:text-magenta-deep transition-colors">
          scroll down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="p-1 rounded-full bg-white/40 backdrop-blur-sm border border-pink-soft/50 shadow-sm"
        >
          <ChevronDown className="w-5 h-5 text-magenta-deep" />
        </motion.div>
      </motion.div>
    </section>
  );
}
