import React, { useEffect, useRef } from 'react';

export default function HeroParticles({ color = '#fbbf24', count = 28 }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    particles.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 2 + Math.random() * 2.5,
      dx: -0.2 + Math.random() * 0.4,
      dy: -0.2 + Math.random() * 0.4,
      opacity: 0.35 + Math.random() * 0.5,
    }));

    let animationId;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [color, count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.9,
      }}
      width={1280}
      height={600}
      aria-hidden="true"
    />
  );
}
