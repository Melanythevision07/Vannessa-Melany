import React, { useState, useEffect } from 'react';
import { PixelHeart } from './PixelHeart';
import { sound } from '../utils/soundEngine';
import { Mail, Sparkles, Image as ImageIcon, CheckCircle2, RotateCcw } from 'lucide-react';

interface HeroSectionProps {
  partnerName: string;
  occasionTitle: string;
  heroSubtitle: string;
  introMessage: string;
  onOpenLetter: () => void;
  onScrollToGallery: () => void;
  onScrollToReasons: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  partnerName,
  occasionTitle,
  heroSubtitle,
  introMessage,
  onOpenLetter,
  onScrollToGallery,
  onScrollToReasons,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      index++;
      if (index <= introMessage.length) {
        setDisplayedText(introMessage.slice(0, index));
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [introMessage]);

  const handleSkipTyping = () => {
    sound.playCardFlip();
    setDisplayedText(introMessage);
    setIsTypingComplete(true);
  };

  const handleReplayTyping = () => {
    sound.playCardFlip();
    setDisplayedText('');
    setIsTypingComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      index++;
      if (index <= introMessage.length) {
        setDisplayedText(introMessage.slice(0, index));
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 18);
  };

  return (
    <section className="relative pt-8 pb-12 px-4 max-w-5xl mx-auto text-center">
      {/* Retro 8-Bit Floating Decors */}
      <div className="absolute left-2 top-4 hidden md:block pixel-float">
        <PixelHeart size={28} color="#FF3366" />
      </div>
      <div className="absolute right-4 top-10 hidden md:block pixel-float" style={{ animationDelay: '1.2s' }}>
        <PixelHeart size={34} color="#FF80AB" />
      </div>
      <div className="absolute left-8 bottom-6 hidden lg:block pixel-float" style={{ animationDelay: '0.6s' }}>
        <PixelHeart size={22} color="#FF1744" />
      </div>

      {/* Retro Pixel Badge */}
      <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border-2 border-[#1E0711] px-3.5 py-1.5 mb-6 shadow-[3px_3px_0_0_#FF3366]">
        <Sparkles className="w-3.5 h-3.5 text-[#FF3366]" />
        <span className="font-pixel text-[10px] text-[#C2185B] tracking-wider uppercase">
          {heroSubtitle}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#FF3366]" />
      </div>

      {/* Main Pixel Title */}
      <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-[#FF3366] leading-relaxed mb-4 tracking-tight drop-shadow-[2px_2px_0_#1E0711]">
        {occasionTitle}
      </h1>

      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-1 w-12 sm:w-20 bg-[#1E0711]" />
        <PixelHeart size={36} animated={true} />
        <div className="h-1 w-12 sm:w-20 bg-[#1E0711]" />
      </div>

      {/* Retro Dialogue Box / Romantic Introductory Message */}
      <div className="relative max-w-3xl mx-auto dialogue-frame p-5 sm:p-7 text-left mb-8">
        {/* Dialogue Speaker Header */}
        <div className="flex items-center justify-between border-b-2 border-[#FFE4EC] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#FFE4EC] border-2 border-[#1E0711] flex items-center justify-center">
              <PixelHeart size={20} />
            </div>
            <div>
              <span className="font-pixel text-[11px] text-[#FF3366] block">
                MENSAJE PARA: {partnerName.toUpperCase()}
              </span>
              <span className="font-pixel-sub text-[12px] text-zinc-500">
                Misión: Por Siempre Contigo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isTypingComplete ? (
              <button
                onClick={handleSkipTyping}
                className="font-pixel text-[9px] text-[#880E4F] hover:text-[#FF3366] underline cursor-pointer"
              >
                [SALTAR]
              </button>
            ) : (
              <button
                onClick={handleReplayTyping}
                title="Repetir texto"
                className="p-1 hover:bg-[#FFE4EC] border border-[#1E0711] text-[#880E4F]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* The Romantic Text */}
        <p className="font-pixel-sub text-sm sm:text-base md:text-lg leading-relaxed text-[#2A0815] min-h-[110px]">
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-2.5 h-4 bg-[#FF3366] ml-1 pixel-blink align-middle" />
          )}
        </p>

        {/* Dialogue Footer Controls */}
        <div className="mt-4 pt-3 border-t-2 border-[#FFE4EC] flex flex-wrap items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 font-pixel text-[9px] text-[#C2185B]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ESTADO: 100% AMOR INCONDICIONAL
          </div>
          <span className="font-pixel text-[9px] text-zinc-400">PULSA LOS BOTONES ABAJO ▼</span>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          id="hero-open-letter-btn"
          onClick={() => {
            sound.playHeartBlip();
            onOpenLetter();
          }}
          className="pixel-button text-xs py-3 px-5 flex items-center gap-2"
        >
          <Mail className="w-4 h-4 text-white" />
          <span>ABRIR CARTA DE AMOR</span>
        </button>

        <button
          id="hero-view-gallery-btn"
          onClick={() => {
            sound.playCardFlip();
            onScrollToGallery();
          }}
          className="pixel-button-white text-xs py-3 px-5 flex items-center gap-2"
        >
          <ImageIcon className="w-4 h-4 text-[#FF3366]" />
          <span className="font-pixel text-[11px]">ÁLBUM DE FOTOS</span>
        </button>

        <button
          id="hero-view-reasons-btn"
          onClick={() => {
            sound.playCardFlip();
            onScrollToReasons();
          }}
          className="pixel-button-white text-xs py-3 px-5 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="font-pixel text-[11px]">POR QUÉ TE AGRADEZCO</span>
        </button>
      </div>
    </section>
  );
};
