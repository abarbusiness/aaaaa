import React, { useState } from 'react';
import "./SeniorCiruculum.css";

const curriculumCards = [
    {
        title: "Middle School Foundation",
        subtitle: "Classes 6-8",
        desc2: "Subjects Offered:",
        color: "#fbbf24",
        icon: "🟡",
    },
    {
        title: "Board Exam Preparation",
        subtitle: "Classes 9-10",
        desc2: "Subjects Offered:",
        color: "#38bdf8",
        icon: "🔵",
    },
    {
        title: "Stream Specialization",
        subtitle: "Classes 11-12 (Science/Commerce/Humanities)",
        desc2: "Streams & Subjects:",
        color: "#a259e6",
        icon: "🟣",
    },
];

export default function CurriculumCardSlider() {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const total = curriculumCards.length;

    // Drag/gesture state
    const [dragStartX, setDragStartX] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const dragTriggered = React.useRef(false);

    // Slide to next card automatically
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
                handleSlide((current + 1) % total);
            } else if (diff > 0) {
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
                        style={{ height: 700, cursor: dragging ? 'grabbing' : 'grab' }}
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
                                <div style={{ fontSize: 26, fontWeight: 800, color: '#fbbf24', marginBottom: 10 }}>🟡 Classes 6 – 8</div>
                                <div style={{ fontWeight: 600, color: '#236d1e', marginBottom: 12 }}>Middle School Foundation</div>
                                <div style={{ fontSize: 15, color: '#236d1e', marginBottom: 8 }}>Strong focus on conceptual clarity, analytical skills, and a smooth transition from primary to senior curriculum. Interactive and engaging lessons for all subjects.</div>
                                <div style={{ fontWeight: 700, color: '#25d366', marginBottom: 8 }}>Subjects Offered:</div>
                                <ul style={{ fontSize: 16, color: '#236d1e', paddingLeft: 20, margin: 0 }}>
                                  <li>📘 English</li>
                                  <li>📘 Hindi</li>
                                  <li>📘 Mathematics</li>
                                  <li>📘 Science (Physics, Chemistry, Biology)</li>
                                  <li>📘 Social Science (History, Geography, Civics)</li>
                                  <li>📘 Computer Science</li>
                                  <li>📘 Environmental Studies</li>
                                  <li>📘 General Knowledge</li>
                                </ul>
                            </div>
                        ) : current === 1 ? (
                            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 28, boxShadow: '0 4px 24px #25d36622', padding: '32px 24px', minWidth: 300, maxWidth: 360, minHeight: 350, flex: '1 1 320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: 26, fontWeight: 800, color: '#38bdf8', marginBottom: 10 }}>🔵 Classes 9 – 10</div>
                                <div style={{ fontWeight: 600, color: '#236d1e', marginBottom: 12 }}>Board Exam Preparation</div>
                                <div style={{ fontSize: 15, color: '#236d1e', marginBottom: 8 }}>Intensive board exam-oriented teaching, regular assessments, and practice with previous years' papers. Emphasis on application-based learning and exam strategy.</div>
                                <div style={{ fontWeight: 700, color: '#25d366', marginBottom: 8 }}>Subjects Offered:</div>
                                <ul style={{ fontSize: 16, color: '#236d1e', paddingLeft: 20, margin: 0 }}>
                                  <li>📘 English Language & Literature</li>
                                  <li>📘 Hindi</li>
                                  <li>📘 Mathematics (Standard/Basic)</li>
                                  <li>📘 Science (Physics, Chemistry, Biology)</li>
                                  <li>📘 Social Science (History, Geography, Civics, Economics)</li>
                                  <li>📘 Computer Applications</li>
                                  <li>📘 Foundation of IT</li>
                                </ul>
                            </div>
                        ) : current === 2 ? (
                            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 28, boxShadow: '0 4px 24px #25d36622', padding: '32px 24px', minWidth: 300, maxWidth: 360, minHeight: 350, flex: '1 1 320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: 26, fontWeight: 800, color: '#a259e6', marginBottom: 10 }}>🟣 Classes 11 – 12</div>
                                <div style={{ fontWeight: 600, color: '#236d1e', marginBottom: 12 }}>Stream Specialization</div>
                                <div style={{ fontSize: 15, color: '#236d1e', marginBottom: 8 }}>In-depth subject specialization with expert faculty, career guidance, Olympiad/competitive exam prep, and mentorship for future success.</div>
                                <div style={{ fontWeight: 700, color: '#25d366', marginBottom: 8 }}>Streams & Subjects:</div>
                                <ul style={{ fontSize: 16, color: '#236d1e', paddingLeft: 20, margin: 0 }}>
                                  <li>🔬 Science: Physics, Chemistry, Biology, Mathematics, Computer Science</li>
                                  <li>💼 Commerce: Accountancy, Business Studies, Economics, Mathematics, Informatics Practices</li>
                                  <li>🌏 Humanities: History, Geography, Political Science, Psychology, Sociology, English, Economics</li>
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

