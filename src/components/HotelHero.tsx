import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, UtensilsCrossed } from 'lucide-react';

const VIDEO_URL = "https://res.cloudinary.com/dyg5fwjnx/video/upload/v1791703960/Chef_cooking_at_grill_20261011123213_e5t4wu.mp4";
const POSTER_URL = "https://res.cloudinary.com/dyg5fwjnx/video/upload/so_0/v1791703960/Chef_cooking_at_grill_20261011123213_e5t4wu.jpg";

interface HotelHeroProps {
  onReserveClick: () => void;
}

export const HotelHero: React.FC<HotelHeroProps> = ({ onReserveClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);

  // Check data saver and prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Check connection saveData if available
    const navConn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const isSaveData = navConn?.saveData === true;

    if (prefersReducedMotion || isSaveData) {
      setShouldPlayVideo(false);
    }
  }, []);

  // Autoplay guarantee on modern browsers & iOS Safari
  useEffect(() => {
    if (!shouldPlayVideo) return;
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silent fallback handled by browser
        });
      }
    }
  }, [shouldPlayVideo]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden select-none bg-stone-900"
    >
      {/* =========================================================================
          BACKGROUND LAYER: Full video background (or poster fallback)
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {shouldPlayVideo ? (
          <video
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={POSTER_URL}
            className="hero-video-full-bg"
            style={{
              opacity: 0.95,
              filter: 'contrast(1.04) saturate(1.06)',
            }}
          />
        ) : (
          <img
            src={POSTER_URL}
            alt="Chef cooking at grill"
            className="hero-video-full-bg object-cover"
          />
        )}

        {/* Smooth left-to-right gradient scrim for high typographic legibility */}
        <div className="hero-scrim-left" />
      </div>

      {/* =========================================================================
          HERO CONTENT LAYER: Vertically centered, left aligned, responsive
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 sm:px-8 py-20 lg:py-0 flex items-center">
        <div className="w-full lg:max-w-2xl flex flex-col justify-center items-start text-left pt-12 sm:pt-16 lg:pt-0">
          
          {/* Eyebrow Tagline with thin accent line */}
          <div className="hero-animate-1 inline-flex items-center gap-3 mb-4 sm:mb-5">
            <span className="w-8 sm:w-10 h-[2.5px] bg-[#EA580C] rounded-full transition-all" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#EA580C] drop-shadow-2xs">
              Fresh. Delicious. Always.
            </span>
          </div>

          {/* Heading with clamp() for strict 2-line containment on desktop */}
          <h1 className="hero-animate-2 flex flex-col tracking-tight leading-[0.96] font-extrabold text-[clamp(2.5rem,6.5vw,4.75rem)] text-stone-900">
            <span className="text-[#1C1917] whitespace-nowrap">
              HOTEL DINING
            </span>
            <span className="text-[#EA580C] mt-1 sm:mt-2 whitespace-nowrap">
              FLAME & SMOKE
            </span>
          </h1>

          {/* Description Paragraph */}
          <p className="hero-animate-3 mt-5 sm:mt-6 text-stone-600 font-normal text-base sm:text-lg leading-relaxed max-w-lg">
            Experience Michelin-inspired artisanal grilled gastronomy prepared live over Binchotan coals by master chefs. Indulge in premier hospitality and seasonal flavors every evening.
          </p>

          {/* Dual Action Buttons (Primary CTA + Secondary Ghost) */}
          <div className="hero-animate-4 mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                onReserveClick();
                handleScrollTo('reservations');
              }}
              className="btn-luxury inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-white font-semibold text-base tracking-wide bg-[#EA580C] hover:bg-[#D94F04] shadow-lg shadow-orange-950/20 hover:shadow-xl hover:shadow-orange-900/30 cursor-pointer"
            >
              <span>Reserve a Table</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => handleScrollTo('grill-menu')}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-stone-800 font-semibold text-base bg-white/80 hover:bg-white hover:text-stone-950 border border-stone-200 shadow-2xs hover:shadow-sm transition-all cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#EA580C]" />
              <span>View Robata Menu</span>
            </button>
          </div>

          {/* Small Trust Line */}
          <div className="mt-6 flex items-center gap-2 text-xs font-medium text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>Open Daily 5:30 PM — 11:30 PM · Michelin Inspired Gastronomy</span>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Indicator at bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-stone-400 pointer-events-none">
        <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-500">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-stone-400/60 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#EA580C] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
