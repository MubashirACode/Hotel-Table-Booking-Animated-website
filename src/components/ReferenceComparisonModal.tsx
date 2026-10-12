import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { HeroContentConfig } from '../types';

interface ReferenceComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: HeroContentConfig;
}

export const ReferenceComparisonModal: React.FC<ReferenceComparisonModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <h3 className="text-base font-bold text-stone-900">Before & After Redesign Comparison</h3>
            <p className="text-xs text-stone-500">Checking all design specifications against original reference</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Side by side visual cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Original reference */}
            <div className="flex flex-col border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
              <div className="px-4 py-2 bg-stone-900 text-stone-300 text-xs font-semibold flex items-center justify-between">
                <span>Original Reference (Dark Navy & Orange)</span>
                <span className="text-[10px] text-amber-400 font-normal">Prior Design</span>
              </div>
              <div className="aspect-[16/9] bg-stone-950 flex items-center justify-center overflow-hidden">
                <img
                  src="28434cc51334f7a6cbc5d2fbd43954c6.jpg"
                  alt="Original Reference"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-xs text-stone-600 space-y-1.5">
                <p className="font-semibold text-stone-900">Observed elements to replace:</p>
                <ul className="list-disc list-inside space-y-1 text-stone-500">
                  <li>Heavy dark navy/black & hot orange gradient</li>
                  <li>Crowded food tray on right (ice cream, burger, nuggets)</li>
                  <li>ChickFilla logo and domain in top left</li>
                  <li>3 feature boxes at bottom with icons</li>
                </ul>
              </div>
            </div>

            {/* Redesigned Mockup */}
            <div className="flex flex-col border border-amber-200/80 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="px-4 py-2 bg-amber-600 text-white text-xs font-semibold flex items-center justify-between">
                <span>Redesigned Modern 16:9 Mockup</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white font-medium">Updated Specification</span>
              </div>
              
              {/* Mini preview */}
              <div
                className="aspect-[16/9] relative overflow-hidden flex items-center px-6"
                style={{
                  background: 'linear-gradient(110deg, #FFFFFF 0%, #FFFDFB 42%, #FAF0E6 75%, #F4E2D2 100%)',
                }}
              >
                {/* Glow ring */}
                <div
                  className="absolute right-6 w-32 h-32 rounded-full blur-xl pointer-events-none"
                  style={{ background: 'rgba(235, 178, 142, 0.4)' }}
                />

                <div className="relative z-10 max-w-[60%]">
                  <div className="flex items-center gap-1.5 mb-1 text-[8px] font-bold tracking-widest text-[#D96528] uppercase">
                    <span>—</span>
                    <span>{config.tagline}</span>
                  </div>
                  <h4 className="text-xl font-extrabold leading-none text-stone-900">
                    {config.headingLine1}
                    <br />
                    <span style={{ color: config.accentColor.hex }}>{config.headingLine2}</span>
                  </h4>
                  <p className="mt-1 text-[9px] text-stone-500 line-clamp-1">{config.description}</p>
                  <div className="mt-2">
                    <span
                      style={{ backgroundColor: config.accentColor.hex }}
                      className="inline-block px-2.5 py-1 text-[8px] font-semibold text-white rounded-md shadow-2xs"
                    >
                      {config.ctaText}
                    </span>
                  </div>
                </div>

                {/* Right side empty placeholder badge */}
                <div className="ml-auto w-24 h-24 border border-dashed border-amber-800/20 rounded-2xl flex flex-col items-center justify-center text-center p-1 bg-white/30 backdrop-blur-xs">
                  <span className="text-[8px] font-medium text-stone-600">Clean & Ready</span>
                  <span className="text-[7px] text-stone-400">Empty Glow Slot</span>
                </div>
              </div>

              <div className="p-4 text-xs text-stone-600 space-y-1.5">
                <p className="font-semibold text-stone-900">Applied Redesign Changes:</p>
                <ul className="list-disc list-inside space-y-1 text-stone-600">
                  <li>Bright white to warm skin-tone subtle gradient</li>
                  <li>Right food tray completely removed; subtle soft glow ready slot</li>
                  <li>Clean Poppins/Montserrat typography with dark charcoal & warm accent</li>
                  <li>Bottom feature bar & top logo completely removed from hero</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Checklist of exact instructions implemented */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">Specification Compliance Audit</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Background:</strong> Replaced dark navy & orange with white to warm skin tone gradient (peach beige & soft sand).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Right Image:</strong> Food tray, nuggets, burgers & wooden table completely removed. Clean empty slot with soft glow.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Left Content:</strong> Tagline with thin accent line, bold 2-line heading (charcoal & warm accent), short description, rounded CTA button.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Removed:</strong> 3 bottom feature boxes, bottom bar, top navbar and logo removed from initial hero view.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Sticky Scroll Nav:</strong> Hidden on hero top, smoothly slides in past 80px scroll using requested CSS & JS logic.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Typography:</strong> Modern sans-serif Poppins & Montserrat with high legibility and balanced spacing.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
