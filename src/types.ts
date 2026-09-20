export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  memoryNote: string;
  heartCount: number;
}

export interface ReasonItem {
  id: number;
  title: string;
  subtitle: string;
  iconName: string;
  previewText: string;
  fullMessage: string;
  unlocked: boolean;
  category: 'Bondad' | 'Paciencia' | 'Amor' | 'Apoyo' | 'Alegría' | string;
}

export interface LoveConfig {
  partnerName: string;
  senderName: string;
  occasionTitle: string;
  heroSubtitle: string;
  relationshipStartDate: string; // YYYY-MM-DD
  mainIntroMessage: string;
  fullLoveLetter: {
    title: string;
    paragraphs: string[];
    signOff: string;
  };
  reasons: ReasonItem[];
  photos: PhotoItem[];
}
