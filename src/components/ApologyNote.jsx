import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const apologySentences = [
  "I am really really sorry Chiku.",
  "Tu best leader hai yaar.",
  "I really didn't mean anything like that.",
  "Tu please mujhe maaf kar de na.",
  "Ho gayi yaar galti.",
  "Main jaisa bhi hoon tera hi hoon na.",
  "Tu aise naraaz rahegi toh kaise chalega Chiku.",
  "Please mujhe maaf karde.",
  "I am really really sorry.",
  "I know mujhse galti hogayi, main nahi karunga agli baar se.",
  "Tu iss baar maaf kar dena.",
  "Meri pichli mistakes ke liye bhi please maaf kar de mujhe.",
  "Maine tujhe kal bhi bohat pareshan kiya, rulaya bhi, Tedx waale dino mein bhi idhar udhar bhagaa.",
  "Tujhe itne din good night bhi nahi bola dhang se.",
  "Special bhi nahi feel karwaya, constant galtiya karke.",
  "I am really really sorry for everything."
];

export default function ApologyNote() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <SectionWrapper id="apology" className="bg-gradient-to-b from-blush-50 via-blush-100/60 to-blush-100">
      <div className="flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <span className="font-script text-xl sm:text-2xl text-pink-hot tracking-wider">
            straight from the heart
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-magenta-deep mt-1">
            I'm sorry
          </h2>
        </motion.div>

        {/* Card & Blooming Flower Layout */}
        <div className="relative w-full max-w-[720px] mx-auto flex flex-col items-center">

          {/* Wilted-to-Blooming Lotus Ornament */}
          <motion.div
            className="mb-3 sm:mb-4 flex flex-col items-center select-none"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-16 h-16 sm:w-20 sm:h-20 filter drop-shadow-[0_4px_12px_rgba(255,105,180,0.3)]"
            >
              {/* Stem transitioning from curved/drooping to upright */}
              <motion.path
                d="M 50 90 Q 40 65 50 50"
                fill="none"
                stroke="#81C784"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0.5, d: "M 50 90 Q 25 70 35 60" }}
                whileInView={{ pathLength: 1, d: "M 50 90 Q 48 70 50 50" }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeOut" }}
              />
              {/* Blooming flower head */}
              <motion.g
                initial={{ rotate: -40, scale: 0.6, x: -10, y: 8 }}
                whileInView={{ rotate: 0, scale: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.3, type: "spring", bounce: 0.3 }}
              >
                {/* Petals */}
                <ellipse cx="50" cy="42" rx="14" ry="20" fill="#FF8DA1" opacity="0.95" />
                <ellipse cx="40" cy="45" rx="12" ry="17" fill="#FF69B4" opacity="0.9" transform="rotate(-25 40 45)" />
                <ellipse cx="60" cy="45" rx="12" ry="17" fill="#FF69B4" opacity="0.9" transform="rotate(25 60 45)" />
                <circle cx="50" cy="42" r="5" fill="#FFE082" />
              </motion.g>
            </svg>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-pink-hot/80 font-sans mt-0.5">
              blooming again for you
            </span>
          </motion.div>

          {/* Glassmorphism Card with continuous subtle glow pulse */}
          <motion.div
            className="w-full glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 animate-glow-pulse relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
          >
            {/* Subtle decorative lotus watermark inside card */}
            <div className="absolute -right-8 -bottom-8 opacity-5 text-7xl sm:text-9xl pointer-events-none select-none">
              🪷
            </div>

            {/* Note sentences staggered */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4 text-left text-ink leading-relaxed"
            >
              {apologySentences.map((sentence, idx) => (
                <motion.p
                  key={idx}
                  variants={lineVariants}
                  className={`text-sm sm:text-base md:text-lg font-sans tracking-normal ${idx === 0 || idx === 7 || idx === 8 || idx === 10
                      ? 'font-medium text-magenta-deep'
                      : 'text-ink/90'
                    }`}
                >
                  {sentence}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
