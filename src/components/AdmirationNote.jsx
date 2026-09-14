import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { Sparkles, Heart } from 'lucide-react';

const admirationSentences = [
  "I love you so much Chiku.",
  "Tu best hai.",
  "Tu duniya ki sabse sundar ladki hai.",
  "Tujhse zyada sundar ladki saari duniya mein koi nahi hai.",
  "Teri aankhon duniya mein sabse sundar hai, unhe dekhte hi sab doob jaate hai.",
  "Tere baal itne silky hai jaise bhagwaan ne baith ke ek ek baal ko haath se handcraft kiya ho.",
  "Teri hassi itni manmohak hai ki, tujhe hast hua dekh ke saari duniya apna dukh bhul jaati hai.",
  "Teri awaaz itni meethi hai, maano kaano mein shehed daal diya ho kisine.",
  "Tu sirf earth ki nahi, pure universe ki, nahi pure multiverse ki sabse sundar ladki hai."
];

export default function AdmirationNote() {
  // Generate starry background particles (capped for mobile responsiveness)
  const stars = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 22 : 45;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  // Floating upward hearts & sparkles
  const upwardFloaters = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 7 : 14;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      delay: Math.random() * 4,
      duration: Math.random() * 5 + 5,
      size: Math.random() * 8 + 10,
      type: i % 2 === 0 ? 'heart' : 'sparkle',
    }));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <SectionWrapper
      id="admiration"
      className="relative overflow-hidden bg-gradient-to-b from-[#220719] via-[#350F28] to-[#25081C] text-white py-20"
      dividerDark={true}
    >
      {/* Background Starfield */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Floating upward hearts and sparkles (nods to multiverse / lifted feeling) */}
        {upwardFloaters.map((item) => (
          <motion.div
            key={item.id}
            className="absolute pointer-events-none text-pink-hot/40"
            style={{
              left: `${item.left}%`,
              bottom: '-20px',
            }}
            animate={{
              y: ['0vh', '-110vh'],
              opacity: [0, 0.7, 0.8, 0],
              x: [0, (item.id % 2 === 0 ? 15 : -15), 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {item.type === 'heart' ? (
              <Heart style={{ width: item.size, height: item.size }} fill="#FF69B4" opacity={0.6} />
            ) : (
              <Sparkles style={{ width: item.size, height: item.size }} />
            )}
          </motion.div>
        ))}

        {/* Cosmic subtle glow orbs */}
        <div className="absolute top-1/3 -left-16 w-80 h-80 bg-magenta-deep/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-16 w-80 h-80 bg-pink-hot/25 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 sm:mb-10 px-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-hot/15 border border-pink-soft/30 backdrop-blur-md mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-soft" />
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-pink-soft font-sans font-medium">
              across the multiverse
            </span>
          </div>
          <h2 className="font-script text-3xl sm:text-5xl md:text-6xl text-rose-gold star-glow leading-tight">
            Why you're impossible to replace
          </h2>
        </motion.div>

        {/* Admiration Glassmorphism Card */}
        <motion.div
          className="w-full max-w-[740px] glass-card-dark rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85 }}
        >
          {/* Faint Multiverse Aura Watermark */}
          <div className="absolute -top-10 -right-10 text-7xl sm:text-8xl opacity-10 select-none pointer-events-none">
            ✨
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3.5 sm:space-y-4 text-left leading-relaxed font-sans"
          >
            {admirationSentences.map((sentence, idx) => (
              <motion.div key={idx} variants={lineVariants} className="overflow-hidden">
                <p
                  className={`text-sm sm:text-base md:text-lg relative ${
                    idx === 0 || idx === 8
                      ? 'font-medium shimmer-text text-base sm:text-lg md:text-xl py-0.5'
                      : 'text-blush-100/95 font-normal'
                  }`}
                >
                  {sentence}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
