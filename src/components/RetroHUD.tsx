import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { PixelHeart } from './PixelHeart';
import { sound } from '../utils/soundEngine';

interface RetroHUDProps {
  partnerName: string;
  startDate: string;
  heartShowerActive: boolean;
  onToggleHeartShower: () => void;
  onOpenLetter: () => void;
}

export const RetroHUD: React.FC<RetroHUDProps> = ({
  partnerName,
  startDate,
  heartShowerActive,
  onToggleHeartShower,
  onOpenLetter,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [daysTogether, setDaysTogether] = useState<number>(0);

  useEffect(() => {
    try {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diffDays = Math.max(1, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
      setDaysTogether(diffDays);
    } catch {
      setDaysTogether(365);
    }
  }, [startDate]);

  const handleToggleMusic = () => {
    sound.playHeartBlip();
    sound.toggleMusic((playing) => {
      setIsPlayingMusic(playing);
    });
  };

  const handleHeartRain = () => {
    sound.playHeartBlip();
    onToggleHeartShower();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b-4 border-[#1E0711] shadow-[0_4px_0_0_#FF3366]">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-3">
        
        {/* Left: Player status & HP */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#FFF0F4] px-2.5 py-1.5 border-2 border-[#1E0711]">
            <PixelHeart size={18} animated={true} />
            <span className="font-pixel text-[11px] text-[#FF3366] tracking-tight">
              MELANY & {partnerName.toUpperCase()}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#FFF8FA] px-2.5 py-1.5 border-2 border-[#1E0711]">
            <span className="font-pixel text-[9px] text-[#880E4F]">VIDA:</span>
            <div className="w-20 sm:w-28 h-3 bg-[#FFE4EC] border border-[#1E0711] p-0.5 flex">
              <div 
                className="h-full bg-gradient-to-r from-[#FF3366] to-[#E91E63] w-full"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <span className="font-pixel text-[9px] text-[#FF3366]">9999</span>
          </div>

          {daysTogether > 0 && (
            <div className="hidden md:flex items-center gap-1.5 bg-[#FFF0F4] px-2.5 py-1.5 border-2 border-[#1E0711]">
              <span className="font-pixel text-[9px] text-[#880E4F]">DÍA:</span>
              <span className="font-pixel text-[9px] text-[#FF3366]">#{daysTogether}</span>
            </div>
          )}
        </div>

        {/* Right: Controls & Interactive Buttons */}
        <div className="flex items-center gap-2">
          {/* BGM Toggle */}
          <button
            id="hud-bgm-toggle-btn"
            onClick={handleToggleMusic}
            className={`pixel-button ${isPlayingMusic ? 'bg-[#FF3366]' : 'bg-[#FFFFFF] text-[#FF3366]'} text-[10px] py-1.5 px-3 flex items-center gap-1.5`}
            title="Activar o pausar melodía retro de 8 bits"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-white" />
                <span className="hidden sm:inline text-white">MÚSICA: ON</span>
                <span className="sm:hidden text-white">MÚSICA</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#FF3366]" />
                <span className="hidden sm:inline text-[#FF3366]">MÚSICA: OFF</span>
                <span className="sm:hidden text-[#FF3366]">MÚSICA</span>
              </>
            )}
          </button>

          {/* Heart Rain Shower Button */}
          <button
            id="hud-heart-shower-btn"
            onClick={handleHeartRain}
            className={`pixel-button ${heartShowerActive ? 'bg-[#C2185B]' : 'bg-[#FF3366]'} text-[10px] py-1.5 px-3 flex items-center gap-1.5`}
            title="Lanzar lluvia de corazones pixelados"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="hidden sm:inline">{heartShowerActive ? 'CORAZONES: ON' : 'LLUVIA CORAZONES'}</span>
            <span className="sm:hidden">CORAZONES</span>
          </button>

          {/* Open Secret Letter Button */}
          <button
            id="hud-open-letter-btn"
            onClick={() => {
              sound.playHeartBlip();
              onOpenLetter();
            }}
            className="pixel-button-white text-[10px] py-1.5 px-2.5 flex items-center gap-1"
            title="Leer carta de amor secreta"
          >
            <Heart className="w-3.5 h-3.5 text-[#FF3366] fill-[#FF3366]" />
            <span className="hidden md:inline font-pixel text-[9px]">CARTA</span>
          </button>
        </div>

      </div>
    </header>
  );
};