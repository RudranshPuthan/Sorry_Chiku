import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import LotusSVG from './LotusSVG';
import { Heart, Sparkles } from 'lucide-react';

export default function ForgiveMeCTA() {
  const [hasForgiven, setHasForgiven] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const words = ["Please", "forgive", "me,", "Chiku"];

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
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const triggerCelebration = (e) => {
    setHasForgiven(true);
    setClickCount((prev) => prev + 1);

    const isMobile = window.innerWidth < 768;

    // Calculate click coordinates for confetti origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Custom heart shape for canvas-confetti
    let heartShape;
    try {
      heartShape = confetti.shapeFromPath({
        path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z'
      });
    } catch (err) {
      heartShape = 'circle';
    }

    const confettiColors = ['#FF69B4', '#FFB6C1', '#C2185B', '#F8C8DC', '#FFFFFF', '#FFE4EC'];

    // Burst 1: Immediate focused blast from button
    confetti({
      origin: { x, y },
      particleCount: isMobile ? 40 : 60,
      spread: isMobile ? 60 : 70,
      startVelocity: isMobile ? 28 : 35,
      colors: confettiColors,
      shapes: [heartShape, 'circle'],
      scalar: 1.1,
    });

    // Burst 2 & 3: Delayed wide celebratory cannons from sides
    setTimeout(() => {
      confetti({
        particleCount: isMobile ? 30 : 50,
        angle: 60,
        spread: 50,
        origin: { x: 0.1, y: 0.8 },
        colors: confettiColors,
        shapes: [heartShape, 'circle'],
      });
      confetti({
        particleCount: isMobile ? 30 : 50,
        angle: 120,
        spread: 50,
        origin: { x: 0.9, y: 0.8 },
        colors: confettiColors,
        shapes: [heartShape, 'circle'],
      });
    }, 220);
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center py-14 sm:py-20 px-4 text-center hero-gradient-bg overflow-hidden select-none">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[32rem] h-72 sm:h-[32rem] bg-pink-soft/25 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none" />

      <div className="max-w-3xl mx-auto flex flex-col items-center z-10 w-full pt-4">
        {/* Closing Heading with Word-Grouped Letter Reveal */}
        <motion.h2
          variants={letterContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-serif font-bold text-3xl sm:text-5xl md:text-7xl text-magenta-deep heading-glow mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1"
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
            className="inline-block text-2xl sm:text-5xl md:text-6xl filter drop-shadow-md ml-0.5"
          >
            🪷💗
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-script text-xl sm:text-3xl text-magenta-deep/80 mb-6 sm:mb-8 max-w-lg"
        >
          Promise to never let you down again.
        </motion.p>

        {/* Center Blooming Lotus with spring physics on forgiveness */}
        <motion.div
          animate={{
            scale: hasForgiven ? [1, 1.15, 1.05] : 1,
            rotate: hasForgiven ? [0, -3, 3, 0] : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 220,
            damping: 12,
            mass: 0.8,
          }}
          className="my-2 sm:my-4"
        >
          <div className="block sm:hidden">
            <LotusSVG
              size={185}
              isBloomed={true}
              interactive={true}
              bloomProgress={hasForgiven ? 1 : 0.85}
            />
          </div>
          <div className="hidden sm:block">
            <LotusSVG
              size={230}
              isBloomed={true}
              interactive={true}
              bloomProgress={hasForgiven ? 1 : 0.85}
            />
          </div>
        </motion.div>

        {/* Large Prominent Forgive Button */}
        <div className="mt-4 sm:mt-6 mb-3 sm:mb-4 w-full sm:w-auto px-4">
          <motion.button
            onClick={triggerCelebration}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className={`relative group w-full sm:w-auto px-7 sm:px-12 py-3.5 sm:py-5 rounded-full font-serif font-bold text-base sm:text-2xl text-white shadow-[0_10px_35px_rgba(255,105,180,0.45)] transition-all duration-300 min-h-[54px] active:scale-95 touch-manipulation ${
              hasForgiven
                ? 'bg-gradient-to-r from-pink-hot via-magenta-deep to-pink-hot animate-pulse'
                : 'bg-gradient-to-r from-pink-hot to-magenta-deep hover:shadow-[0_12px_45px_rgba(255,105,180,0.6)]'
            }`}
          >
            {/* Pulsing button halo */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-soft to-pink-hot opacity-40 group-hover:opacity-75 blur-md transition duration-500 animate-pulse -z-10" />

            <span className="relative flex items-center justify-center gap-2 sm:gap-3">
              <span>{hasForgiven ? 'Thank You For Forgiving Me' : 'I forgive you'}</span>
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-current animate-heartbeat" />
            </span>
          </motion.button>
        </div>

        {/* Celebratory Message Revealed After Clicking */}
        <AnimatePresence>
          {hasForgiven && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="mt-4 sm:mt-6 p-5 sm:p-8 rounded-2xl sm:rounded-3xl glass-card border-pink-hot/40 max-w-md w-full shadow-[0_15px_40px_rgba(255,105,180,0.3)] select-text"
            >
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-hot animate-spin-slow flex-shrink-0" />
                <span className="font-script text-2xl sm:text-4xl text-magenta-deep font-bold leading-tight">
                  Yay! 🎉 I love you, Chiku.
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-hot animate-spin-slow flex-shrink-0" />
              </div>
              <p className="font-sans text-xs sm:text-sm text-ink/75 mt-2">
                You're the best friend in the entire multiverse. Thank you for being you! 🌸
              </p>
              {clickCount > 1 && (
                <p className="font-script text-lg text-pink-hot mt-3">
                  (Loved {clickCount} times over! ✨)
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Bottom Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="font-script text-sm sm:text-base text-magenta-deep/60">
          forever & always · with all my love
        </p>
      </div>
    </section>
  );
}
