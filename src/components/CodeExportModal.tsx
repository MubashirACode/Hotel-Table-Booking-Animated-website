import React, { useState } from 'react';
import { X, Copy, Check, Code, FileText, Sparkles } from 'lucide-react';
import { HeroContentConfig } from '../types';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: HeroContentConfig;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'react' | 'css'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlCode = `<!-- Clean, Modern, Premium 16:9 Redesigned Hero Section -->
<section class="relative w-full overflow-hidden min-h-[580px] lg:aspect-[16/9] flex items-center bg-[linear-gradient(110deg,#FFFFFF_0%,#FFFDFB_42%,#FAF0E6_75%,#F4E2D2_100%)] font-['Poppins']">
  
  <!-- Subtle Soft Glow & Decorative Aura on Right Side -->
  <div class="absolute top-1/2 right-[12%] -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none blur-3xl opacity-60 bg-[radial-gradient(circle,rgba(217,101,40,0.18)_0%,rgba(248,226,210,0.45)_45%,transparent_75%)]"></div>
  <div class="absolute top-1/2 right-[10%] -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-amber-900/5 pointer-events-none"></div>

  <div class="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 z-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <!-- LEFT SIDE CONTENT (Vertically centered, left-aligned) -->
      <div class="lg:col-span-6 flex flex-col items-start text-left">
        
        <!-- 1. Tagline with Thin Accent Line -->
        <div class="inline-flex items-center gap-2.5 mb-5 select-none">
          <svg class="w-7 h-3.5 stroke-[${config.accentColor.hex}]" viewBox="0 0 32 14" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 7h7l2.5-5 3.5 10 3-7 2.5 2H31" />
          </svg>
          <span class="text-xs sm:text-sm font-bold tracking-[0.22em] text-[${config.accentColor.hex}] uppercase">
            ${config.tagline}
          </span>
        </div>

        <!-- 2. Big Bold Heading (Two Lines: Charcoal + Warm Accent) -->
        <h1 class="flex flex-col tracking-tight leading-[0.92]">
          <span class="text-stone-900 font-extrabold text-6xl sm:text-7xl lg:text-8xl">
            ${config.headingLine1}
          </span>
          <span class="text-[${config.accentColor.hex}] font-extrabold text-6xl sm:text-7xl lg:text-8xl">
            ${config.headingLine2}
          </span>
        </h1>

        <!-- 3. Short Description in Soft Gray -->
        <p class="mt-6 text-stone-500 font-normal text-base sm:text-lg leading-relaxed max-w-md">
          ${config.description}
        </p>

        <!-- 4. Primary CTA Button with Rounded Corners -->
        <div class="mt-8">
          <a href="#menu" class="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-semibold text-base bg-[${config.accentColor.hex}] hover:brightness-105 shadow-md shadow-amber-900/10 transition-all">
            <span>${config.ctaText}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>

      <!-- RIGHT SIDE: CLEAN & READY SLOT (Food tray removed) -->
      <div class="lg:col-span-6 flex items-center justify-center min-h-[360px]">
        <!-- Place your custom image inside this ready container: -->
        <div class="relative w-full max-w-[460px] h-[380px] rounded-3xl flex items-center justify-center">
          <!-- Subtle Glow Halo and Ready Empty Space -->
          <div class="w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(217,101,40,0.12)_0%,rgba(254,243,235,0.7)_60%,transparent_100%)]"></div>
          <!-- <img src="your-custom-dish.png" alt="Showcase" class="max-w-full drop-shadow-2xl" /> -->
        </div>
      </div>

    </div>
  </div>
</section>`;

  const cssSnippet = `/* Sticky Header on Scroll Animation */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 100;
}

.navbar.show {
  transform: translateY(0);
  opacity: 1;
}

/* JavaScript Scroll Listener */
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 80) {
    nav.classList.add("show");
  } else {
    nav.classList.remove("show");
  }
});`;

  const reactSnippet = `import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function RedesignedHero() {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.navbar');
      if (window.scrollY > 80) nav?.classList.add('show');
      else nav?.classList.remove('show');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Header (Hidden initially, slides down on scroll > 80px) */}
      <header className="navbar">
        <div className="backdrop-blur-md bg-white/90 border-b border-stone-200/80 px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-bold text-stone-900">CHICKFILLA</span>
          <button className="px-4 py-2 bg-[${config.accentColor.hex}] text-white text-xs font-semibold rounded-lg">
            Order Online
          </button>
        </div>
      </header>

      {/* Redesigned 16:9 Hero Section */}
      <section className="relative w-full aspect-[16/9] min-h-[580px] flex items-center bg-[linear-gradient(110deg,#FFFFFF_0%,#FFFDFB_42%,#FAF0E6_75%,#F4E2D2_100%)] font-['Poppins']">
        <div className="relative max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[${config.accentColor.hex}] text-xs font-bold tracking-widest uppercase">
              <span className="w-6 h-0.5 bg-[${config.accentColor.hex}]" />
              <span>${config.tagline}</span>
            </div>
            <h1 className="leading-[0.92] text-7xl font-extrabold">
              <span className="text-stone-900 block">${config.headingLine1}</span>
              <span className="text-[${config.accentColor.hex}] block">${config.headingLine2}</span>
            </h1>
            <p className="mt-6 text-stone-500 text-lg max-w-md">${config.description}</p>
            <button className="mt-8 px-8 py-4 rounded-xl text-white bg-[${config.accentColor.hex}] font-semibold flex items-center gap-2">
              <span>${config.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {/* Right side: Clean empty ready canvas */}
          <div className="relative flex items-center justify-center h-[380px]">
            <div className="w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(217,101,40,0.15)_0%,rgba(254,243,235,0.7)_60%,transparent_100%)]" />
          </div>
        </div>
      </section>
    </>
  );
}`;

  const currentCode = activeTab === 'html' ? htmlCode : activeTab === 'react' ? reactSnippet : cssSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-stone-900 text-stone-200 rounded-2xl shadow-2xl border border-stone-700 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-white">Export Clean Production Code</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs & Copy button */}
        <div className="px-6 py-3 border-b border-stone-800 bg-stone-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'html' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              HTML + Tailwind
            </button>
            <button
              onClick={() => setActiveTab('react')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'react' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              React JSX
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'css' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              Sticky Navbar (CSS + JS)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-y-auto bg-stone-950 font-mono text-xs leading-relaxed text-stone-300">
          <pre className="whitespace-pre-wrap">{currentCode}</pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950 flex items-center justify-between text-xs text-stone-500">
          <span>Ready to paste directly into your project</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
