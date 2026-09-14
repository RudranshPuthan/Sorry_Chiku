import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LotusSVG({
  size = 240,
  isBloomed = true,
  interactive = true,
  className = '',
  bloomProgress = 1, // 0 (closed/wilted) to 1 (full bloom)
  onClick,
}) {
  const [hearts, setHearts] = useState([]);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (!interactive) return;

    // Trigger floating hearts easter egg
    const rect = e.currentTarget.getBoundingClientRect();
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 40,
      scale: 0.8 + Math.random() * 0.6,
      rotate: (Math.random() - 0.5) * 40,
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 1200);
  };

  // Interpolate petal spread based on bloomProgress & isBloomed
  const progress = isBloomed ? Math.max(bloomProgress, 0.3) : 0.15;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none active:scale-95 transition-transform duration-200 ${interactive ? 'cursor-pointer touch-manipulation' : ''} ${className}`}
      onClick={handleClick}
      onTouchStart={(e) => {
        // Allow mobile tap burst
        if (interactive && !onClick) {
          const touch = e.touches[0];
          const rect = e.currentTarget.getBoundingClientRect();
          const newHearts = Array.from({ length: 5 }).map((_, i) => ({
            id: Date.now() + i,
            x: touch.clientX - rect.left - rect.width / 2 + (Math.random() - 0.5) * 30,
            y: touch.clientY - rect.top - rect.height / 2 + (Math.random() - 0.5) * 20,
            scale: 0.8 + Math.random() * 0.5,
            rotate: (Math.random() - 0.5) * 30,
          }));
          setHearts((prev) => [...prev, ...newHearts]);
          setTimeout(() => {
            setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
          }, 1200);
        }
      }}
      style={{
        maxWidth: '100%',
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size * 0.82}px` : 'auto',
      }}
    >
      <svg
        viewBox="0 0 300 240"
        className="w-full h-full filter drop-shadow-[0_6px_18px_rgba(255,105,180,0.3)] max-w-[280px] sm:max-w-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lotusPetalOuter" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FFB6C1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFF5F7" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="lotusPetalMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF1493" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF69B4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFE4EC" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="lotusPetalInner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C2185B" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FF69B4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFF0F5" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="lotusCenterGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE57F" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>

          <filter id="lotusGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Water Ripples */}
        <motion.ellipse
          cx="150"
          cy="215"
          rx={90 * progress}
          ry={14 * progress}
          fill="rgba(243, 217, 250, 0.4)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        />

        {/* Outer Leftmost Petal */}
        <motion.path
          d="M 150 200 C 100 190, 40 160, 45 125 C 50 90, 110 145, 150 200 Z"
          fill="url(#lotusPetalOuter)"
          stroke="#FFB6C1"
          strokeWidth="1.2"
          initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
          animate={{
            scale: progress,
            rotate: (1 - progress) * -35,
            opacity: 1,
            originX: '150px',
            originY: '200px',
          }}
          transition={{ duration: 1.2, delay: 0.1, type: 'spring', stiffness: 80 }}
        />

        {/* Outer Rightmost Petal */}
        <motion.path
          d="M 150 200 C 200 190, 260 160, 255 125 C 250 90, 190 145, 150 200 Z"
          fill="url(#lotusPetalOuter)"
          stroke="#FFB6C1"
          strokeWidth="1.2"
          initial={{ scale: 0.2, rotate: 20, opacity: 0 }}
          animate={{
            scale: progress,
            rotate: (1 - progress) * 35,
            opacity: 1,
            originX: '150px',
            originY: '200px',
          }}
          transition={{ duration: 1.2, delay: 0.15, type: 'spring', stiffness: 80 }}
        />

        {/* Lower Left Petal */}
        <motion.path
          d="M 150 205 C 105 195, 65 145, 80 95 C 100 70, 135 130, 150 205 Z"
          fill="url(#lotusPetalMid)"
          stroke="#FFA0B4"
          strokeWidth="1.2"
          initial={{ scale: 0.2, rotate: -15, opacity: 0 }}
          animate={{
            scale: progress,
            rotate: (1 - progress) * -25,
            opacity: 1,
            originX: '150px',
            originY: '205px',
          }}
          transition={{ duration: 1.2, delay: 0.2, type: 'spring', stiffness: 85 }}
        />

        {/* Lower Right Petal */}
        <motion.path
          d="M 150 205 C 195 195, 235 145, 220 95 C 200 70, 165 130, 150 205 Z"
          fill="url(#lotusPetalMid)"
          stroke="#FFA0B4"
          strokeWidth="1.2"
          initial={{ scale: 0.2, rotate: 15, opacity: 0 }}
          animate={{
            scale: progress,
            rotate: (1 - progress) * 25,
            opacity: 1,
            originX: '150px',
            originY: '205px',
          }}
          transition={{ duration: 1.2, delay: 0.25, type: 'spring', stiffness: 85 }}
        />

        {/* Mid Left Petal */}
        <motion.path
          d="M 150 205 C 120 180, 90 120, 110 65 C 125 45, 145 110, 150 205 Z"
          fill="url(#lotusPetalInner)"
          stroke="#FF8DA1"
          strokeWidth="1"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: progress,
            rotate: (1 - progress) * -15,
            opacity: 1,
            originX: '150px',
            originY: '205px',
          }}
          transition={{ duration: 1.1, delay: 0.3, type: 'spring', stiffness: 90 }}
        />

        {/* Mid Right Petal */}
        <motion.path
          d="M 150 205 C 180 180, 210 120, 190 65 C 175 45, 155 110, 150 205 Z"
          fill="url(#lotusPetalInner)"
          stroke="#FF8DA1"
          strokeWidth="1"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: progress,
            rotate: (1 - progress) * 15,
            opacity: 1,
            originX: '150px',
            originY: '205px',
          }}
          transition={{ duration: 1.1, delay: 0.35, type: 'spring', stiffness: 90 }}
        />

        {/* Center Main Crown Petal */}
        <motion.path
          d="M 150 208 C 130 160, 125 90, 150 35 C 175 90, 170 160, 150 208 Z"
          fill="url(#lotusPetalInner)"
          stroke="#FF69B4"
          strokeWidth="1.5"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: 0.85 + progress * 0.15,
            opacity: 1,
            originX: '150px',
            originY: '208px',
          }}
          transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 100 }}
        />

        {/* Golden Anthers / Pistil Core */}
        <motion.circle
          cx="150"
          cy="180"
          r="10"
          fill="url(#lotusCenterGold)"
          filter="url(#lotusGlow)"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Tiny golden stamen dots */}
        <g opacity="0.9">
          <circle cx="143" cy="174" r="2" fill="#FFE082" />
          <circle cx="157" cy="174" r="2" fill="#FFE082" />
          <circle cx="150" cy="171" r="2.2" fill="#FFF59D" />
          <circle cx="145" cy="184" r="1.8" fill="#FFE082" />
          <circle cx="155" cy="184" r="1.8" fill="#FFE082" />
        </g>
      </svg>

      {/* Floating Hearts Easter Egg */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute pointer-events-none text-pink-hot z-50 text-xl font-bold"
            initial={{ opacity: 1, x: h.x, y: h.y, scale: h.scale, rotate: h.rotate }}
            animate={{
              opacity: 0,
              y: h.y - 80 - Math.random() * 40,
              x: h.x + (Math.random() - 0.5) * 40,
              scale: h.scale * 1.3,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            🌸
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
