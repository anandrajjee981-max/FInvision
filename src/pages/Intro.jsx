import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Navbar from '../components/Navbar';
import Second from './Second';

const Intro = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] // Start scrolling at top, end at bottom
  });

  // Spring smooth physics add karne ke liye
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background effects
  const blurValue = useTransform(smoothProgress, [0, 0.5], ["blur(0px)", "blur(20px)"]);
  
  // TEXT FADE & MOVE (0 progress pe full opacity, 0.4 pe gayab)
// Change 0.4 to 0.9 or 1 to keep it visible until the end
const textOpacity = useTransform(smoothProgress, [0, 0.9], [1, 0]);

// Reduce the Y movement or spread it across the whole scroll
const textY = useTransform(smoothProgress, [0, 1], [0, -250]);
  
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);

  return (
    // Height 300vh rakhi hai taaki scroll ka gap mile
  <main>
  <div ref={containerRef} className="relative w-full h-[300vh] bg-zinc-950">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
 
      
        {/* BG IMAGE */}
        <motion.div 
          // style={{ filter: blurValue, scale: bgScale }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1762889285828-c7b09332daad?q=80&w=1932&auto=format&fit=crop')] bg-cover bg-center"
        />

        {/* OVERLAY for contrast */}
        <div className="absolute inset-0 bg-black/30" />

        {/* ANIMATED TEXT */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center"
        >
          <h1 className="text-amber-100 font-black uppercase tracking-tighter text-5xl sm:text-7xl md:text-9xl leading-none"
              style={{ textShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            Manage Money <br /> The Smart Way
          </h1>
        </motion.div>

      </div>
    </div>
<Second/>
  </main>
  )
}

export default Intro