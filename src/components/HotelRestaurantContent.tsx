import React, { useState, useEffect, useRef } from 'react';
import {
  Flame,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Users,
  Utensils,
  Wine,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Compass,
  Award,
  Maximize2,
  X,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

import chefTransparentImg from '../assets/images/chef_transparent.png';
import chefPresentingImg from '../assets/images/chef-presenting.png';

// Gallery assets
import wagyuImg from '../assets/images/gallery_wagyu_grill_1791784850595.jpg';
import diningRoomImg from '../assets/images/gallery_dining_room_1791784866246.jpg';
import sakeCellarImg from '../assets/images/gallery_sake_cellar_1791784879245.jpg';
import platedDishImg from '../assets/images/gallery_plated_dish_1791784894702.jpg';
import yakitoriFlameImg from '../assets/images/gallery_yakitori_flame_1791784954248.jpg';
import privateSuiteImg from '../assets/images/gallery_private_suite_1791784968190.jpg';

const CHEF_IMG_SRC = chefTransparentImg;

interface HotelRestaurantContentProps {
  onOpenReservationModal?: () => void;
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'Grill' | 'Dining Room' | 'Cellar' | 'Suites';
  image: string;
  subtitle: string;
}

export const HotelRestaurantContent: React.FC<HotelRestaurantContentProps> = () => {
  // Reservation state
  const [reserved, setReserved] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [partySize, setPartySize] = useState('2 Guests');
  const [timeSlot, setTimeSlot] = useState('7:30 PM');
  const [date, setDate] = useState('Tonight, Oct 11');
  const [seatingArea, setSeatingArea] = useState('Robata Counter');
  const [specialRequest, setSpecialRequest] = useState('');

  // Gallery filter & lightbox state
  const [activeCategory, setActiveCategory] = useState<'All' | 'Grill' | 'Dining Room' | 'Cellar' | 'Suites'>('All');
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryItem | null>(null);

  // Exact menu dishes
  const robataDishes = [
    {
      name: 'A5 Miyazaki Wagyu Striploin',
      japanese: '宮崎牛',
      notes: 'Binchotan charcoal seared, smoked sea salt, freshly grated shizuoka wasabi',
      price: '$98',
      tag: 'Chef Signature',
    },
    {
      name: 'Glazed Black Cod Robatayaki',
      japanese: '銀鱈の西京焼き',
      notes: '72-hour saikyo white miso marinade, pickled hajikami ginger, citrus reduction',
      price: '$54',
      tag: 'Guest Favorite',
    },
    {
      name: 'King Oyster Mushroom & Truffle',
      japanese: 'エリンギ炭火焼',
      notes: 'Charred over white oak coals, winter black truffle butter, crispy scallion',
      price: '$28',
      tag: 'Vegetarian',
    },
    {
      name: 'Free-Range Jidori Chicken Yakitori',
      japanese: '地鶏焼き鳥',
      notes: 'Skewered thigh & scallion, aged tare glaze perfected over 15 years, togarashi',
      price: '$32',
      tag: 'Classic Grill',
    },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      title: 'A5 Miyazaki Wagyu over White Oak',
      category: 'Grill',
      image: wagyuImg,
      subtitle: 'Searing at 1,000°C over Japanese Kishu binchotan',
    },
    {
      id: 'g2',
      title: 'The Grand Dining Pavilion',
      category: 'Dining Room',
      image: diningRoomImg,
      subtitle: 'Warm architectural cedar woodwork with natural amber glow',
    },
    {
      id: 'g3',
      title: 'Rare Reserve Sake Cellar',
      category: 'Cellar',
      image: sakeCellarImg,
      subtitle: 'Curated junmai daiginjo and vintage Yamanashi vintages',
    },
    {
      id: 'g4',
      title: 'Artisanal Plated Gastronomy',
      category: 'Grill',
      image: platedDishImg,
      subtitle: 'Harmonizing intense charcoal essence with delicate micro-greens',
    },
    {
      id: 'g5',
      title: 'Master Robata Flame Theater',
      category: 'Grill',
      image: yakitoriFlameImg,
      subtitle: 'Live counter preparation guided by second-generation masters',
    },
    {
      id: 'g6',
      title: 'Imperial Private Tatami Suite',
      category: 'Suites',
      image: privateSuiteImg,
      subtitle: 'Dedicated tableside hearth for gatherings of 6 to 24 guests',
    },
  ];

  const filteredGallery =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Intersection observers for section reveals
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const expRef = useRef<HTMLElement>(null);
  const [expEntered, setExpEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = expRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setExpEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'GH-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);
    setReserved(true);
  };

  return (
    <div className="w-full text-stone-900 overflow-hidden">
      
      {/* =========================================================================
          SECTION 1: CHEF'S ROBATA GRILL MENU (CENTERED WITH WELCOMING CHEF)
          Background: Warm cream (#FAF7F2), 120px desktop padding
          ========================================================================= */}
      <section
        ref={sectionRef}
        id="grill-menu"
        className="relative bg-[#FAF7F2] py-20 sm:py-28 px-6 sm:px-12 border-t border-stone-200/70 overflow-hidden"
      >
        {/* Subtle large Japanese watermark text (4 to 5% opacity, centered behind heading) */}
        <div
          aria-hidden="true"
          className="absolute top-48 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[8rem] sm:text-[11rem] md:text-[14rem] font-bold text-stone-900/5 tracking-[0.25em] leading-none z-0"
        >
          炭火焼
        </div>

        {/* -----------------------------------------------------------------------
            CHEF CHARACTER: Top center directly above heading, arms open wide
            Welcoming guests and presenting the dishes below.
            No background box, card, or outline.
            ----------------------------------------------------------------------- */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Soft warm radial glow behind chef */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-88 md:w-96 h-72 sm:h-88 md:h-96 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(234, 88, 12, 0.16) 0%, rgba(245, 222, 200, 0.32) 48%, transparent 72%)',
              filter: 'blur(32px)',
            }}
          />

          {/* Floating ember particles rising around chef */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            <span className="absolute top-2/3 left-[28%] w-2 h-2 rounded-full bg-orange-400/60 blur-[0.5px] animate-ember-p1" />
            <span className="absolute top-1/2 right-[26%] w-1.5 h-1.5 rounded-full bg-amber-400/70 blur-[0.5px] animate-ember-p2" />
            <span className="absolute top-3/4 right-[32%] w-2.5 h-2.5 rounded-full bg-orange-300/50 blur-[1px] animate-ember-p3" />
            <span className="absolute top-2/3 left-[35%] w-1.5 h-1.5 rounded-full bg-orange-500/60 blur-[0.5px] animate-ember-p4" />
          </div>

          {/* Chef Character Image (Pure transparent PNG, no background box) */}
          <div className="relative">
            <img
              src={CHEF_IMG_SRC}
              onError={(e) => {
                e.currentTarget.src = '/images/chef-welcome.png';
              }}
              width="340"
              height="340"
              loading="lazy"
              alt="Anime chef welcoming guests with open arms"
              className="h-[210px] sm:h-[270px] md:h-[310px] lg:h-[340px] w-auto object-contain select-none pointer-events-none animate-chef-float"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
              }}
            />
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            SECTION HEADER: Centered Eyebrow, Heading, Description & Divider
            ----------------------------------------------------------------------- */}
        <div
          className={`relative z-10 text-center max-w-2xl mx-auto mt-2 transition-all duration-700 ease-out delay-150 ${
            hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Small orange eyebrow with flame icon */}
          <div className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#EA580C] mb-2.5">
            <Flame className="w-4 h-4 text-[#EA580C]" />
            <span>BINCHOTAN CHARCOAL ROBATA</span>
          </div>

          {/* Big bold heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1917] tracking-tight">
            Artisanal Grill Selection
          </h2>

          {/* Short description paragraph (max-width ~620px, centered) */}
          <p className="text-stone-500 text-sm sm:text-base mt-3 max-w-[620px] mx-auto leading-relaxed font-normal">
            Prepared live over white oak coals by our culinary artisans. Each dish harmonizes intense smoke with delicate umami.
          </p>

          {/* Small decorative divider: thin line + small orange flame + thin line */}
          <div className="flex items-center justify-center gap-3 mt-5 max-w-xs mx-auto">
            <span className="h-[1px] w-14 sm:w-20 bg-stone-300/80" />
            <Flame className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="h-[1px] w-14 sm:w-20 bg-stone-300/80" />
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            MENU CARDS: 2 by 2 grid (1 col mobile), z-index above chef hands,
            reveal stagger + hover lift 6px and arrow motion
            ----------------------------------------------------------------------- */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-12 sm:mt-14">
          {robataDishes.map((dish, i) => (
            <div
              key={i}
              style={{
                transitionDelay: hasEntered ? `${i * 120 + 200}ms` : '0ms',
              }}
              className={`group bg-white rounded-3xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:shadow-orange-950/10 hover:border-orange-300/90 hover:-translate-y-[6px] transition-all duration-300 flex flex-col justify-between cursor-default ${
                hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2.5">
                  <span className="font-mono text-stone-500 font-medium">{dish.japanese}</span>
                  <span className="text-[#EA580C] font-semibold bg-orange-50 border border-orange-100 px-3 py-0.5 rounded-full text-[11px]">
                    {dish.tag}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-[#EA580C] transition-colors">
                  {dish.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-2.5 leading-relaxed">
                  {dish.notes}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-stone-900 font-mono tabular-nums">
                    {dish.price}
                  </span>
                  <span className="text-[11px] text-stone-400 font-medium">per serving</span>
                </div>
                <span className="text-xs text-stone-400 font-medium flex items-center gap-1 group-hover:text-stone-800 transition-colors">
                  <span>Grilled to order</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5 text-[#EA580C]" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tasting Flight Note */}
        <div className="max-w-2xl mx-auto mt-10 p-4 sm:p-5 rounded-2xl bg-white/70 border border-orange-100 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-stone-700">
            <Sparkles className="w-4 h-4 text-[#EA580C] shrink-0" />
            <span><strong>Chef's Grand Omakase Progression:</strong> 7-course charcoal tasting pairing available upon request.</span>
          </div>
          <a
            href="#reservations"
            className="text-[#EA580C] hover:text-[#D94F04] font-semibold whitespace-nowrap flex items-center gap-1"
          >
            <span>Inquire Tableside</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: HOTEL DINING EXPERIENCE & AMBIANCE (WITH PRESENTING CHEF)
          Background: Pure white (#FFFFFF)
          ========================================================================= */}
      <section
        id="experience"
        ref={expRef}
        className="bg-white border-y border-stone-200/80 py-20 sm:py-28 px-6 sm:px-10 lg:px-12 overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
          
          {/* 1. Character on the left: Facing right with open palms presenting toward text and cards */}
          <div
            className={`w-full lg:w-[310px] xl:w-[340px] shrink-0 flex justify-center lg:justify-start items-center pointer-events-none z-10 transition-all duration-800 ease-out ${
              expEntered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <img
              src={chefPresentingImg}
              onError={(e) => {
                e.currentTarget.src = '/images/chef-presenting.png';
              }}
              width="350"
              height="438"
              loading="lazy"
              alt="Anime chef presenting the dining experience with open palms"
              className="w-[210px] md:w-[240px] lg:w-[310px] xl:w-[340px] h-auto object-contain select-none pointer-events-none animate-chef-float"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.08))',
              }}
            />
          </div>

          {/* 2. Middle text content block */}
          <div
            className={`w-full lg:w-[340px] xl:w-[380px] shrink-0 space-y-4 text-left z-20 transition-all duration-700 ease-out delay-150 ${
              expEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-[0.2em] inline-block">
              Hospitality & Architecture
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight leading-tight">
              An Elevated Sensory Journey
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              Situated within the Grand Horizon Hotel, our open grill theater connects diners with the raw artistry of smoke, heat, and precision blade work.
            </p>
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-3 text-xs font-semibold text-stone-700 py-1 border-b border-stone-100">
                <Clock className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span>Dinner Service: 5:30 PM — 11:30 PM Daily</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-stone-700 py-1">
                <Wine className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span>Sommelier Paired Wine & Rare Sake Cellar</span>
              </div>
            </div>
          </div>

          {/* 3. Right 2 by 2 cards grid (01 to 04) */}
          <div
            className={`flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-5 z-20 transition-all duration-700 ease-out delay-300 ${
              expEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold text-sm mb-3">
                01
              </div>
              <h4 className="text-sm font-bold text-stone-900">Binchotan Heat</h4>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Imported Japanese Kishu charcoal burns at over 1,000°C with clean infrared radiance, sealing in natural juices without sulfur taste.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold text-sm mb-3">
                02
              </div>
              <h4 className="text-sm font-bold text-stone-900">Private Dining Suites</h4>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Accommodating intimate parties of 6 to 24 with dedicated tableside grill master and custom omakase progressions.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold text-sm mb-3">
                03
              </div>
              <h4 className="text-sm font-bold text-stone-900">Sustainably Sourced</h4>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Direct partnerships with regenerative ranches and Toyosu market seafood flown in three times weekly.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold text-sm mb-3">
                04
              </div>
              <h4 className="text-sm font-bold text-stone-900">Hotel Guest Privilege</h4>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                Priority booking window and complimentary sommelier pairing glass for registered hotel suite patrons.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ATMOSPHERE & CRAFT GALLERY
          Background: Warm cream (#FAF7F2)
          ========================================================================= */}
      <section
        id="gallery"
        className="bg-[#FAF7F2] py-20 sm:py-28 px-6 sm:px-12 border-b border-stone-200/80"
      >
        <div className="max-w-[1200px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-[0.2em] inline-block mb-2">
              Atmosphere & Visual Craft
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
              The Grand Horizon Realm
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-2.5 leading-relaxed">
              From open ember counters to private cedar pavilions, immerse yourself in our sanctuary of warmth and design.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {(['All', 'Grill', 'Dining Room', 'Cellar', 'Suites'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#EA580C] text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-4/3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-[#EA580C] px-2.5 py-1 rounded-full text-white">
                      {item.category}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5 text-white" />
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white leading-snug drop-shadow-xs">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-700/60"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-16/10 w-full bg-stone-950">
              <img
                src={activeLightboxImage.image}
                alt={activeLightboxImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                  {activeLightboxImage.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {activeLightboxImage.title}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  {activeLightboxImage.subtitle}
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveLightboxImage(null);
                  const el = document.getElementById('reservations');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#EA580C] hover:bg-[#D94F04] text-white shrink-0 cursor-pointer"
              >
                Reserve View Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 4: GUEST REVIEWS & CRITICAL ACCLAIM
          Background: Pure white (#FFFFFF)
          ========================================================================= */}
      <section id="reviews" className="bg-white py-20 sm:py-28 px-6 sm:px-12 border-b border-stone-200/80">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-[0.2em] inline-block mb-2">
              Critical Acclaim & Accolades
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
              Distinguished Impressions
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-2.5">
              Reflections from international culinary guides and discerning patrons of Grand Horizon Hotel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Review 1 */}
            <div className="bg-[#FAF7F2] p-7 rounded-3xl border border-stone-200 flex flex-col justify-between hover:border-orange-300 hover:shadow-lg transition-all">
              <div>
                <div className="flex items-center gap-1 text-[#EA580C] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  “The Binchotan smoke imparts a pure, almost musical clarity to the A5 Miyazaki Wagyu. Watching the chef balance intense heat with razor delicacy is unforgettable.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 text-[#EA580C] font-bold text-xs flex items-center justify-center">
                  ER
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Elena Rostova</div>
                  <div className="text-[11px] text-stone-500">Gastronomy Critic, Tokyo Chronicle</div>
                </div>
              </div>
            </div>

            {/* Review 2 (Featured) */}
            <div className="bg-stone-900 text-white p-7 rounded-3xl border border-stone-800 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#EA580C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-[#EA580C] px-2.5 py-0.5 rounded-full">
                    Michelin Selected
                  </span>
                </div>
                <p className="text-stone-200 text-sm leading-relaxed italic">
                  “An intimate masterclass in Robatayaki. The 72-hour Saikyo black cod flakes with extraordinary silkiness, while the sommelier's sake pairings reveal subtle cedar nuances.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#EA580C] text-white font-bold text-xs flex items-center justify-center">
                  MV
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Marcus Vance</div>
                  <div className="text-[11px] text-stone-400">Forbes Luxury Dining Guide</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#FAF7F2] p-7 rounded-3xl border border-stone-200 flex flex-col justify-between hover:border-orange-300 hover:shadow-lg transition-all">
              <div>
                <div className="flex items-center gap-1 text-[#EA580C] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  “We celebrated our anniversary in the Imperial Tatami Suite. The attentive hospitality, personal grill master, and serene ambiance made it our finest hotel dinner this year.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 text-[#EA580C] font-bold text-xs flex items-center justify-center">
                  CL
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Chloe & David Lin</div>
                  <div className="text-[11px] text-stone-500">Suite Patrons, Grand Horizon</div>
                </div>
              </div>
            </div>

          </div>

          {/* Hospitality Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-stone-500 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#EA580C]" />
              <span>Michelin Guide Tokyo Recommended 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
              <span>Kishu Charcoal Guild Authenticity Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#EA580C]" />
              <span>Forbes 5-Star Hotel Dining Privilege</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TABLE RESERVATION FORM
          Background: Warm cream (#FAF7F2)
          ========================================================================= */}
      <section id="reservations" className="bg-[#FAF7F2] py-20 sm:py-28 px-6 sm:px-12 border-b border-stone-200/80">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm text-center">
            
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-[0.2em] inline-block">
              Table Reservations
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] mt-1 tracking-tight">
              Reserve Your Culinary Experience
            </h3>
            <p className="text-sm text-stone-500 mt-2 max-w-md mx-auto leading-relaxed">
              Counter seating offers front-row views of the Binchotan grill theater. Private suites accommodate 6 to 24 guests.
            </p>

            {/* Seating Area Selector */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              {[
                { name: 'Robata Counter', desc: 'Front-row view of live flame theater' },
                { name: 'Main Dining Pavilion', desc: 'Spacious table with warm ambient glow' },
                { name: 'Private Tatami Suite', desc: 'Dedicated tableside hearth for groups' },
              ].map((area) => (
                <div
                  key={area.name}
                  onClick={() => setSeatingArea(area.name)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    seatingArea === area.name
                      ? 'border-[#EA580C] bg-orange-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{area.name}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        seatingArea === area.name ? 'border-[#EA580C] bg-[#EA580C]' : 'border-stone-300'
                      }`}
                    >
                      {seatingArea === area.name && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1 leading-normal">{area.desc}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleReservationSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Date</span>
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#EA580C] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Party Size</span>
                </label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#EA580C] focus:bg-white transition-colors cursor-pointer"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>Private Suite (8-16 Guests)</option>
                  <option>Imperial Suite (16-24 Guests)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Preferred Time</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#EA580C] focus:bg-white transition-colors cursor-pointer"
                >
                  <option>5:30 PM (Early Dinner)</option>
                  <option>6:30 PM</option>
                  <option>7:30 PM (Prime Service)</option>
                  <option>8:30 PM</option>
                  <option>9:30 PM (Late Grill & Sake)</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Special Notes / Dietary Requirements (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anniversary celebration, pescatarian, sake pairing preference..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#EA580C] focus:bg-white transition-colors"
                />
              </div>

              <div className="sm:col-span-3 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No cancellation fees up to 6 hours prior to service.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-3.5 bg-[#EA580C] hover:bg-[#D94F04] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  {reserved ? '✓ Table Reserved' : 'Confirm Table Reservation'}
                </button>
              </div>
            </form>

            {reserved && (
              <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-950">
                      Table Confirmed: {partySize} at {seatingArea}
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-0.5">
                      Date: {date} · Time: {timeSlot} · Booking ID: <span className="font-mono font-bold">{confirmationCode}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setReserved(false)}
                  className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold underline cursor-pointer"
                >
                  Modify Details
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: LOCATION, HOURS & CONCIERGE
          Background: Pure white (#FFFFFF)
          ========================================================================= */}
      <section id="location" className="bg-white py-20 sm:py-28 px-6 sm:px-12 border-b border-stone-200/80">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-[0.2em] inline-block mb-2">
              Visit Grand Horizon
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
              Location & Operating Hours
            </h2>
            <p className="text-stone-500 text-sm sm:text-base mt-2.5">
              Located on the 3rd Floor East Wing of the Grand Horizon Hotel, overlooking the Japanese garden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Address & Arrival */}
            <div className="bg-[#FAF7F2] p-7 rounded-3xl border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-stone-900">Address & Arrival</h4>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Grand Horizon Hotel & Grill<br />
                3rd Floor East Wing, Garden Terrace<br />
                100 Horizon Avenue, District 1
              </p>
              <div className="mt-4 pt-4 border-t border-stone-200/60 text-xs text-stone-500">
                <span className="font-semibold text-stone-700">Valet Service:</span> Available at the hotel main porte-cochère 24/7.
              </div>
            </div>

            {/* Card 2: Operating Hours */}
            <div className="bg-[#FAF7F2] p-7 rounded-3xl border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-stone-900">Dinner Service Hours</h4>
              <div className="space-y-2 mt-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span className="font-medium text-stone-700">Daily Dinner:</span>
                  <span className="font-mono">5:30 PM — 11:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-stone-700">Last Order:</span>
                  <span className="font-mono">10:45 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-stone-700">Late Night Sake Bar:</span>
                  <span className="font-mono">Until 1:00 AM (Fri-Sat)</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-200/60 text-xs text-stone-500">
                <span className="font-semibold text-stone-700">Dress Code:</span> Smart Casual / Elegant Evening attire recommended.
              </div>
            </div>

            {/* Card 3: Inquiries & Private Dining */}
            <div className="bg-[#FAF7F2] p-7 rounded-3xl border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-stone-900">Concierge & Inquiries</h4>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Direct Line: +1 (800) 555-ROBATA<br />
                Concierge Desk: ext. 4208<br />
                Email: dining@grandhorizonhotel.com
              </p>
              <div className="mt-4 pt-4 border-t border-stone-200/60">
                <a
                  href="#reservations"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] hover:text-[#D94F04]"
                >
                  <span>Book Private Tatami Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          LUXURY HOTEL RESTAURANT FOOTER
          ========================================================================= */}
      <footer className="bg-stone-900 text-white pt-16 pb-12 px-6 sm:px-12 border-t border-stone-800">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
            
            {/* Col 1: Brand Wordmark */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-extrabold tracking-tight text-white leading-none">
                    GRAND HORIZON
                  </div>
                  <div className="text-[10px] tracking-widest text-[#EA580C] font-bold uppercase mt-0.5">
                    HOTEL & ROBATA GRILL
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                Mastering the ancient art of Japanese white oak charcoal gastronomy. An intimate dining sanctuary within Grand Horizon Hotel.
              </p>
              <div className="text-xs text-stone-400 pt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Now Seating for Evening Dinner Service</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
                Experience
              </div>
              <ul className="space-y-2 text-xs text-stone-400">
                <li><a href="#grill-menu" className="hover:text-[#EA580C] transition-colors">Artisanal Grill Selection</a></li>
                <li><a href="#experience" className="hover:text-[#EA580C] transition-colors">Hospitality & Architecture</a></li>
                <li><a href="#gallery" className="hover:text-[#EA580C] transition-colors">Atmosphere & Gallery</a></li>
                <li><a href="#reviews" className="hover:text-[#EA580C] transition-colors">Michelin Reviews & Acclaim</a></li>
                <li><a href="#reservations" className="hover:text-[#EA580C] transition-colors">Reserve a Table</a></li>
              </ul>
            </div>

            {/* Col 3: Hours & Contact */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
                Hours & Contact
              </div>
              <div className="space-y-2 text-xs text-stone-400">
                <p>Dinner: 5:30 PM — 11:30 PM Daily</p>
                <p>Late Sake Bar: Until 1:00 AM (Fri-Sat)</p>
                <p>Concierge: +1 (800) 555-ROBATA</p>
                <p>Location: 3rd Floor East Wing</p>
              </div>
            </div>

          </div>

          {/* Bottom copyright line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <div>
              © 2026 Grand Horizon Hotel & Grill. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#hero" className="text-stone-300 hover:text-[#EA580C] transition-colors font-medium">
                Back to Top ↑
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
