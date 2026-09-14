import React from 'react';
import { motion } from 'framer-motion';

export default function SectionWrapper({
  children,
  id,
  className = '',
  showDivider = true,
  dividerDark = false,
}) {
  const containerVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.18,
      },
    },
  };

  return (
    <section id={id} className={`relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {children}
      </motion.div>

      {/* Elegant Lotus Section Divider */}
      {showDivider && (
        <div className="flex items-center justify-center gap-3 mt-16 md:mt-24 opacity-60">
          <div
            className={`h-[1px] w-16 sm:w-28 ${
              dividerDark
                ? 'bg-gradient-to-r from-transparent to-pink-soft/40'
                : 'bg-gradient-to-r from-transparent to-pink-soft'
            }`}
          />
          <span className="text-base sm:text-lg select-none filter drop-shadow-sm">🪷</span>
          <div
            className={`h-[1px] w-16 sm:w-28 ${
              dividerDark
                ? 'bg-gradient-to-l from-transparent to-pink-soft/40'
                : 'bg-gradient-to-l from-transparent to-pink-soft'
            }`}
          />
        </div>
      )}
    </section>
  );
}
