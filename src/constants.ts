import { AccentColor, BackgroundTone, HeroContentConfig } from './types';

export const ACCENT_COLORS: AccentColor[] = [
  {
    id: 'terracotta',
    name: 'Warm Terracotta',
    hex: '#D96528',
    bgClass: 'bg-[#D96528]',
    hoverClass: 'hover:bg-[#C2551C]',
    textClass: 'text-[#D96528]',
  },
  {
    id: 'amber',
    name: 'Golden Amber',
    hex: '#D97706',
    bgClass: 'bg-amber-600',
    hoverClass: 'hover:bg-amber-700',
    textClass: 'text-amber-600',
  },
  {
    id: 'coral',
    name: 'Coral Peach',
    hex: '#E06D53',
    bgClass: 'bg-[#E06D53]',
    hoverClass: 'hover:bg-[#CB573D]',
    textClass: 'text-[#E06D53]',
  },
  {
    id: 'clay',
    name: 'Deep Clay',
    hex: '#B85022',
    bgClass: 'bg-[#B85022]',
    hoverClass: 'hover:bg-[#A04319]',
    textClass: 'text-[#B85022]',
  },
];

export const BACKGROUND_TONES: BackgroundTone[] = [
  {
    id: 'peach',
    name: 'Warm Skin Tone (Peach Beige)',
    class: 'bg-skintone-peach',
    glowColor: 'rgba(240, 190, 160, 0.35)',
  },
  {
    id: 'cream',
    name: 'Cream & Soft Sand',
    class: 'bg-skintone-gradient',
    glowColor: 'rgba(235, 178, 142, 0.35)',
  },
  {
    id: 'sand',
    name: 'Pure Sand Light',
    class: 'bg-skintone-sand',
    glowColor: 'rgba(225, 195, 170, 0.35)',
  },
];

export const SAMPLE_IMAGE_PATH = '/src/assets/images/sample_menu_platter_1791702413369.jpg';

export const DEFAULT_CONFIG: HeroContentConfig = {
  tagline: 'FRESH. DELICIOUS. ALWAYS.',
  headingLine1: 'MENU',
  headingLine2: 'PRICES',
  description: 'Find your favorites and their prices all in one place.',
  ctaText: 'Explore Full Menu',
  fontFamily: 'Poppins',
  accentColor: ACCENT_COLORS[0],
  accentLineStyle: 'pulse',
  backgroundTone: BACKGROUND_TONES[0],
  rightImageSrc: null, // Default is clean and empty!
  showPlaceholderHint: true,
  imageScale: 1,
};
