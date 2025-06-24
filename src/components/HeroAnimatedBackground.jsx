import React from 'react';

export default function HeroAnimatedBackground({ style = {}, className = '' }) {
  return (
    <svg
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        ...style,
      }}
      viewBox="0 0 1440 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroGradient1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="heroGradient2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#18181b" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ea1900" stopOpacity="0.5" />
        </linearGradient>
        <filter id="blur1" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="48" />
        </filter>
      </defs>
      <path>
        <animate attributeName="d" dur="12s" repeatCount="indefinite"
          values="M0,400 Q400,350 800,400 T1440,400 V600 H0Z;
                  M0,420 Q400,500 800,420 T1440,380 V600 H0Z;
                  M0,400 Q400,350 800,400 T1440,400 V600 H0Z" />
        <animate attributeName="opacity" values="0.35;0.55;0.35" dur="8s" repeatCount="indefinite" />
      </path>
      <path d="M0,400 Q400,350 800,400 T1440,400 V600 H0Z" fill="url(#heroGradient1)" filter="url(#blur1)" opacity="0.45" />
      <path>
        <animate attributeName="d" dur="16s" repeatCount="indefinite"
          values="M0,320 Q600,270 1440,320 V600 H0Z;
                  M0,340 Q600,380 1440,340 V600 H0Z;
                  M0,320 Q600,270 1440,320 V600 H0Z" />
        <animate attributeName="opacity" values="0.22;0.4;0.22" dur="12s" repeatCount="indefinite" />
      </path>
      <path d="M0,320 Q600,270 1440,320 V600 H0Z" fill="url(#heroGradient2)" filter="url(#blur1)" opacity="0.28" />
    </svg>
  );
}
