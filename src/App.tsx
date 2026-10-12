/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HotelNavbar } from './components/HotelNavbar';
import { HotelHero } from './components/HotelHero';
import { HotelRestaurantContent } from './components/HotelRestaurantContent';

export default function App() {
  const handleScrollToReservations = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-poppins antialiased selection:bg-orange-200 selection:text-orange-950">
      
      {/* 
        Fixed top navbar:
        - Hidden initially (opacity 0, translateY(-100%), pointer-events none)
        - Appears smoothly when window.scrollY > 80
        - White blurred glass background, z-index: 100
      */}
      <HotelNavbar onReserveClick={handleScrollToReservations} />

      {/* 
        Modern, responsive, full-screen 100vh hero section for hotel restaurant:
        - Background: Pure white (#FFFFFF) on left to soft warm skin tone (#F5DEC8 to #EBCBAE) on right (z-index: 0)
        - Left 50%: Animated text content, charcoal & orange heading, rounded CTA, slideUp animations (z-index: 20)
        - Right 50%: Cloudinary anime chef video, continuous loop, muted, mask-image edge blend, mix-blend-mode: multiply (z-index: 10)
        - No bottom cards, no icons row, no bottom bar
      */}
      <HotelHero onReserveClick={handleScrollToReservations} />

      {/* 
        Restaurant menu, Robata grill, and reservation system below hero
        (allows smooth scrolling to test the sticky navbar trigger at 80px)
      */}
      <HotelRestaurantContent />

    </div>
  );
}
