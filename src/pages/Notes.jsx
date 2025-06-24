import React from 'react';
import { motion } from 'framer-motion';

export default function Notes() {
  return (
    <div style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ width: '100vw', minHeight: '100vh', height: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #fff7f0 0%, #ffe3e3 100%)' }}
      >
        <span style={{ fontSize: '2.7rem', display: 'block', marginBottom: '0.5rem', animation: 'pulse 1.4s infinite' }}>🚧</span>
        <p style={{ fontSize: '1.35rem', color: '#B91500', fontWeight: 600, marginBottom: 8, textAlign:'center', letterSpacing: '0.5px' }}>
          <span style={{fontSize:'2.1rem', color:'#EA1900', fontWeight:700}}>Content will be available very soon</span>.<br />
          <span style={{color:'#EA1900'}}>Our website is under development.</span><br />
          <span style={{color:'#222'}}>Please keep visiting this page for updates!</span>
        </p>
      </motion.div>
    </div>
  );
}
