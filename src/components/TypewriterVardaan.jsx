import React, { useEffect, useRef, useState } from 'react';

// A typewriter effect that erases and types 'Vardaan' in the greeting
export default function TypewriterVardaan({
  greeting = 'Welcome to ',
  keyword = 'Vardaan',
  color = '#ea580c',
  highlightColor = '#fbbf24',
  fontSize = '3.2rem',
  fontWeight = 900,
  eraseDelay = 1200,
  typeDelay = 90
}) {
  const [displayed, setDisplayed] = useState(greeting + keyword);
  const [phase, setPhase] = useState('idle'); // 'idle', 'erasing', 'typing'
  const [typed, setTyped] = useState('');
  const eraseRef = useRef();
  const typeRef = useRef();

  useEffect(() => {
    setDisplayed(greeting + keyword);
    setTyped('');
    setPhase('erasing');
  }, [greeting, keyword]);

  useEffect(() => {
    let loopTimeout;
    if (phase === 'erasing') {
      eraseRef.current = setTimeout(() => {
        if (displayed.length > greeting.length) {
          setDisplayed(displayed.slice(0, -1));
        } else {
          setPhase('typing');
        }
      }, 60);
      return () => clearTimeout(eraseRef.current);
    }
    if (phase === 'typing') {
      if (typed.length < keyword.length) {
        typeRef.current = setTimeout(() => {
          setTyped(keyword.slice(0, typed.length + 1));
        }, typeDelay);
        return () => clearTimeout(typeRef.current);
      } else {
        // Instantly start erasing again for a seamless infinite loop
        loopTimeout = setTimeout(() => {
          setTyped('');
          setPhase('erasing');
        }, eraseDelay);
      }
    }
    return () => {
      if (loopTimeout) clearTimeout(loopTimeout);
    };
  }, [phase, displayed, typed, greeting, keyword, eraseDelay, typeDelay]);

  useEffect(() => {
    if (phase === 'typing') {
      setDisplayed(greeting + typed);
    }
  }, [typed, phase, greeting]);

  return (
    <h1
      style={{
        fontWeight,
        fontSize,
        letterSpacing: '0.03em',
        color: '#18181b',
        textShadow: '0 2px 16px #fff8, 0 2px 24px #fbbf2444',
        margin: 0,
        padding: 0,
        zIndex: 20,
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 18,
        boxShadow: '0 2px 16px #fbbf2422',
        width: '100vw',
        maxWidth: '100vw',
        display: 'block',
        textAlign: 'left',
      }}
      className="hero-typewriter-heading"
    >
      <span style={{display:'block',marginBottom:'0.08em'}}> {greeting} </span>
      <span style={{
        color: phase === 'typing' ? highlightColor : color,

        transition: 'color 0.3s',
        fontWeight: 900,
        background: `linear-gradient(90deg,${color},${highlightColor})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        paddingRight: 4,
        display: 'inline-block',
      }}>{phase === 'typing' ? typed : keyword}</span>
      <span className="typewriter-cursor" style={{
        color: highlightColor,
        fontWeight: 900,
        marginLeft: 0,
        fontSize: '1.1em',
        animation: 'blink-cursor 0.8s steps(1) infinite',
      }}>|</span>
    </h1>
  );
}
