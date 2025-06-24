import React from 'react';
import './BlinkingText.css';

export default function BlinkingText({ children, color = '#ea580c', duration = '1s' }) {
  return (
    <span className="blinking-text" style={{ color, animationDuration: duration }}>
      {children}
    </span>
  );
}
