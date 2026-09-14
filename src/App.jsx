import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import PetalBackground from './components/PetalBackground';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import ApologyNote from './components/ApologyNote';
import AdmirationNote from './components/AdmirationNote';
import MissYouNote from './components/MissYouNote';
import PlaylistSection from './components/PlaylistSection';
import ForgiveMeCTA from './components/ForgiveMeCTA';
import useScrollProgress from './hooks/useScrollProgress';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-blush-50 text-ink overflow-x-hidden selection:bg-pink-soft selection:text-magenta-deep">
      {/* 1. Loading Screen with Opening Lotus Animation */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Global Animated Petal Fall Canvas */}
      <PetalBackground />

      {/* 3. Custom Trailing Pink Cursor (desktop only) */}
      <CustomCursor />

      {/* 4. Elegant Top Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-soft via-pink-hot to-magenta-deep z-50 origin-left"
        style={{ scaleX: scrollProgress }}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: The Apology */}
        <ApologyNote />

        {/* Section 3: Why You're Amazing (Multiverse theme) */}
        <AdmirationNote />

        {/* Section 4: I Miss You */}
        <MissYouNote />

        {/* Section 5: Our Playlist */}
        <PlaylistSection />

        {/* Section 6: Closing Forgiveness Finale */}
        <ForgiveMeCTA />
      </main>
    </div>
  );
}
