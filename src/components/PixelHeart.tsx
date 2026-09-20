import React from 'react';

interface PixelHeartProps {
  size?: number; // size in pixels
  color?: string;
  outlineColor?: string;
  animated?: boolean;
  className?: string;
}

export const PixelHeart: React.FC<PixelHeartProps> = ({
  size = 24,
  color = '#FF3366',
  outlineColor = '#1E0711',
  animated = false,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={`${animated ? 'pixel-pulse' : ''} ${className}`}
      style={{ imageRendering: 'pixelated', display: 'inline-block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Black Outline */}
      <rect x="2" y="1" width="4" height="1" fill={outlineColor} />
      <rect x="10" y="1" width="4" height="1" fill={outlineColor} />
      <rect x="1" y="2" width="1" height="4" fill={outlineColor} />
      <rect x="6" y="2" width="1" height="2" fill={outlineColor} />
      <rect x="9" y="2" width="1" height="2" fill={outlineColor} />
      <rect x="14" y="2" width="1" height="4" fill={outlineColor} />
      <rect x="7" y="3" width="2" height="1" fill={outlineColor} />
      <rect x="1" y="6" width="1" height="3" fill={outlineColor} />
      <rect x="14" y="6" width="1" height="3" fill={outlineColor} />
      <rect x="2" y="9" width="1" height="2" fill={outlineColor} />
      <rect x="13" y="9" width="1" height="2" fill={outlineColor} />
      <rect x="3" y="11" width="1" height="1" fill={outlineColor} />
      <rect x="12" y="11" width="1" height="1" fill={outlineColor} />
      <rect x="4" y="12" width="2" height="1" fill={outlineColor} />
      <rect x="10" y="12" width="2" height="1" fill={outlineColor} />
      <rect x="6" y="13" width="1" height="1" fill={outlineColor} />
      <rect x="9" y="13" width="1" height="1" fill={outlineColor} />
      <rect x="7" y="14" width="2" height="1" fill={outlineColor} />

      {/* Main Red Body */}
      <rect x="2" y="2" width="4" height="7" fill={color} />
      <rect x="10" y="2" width="4" height="7" fill={color} />
      <rect x="6" y="4" width="4" height="6" fill={color} />
      <rect x="3" y="9" width="10" height="2" fill={color} />
      <rect x="4" y="11" width="8" height="1" fill={color} />
      <rect x="6" y="12" width="4" height="1" fill={color} />
      <rect x="7" y="13" width="2" height="1" fill={color} />

      {/* Top Left White Highlight */}
      <rect x="3" y="3" width="2" height="2" fill="#FFFFFF" fillOpacity="0.85" />
      <rect x="11" y="3" width="1" height="1" fill="#FFFFFF" fillOpacity="0.75" />
    </svg>
  );
};
