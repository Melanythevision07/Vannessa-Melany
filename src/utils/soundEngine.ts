// Web Audio API Retro 8-bit Chiptune & Sound Effects Synthesizer

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicIntervalId: number | null = null;
  private currentNoteIndex: number = 0;

  // Romantic 8-bit arpeggio melody (Gentle retro love theme in F Major / D Minor)
  private melodyNotes: { note: number; duration: number }[] = [
    // Phrase 1: Sweet gentle intro
    { note: 349.23, duration: 0.35 }, // F4
    { note: 440.00, duration: 0.35 }, // A4
    { note: 523.25, duration: 0.35 }, // C5
    { note: 659.25, duration: 0.5 },  // E5
    { note: 523.25, duration: 0.3 },  // C5
    { note: 587.33, duration: 0.4 },  // D5
    { note: 440.00, duration: 0.6 },  // A4

    // Phrase 2: Ascending warm hope
    { note: 392.00, duration: 0.35 }, // G4
    { note: 493.88, duration: 0.35 }, // B4
    { note: 587.33, duration: 0.35 }, // D5
    { note: 698.46, duration: 0.5 },  // F5
    { note: 659.25, duration: 0.35 }, // E5
    { note: 523.25, duration: 0.4 },  // C5
    { note: 440.00, duration: 0.6 },  // A4

    // Phrase 3: Touching tender emotion
    { note: 349.23, duration: 0.35 }, // F4
    { note: 440.00, duration: 0.35 }, // A4
    { note: 523.25, duration: 0.35 }, // C5
    { note: 698.46, duration: 0.6 },  // F5
    { note: 659.25, duration: 0.35 }, // E5
    { note: 587.33, duration: 0.35 }, // D5
    { note: 523.25, duration: 0.8 },  // C5

    // Phrase 4: Gentle resolution
    { note: 440.00, duration: 0.35 }, // A4
    { note: 523.25, duration: 0.35 }, // C5
    { note: 587.33, duration: 0.35 }, // D5
    { note: 523.25, duration: 0.5 },  // C5
    { note: 440.00, duration: 0.4 },  // A4
    { note: 349.23, duration: 0.9 },  // F4
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a single 8-bit tone
  private play8BitTone(freq: number, duration: number, type: OscillatorType = 'square', volume: number = 0.08) {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft lowpass filter to make 8-bit sound gentle and warm rather than harsh
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, ctx.currentTime);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // ADSR Envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Cute 8-bit Heart / Coin Pick-up chime
  public playHeartBlip() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }

  // 8-bit card flip sound
  public playCardFlip() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.09);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Ignore
    }
  }

  // Level Up / Quest Complete Fanfare
  public playFanfare() {
    if (this.isMuted) return;
    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.5, d: 0.4 },  // C6
    ];

    notes.forEach((item, index) => {
      setTimeout(() => {
        this.play8BitTone(item.f, item.d, 'square', 0.1);
      }, index * 120);
    });
  }

  // Toggle Background Music
  public toggleMusic(callback?: (playing: boolean) => void) {
    if (this.isMusicPlaying) {
      this.stopMusic();
      if (callback) callback(false);
      return false;
    } else {
      this.startMusic();
      if (callback) callback(true);
      return true;
    }
  }

  public startMusic() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.currentNoteIndex = 0;
    this.playNextMelodyNote();
  }

  private playNextMelodyNote() {
    if (!this.isMusicPlaying) return;

    const current = this.melodyNotes[this.currentNoteIndex];
    this.play8BitTone(current.note, current.duration, 'square', 0.045);
    
    // Add subtle bass arpeggio accompaniment
    if (this.currentNoteIndex % 2 === 0) {
      this.play8BitTone(current.note / 2, current.duration * 0.9, 'triangle', 0.05);
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;

    this.musicIntervalId = window.setTimeout(() => {
      this.playNextMelodyNote();
    }, (current.duration + 0.05) * 1000);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId) {
      clearTimeout(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }
}

export const sound = new SoundEngine();
