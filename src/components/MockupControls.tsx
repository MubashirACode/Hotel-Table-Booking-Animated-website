import React, { useRef } from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Code2,
  Columns,
  Upload,
  Check,
  Type,
  Maximize2,
  Minimize2,
  Trash2,
} from 'lucide-react';
import { ACCENT_COLORS, BACKGROUND_TONES, SAMPLE_IMAGE_PATH, DEFAULT_CONFIG } from '../constants';
import { HeroContentConfig } from '../types';

interface MockupControlsProps {
  config: HeroContentConfig;
  onUpdateConfig: (partial: Partial<HeroContentConfig>) => void;
  is16x9Frame: boolean;
  onToggle16x9: () => void;
  onOpenCodeModal: () => void;
  onOpenCompareModal: () => void;
}

export const MockupControls: React.FC<MockupControlsProps> = ({
  config,
  onUpdateConfig,
  is16x9Frame,
  onToggle16x9,
  onOpenCodeModal,
  onOpenCompareModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="w-full bg-white border-y border-stone-200/90 shadow-xs py-4 px-6 sm:px-10">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left Side: Mockup Frame Mode & Typography & Theme Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Frame Mode Switcher */}
          <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs font-medium">
            <button
              onClick={onToggle16x9}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                is16x9Frame ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>16:9 Frame</span>
            </button>
            <button
              onClick={onToggle16x9}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                !is16x9Frame ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Viewport</span>
            </button>
          </div>

          {/* Font Family Selection */}
          <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs font-medium">
            <span className="px-2 text-stone-400 flex items-center gap-1">
              <Type className="w-3 h-3" />
              <span>Font:</span>
            </span>
            <button
              onClick={() => onUpdateConfig({ fontFamily: 'Poppins' })}
              className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                config.fontFamily === 'Poppins'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Poppins
            </button>
            <button
              onClick={() => onUpdateConfig({ fontFamily: 'Montserrat' })}
              className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                config.fontFamily === 'Montserrat'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Montserrat
            </button>
          </div>

          {/* Accent Color Palette */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-stone-100 rounded-lg">
            <span className="text-xs text-stone-500 font-medium mr-1">Accent:</span>
            {ACCENT_COLORS.map((col) => (
              <button
                key={col.id}
                onClick={() => onUpdateConfig({ accentColor: col })}
                title={col.name}
                style={{ backgroundColor: col.hex }}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                  config.accentColor.id === col.id ? 'ring-2 ring-stone-900 ring-offset-1 scale-110' : 'opacity-85 hover:opacity-100'
                }`}
              >
                {config.accentColor.id === col.id && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            ))}
          </div>

          {/* Accent Line Style */}
          <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => onUpdateConfig({ accentLineStyle: 'pulse' })}
              className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                config.accentLineStyle === 'pulse'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Pulse Accent
            </button>
            <button
              onClick={() => onUpdateConfig({ accentLineStyle: 'line' })}
              className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                config.accentLineStyle === 'line'
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Straight Line
            </button>
          </div>
        </div>

        {/* Right Side: Image Placement Testing & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Image Stage State */}
          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg p-1 text-xs">
            {config.rightImageSrc ? (
              <>
                <span className="px-2 font-medium text-emerald-700">Image Placed</span>
                <button
                  onClick={() => onUpdateConfig({ rightImageSrc: null })}
                  className="px-2 py-1 rounded bg-stone-200/70 hover:bg-rose-100 text-stone-700 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Remove image and keep clean empty space"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </>
            ) : (
              <>
                <span className="px-2 font-medium text-stone-600">Clean Empty Canvas</span>
                <button
                  onClick={() => onUpdateConfig({ rightImageSrc: SAMPLE_IMAGE_PATH })}
                  className="px-2.5 py-1 rounded bg-white hover:bg-stone-100 text-stone-800 font-medium shadow-2xs border border-stone-200 transition-colors cursor-pointer"
                  title="Test-fit sample platter"
                >
                  Test Sample
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                  title="Upload your own picture"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload</span>
                </button>
              </>
            )}
          </div>

          {/* Reference Modal Trigger */}
          <button
            onClick={onOpenCompareModal}
            className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Columns className="w-3.5 h-3.5 text-stone-500" />
            <span>Before vs After</span>
          </button>

          {/* Code Export Trigger */}
          <button
            onClick={onOpenCodeModal}
            className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>

          {/* Reset button */}
          <button
            onClick={() => onUpdateConfig(DEFAULT_CONFIG)}
            title="Reset to default settings"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
