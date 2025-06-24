import React from "react";
import { useState } from "react";
import "./CurriculumCardSlider.css";

const curriculumCards = [
  {
    title: "Foundation Stage",
    subtitle: "Classes 1 – 2",
    desc: "At this level, we focus on developing basic skills, strong language, early number sense, and love for learning through fun.",
    desc2:"Subjects Offered:",
    color: "#fbbf24",
    icon: "🟡",
    
  },
  {
    title: "Skill-Building Stage",
    subtitle: "Classes 3 – 4",
    desc: "Improve comprehension, problem-solving, and logical thinking.",
    color: "#38bdf8",
    icon: "🔵",
  },
  {
    title: "Preparation for Middle School",
    subtitle: "Class 5",
    desc: "Prepped with board-level format, subject-wise discipline, and detailed content.",
    color: "#a259e6",
    icon: "🟣",
  },
];

export default function CurriculumCardSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const total = curriculumCards.length;

  // Hand gesture/drag state
  const [dragStartX, setDragStartX] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  // Prevent multiple slides per drag
  const dragTriggered = React.useRef(false);

  // Slide to next card automatically (pause during drag/hold)
  React.useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      if (!isSliding) {
        handleSlide((current + 1) % total);
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [isSliding, total, current, autoPlay]);

  // Slide handler
  function handleSlide(nextIdx) {
    if (isSliding || nextIdx === current) return;
    setPrev(current);
    setCurrent(nextIdx); // Set current immediately so text updates with animation
    setIsSliding(true);
    setTimeout(() => {
      setIsSliding(false);
    }, 500); // match CSS duration
  }

  // Gesture handlers
  function handleDragStart(e) {
    setDragging(true);
    setAutoPlay(false);
    setDragStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
    dragTriggered.current = false;
  }
  function handleDragMove(e) {
    if (!dragging || dragStartX === null || dragTriggered.current) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartX;
    if (Math.abs(diff) > 50) {
      setAutoPlay(false); // Permanently stop auto sliding on hand slide
      if (diff < 0) {
        // Swipe left: next card
        handleSlide((current + 1) % total);
      } else if (diff > 0) {
        // Swipe right: previous card
        handleSlide((current - 1 + total) % total);
      }
      dragTriggered.current = true;
      setDragging(false);
      setDragStartX(null);
    }
  }
  function handleDragEnd() {
    setDragging(false);
    setDragStartX(null);
    dragTriggered.current = false;
  }

  return (
    <section className="w-full flex flex-col items-center pl-1">
      <div className="w-full max-w-xl flex flex-row items-center">
        {/* Card Slider Container */}
        <div className="w-full relative"
          style={{height: 700}}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Previous Card (slide out) */}
          {isSliding && (
            <article
              className={`card__article w-full ${current > prev || (prev === curriculumCards.length - 1 && current === 0) ? "slide-out-left" : "slide-out-right"}`}
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                borderRadius: 24,
                background: "#fff",
                boxShadow: "0 4px 24px #25d36622",
                padding: 32,
                minHeight: 700,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 30, fontWeight: 800, color: curriculumCards[prev].color, marginBottom: 10 }}>
                  {curriculumCards[prev].icon} {curriculumCards[prev].subtitle}
                </div>
                <div style={{ fontWeight: 700, color: "#236d1e", marginBottom: 10 }}>
                  {curriculumCards[prev].title}
                </div>
                <div style={{ fontSize: 15, color: "#236d1e" }}>
                  {curriculumCards[prev].desc}
                </div>
              </div>
            </article>
          )}
          {/* Current Card (slide in) */}
          <article
            className={`card__article w-full ${isSliding ? (current > prev || (prev === curriculumCards.length - 1 && current === 0) ? "slide-in-right" : "slide-in-left") : ""}`}
            style={{
              position: isSliding ? "absolute" : "relative",
              top: 0, left: 0, right: 0,
              borderRadius: 24,
              boxShadow: "0 4px 24px #25d36622",
              padding: 15,
              minHeight: 700,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              transition: 'none',
              cursor: dragging ? 'grabbing' : 'grab',
            }}
          >
            {current === 0 ? (
              <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 28, boxShadow: '0 4px 24px #25d36622', padding: '32px 24px', minWidth: 300, maxWidth: 360, minHeight: 350, flex: '1 1 320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#fbbf24', marginBottom: 10 }}>🟡Classes 1 – 2</div>
                <div style={{ fontWeight: 600, color: '#236d1e', marginBottom: 12 }}>Foundation Stage</div>
                <div style={{ fontSize: 15, color: '#236d1e', marginBottom: 8 }}>At this level, we focus on developing basic skills, strong language, early number sense, and love for learning through fun.</div>
                <div style={{ fontWeight: 700, color: '#25d366', marginBottom: 8 }}>Subjects Offered:</div>
                <ul style={{ fontSize: 16, color: '#236d1e', paddingLeft: 20, margin: 0 }}>
                  <li>📗 English (Reading, Writing, Phonics)</li>
                  <li>📗 Hindi (Varnmala, Word Formation)</li>
                  <li>📗 Mathematics (Numbers, Shapes, Patterns, Addition/Subtraction)</li>
                  <li>📗 Environmental Studies (Myself, Family, Nature, Safety Rules)</li>
                  <li>📗 General Knowledge (Basic facts, Festivals, India, World)</li>
                  <li>📗 Drawing & Craft (Creativity boost)</li>
                  <li>📗 Moral Science / Value Education</li>
                  <li>📗 Computer (Introduction to devices, keyboard, mouse)</li>
                </ul>
              </div>
            ) : current === 1 ? (
              <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 28, boxShadow: '0 4px 24px #25d36622', padding: '32px 24px', minWidth: 300, maxWidth: 360, minHeight: 350, flex: '1 1 320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#38bdf8', marginBottom: 10 }}>📘Classes 3 – 4</div>
                <div style={{ fontWeight: 600, color: '#236d1e', marginBottom: 12 }}>Skill-Building Stage</div>
                <div style={{ fontSize: 15, color: '#236d1e', marginBottom: 8 }}>Here, the focus is on improving comprehension, problem-solving, and logical thinking.</div>
                <div style={{ fontWeight: 700, color: '#25d366', marginBottom: 8 }}>Subjects Offered:</div>
                <ul style={{ fontSize: 16, color: '#236d1e', paddingLeft: 20, margin: 0 }}>
                  <li>📘 English (Grammar, Comprehension, Writing Skills)</li>
                  <li>📘 Hindi (Grammar, Paragraph writing, Stories)</li>
                  <li>📘 Mathematics (Addition/Subtraction with carry/borrow, Multiplication, Division, Word Problems)</li>
                  <li>📘 Science (Plants, Animals, Human Body, Weather)</li>
                  <li>📘 Social Studies (Community Helpers, Transport, States of India)</li>
                  <li>📘 Computer (MS Paint, Typing, Intro to MS Word)</li>
                  <li>📘 General Knowledge (India, Famous Personalities, Sports, etc.)</li>
                  <li>📘 Drawing / Craft</li>
                  <li>📘 Moral Science</li>
                </ul>
              </div>
            ) : current === 2 ? (
              <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 28, boxShadow: '0 4px 24px #25d36622', padding: '32px 24px', minWidth: 300, maxWidth: 360, minHeight: 350, flex: '1 1 320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#a259e6', marginBottom: 10 }}>📚 Class 5</div>
                <div style={{ fontWeight: 600, color: '#236d1e', marginBottom: 12 }}>Preparation for Middle School</div>
                <div style={{ fontSize: 15, color: '#236d1e', marginBottom: 8 }}>In Class 5, students are prepped with board-level format, subject-wise discipline, and detailed content.</div>
                <div style={{ fontWeight: 700, color: '#25d366', marginBottom: 8 }}>Subjects Offered:</div>
                <ul style={{ fontSize: 16, color: '#236d1e', paddingLeft: 20, margin: 0 }}>
                  <li>📕 English (Grammar + Creative Writing + Literature)</li>
                  <li>📕 Hindi (Grammar, Story Writing, Literature)</li>
                  <li>📕 Mathematics (Fractions, Decimals, Geometry, Word Problems)</li>
                  <li>📕 Science (Basic Physics, Chemistry, Biology concepts)</li>
                  <li>📕 Social Studies (History, Geography, Civics basics)</li>
                  <li>📕 Computer Science (MS Word, MS PowerPoint, Internet Intro)</li>
                  <li>📕 General Knowledge</li>
                  <li>📕 Drawing / Craft</li>
                  <li>📕 Moral Science / Value Education</li>
                </ul>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 30, fontWeight: 800, color: curriculumCards[current].color, marginBottom: 10 }}>
                  {curriculumCards[current].icon} {curriculumCards[current].subtitle}
                </div>
                <div style={{ fontWeight: 700, color: "#236d1e", marginBottom: 10 }}>
                  {curriculumCards[current].title}
                </div>
                <div style={{ fontSize: 15, color: "#236d1e" }}>
                  {curriculumCards[current].desc}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
      {/* Pagination Dots */}
      <div className="flex gap-2 mt-4">
        {curriculumCards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleSlide(idx)}
            className={`slider-dot${current === idx ? ' slider-dot--active' : ''}`}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

