import { useEffect, useRef } from 'react';

interface HeartShowerCanvasProps {
  active: boolean;
  onDeactivate?: () => void;
}

interface PixelHeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  color: string;
  opacity: number;
  rotation: number;
  scale: number;
  wobble: number;
  wobbleSpeed: number;
}

const HEART_BITMAP = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

const COLORS = ['#FF3366', '#FF1744', '#FF5277', '#FF80AB', '#FF4081', '#E91E63', '#FFFFFF'];

export default function HeartShowerCanvas({ active }: HeartShowerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: PixelHeartParticle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const spawnParticle = (startY?: number): PixelHeartParticle => {
      return {
        x: Math.random() * canvas.width,
        y: startY !== undefined ? startY : -20 - Math.random() * 50,
        size: Math.floor(Math.random() * 3) + 2, // pixel unit size: 2px, 3px, 4px
        speedY: Math.random() * 2.5 + 1.2,
        speedX: (Math.random() - 0.5) * 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.4 + 0.6,
        rotation: 0,
        scale: 1,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.04 + 0.02,
      };
    };

    // Ambient floating particles
    for (let i = 0; i < 24; i++) {
      particles.push(spawnParticle(Math.random() * canvas.height));
    }

    const drawPixelHeart = (
      x: number,
      y: number,
      pixelSize: number,
      color: string,
      opacity: number
    ) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;

      const rows = HEART_BITMAP.length;
      const cols = HEART_BITMAP[0].length;
      const totalWidth = cols * pixelSize;
      const totalHeight = rows * pixelSize;

      const originX = Math.floor(x - totalWidth / 2);
      const originY = Math.floor(y - totalHeight / 2);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (HEART_BITMAP[r][c] === 1) {
            ctx.fillRect(originX + c * pixelSize, originY + r * pixelSize, pixelSize, pixelSize);
          }
        }
      }
    };

    let burstTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // If active shower is on, spawn extra particles continuously
      if (active) {
        burstTimer++;
        if (burstTimer % 2 === 0 && particles.length < 120) {
          particles.push(spawnParticle());
          particles.push(spawnParticle());
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.8;
        p.y += p.speedY;

        drawPixelHeart(p.x, p.y, p.size, p.color, p.opacity);

        // Reset particle when it drops off-screen
        if (p.y > canvas.height + 30) {
          if (active || particles.length <= 24) {
            particles[i] = spawnParticle();
          } else {
            particles.splice(i, 1);
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      id="pixel-heart-canvas"
      className="fixed inset-0 pointer-events-none z-30"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
