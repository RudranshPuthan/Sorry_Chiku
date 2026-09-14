import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LotusSVG from './LotusSVG';

export default function LoadingScreen({ onFinish }) {
  const [bloom, setBloom] = useState(false);

  useEffect(() => {
    // Start petal bloom shortly after mount
    const bloomTimer = setTimeout(() => {
      setBloom(true);
    }, 200);

    // Trigger completion after bloom animation completes
    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2200);

    return () => {
      clearTimeout(bloomTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gradient-to-b from-blush-50 via-blush-100 to-lavender-pink select-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Soft background glow pulse */}
      <div className="absolute w-96 h-96 rounded-full bg-pink-soft/25 blur-3xl animate-pulse pointer-events-none" />

      {/* Opening Lotus Flower */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10"
      >
        <LotusSVG size={260} isBloomed={bloom} interactive={false} />
      </motion.div>

      {/* Gentle Loading Text */}
      <motion.div
        className="mt-6 text-center z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="font-script text-2xl md:text-3xl text-magenta-deep tracking-wide">
          Opening a letter for Chiku...
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <span className="w-2 h-2 rounded-full bg-pink-hot animate-ping" />
          <span className="w-2 h-2 rounded-full bg-pink-soft" />
          <span className="w-2 h-2 rounded-full bg-rose-gold" />
        </div>
      </motion.div>
    </motion.div>
  );
}
