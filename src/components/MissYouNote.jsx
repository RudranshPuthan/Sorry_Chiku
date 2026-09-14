import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { Heart, Clock, CalendarHeart } from 'lucide-react';

const missYouSentences = [
  "I miss you so much Chiku.",
  "Main tere bina bilkul nahi reh paa raha.",
  "Mujhe teri bohat yaad aa rahi hai.",
  "Mujhe tere paas aana hai.",
  "Tujhe zor se hug karna hai.",
  "Tere gaal kheechne hai.",
  "Pata nahi ye bacha hua hafta kaise niklega.",
  "Tere bina har moment ek decade barabar hai mere liye.",
  "I really really miss you Chiku."
];

export default function MissYouNote() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35, // Slower emotional pacing
        delayChildren: 0.4,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.3, // Slow gentle fade-in, no aggressive slide
        ease: 'easeOut',
      },
    },
  };

  return (
    <SectionWrapper
      id="miss-you"
      className="bg-gradient-to-b from-blush-100/70 via-rose-gold/20 to-blush-50 py-20"
    >
      <div className="flex flex-col items-center">
        {/* Intimate Header with Heartbeat Icon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center mb-8"
        >
          {/* Heartbeat pulsing icon (quick double beat then pause) */}
          <motion.div
            className="w-14 h-14 rounded-full bg-pink-soft/25 border border-pink-soft/50 flex items-center justify-center mb-4 shadow-sm"
            animate={{
              scale: [1, 1.2, 1.05, 1.24, 1, 1],
            }}
            transition={{
              duration: 1.3,
              repeat: Infinity,
              times: [0, 0.15, 0.3, 0.45, 0.65, 1],
              ease: 'easeInOut',
            }}
          >
            <Heart className="w-7 h-7 text-pink-hot fill-pink-hot" />
          </motion.div>

          <h2 className="font-serif italic font-medium text-3xl sm:text-5xl md:text-6xl text-magenta-deep tracking-tight text-center">
            I miss you
          </h2>
        </motion.div>

        {/* Vintage Ticket / Countdown Badge (Mobile optimized) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-6 sm:mb-8 max-w-full px-2"
        >
          <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-white/80 border-2 border-dashed border-pink-soft/90 shadow-[0_4px_16px_rgba(255,182,193,0.25)] backdrop-blur-sm select-none">
            <CalendarHeart className="w-4 h-4 text-pink-hot flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-wider text-magenta-deep">
                Bacha Hua Hafta
              </span>
              <span className="text-[11px] sm:text-xs text-ink/75 font-sans">
                Every moment feels like a decade without you
              </span>
            </div>
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-hot animate-pulse flex-shrink-0 ml-0.5" />
          </div>
        </motion.div>

        {/* Glassmorphism Card with Slow Pacing */}
        <motion.div
          className="w-full max-w-[720px] glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 relative"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1 }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4 text-left leading-relaxed font-sans"
          >
            {missYouSentences.map((sentence, idx) => (
              <motion.p
                key={idx}
                variants={lineVariants}
                className={`text-sm sm:text-base md:text-lg ${idx === 0 || idx === 8
                    ? 'font-medium text-magenta-deep'
                    : idx === 6 || idx === 7
                      ? 'text-ink font-medium italic'
                      : 'text-ink/85'
                  }`}
              >
                {sentence}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
