import React, { useEffect, useState } from 'react';
import { UtensilsCrossed, ArrowRight, Menu, X } from 'lucide-react';

interface HotelNavbarProps {
  onReserveClick: () => void;
}

export const HotelNavbar: React.FC<HotelNavbarProps> = ({ onReserveClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll trigger, scroll progress bar, and shrinking navbar height
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 80;
      setIsScrolled(scrolled);

      // Scroll progress percentage
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }

      // Toggle navbar visibility class
      const nav = document.querySelector('.navbar');
      if (nav) {
        if (scrolled) {
          nav.classList.add('show');
        } else {
          nav.classList.remove('show');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section highlight spy via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'grill-menu', 'experience', 'gallery', 'reviews', 'location', 'reservations'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Body scroll lock and Escape key listener for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Robata Grill', id: 'grill-menu' },
    { label: 'The Experience', id: 'experience' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Guest Reviews', id: 'reviews' },
    { label: 'Location & Hours', id: 'location' },
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Thin scroll progress indicator at top */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#EA580C] z-[120] transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="navbar">
        <div
          className={`backdrop-blur-md bg-white/90 border-b border-stone-200/80 shadow-xs transition-all duration-300 ${
            isScrolled ? 'py-3' : 'py-4'
          }`}
        >
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex items-center justify-between gap-6">
            
            {/* Zone 1: Logo & Brand Wordmark */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="flex items-center gap-2.5 text-stone-900 hover:text-stone-700 transition-colors shrink-0 group focus-visible:rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight leading-none text-[#1C1917]">
                  GRAND HORIZON
                </span>
                <span className="text-[10px] tracking-widest text-[#EA580C] font-semibold uppercase mt-0.5">
                  HOTEL & ROBATA GRILL
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links with Active Indicator (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 focus-visible:rounded ${
                      isActive ? 'text-[#EA580C] font-semibold' : 'text-stone-600'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#EA580C] rounded-full transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Mobile Hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onReserveClick();
                  const el = document.getElementById('reservations');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#EA580C] hover:bg-[#D94F04] rounded-full shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Reserve Table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Hamburger Button for Mobile */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors focus-visible:outline-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-down Overlay Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-xl border-b border-stone-200/90 shadow-xl px-6 py-8 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-4 py-3 text-base rounded-xl font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-orange-50 text-[#EA580C] font-semibold'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-stone-200">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onReserveClick();
                  const el = document.getElementById('reservations');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#D94F04] rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>Reserve a Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
