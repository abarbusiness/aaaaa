import React from 'react';
import { motion } from 'framer-motion';

import { fadeInUp } from '../utils/motionPresets';

export default function NcertPdf() {
  return (
    <motion.div
      className="ncert-pdf-page"
      style={{width:'100vw', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >      <h1 style={{color:'#EA1900', fontWeight:900, fontSize:'2.1rem', marginBottom:16}}>NCERT PDF</h1>
      <p style={{fontSize:'1.15rem', color:'#444', textAlign:'center'}}>Download or view all NCERT textbooks in PDF format, organized by class and subject. More features coming soon!</p>
    </motion.div>
  );
}
