import React, { useState } from 'react';
import { PixelHeart } from './PixelHeart';
import { sound } from '../utils/soundEngine';
import { Heart, Sparkles, Trophy } from 'lucide-react';

interface FooterProps {
  partnerName: string;
  senderName: string;
  onTriggerHeartRain: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  partnerName,
  senderName,
  onTriggerHeartRain,
}) => {
  const [loveCounter, setLoveCounter] = useState(999);

  const handleSendHeart = () => {
    sound.playHeartBlip();
    setLoveCounter((prev) => prev + 1);
    onTriggerHeartRain();
  };

  return (
    <footer className="mt-16 border-t-4 border-[#1E0711] bg-white pt-12 pb-16 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Retro Mascot / Pulse */}
        <div className="flex justify-center items-center gap-2">
          <PixelHeart size={24} />
          <PixelHeart size={36} animated={true} />
          <PixelHeart size={24} />
        </div>

        {/* Ending Quote */}
        <div className="dialogue-frame p-6 max-w-xl mx-auto bg-[#FFF8FA]">
          <h3 className="font-pixel text-sm sm:text-base text-[#FF3366] mb-2">
            ¿FIN DEL JUEGO? ¡JAMÁS!
          </h3>
          <p className="font-pixel-sub text-xs sm:text-sm text-[#2A0815] leading-relaxed">
            Cada momento a tu lado es muy especial para mí. Gracias por tu compañía sincera, por cuidarme con tanto cariño y por estar siempre presente.
          </p>
        </div>

        {/* Interactive Love Counter Button */}
        <div>
          <button
            id="footer-send-heart-btn"
            onClick={handleSendHeart}
            className="pixel-button text-xs py-3 px-6 inline-flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>PULSA PARA ENVIAR UN CORAZÓN (+{loveCounter})</span>
          </button>
        </div>

        {/* Credits */}
        <div className="pt-4 border-t-2 border-[#FFE4EC] text-zinc-500 font-pixel text-[9px] space-y-2">
          <p className="text-[#FF3366]">
            DEDICADO CON TODO MI AMOR A {partnerName.toUpperCase()}
          </p>
          <p className="text-zinc-500">
            CREADO POR {senderName.toUpperCase()} • DÍA DEL AMOR Y LA AMISTAD
          </p>
          <div className="flex items-center justify-center gap-1 text-[8px] text-zinc-400 mt-2">
            <Trophy className="w-3 h-3 text-yellow-500" />
            <span>DATOS GUARDADOS: JUNTAS POR SIEMPRE (100% COMPLETADO)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
