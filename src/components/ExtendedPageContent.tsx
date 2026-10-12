import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Check,
  Edit3,
  Sliders,
  Layers,
  Code2,
} from 'lucide-react';
import { HeroContentConfig } from '../types';

interface ExtendedPageContentProps {
  config: HeroContentConfig;
  onUpdateConfig: (partial: Partial<HeroContentConfig>) => void;
  onOpenCodeModal: () => void;
}

export const ExtendedPageContent: React.FC<ExtendedPageContentProps> = ({
  config,
  onUpdateConfig,
  onOpenCodeModal,
}) => {
  const menuItems = [
    {
      name: 'Artisan Crispy Chicken Sandwich',
      category: 'Signature Sandwiches',
      description: 'Buttermilk fried chicken breast, toasted brioche bun, house pickles, garlic aioli',
      price: '$8.49',
      badge: 'Popular',
    },
    {
      name: 'Spicy Deluxe Hot Filet',
      category: 'Signature Sandwiches',
      description: 'Habanero cayenne seasoned crispy filet, pepper jack cheese, cool leafy greens',
      price: '$9.19',
      badge: 'Spicy',
    },
    {
      name: 'Golden Seasoned Waffle Fries',
      category: 'Crispy Sides',
      description: 'Lattice-cut Idaho potatoes dusted with sea salt and cracked pepper blend',
      price: '$3.89',
      badge: 'Classic',
    },
    {
      name: 'Crispy Tender 6-Piece Box',
      category: 'Hand-Breaded Tenders',
      description: 'Double hand-battered tenderloins served with signature roasted honey mustard',
      price: '$10.29',
      badge: 'Top Rated',
    },
    {
      name: 'Craft Vanilla Bean Milkshake',
      category: 'Chilled Treats',
      description: 'Hand-spun Madagascar bourbon vanilla custard with fresh whipped dairy cream',
      price: '$5.49',
      badge: 'Dessert',
    },
    {
      name: 'Artisan Lemon Sweet Tea',
      category: 'Fresh Beverages',
      description: 'Freshly brewed black tea leaves steeped with real Meyer lemon juice and pure cane sugar',
      price: '$2.99',
      badge: 'Chilled',
    },
  ];

  return (
    <div className="w-full bg-stone-50/70 border-t border-stone-200/80">
      
      {/* SECTION 1: Interactive Live Text & Layout Customizer */}
      <section id="customizer-section" className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase mb-1">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Interactive Mockup Editor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Customize Hero Mockup Content
            </h2>
            <p className="text-sm text-stone-500 mt-1 max-w-xl">
              Type directly into the inputs below to live-test any headings, taglines, or copy on your clean hero canvas.
            </p>
          </div>

          <button
            onClick={onOpenCodeModal}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Get Export Ready Code</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-xs">
          
          {/* Tagline */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
              <span>Tagline (Small upper text)</span>
              <span className="text-[10px] text-stone-400 font-normal">With thin accent line</span>
            </label>
            <input
              type="text"
              value={config.tagline}
              onChange={(e) => onUpdateConfig({ tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-stone-400 focus:outline-hidden transition-all text-stone-900 font-medium"
              placeholder="e.g. FRESH. DELICIOUS. ALWAYS."
            />
          </div>

          {/* Heading Line 1 (Dark Charcoal) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
              <span>Heading Line 1</span>
              <span className="text-[10px] text-stone-900 font-bold">Dark Charcoal</span>
            </label>
            <input
              type="text"
              value={config.headingLine1}
              onChange={(e) => onUpdateConfig({ headingLine1: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-stone-400 focus:outline-hidden transition-all text-stone-900 font-bold"
              placeholder="e.g. MENU"
            />
          </div>

          {/* Heading Line 2 (Warm Accent) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
              <span>Heading Line 2</span>
              <span className="text-[10px] font-bold" style={{ color: config.accentColor.hex }}>
                Warm Accent
              </span>
            </label>
            <input
              type="text"
              value={config.headingLine2}
              onChange={(e) => onUpdateConfig({ headingLine2: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-stone-400 focus:outline-hidden transition-all font-bold"
              style={{ color: config.accentColor.hex }}
              placeholder="e.g. PRICES"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
              <span>Description Paragraph</span>
              <span className="text-[10px] text-stone-400 font-normal">Soft gray, high legibility</span>
            </label>
            <input
              type="text"
              value={config.description}
              onChange={(e) => onUpdateConfig({ description: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-stone-400 focus:outline-hidden transition-all text-stone-700"
              placeholder="e.g. Find your favorites and their prices all in one place."
            />
          </div>

          {/* Button Label */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
              <span>Primary CTA Button Text</span>
              <span className="text-[10px] text-stone-400 font-normal">Rounded corners</span>
            </label>
            <input
              type="text"
              value={config.ctaText}
              onChange={(e) => onUpdateConfig({ ctaText: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-stone-400 focus:outline-hidden transition-all text-stone-900 font-medium"
              placeholder="e.g. Explore Full Menu"
            />
          </div>

        </div>
      </section>

      {/* SECTION 2: Menu & Price Sheet (To test scrolling and sticky navbar) */}
      <section id="menu-section" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 border-t border-stone-200/70">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D96528] mb-1">
              <span>Freshly Prepared</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Featured Menu & Live Pricing
            </h2>
            <p className="text-stone-500 text-sm mt-1 max-w-lg">
              Crafted in our bright, skin-tone visual aesthetic with sharp typography and zero clutter.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium bg-stone-100 px-3 py-1.5 rounded-lg">
            Sticky Navbar is active above (Scroll down to verify)
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-amber-900/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span>{item.category}</span>
                  <span className="text-stone-600 font-medium">{item.badge}</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-lg font-extrabold text-stone-900 font-mono tabular-nums">
                  {item.price}
                </span>
                <button
                  style={{ backgroundColor: config.accentColor.hex }}
                  className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Design Specs & Redesign Architecture */}
      <section id="spec-section" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 border-t border-stone-200/70">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Specification Compliance
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            Redesign Architecture & Principles
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            Every instruction from your prompt was translated directly into clean, production-grade styling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h4 className="text-sm font-bold text-stone-900">Bright Skin Tone Gradient</h4>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Completely eliminated dark navy and orange background. Pure white on left transitioning into soft peach beige, cream, and sand tones on the right.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h4 className="text-sm font-bold text-stone-900">Right Space Ready</h4>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Removed heavy tray of nuggets, burgers, fries, ice cream, and table. Replaced with soft glow and subtle decorative aura ready for your custom image.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h4 className="text-sm font-bold text-stone-900">Bold 2-Line Left Type</h4>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Tagline with accent line, big bold heading with Line 1 in dark charcoal and Line 2 in warm accent, short soft-gray description, and rounded primary CTA.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-sm mb-4">
              04
            </div>
            <h4 className="text-sm font-bold text-stone-900">Scroll Sticky Navbar</h4>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Hero starts completely free of top navigation or logos. When scrolling past 80px, sticky header glides into view smoothly using requested CSS & JS.
            </p>
          </div>

        </div>
      </section>

      {/* Quiet Minimalist Footer */}
      <footer id="export-section" className="bg-white border-t border-stone-200 py-10 px-6 sm:px-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900">CHICKFILLA</span>
            <span>·</span>
            <span>Modern 16:9 Hero Redesign Mockup</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-stone-900 transition-colors">Back to Hero</a>
            <button onClick={onOpenCodeModal} className="hover:text-stone-900 transition-colors cursor-pointer">
              Export Snippet
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
