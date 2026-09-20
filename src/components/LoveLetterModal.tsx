import React from 'react';
import { PixelHeart } from './PixelHeart';
import { sound } from '../utils/soundEngine';
import { X, Heart, Sparkles, Send } from 'lucide-react';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  senderName: string;
  title: string;
  paragraphs: string[];
  signOff: string;
  onTriggerHeartRain: () => void;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
  partnerName,
  senderName,
  title,
  paragraphs,
  signOff,
  onTriggerHeartRain,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="love-letter-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#1E0711]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="love-letter-modal-card"
        className="relative max-w-2xl w-full bg-[#FFFFFF] border-4 border-[#1E0711] shadow-[8px_8px_0_0_#FF3366] p-6 sm:p-8 my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Stamp in Top Right */}
        <div className="absolute top-4 right-14 hidden sm:flex flex-col items-center bg-[#FFE4EC] border-2 border-[#1E0711] p-1.5 shadow-[2px_2px_0_0_#1E0711]">
          <PixelHeart size={20} />
          <span className="font-pixel text-[7px] text-[#C2185B] mt-0.5">CORREO AÉREO</span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playCardFlip();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 border-2 border-[#1E0711] bg-[#FFE4EC] hover:bg-[#FF3366] hover:text-white transition-colors"
          title="Cerrar carta"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wax Seal Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 bg-[#FF3366] border-3 border-[#1E0711] flex items-center justify-center mb-3 shadow-[3px_3px_0_0_#1E0711] pixel-pulse">
            <PixelHeart size={32} color="#FFFFFF" outlineColor="#1E0711" />
          </div>

          <span className="font-pixel text-[9px] text-[#880E4F] tracking-widest uppercase mb-1">
            CARTA SECRETA • PARA {partnerName.toUpperCase()}
          </span>
          <h2 className="font-pixel text-base sm:text-xl text-[#FF3366] max-w-lg leading-snug">
            {title}
          </h2>
          <div className="h-0.5 w-32 bg-[#FF3366] mt-3" />
        </div>

        {/* Letter Parchment Box */}
        <div className="bg-[#FFF8FA] border-2 border-[#1E0711] p-5 sm:p-7 mb-6 space-y-4 shadow-[inner_0_0_10px_rgba(255,51,102,0.05)]">
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="font-pixel-sub text-sm sm:text-base text-[#2A0815] leading-relaxed"
            >
              {p}
            </p>
          ))}

          <div className="pt-4 border-t border-[#FFD0DE] text-right">
            <p className="font-pixel text-xs text-[#FF3366] mb-1">
              {signOff}
            </p>
            <p className="font-pixel-sub text-sm text-[#1E0711] font-bold">
              {senderName}
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              sound.playHeartBlip();
              onTriggerHeartRain();
            }}
            className="pixel-button text-xs py-2.5 px-4 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>LLUVIA DE CORAZONES PARA ELLA</span>
          </button>

          <button
            onClick={() => {
              sound.playCardFlip();
              onClose();
            }}
            className="pixel-button-white text-xs py-2.5 px-5"
          >
            GUARDAR EN MI CORAZÓN
          </button>
        </div>
      </div>
    </div>
  );
};
