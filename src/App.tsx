import React, { useState } from 'react';
import { initialLoveData } from './config/loveData';
import { RetroHUD } from './components/RetroHUD';
import { HeroSection } from './components/HeroSection';
import { PhotoGallery } from './components/PhotoGallery';
import { ReasonsSection } from './components/ReasonsSection';
import { LoveLetterModal } from './components/LoveLetterModal';
import { Footer } from './components/Footer';
import HeartShowerCanvas from './components/HeartShowerCanvas';
import { sound } from './utils/soundEngine';

/* ==========================================================================
   ❤️ TO CUSTOMIZE THIS PAGE FOR VANESSA:
   
   1. Check /src/config/loveData.ts
      - Change photos (<!-- INSERT YOUR PHOTO HERE -->)
      - Customize names, dates, letters, and gratitude reasons
   2. You can also edit photos live on the page using the "SWAP WITH YOUR OWN PHOTOS" button!
   ========================================================================== */

export default function App() {
  const [loveData, setLoveData] = useState(initialLoveData);
  const [heartShowerActive, setHeartShowerActive] = useState(false);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);

  const handleToggleHeartShower = () => {
    setHeartShowerActive((prev) => !prev);
  };

  const handleTriggerHeartRainBurst = () => {
    setHeartShowerActive(true);
    setTimeout(() => {
      setHeartShowerActive(false);
    }, 6000);
  };

  const scrollToGallery = () => {
    const el = document.getElementById('photo-gallery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToReasons = () => {
    const el = document.getElementById('reasons-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-[#FF3366] selection:text-white">
      {/* 8-bit Pixel Canvas Heart Shower Animation */}
      <HeartShowerCanvas active={heartShowerActive} />

      {/* Subtle Retro Scanlines */}
      <div className="scanlines fixed inset-0 z-20 pointer-events-none" />

      {/* Top Retro HUD Navigation & Audio Bar */}
      <RetroHUD
        partnerName={loveData.partnerName}
        startDate={loveData.relationshipStartDate}
        heartShowerActive={heartShowerActive}
        onToggleHeartShower={handleToggleHeartShower}
        onOpenLetter={() => setIsLetterModalOpen(true)}
      />

      <main className="relative z-10">
        {/* Hero Section with Retro Dialogue Box & Typewriter Intro */}
        <HeroSection
          partnerName={loveData.partnerName}
          occasionTitle={loveData.occasionTitle}
          heroSubtitle={loveData.heroSubtitle}
          introMessage={loveData.mainIntroMessage}
          onOpenLetter={() => setIsLetterModalOpen(true)}
          onScrollToGallery={scrollToGallery}
          onScrollToReasons={scrollToReasons}
        />

        {/* Decorative Divider */}
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center gap-4 opacity-75">
          <div className="h-0.5 flex-1 bg-[#1E0711]" />
          <span className="font-pixel text-[10px] text-[#FF3366] px-2 bg-white border border-[#1E0711]">
            NIVEL 1: RECUERDOS
          </span>
          <div className="h-0.5 flex-1 bg-[#1E0711]" />
        </div>

        {/* Interactive Photo Gallery with Pixel Frames */}
        <PhotoGallery
          photos={loveData.photos}
          partnerName={loveData.partnerName}
          onUpdatePhotos={(updatedPhotos) => {
            setLoveData((prev) => ({ ...prev, photos: updatedPhotos }));
          }}
        />

        {/* Decorative Divider */}
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center gap-4 opacity-75">
          <div className="h-0.5 flex-1 bg-[#1E0711]" />
          <span className="font-pixel text-[10px] text-[#FF3366] px-2 bg-white border border-[#1E0711]">
            NIVEL 2: GRATITUD
          </span>
          <div className="h-0.5 flex-1 bg-[#1E0711]" />
        </div>

        {/* Interactive "Reasons I'm Thankful for You" Cards */}
        <ReasonsSection
          reasons={loveData.reasons}
          partnerName={loveData.partnerName}
          onOpenLetter={() => setIsLetterModalOpen(true)}
        />

        {/* Ending Credits & Interactive Love Giver */}
        <Footer
          partnerName={loveData.partnerName}
          senderName={loveData.senderName}
          onTriggerHeartRain={handleTriggerHeartRainBurst}
        />
      </main>

      {/* Secret Romantic Love Letter Modal */}
      <LoveLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        partnerName={loveData.partnerName}
        senderName={loveData.senderName}
        title={loveData.fullLoveLetter.title}
        paragraphs={loveData.fullLoveLetter.paragraphs}
        signOff={loveData.fullLoveLetter.signOff}
        onTriggerHeartRain={handleTriggerHeartRainBurst}
      />
    </div>
  );
}
