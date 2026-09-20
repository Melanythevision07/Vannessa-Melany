import React, { useState } from 'react';
import { ReasonItem } from '../types';
import { PixelHeart } from './PixelHeart';
import { sound } from '../utils/soundEngine';
import { 
  Sparkles, 
  Shield, 
  Sun, 
  Flame, 
  HeartHandshake, 
  Compass, 
  Lock, 
  Unlock, 
  X, 
  Heart, 
  Award,
  Check
} from 'lucide-react';

interface ReasonsSectionProps {
  reasons: ReasonItem[];
  partnerName: string;
  onOpenLetter: () => void;
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({
  reasons,
  partnerName,
  onOpenLetter,
}) => {
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
  const [activeReason, setActiveReason] = useState<ReasonItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#FF3366]" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-rose-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#C2185B]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-indigo-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#FF3366]" />;
    }
  };

  const handleCardClick = (reason: ReasonItem) => {
    sound.playHeartBlip();
    if (!unlockedIds.includes(reason.id)) {
      const nextUnlocked = [...unlockedIds, reason.id];
      setUnlockedIds(nextUnlocked);
      if (nextUnlocked.length === reasons.length) {
        // All unlocked fanfare!
        setTimeout(() => sound.playFanfare(), 300);
      }
    }
    setActiveReason(reason);
  };

  const unlockedCount = unlockedIds.length;
  const isAllUnlocked = unlockedCount === reasons.length;

  return (
    <section id="reasons-section" className="py-12 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border-2 border-[#1E0711] px-3 py-1 mb-3 shadow-[2px_2px_0_0_#FF3366]">
          <Heart className="w-3.5 h-3.5 text-[#FF3366] fill-[#FF3366]" />
          <span className="font-pixel text-[10px] text-[#FF3366] tracking-wider">
            ARCHIVO DE GRATITUD • PARA {partnerName.toUpperCase()}
          </span>
          <Heart className="w-3.5 h-3.5 text-[#FF3366] fill-[#FF3366]" />
        </div>

        <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-[#1E0711] mb-2 tracking-tight">
          RAZONES POR LAS QUE TE AGRADEZCO
        </h2>
        <p className="font-pixel-sub text-sm text-zinc-600 max-w-xl mx-auto mb-6">
          Cada día contigo es un regalo. Haz clic en cada tarjeta para descubrir por qué significas el universo entero para mí.
        </p>

        {/* Progress Tracker Bar */}
        <div className="max-w-md mx-auto bg-white border-3 border-[#1E0711] p-3 shadow-[4px_4px_0_0_#1E0711] mb-8">
          <div className="flex items-center justify-between text-xs font-pixel mb-2">
            <span className="text-[#880E4F] text-[10px]">RAZONES DESBLOQUEADAS:</span>
            <span className="text-[#FF3366] text-[10px]">
              {unlockedCount} / {reasons.length}
            </span>
          </div>

          <div className="w-full h-3 bg-[#FFE4EC] border border-[#1E0711] p-0.5 flex">
            <div
              className="h-full bg-[#FF3366] transition-all duration-300"
              style={{ width: `${(unlockedCount / reasons.length) * 100}%` }}
            />
          </div>

          {isAllUnlocked && (
            <div className="mt-2 text-center flex items-center justify-center gap-1 text-[#C2185B] font-pixel text-[9px] animate-bounce">
              <Award className="w-3.5 h-3.5 text-yellow-500" />
              <span>¡TODAS LAS RAZONES DESCUBIERTAS! ¡ERES MI MAYOR TESORO!</span>
            </div>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason) => {
          const isUnlocked = unlockedIds.includes(reason.id);

          return (
            <div
              key={reason.id}
              id={`reason-card-${reason.id}`}
              onClick={() => handleCardClick(reason)}
              className={`pixel-card p-5 cursor-pointer transition-all duration-200 hover:-translate-y-2 relative flex flex-col justify-between ${
                isUnlocked 
                  ? 'bg-[#FFFFFF] hover:shadow-[6px_6px_0_0_#FF3366]' 
                  : 'bg-[#FFF8FA] hover:shadow-[6px_6px_0_0_#880E4F]'
              }`}
            >
              {/* Category Badge & Status Icon */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel text-[8px] bg-[#FFE4EC] text-[#C2185B] border border-[#1E0711] px-2 py-1">
                    {reason.category.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-1 font-pixel text-[8px]">
                    {isUnlocked ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> ABIERTO
                      </span>
                    ) : (
                      <span className="text-[#880E4F] flex items-center gap-1">
                        <Lock className="w-3 h-3" /> CLIC PARA ABRIR
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Icon Container */}
                <div className="w-12 h-12 bg-[#FFF0F4] border-2 border-[#1E0711] flex items-center justify-center mb-4 shadow-[2px_2px_0_0_#1E0711]">
                  {getIcon(reason.iconName)}
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="font-pixel text-xs sm:text-sm text-[#1E0711] mb-1.5 leading-snug">
                  {reason.title}
                </h3>
                <h4 className="font-pixel text-[9px] text-[#FF3366] mb-3">
                  {reason.subtitle}
                </h4>

                {/* Preview text */}
                <p className="font-pixel-sub text-xs text-zinc-600 leading-relaxed mb-4">
                  {isUnlocked ? reason.previewText : "Toca para abrir y descubrir este mensaje..."}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t-2 border-[#FFE4EC]">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(reason);
                  }}
                  className={`w-full ${isUnlocked ? 'pixel-button-white' : 'pixel-button'} text-[10px] py-2 flex items-center justify-center gap-1.5`}
                >
                  {isUnlocked ? (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-[#FF3366]" />
                      <span>LEER MENSAJE</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                      <span>ÁBREME</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pop-up Modal when clicking a reason */}
      {activeReason && (
        <div
          className="fixed inset-0 z-50 bg-[#1E0711]/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveReason(null)}
        >
          <div
            className="pixel-card bg-white max-w-lg w-full p-5 sm:p-7 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => {
                sound.playCardFlip();
                setActiveReason(null);
              }}
              className="absolute top-4 right-4 p-1 border-2 border-[#1E0711] bg-[#FFE4EC] hover:bg-[#FF3366] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon & Category */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#FFE4EC] border-2 border-[#1E0711] flex items-center justify-center">
                {getIcon(activeReason.iconName)}
              </div>
              <div>
                <span className="font-pixel text-[9px] text-[#C2185B] block">
                  CATEGORÍA: {activeReason.category.toUpperCase()}
                </span>
                <h3 className="font-pixel text-sm sm:text-base text-[#1E0711]">
                  {activeReason.title}
                </h3>
              </div>
            </div>

            {/* Full Heartfelt Message Body */}
            <div className="bg-[#FFF5F7] border-2 border-[#1E0711] p-4 sm:p-5 mb-5">
              <p className="font-pixel-sub text-sm sm:text-base text-[#2A0815] leading-relaxed">
                "{activeReason.fullMessage}"
              </p>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[#FF3366] font-pixel text-[9px]">
                <PixelHeart size={16} />
                <span>AGRADECIDA POR SIEMPRE</span>
              </div>

              <button
                onClick={() => {
                  sound.playCardFlip();
                  setActiveReason(null);
                }}
                className="pixel-button text-xs py-2 px-4"
              >
                ENTENDIDO ❤️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Secret Bonus Banner when all unlocked */}
      {isAllUnlocked && (
        <div className="mt-12 dialogue-frame p-6 max-w-2xl mx-auto text-center bg-gradient-to-b from-white to-[#FFF0F4]">
          <div className="flex justify-center mb-3">
            <PixelHeart size={36} animated={true} />
          </div>
          <h3 className="font-pixel text-base text-[#FF3366] mb-2">
            ¡LOGRO SECRETO DESBLOQUEADO!
          </h3>
          <p className="font-pixel-sub text-sm text-[#2A0815] mb-4">
            {partnerName}, ¡has desbloqueado todas las cartas! Hay una sorpresa especial esperándote dentro de la carta de amor íntima.
          </p>
          <button
            onClick={() => {
              sound.playHeartBlip();
              onOpenLetter();
            }}
            className="pixel-button text-xs py-3 px-6 inline-flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>LEER LA CARTA DE AMOR COMPLETA</span>
          </button>
        </div>
      )}
    </section>
  );
};
