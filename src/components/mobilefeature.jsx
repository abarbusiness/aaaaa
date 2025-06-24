import React, { useRef, useState, useEffect } from 'react';

const gifs = [
  // Replace with your own GIF URLs or use sample ones
  '/VAT/1.svg',
  '/VAT/2.svg',
  '/VAT/3.svg',
  '/VAT/4.svg',
  '/VAT/5.svg',
  '/VAT/1.gif'
];

const MobileFeature = () => {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const dragTriggered = useRef(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const total = gifs.length;

  // Auto-slide effect
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, autoPlay, total]);

  // Handle drag/swipe gesture
  const handleDragStart = (e) => {
    setDragging(true);
    dragTriggered.current = false;
    setDragStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
    setAutoPlay(false); // Stop auto-slide on user interaction
  };

  const handleDragMove = (e) => {
    if (!dragging || dragStartX === null || dragTriggered.current) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        setCurrent((prev) => (prev + 1) % total);
      } else if (diff > 0) {
        setCurrent((prev) => (prev - 1 + total) % total);
      }
      dragTriggered.current = true;
      setDragging(false);
      setDragStartX(null);
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
    setDragStartX(null);
    dragTriggered.current = false;
  };

  return (
    <div className="w-screen h-[calc(100vw*0.56)] sm:w-full sm:max-w-md sm:mx-auto sm:mt-4">
      <div
        className="relative overflow-hidden shadow-md bg-black w-full h-full"
        style={{ touchAction: 'pan-y' }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${current * (100 / total)}%)`,
            cursor: dragging ? 'grabbing' : 'grab',
          }}
        >
          {gifs.map((src, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 flex justify-center items-center bg-black"
              style={{ width: '100%', minHeight: 220 }}
            >
              <img
                src={src}
                alt={`GIF Slide ${idx + 1}`}
                className="w-full h-full object-contain"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                draggable={false}
              />
            </div>
          ))}
        </div>
        {/* Slider dots hidden for this version */}
      </div>
    </div>
  );
};

export default MobileFeature;