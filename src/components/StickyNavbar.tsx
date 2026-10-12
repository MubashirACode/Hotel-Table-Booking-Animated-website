import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AccentColor } from '../types';

interface StickyNavbarProps {
  accentColor: AccentColor;
  onNavigateSection?: (sectionId: string) => void;
}

export const StickyNavbar: React.FC<StickyNavbarProps> = ({ accentColor, onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.navbar');
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
      if (nav) {
        if (scrolled) {
          nav.classList.add('show');
        } else {
          nav.classList.remove('show');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case page loaded scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="navbar">
      <div className="backdrop-blur-md bg-white/90 border-b border-stone-200/80 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Clean single-element Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
          >
            CHICKFILLA
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a
              href="#menu-section"
              onClick={(e) => handleLinkClick(e, 'menu-section')}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Menu & Combos
            </a>
            <a
              href="#pricing-section"
              onClick={(e) => handleLinkClick(e, 'pricing-section')}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Price Sheet
            </a>
            <a
              href="#spec-section"
              onClick={(e) => handleLinkClick(e, 'spec-section')}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Design Specs
            </a>
            <a
              href="#export-section"
              onClick={(e) => handleLinkClick(e, 'export-section')}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Export Code
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById('menu-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ backgroundColor: accentColor.hex }}
              className="px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-xs hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Menu</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
