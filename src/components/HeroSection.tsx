import React, { useRef } from 'react';
import { ArrowRight, ImagePlus, X, UploadCloud, Sparkles } from 'lucide-react';
import { HeroContentConfig } from '../types';

interface HeroSectionProps {
  config: HeroContentConfig;
  onUpdateConfig: (partial: Partial<HeroContentConfig>) => void;
  is16x9Frame?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onUpdateConfig,
  is16x9Frame = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateConfig({ rightImageSrc: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateConfig({ rightImageSrc: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const fontClass = config.fontFamily === 'Poppins' ? 'font-poppins' : 'font-montserrat';

  return (
    <section
      id="hero"
      className={`relative w-full overflow-hidden transition-all duration-300 ${fontClass} ${
        is16x9Frame
          ? 'aspect-[16/9] min-h-[560px] max-h-[820px] rounded-2xl shadow-xl border border-stone-200/80'
          : 'min-h-[90vh] lg:min-h-screen flex items-center'
      }`}
      style={{
        background:
          config.backgroundTone.id === 'sand'
            ? 'linear-gradient(110deg, #FFFFFF 0%, #FAF8F5 35%, #F4ECE1 72%, #EDE0D0 100%)'
            : config.backgroundTone.id === 'peach'
            ? 'linear-gradient(110deg, #FFFFFF 0%, #FFFDFB 38%, #FCEFE6 72%, #F9E1D2 100%)'
            : 'linear-gradient(110deg, #FFFFFF 0%, #FFFDFB 42%, #FAF0E6 75%, #F4E2D2 100%)',
      }}
    >
      {/* Hidden file input for uploading custom images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Subtle organic light accent halos on the right side - purely atmospheric, no dark colors */}
      <div
        className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[460px] lg:w-[600px] h-[460px] lg:h-[600px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${config.accentColor.hex}18 0%, rgba(248, 226, 210, 0.45) 45%, rgba(255, 255, 255, 0) 75%)`,
          filter: 'blur(30px)',
        }}
      />

      {/* Very faint decorative geometric ring */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[420px] lg:w-[540px] h-[420px] lg:h-[540px] rounded-full border border-amber-900/5 pointer-events-none" />
      <div className="absolute top-1/2 right-[13%] -translate-y-1/2 w-[340px] lg:w-[440px] h-[340px] lg:h-[440px] rounded-full border border-dashed border-amber-900/10 pointer-events-none" />

      {/* Soft ground pedestal glow */}
      <div className="absolute bottom-[16%] right-[8%] w-[420px] lg:w-[560px] h-[70px] bg-amber-950/4 rounded-full blur-2xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ================= LEFT SIDE CONTENT ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-start text-left z-20">
            
            {/* 1. Small tagline above the heading with a thin accent line */}
            <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-6 select-none">
              {config.accentLineStyle === 'pulse' ? (
                // Heartbeat / Pulse wave line like reference
                <svg
                  className="w-7 h-3.5 stroke-current transition-colors"
                  style={{ color: config.accentColor.hex }}
                  viewBox="0 0 32 14"
                  fill="none"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 7h7l2.5-5 3.5 10 3-7 2.5 2H31" />
                </svg>
              ) : (
                // Clean straight accent line
                <span
                  className="w-8 h-[2.5px] rounded-full transition-colors"
                  style={{ backgroundColor: config.accentColor.hex }}
                />
              )}
              <span
                style={{ color: config.accentColor.hex }}
                className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase transition-colors"
              >
                {config.tagline}
              </span>
            </div>

            {/* 2. Big bold heading in two lines: First line dark charcoal, second line warm accent color */}
            <h1 className="flex flex-col tracking-tight leading-[0.92] select-none">
              <span className="text-stone-900 font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl transition-all">
                {config.headingLine1}
              </span>
              <span
                style={{ color: config.accentColor.hex }}
                className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl transition-colors mt-0 sm:mt-1"
              >
                {config.headingLine2}
              </span>
            </h1>

            {/* 3. Short one or two line description paragraph in soft gray */}
            <p className="mt-5 sm:mt-7 text-stone-500 font-normal text-base sm:text-lg leading-relaxed max-w-md select-none">
              {config.description}
            </p>

            {/* 4. One primary call to action button with rounded corners */}
            <div className="mt-7 sm:mt-9 flex items-center gap-4">
              <button
                onClick={() => {
                  const target = document.getElementById('menu-section');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{ backgroundColor: config.accentColor.hex }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base tracking-wide shadow-md shadow-amber-900/10 hover:shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{config.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDE IMAGE (CLEAN & EMPTY WITH SOFT GLOW) ================= */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center min-h-[320px] sm:min-h-[420px] lg:min-h-[500px]">
            
            {/* The designated showcase stage: soft glow and light decorative shape */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`relative w-full max-w-[480px] h-[340px] sm:h-[420px] rounded-3xl flex flex-col items-center justify-center transition-all duration-300 ${
                config.rightImageSrc
                  ? 'border-none'
                  : 'group border-2 border-dashed border-amber-900/15 hover:border-amber-900/30 bg-white/30 backdrop-blur-[2px]'
              }`}
            >
              {/* If user placed an image */}
              {config.rightImageSrc ? (
                <div className="relative w-full h-full flex items-center justify-center group/img">
                  <img
                    src={config.rightImageSrc}
                    alt="Custom showcase visual"
                    className="max-w-[92%] max-h-[92%] object-contain drop-shadow-2xl transition-transform duration-300 pointer-events-none"
                    style={{ transform: `scale(${config.imageScale})` }}
                  />

                  {/* Quick overlay controls when hovering placed image */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-md border border-stone-200">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      title="Replace image"
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <ImagePlus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onUpdateConfig({ rightImageSrc: null })}
                      title="Remove image (Reset to empty canvas)"
                      className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Pure clean empty space with soft glow, ready for user image */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
                  
                  {/* Soft centered organic glow circle */}
                  <div
                    className="w-36 h-36 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(circle, ${config.accentColor.hex}18 0%, rgba(254, 243, 235, 0.6) 60%, rgba(255, 255, 255, 0) 100%)`,
                    }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-xs border border-amber-900/10 flex items-center justify-center text-stone-400 group-hover:text-stone-600 transition-colors">
                      <ImagePlus className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Ready placeholder status notice */}
                  <div className="mt-5 max-w-[280px]">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-700 tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Ready for Your Image</span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400 leading-normal">
                      Food tray removed. Drag & drop or click below to test-fit your visuals, or keep it cleanly empty.
                    </p>
                  </div>

                  {/* Action buttons to upload image or keep empty */}
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-stone-700 text-xs font-medium border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Place Image</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
