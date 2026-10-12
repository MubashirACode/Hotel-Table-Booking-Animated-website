export type FontFamily = 'Poppins' | 'Montserrat';

export type AccentColor = {
  id: string;
  name: string;
  hex: string;
  bgClass: string;
  hoverClass: string;
  textClass: string;
};

export type BackgroundTone = {
  id: string;
  name: string;
  class: string;
  glowColor: string;
};

export type AccentLineStyle = 'pulse' | 'line';

export interface HeroContentConfig {
  tagline: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  ctaText: string;
  fontFamily: FontFamily;
  accentColor: AccentColor;
  accentLineStyle: AccentLineStyle;
  backgroundTone: BackgroundTone;
  rightImageSrc: string | null;
  showPlaceholderHint: boolean;
  imageScale: number;
}
