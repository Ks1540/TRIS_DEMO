import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

// Selected high-quality, distinct photographic assets for independent layers
const skyImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85"; // Gorgeous sunset sky & canyon peaks
const mountainImg = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85"; // Far mountains in mist
const forestImg = "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=85"; // Misty pine forest canopy
const foregroundImg = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=85"; // Closer path, vegetation, and structure

interface ParallaxHeroProps {
  onShopClick: () => void;
  onPlanClick: () => void;
  tagline: string;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  onShopClick,
  onPlanClick,
  tagline
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth the scroll progress with slightly higher mass and lower stiffness for buttery inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 30,
    mass: 1.4,
    restDelta: 0.001
  });

  // Layer transforms mapped to the sticky scrolling phase [0, 0.45]
  
  // Sky Layer: Moves up very slowly
  const skyY = useTransform(smoothProgress, [0, 0.45], ["0px", "-10px"]);
  const skyScale = useTransform(smoothProgress, [0, 0.45], [1, 1.04]);

  // Distant Peaks: Moves up slowly
  const mountainY = useTransform(smoothProgress, [0, 0.45], ["0px", "-30px"]);
  const mountainScale = useTransform(smoothProgress, [0, 0.45], [1.02, 1.06]);

  // Brand Text: Positioned in the middle "sandwich", translating up on scroll and fading out near the end
  const textY = useTransform(smoothProgress, [0, 0.45], ["0px", "-65px"]);
  const textOpacity = useTransform(smoothProgress, [0.25, 0.45], [1, 0]);

  // Forest Midground: Moves up moderately (no scale to prevent heavy rasterization of mask)
  const forestY = useTransform(smoothProgress, [0, 0.45], ["0px", "-100px"]);

  // Foreground: Moves up fastest to cover the text and forest (no scale to prevent heavy rasterization of mask)
  const foregroundY = useTransform(smoothProgress, [0, 0.45], ["0px", "-160px"]);

  // Fade out CTA panel
  const ctaY = useTransform(smoothProgress, [0, 0.25], ["0px", "-40px"]);
  const ctaOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);

  return (
    <div 
      ref={containerRef}
      className="relative h-[160vh] w-full bg-[#050e08] select-none" 
      id="home-parallax-storyteller"
    >
      {/* Sticky Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none z-10" id="parallax-viewport">
        
        {/* LAYER 1: Background Sky & Sunset Glow (z-10) */}
        <motion.div
          style={{ 
            y: skyY,
            scale: skyScale,
            backgroundImage: `url(${skyImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            willChange: 'transform'
          }}
          className="absolute inset-x-0 bottom-[-20px] w-full h-[calc(100vh+20px)] pointer-events-none z-10"
        >
          {/* Radiant glowing sun orb */}
          <div className="absolute top-[28%] left-[46%] w-96 h-96 rounded-full bg-gradient-to-br from-amber-100 via-yellow-200 to-amber-500 blur-3xl opacity-35 mix-blend-screen animate-pulse-glow" />
          {/* Subtle color overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050e08]/60 via-transparent to-[#050e08]/30 pointer-events-none" />
        </motion.div>

        {/* LAYER 2: Birds & Clouds (z-11) */}
        <div className="absolute inset-0 pointer-events-none z-11 overflow-hidden">
          {/* Looping vector birds flock */}
          <svg className="absolute w-72 h-36 animate-birds opacity-30 text-white" viewBox="0 0 100 50">
            <path d="M 10 20 Q 15 15 20 20 Q 25 15 30 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 45 25 Q 48 21 51 25 Q 54 21 57 25" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M 25 35 Q 28 32 31 35 Q 34 32 37 35" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
          </svg>

          {/* Slow drifting cloud layer */}
          <div className="absolute top-[18%] left-0 w-full h-24 overflow-hidden opacity-20">
            <div 
              className="w-[200%] h-full bg-repeat-x animate-cloud-drift-1" 
              style={{ 
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" fill="white"><path d="M0,15 Q10,5 20,15 T40,15 T60,15 T80,15 T100,15 L100,20 L0,20 Z" opacity="0.4"/></svg>')`,
                backgroundSize: '50% 100%'
              }} 
            />
          </div>
        </div>

        {/* LAYER 3: Distant Misty Mountain Peaks (z-12) */}
        <motion.div
          style={{ 
            y: mountainY,
            scale: mountainScale, 
            backgroundImage: `url(${mountainImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            willChange: 'transform'
          }}
          className="absolute inset-x-0 bottom-[-50px] w-full h-[calc(100vh+50px)] pointer-events-none z-12"
        >
          <div className="absolute inset-0 bg-[#050e08]/15 pointer-events-none" />
        </motion.div>

        {/* LAYER 4: 3D Depth Sandwich Title (z-15) */}
        <motion.div
          style={{ 
            y: textY,
            opacity: textOpacity,
            willChange: 'transform'
          }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-15 select-none"
        >
          <div className="relative flex flex-col items-center justify-center select-none pb-4">
            <span className="text-[12vw] md:text-[9vw] font-brush tracking-wide text-white select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.65)]">
              MEGHALAYA
            </span>
          </div>
        </motion.div>

        {/* LAYER 4.5: Drifting Cloud Mist passing IN FRONT of the text but BEHIND the forest (z-18) */}
        <div className="absolute inset-0 pointer-events-none z-18 overflow-hidden opacity-30">
          <div 
            className="absolute top-[32%] w-[200%] h-36 bg-repeat-x animate-cloud-drift-2" 
            style={{ 
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20" fill="white"><path d="M0,15 Q10,5 20,15 T40,15 T60,15 T80,15 T100,15 L100,20 L0,20 Z" opacity="0.3"/></svg>')`,
              backgroundSize: '50% 100%',
              filter: 'blur(5px)'
            }} 
          />
        </div>

        {/* LAYER 5: Midground Forest Layer (z-20) */}
        <motion.div
          style={{
            y: forestY,
            backgroundImage: `url(${forestImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            willChange: 'transform'
          }}
          className="absolute inset-x-0 bottom-[-120px] w-full h-[calc(100vh+120px)] pointer-events-none z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#050e08]/50 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* LAYER 6: Foreground Landscape and Path (z-30) */}
        <motion.div
          style={{
            y: foregroundY,
            backgroundImage: `url(${foregroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
            willChange: 'transform'
          }}
          className="absolute inset-x-0 bottom-[-180px] w-full h-[calc(100vh+180px)] pointer-events-none z-30"
        >
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#050e08] via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Redesigned Floating CTA Container (z-35) */}
        <motion.div
          style={{ 
            y: ctaY,
            opacity: ctaOpacity,
            willChange: 'transform'
          }}
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-35 w-[90%] max-w-xl pointer-events-auto flex flex-col items-center justify-center text-center space-y-5"
        >
          {/* Subtle typography for the CTA headline */}
          <h3 className="font-sans font-semibold text-white/90 text-xs sm:text-sm tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Embark on an Authentic Adventure
          </h3>
          
          {/* Symmetrical, minimal pill buttons */}
          <div className="flex flex-row items-center justify-center gap-4 w-full">
            <button
              onClick={onPlanClick}
              className="bg-brand-lime hover:bg-white text-[#050e08] border border-white py-2.5 px-8 rounded-full font-sans font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(226,246,181,0.2)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              Plan Travel
            </button>
            <button
              onClick={onShopClick}
              className="bg-white/5 hover:bg-white/15 text-white border border-white py-2.5 px-8 rounded-full font-sans font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              Shop Crafts
            </button>
          </div>
        </motion.div>

        {/* Ambient bottom fog fade blending the container smoothly with the cream bento grid */}
        <div className="absolute inset-x-0 bottom-[-2px] h-32 bg-gradient-to-t from-brand-cream via-brand-cream/40 to-transparent z-40 pointer-events-none" />
      </div>
    </div>
  );
};


