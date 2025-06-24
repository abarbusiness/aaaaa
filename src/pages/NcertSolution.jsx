import React from 'react';
import { motion } from 'framer-motion';

import { fadeInUp } from '../utils/motionPresets';

export default function NcertSolution() {
  return (
    <motion.div
      className="ncert-solution-page"
      style={{width:'100vw', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >      <h1 style={{color:'#EA1900', fontWeight:900, fontSize:'2.1rem', marginBottom:16}}>NCERT Solution</h1>
      <p style={{fontSize:'1.15rem', color:'#444', textAlign:'center'}}>Find detailed NCERT solutions for all subjects and classes. More features coming soon!</p>
    </motion.div>
  );
}
