import React from 'react';
import notFoundImg from '../assets/404.png';

export default function NotFound() {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      height: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f4f4f5',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      <img
        src={notFoundImg}
        alt="Not Found"
        style={{ width: 320, maxWidth: '90vw', marginBottom: 24 }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <h1 style={{ color: '#ea580c', fontSize: 40, fontWeight: 900, marginBottom: 12 }}>404 - Not Found</h1>
      <p style={{ color: '#333', fontSize: 18, marginBottom: 24 }}>Sorry, the page or article you are looking for does not exist.</p>
      <a href="/" style={{
        display: 'inline-block',
        padding: '12px 28px',
        background: '#ea580c',
        color: 'white',
        borderRadius: 6,
        fontWeight: 700,
        fontSize: 18,
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
      }}>Go Home</a>
    </div>
  );
}
