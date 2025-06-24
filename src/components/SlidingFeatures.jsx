import React, { useRef, useEffect } from 'react';
import './SlidingFeatures.css';

const features = [
  'NCERT PDFs & Solutions',
  'Reference Books',
  'Instant Doubt Solving',
  'Live Classes',
  'Test Series',
  'Smart Analytics',
  'Interactive Practice',
  'Personalized Progress',
  'AI-powered Learning',
  'India’s Most Loved Platform',
];

export default function SlidingFeatures({ speed = 40 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let animation;
    let scrollAmount = 0;
    function animate() {
      scrollAmount += 1;
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
      container.scrollLeft = scrollAmount;
      animation = requestAnimationFrame(animate);
    }
    animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  // Duplicate features for seamless loop
  const allFeatures = [...features, ...features];

  return (
    <div className="sliding-features-outer">
      <div className="sliding-features-inner" ref={containerRef}>
        {allFeatures.map((feature, idx) => (
          <span className="sliding-feature-item" key={idx}>{feature}</span>
        ))}
      </div>
    </div>
  );
}
