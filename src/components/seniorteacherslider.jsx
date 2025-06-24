import React, { useState, useEffect } from 'react';
import './seniorteacherslider.css';

// Dummy data for teachers
const teachers = [
  {
    img: "/img/avatar-1.png",
    name: "Ms. Anupama Kumari",
    desc: "Jamshedpur Woman College",
    desc2: "B.A",
  },
  {
    img: "/img/avatar-2.png",
    name: "Mr. Ankit Bhaiya",
    desc: "NIT Jamshedpur",
    desc2: "B.Tech",
  },
  {
    img: "/img/avatar-3.png",
    name: "Ms. Boby Mahato",
    desc: "Jamshedpur Woman College",
    desc2: "B.Com",
  },
  {
    img: "/img/avatar-4.png",
    name: "Mr. Ankit Raj Sharma",
    desc: "NIT Jamshedpur",
    desc2: "B.Tech",
  },
];

const CircularTeacherSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  // Arrow navigation handlers
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + teachers.length) % teachers.length);
  };
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % teachers.length);
  };

  // Drag/swipe support
  const [dragStartX, setDragStartX] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e) => {
    setDragging(true);
    setDragStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
  };
  const handleDragMove = (e) => {
    if (!dragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    if (dragStartX !== null && Math.abs(clientX - dragStartX) > 50) {
      if (clientX < dragStartX) handleNext();
      else handlePrev();
      setDragging(false);
      setDragStartX(null);
    }
  };
  const handleDragEnd = () => {
    setDragging(false);
    setDragStartX(null);
  };

  return (
    <div className="circular-slider-container">
      <div className="slider-viewport"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      >
        <div
          className="slider-track"
          style={{
            width: `${teachers.length * 100}%`,
            transform: `translateX(-${current * (100 / teachers.length)}%)`,
            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)'
          }}
        >
          {teachers.map((teacher, idx) => (
            <article className="teacher-card" key={idx}>
              <div className="teacher-card-top">
                <div className="teacher-avatar-circle">
                  <img src={teacher.img} alt={teacher.name} className="teacher-avatar-img" />
                </div>
              </div>
              <div className="teacher-card-bottom">
                <h3 className="teacher-name">{teacher.name}</h3>
                <p className="teacher-college">{teacher.desc}</p>
                <p className="teacher-degree">{teacher.desc2}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    <div className="slider-dots">
      {teachers.map((_, idx) => (
        <span
          key={idx}
          className={`dot ${current === idx ? 'active' : ''}`}
          onClick={() => setCurrent(idx)}
        />
      ))}
    </div>
  </div>
  );
};

export default CircularTeacherSlider;
