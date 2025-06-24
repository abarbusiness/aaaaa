import React from 'react';

import { fadeInUp } from '../utils/motionPresets';

export default function NcertNotes() {
  return (
    <motion.div
      className="ncert-notes-page"
      style={{width:'100vw', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >      <h1 style={{color:'#EA1900', fontWeight:900, fontSize:'2.1rem', marginBottom:16}}>NCERT Notes</h1>
      <p style={{fontSize:'1.15rem', color:'#444', textAlign:'center'}}>Access concise and comprehensive NCERT notes for all classes and subjects. More features coming soon!</p>
    </motion.div>
  );
}
