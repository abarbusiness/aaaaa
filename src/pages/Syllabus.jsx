import React from 'react';
import { motion } from 'framer-motion';

const pulseVariant = {
  animate: {
    scale: [1, 1.08, 1],
    boxShadow: [
      '0 4px 24px 0 rgba(234,25,0,0.15)',
      '0 6px 32px 0 rgba(234,25,0,0.25)',
      '0 4px 24px 0 rgba(234,25,0,0.15)'
    ],
    transition: {
      duration: 1.4,
      repeat: Infinity,
      repeatType: 'loop',
    }
  }
};

const Syllabus = () => (
  <div style={{minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #fff7f0 0%, #ffe3e3 100%)'}}>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ textAlign: 'center' }}
    >
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
    </motion.div>
  </div>
);

export default Syllabus;
