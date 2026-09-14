import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { Play, ExternalLink, Disc3, Music2 } from 'lucide-react';

const songs = [
  {
    title: "Tum Se Hi",
    subtitle: "Jab We Met · Mohit Chauhan",
    url: "https://www.youtube.com/watch?v=55HzptaZbfk"
  },
  {
    title: "Kabhi Kabhi Aditi",
    subtitle: "Jaane Tu Ya Jaane Na · Rashid Ali",
    url: "https://www.youtube.com/watch?v=HIbzXaBdwZw"
  },
  {
    title: "Raabta",
    subtitle: "Agent Vinod · Arijit Singh",
    url: "https://www.youtube.com/watch?v=HDVw7Y6uAws"
  },
  {
    title: "Tera Ban Jaunga",
    subtitle: "Kabir Singh · Tulsi Kumar, Akhil Sachdeva",
    url: "https://www.youtube.com/watch?v=avVg3pLj_Po"
  },
  {
    title: "Dil Diyan Gallan",
    subtitle: "Tiger Zinda Hai · Atif Aslam",
    url: "https://www.youtube.com/watch?v=JtnPpxe8K7c"
  },
  {
    title: "Tum Tak",
    subtitle: "Raanjhanaa · Javed Ali",
    url: "https://www.youtube.com/watch?v=fx0z6_-yqZ4"
  }
];

function SongCard({ song, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={song.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block glass-card rounded-2xl p-3.5 sm:p-5 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(255,105,180,0.35)] hover:border-pink-hot/50 overflow-hidden active:scale-[0.98] touch-manipulation"
      whileHover={{ y: -5, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Vinyl Record Visual */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center">
          {/* Outer Vinyl Disc - slowly rotates on mobile, speeds up on hover */}
          <motion.div
            className="w-full h-full rounded-full bg-gradient-to-tr from-[#1A0B14] via-[#2E1524] to-[#12050E] border-2 border-pink-soft/40 shadow-md flex items-center justify-center relative overflow-hidden"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: isHovered ? 2.5 : 9,
              ease: 'linear',
            }}
          >
            {/* Concentric grooved rings */}
            <div className="absolute inset-1 rounded-full border border-white/10" />
            <div className="absolute inset-2 sm:inset-2.5 rounded-full border border-white/15" />
            <div className="absolute inset-3 sm:inset-4 rounded-full border border-white/10" />

            {/* Center Record Label */}
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-tr from-pink-hot to-rose-gold flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </motion.div>

          {/* Floating mini music note */}
          <motion.div
            className="absolute -top-1 -right-1 text-pink-hot"
            animate={isHovered ? { opacity: 1, y: -4, scale: 1.2 } : { opacity: 0.6, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Music2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.div>
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0 pr-1 sm:pr-2">
          <h3 className="font-serif font-bold text-sm sm:text-base md:text-lg text-magenta-deep truncate group-hover:text-pink-hot transition-colors">
            {song.title}
          </h3>
          <p className="font-sans text-[11px] sm:text-xs md:text-sm text-ink/75 truncate mt-0.5">
            {song.subtitle}
          </p>
          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-sans text-pink-hot font-medium mt-0.5">
            Listen on YouTube
            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-75 group-hover:opacity-100 transition-opacity" />
          </span>
        </div>

        {/* Play Icon Badge with Pulse Effect */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-pink-soft/25 group-hover:bg-pink-hot group-active:scale-90 border border-pink-soft/60 group-hover:border-pink-hot flex items-center justify-center transition-all duration-300 shadow-sm">
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-magenta-deep group-hover:text-white fill-current ml-0.5 transition-colors" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function PlaylistSection() {
  return (
    <SectionWrapper id="playlist" className="bg-gradient-to-b from-blush-50 via-blush-100/50 to-blush-50 py-20">
      <div className="flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-soft/30 border border-pink-soft text-magenta-deep text-xs font-sans font-medium mb-3">
            <Disc3 className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Soundtrack of our memories</span>
          </div>
          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-magenta-deep font-bold">
            Songs that remind me of you
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ink/70 max-w-md mx-auto mt-2">
            Click any song to listen to the official track on YouTube 🎵
          </p>
        </motion.div>

        {/* Song Cards Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {songs.map((song, idx) => (
            <SongCard key={idx} song={song} index={idx} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
