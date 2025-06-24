import React from 'react';
import { FaWhatsapp, FaPhoneAlt, FaGooglePlay, FaAppStoreIos, FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './VardaanSenior.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CircularTeacherSlider from '../components/CircularTeacherSlider';

import supabase from '../supabaseClient';
import SeniorCiruculum from '../components/SeniorCiruculum';
import SeniorTeacherSlider from '../components/seniorteacherslider';
import JuniorMentorSlider from '../components/JuniorMentorSlider';
import TeacherSlider from '../components/TeacherSlider';
import SeniorDesktopTeacher from '../components/SeniorDesktopTeacher';

const class68Subjects = [
  'English',
  'Hindi',
  'Mathematics',
  'Science (Physics, Chemistry, Biology)',
  'Social Science (History, Geography, Civics)',
  'Computer Science',
  'Environmental Studies',
  'General Knowledge',
];

const class910Subjects = [
  'English Language & Literature',
  'Hindi',
  'Mathematics (Standard or Basic)',
  'Science (Physics, Chemistry, Biology)',
  'Social Science (History, Geography, Civics, Economics)',
  'Computer Applications / AI / Sanskrit',
];

const streams = [
  {
    name: 'Science Stream',
    icon: '🔬',
    details: [
      'Physics, Chemistry, Mathematics (PCM)',
      'Biology (PCB) for Medical',
      'English (compulsory)',
    ],
  },
  {
    name: 'Commerce Stream',
    icon: '🧮',
    details: [
      'Accountancy',
      'Business Studies',
      'Economics',
      'English',
    ],
  },
  {
    name: 'Humanities/Arts Stream',
    icon: '🎨',
    details: [
      'History',
      'Political Science',
      'Geography',
      'Sociology / Psychology / Economics',
      'English',
    ],
  },
];



export default function VardaanSenior() {
  const orange = '#ea580c';
  const orangeDark = '#b85c00';
  const orangeLight = '#fff7ed';
  const orangeAccent = '#fb923c';
  const fontFamily = 'Inter, Segoe UI, Arial, sans-serif';

  // Tabbed interface state
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = [
    'Digital Resources',
    'Test Papers',
    'Revision Notes',
    'Practice Questions',
    'Many more...'
  ];

  // Notice board state and fetch
  const [noticeLines, setNoticeLines] = React.useState([]);
  const [loadingNotices, setLoadingNotices] = React.useState(true);
  const [errorNotices, setErrorNotices] = React.useState(null);
  React.useEffect(() => {
    let isMounted = true;
    async function fetchNotices() {
      setLoadingNotices(true);
      setErrorNotices(null);
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('lines')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();
        if (isMounted) {
          if (error) setErrorNotices('Failed to load notices');
          else setNoticeLines((data && data.lines) || []);
        }
      } catch (err) {
        if (isMounted) setErrorNotices('Failed to load notices');
      } finally {
        if (isMounted) setLoadingNotices(false);
      }
    }
    fetchNotices();
    return () => { isMounted = false; };
  }, []);

  return (
    <div style={{ fontFamily, background: `linear-gradient(135deg, ${orangeLight} 0%, ${orangeAccent} 100%)`, minHeight: '100vh', color: orangeDark }}>
      <Navbar />
      {/* HERO SECTION - Modern Premium Redesign */}
      <div className="vs-wrapper" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif', width: '100vw', maxWidth: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #fff7ed 0%, #fb923c 100%)', color: orangeDark, overflowX: 'hidden', padding: 0 }}>
        <section className="vs-hero" style={{
          width: '100vw',
          minHeight: 620,
          background: '#111',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          boxShadow: '0 4px 24px #0008',
          overflow: 'hidden',
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            src="https://yfxhswegzytlpjchmtsj.supabase.co/storage/v1/object/public/website-assets//juniorvideo.mp4"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              opacity: 0.18,
              pointerEvents: 'none'
            }}
          />

          <div style={{ width: '100%', maxWidth: 1200, margin: '50px 0px 0px 0px ', padding: '0px 16px 0 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <div className="vs-logo-row" style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 0 }}>
              <img src="https://yfxhswegzytlpjchmtsj.supabase.co/storage/v1/object/public/website-assets//seniorlogo.png" alt="Vardaan Senior Logo" style={{ height: 150, margin: '0 0px', verticalAlign: 'middle' }} />
            </div>
            {/* Mobile-only top padding for logo */}
            <style>{`
            @media (max-width: 600px) {
              .vs-logo-row {
                padding-top: 32px !important;
              }
            }
          `}</style>
            <div style={{ fontSize: 18, fontWeight: 300, color: '#B3C6B1', marginBottom: 14, textShadow: '0 2px 8px #000', whiteSpace: 'nowrap' }}>Powered by - Vardaan Learning Institute</div>

            <div style={{ fontSize: 40, fontWeight: 800, marginBottom: 12, textAlign: 'center', textShadow: '0 4px 16px #000' }}>
              Building <span style={{ color: orange }}>Future</span> not Just<br />Students
            </div>
            <div style={{ color: orange, fontSize: 40, fontWeight: 600, marginBottom: 10, textAlign: 'center', textShadow: '0 4px 16px #000' }}>
              For Class 6 to 12 Students
            </div>

            <div className="vs-tab-row hide-on-mobile" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              overflowX: 'auto',
              padding: 4,
              gap: 0
            }}>
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  style={{
                    background: activeTab === i ? orange : orangeAccent,
                    color: activeTab === i ? '#fff' : '#fff',
                    fontWeight: 700,
                    padding: '14px 32px',
                    fontSize: 17,
                    minWidth: 140,
                    border: 'none',
                    borderRight: i !== tabs.length - 1 ? `1.5px solid ${orangeLight}` : 'none',
                    borderRadius: i === 0 ? '28px 0 0 28px' : i === tabs.length - 1 ? '0 28px 28px 0' : 0,
                    outline: 'none',
                    boxShadow: activeTab === i ? `0 2px 8px ${orangeAccent}33` : 'none',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    position: 'relative',
                    borderBottom: activeTab === i ? `4px solid ${orange}` : '4px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>{tab}</span>
                </button>
              ))}
            </div>
            {/* CTA Buttons: Always visible, responsive for mobile */}
            <div className="vs-cta-row" style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center', flexWrap: 'wrap', paddingTop: '20px' , marginBottom: '20px' }}>
              <a href="#" style={{ background: orange, color: '#fff', fontWeight: 700, padding: '10px 22px', borderRadius: 40, fontSize: 16, boxShadow: `0 2px 8px ${orangeDark}22`, textDecoration: 'none', transition: 'background 0.2s', border: 'none', minWidth: 140, textAlign: 'center' }}>Join Now</a>
              <a href="#" style={{ background: '#fff', color: orange, fontWeight: 700, padding: '10px 22px', borderRadius: 40, fontSize: 16, boxShadow: `0 2px 8px ${orangeDark}22`, textDecoration: 'none', border: `2px solid ${orange}`, transition: 'background 0.2s', minWidth: 140, textAlign: 'center' }}>Contact Us</a>
            </div>
            {/* Responsive tab row styling for mobile */}
            <style>{`
            @media (max-width: 600px) {
              .vs-tab-row {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 12px !important;
              }
              .vs-tab-row button {
                min-width: 0 !important;
                width: 100% !important;
                border-radius: 18px !important;
                margin-bottom: 0 !important;
              }
              .vs-cta-row {
                flex-direction: row !important;
                align-items: center !important;
                gap: 12px !important;
                padding: 0 0 0 0 !important;
              }
              .vs-cta-row a {
                width: auto !important;
                min-width: 0 !important;
                font-size: 18px !important;
                border-radius: 28px !important;
                margin-bottom: 0 !important;
              }
            }
          `}</style>
          </div>
        </section>
        


         {/* What Makes Us Different Section */}
      <section style={{ width: '100%', background: `linear-gradient(120deg, ${orangeLight} 0%, ${orangeAccent} 100%)`, borderRadius: 40, boxShadow: `0 2px 16px ${orangeAccent}33`, margin: '48px 0', padding: '44px 5vw 38px 5vw', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <h2 style={{ fontSize: 34, fontWeight: 900, color: orange, marginBottom: 14, letterSpacing: 0.5, textShadow: '0 2px 8px #fff8' }}>
          ✨ What Makes Vardaan Senior Unique?
        </h2>
        <ul style={{ fontSize: 20, color: '#236d1e', textAlign: 'left', maxWidth: 900, margin: '0 auto 32px auto', paddingLeft: 0, listStyle: 'none', lineHeight: 1.7 }}>
          <li style={{ marginBottom: 8 }}>📚 <b>Comprehensive curriculum</b> for Classes 9–12 (CBSE/ICSE/State Boards)</li>
          <li style={{ marginBottom: 8 }}>🏆 <b>Olympiad & Competitive Exam Preparation</b> (NTSE, KVPY, JEE/NEET Foundation)</li>
          <li style={{ marginBottom: 8 }}>👨‍🏫 <b>Expert Faculty</b> with years of experience in senior classes</li>
          <li style={{ marginBottom: 8 }}>📈 <b>Personalized Progress Tracking</b> & regular assessments</li>
          <li style={{ marginBottom: 8 }}>💬 <b>Doubt-Solving Sessions</b> & one-on-one mentoring</li>
          <li style={{ marginBottom: 8 }}>📝 <b>Detailed Study Material & Practice Sheets</b></li>
          <li style={{ marginBottom: 8 }}>🌐 <b>Real-World Readiness</b> — communication, presentations, and research skills</li>
        </ul>
        <div style={{ background: 'rgba(255,255,255,0.93)', borderRadius: 24, boxShadow: `0 2px 12px ${orangeAccent}22`, padding: '28px 20px', maxWidth: 700, margin: '0 auto', marginBottom: 0, textAlign: 'left', position: 'relative' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: orange, marginBottom: 10, textAlign: 'center' }}>
            <span role="img" aria-label="rocket">🚀</span> <span style={{ color: orangeDark }}>Special Focus: Future Skills & Career Guidance</span>
          </div>
          <ul style={{ fontSize: 18, color: '#236d1e', paddingLeft: 22, margin: 0, lineHeight: 1.8 }}>
            <li>🧠 Critical Thinking & Problem Solving</li>
            <li>💼 Career Counseling & Stream Selection</li>
            <li>🌏 Exposure to Innovation & Entrepreneurship</li>
            <li>🎤 Communication & Leadership Workshops</li>
            <li>🔬 Science, Technology & Research Projects</li>
            <li>🌟 Motivation & Success Strategies</li>
          </ul>
        </div>
      </section>



      {/* CURRICULUM OVERVIEW */}
      <section className="hide-on-mobile" style={{ width: '100%', margin: '56px 0 0 0', padding: '0 4vw' }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 20, color: orange, textAlign: 'center', letterSpacing: 0.5 }}>Curriculum Overview</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36, justifyContent: 'center', alignItems: 'stretch', width: '100%' }}>
          <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 26, boxShadow: `0 2px 14px ${orangeAccent}22`, flex: '1 1 320px', minWidth: 280, maxWidth: 340, padding: 36, marginBottom: 12 }}>
            <h3 style={{ color: orange, fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 }}>Classes 6 – 8</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {class68Subjects.map(subj => (
                <li key={subj} style={{ padding: '8px 0', fontSize: 17, borderBottom: `1px solid ${orangeLight}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18, color: orangeAccent }}>📘</span> {subj}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 26, boxShadow: `0 2px 14px ${orangeAccent}22`, flex: '1 1 320px', minWidth: 280, maxWidth: 340, padding: 36, marginBottom: 12 }}>
            <h3 style={{ color: orange, fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 }}>Classes 9 – 10</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {class910Subjects.map(subj => (
                <li key={subj} style={{ padding: '8px 0', fontSize: 17, borderBottom: `1px solid ${orangeLight}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18, color: orangeAccent }}>📗</span> {subj}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: 26, boxShadow: `0 2px 14px ${orangeAccent}22`, flex: '1 1 320px', minWidth: 280, maxWidth: 340, padding: 36, marginBottom: 12 }}>
            <h3 style={{ color: orange, fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 }}>Classes 11 – 12 <span style={{ fontSize: 14, color: orangeDark, fontWeight: 500 }}>(Stream Specialization)</span></h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {streams.map(stream => (
                <div key={stream.name} style={{ background: orangeLight, borderRadius: 14, padding: '14px 16px', boxShadow: `0 1px 4px ${orangeAccent}11`, marginBottom: 4 }}>
                  <div style={{ fontWeight: 700, color: orange, fontSize: 17, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>{stream.icon} {stream.name}</div>
                  <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 15 }}>
                    {stream.details.map(detail => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

       {/* Study Material Section */}
            <section className="landing-section study-resources-section py-16 ">
              <h2 className="study-resources-title text-4xl font-extrabold text-center text-[#ea1900] mb-4">Study Material</h2>
              <div className="study-resources-subtitle text-center text-gray-600 text-lg mb-10">
                A diverse array of learning materials to enhance your educational journey.
              </div>
              <div className="study-resources-grid flex flex-col md:flex-row gap-6 sm:gap-8 max-w-6xl mx-auto w-full">
                {/* Notes Card */}
                <Link to="/notes" className="study-resource-card notes flex-1 rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-8 flex flex-col items-start justify-between shadow hover:shadow-lg transition no-underline relative" data-discover="true">
                  <div className="resource-card-header text-xl font-extrabold text-red-600 mb-2 text-left">Notes</div>
                  <div className="resource-card-desc text-gray-700 mb-6 sm:mb-8 text-left">
                    Use Vardaan's detailed study materials that simplify complex ideas into easily understandable language.
                  </div>
                  <div className="resource-card-illustration flex justify-start mb-2">
                    {/* SVG for Notes */}
                    <svg width="80" height="80" fill="none">
                      <rect x="10" y="20" width="60" height="40" rx="8" fill="#fbbf24" opacity="0.12"></rect>
                      <rect x="16" y="26" width="48" height="28" rx="4" fill="#fbbf24"></rect>
                      <rect x="24" y="32" width="32" height="5" rx="2.5" fill="#fff"></rect>
                      <rect x="24" y="41" width="20" height="5" rx="2.5" fill="#fff"></rect>
                    </svg>
                  </div>
                  <span className="resource-card-arrow absolute right-6 bottom-6 text-2xl text-yellow-400">→</span>
                </Link>
                {/* Reference Books Card */}
                <Link to="/book-solutions" className="study-resource-card books flex-1 rounded-2xl border-2 border-blue-300 bg-blue-50 p-8 flex flex-col items-start justify-between shadow hover:shadow-lg transition no-underline relative" data-discover="true">
                  <div className="resource-card-header text-xl font-extrabold text-red-600 mb-2 text-left">Books Solutions</div>
                  <div className="resource-card-desc text-gray-700 mb-6 sm:mb-8 text-left">
                    Our experts have created thorough study materials that break down complicated concepts into easily understandable content.
                  </div>
                  <div className="resource-card-illustration flex justify-start mb-2">
                    {/* SVG for Reference Books */}
                    <svg width="80" height="80" fill="none">
                      <rect x="20" y="30" width="40" height="20" rx="6" fill="#38bdf8" opacity="0.12"></rect>
                      <rect x="26" y="36" width="28" height="8" rx="2" fill="#38bdf8"></rect>
                      <rect x="30" y="44" width="20" height="4" rx="2" fill="#fff"></rect>
                    </svg>
                  </div>
                  <span className="resource-card-arrow absolute right-6 bottom-6 text-2xl text-blue-400">→</span>
                </Link>
                {/* NCERT Solutions Card */}
                <Link to="/ncertbooks" className="study-resource-card ncert flex-1 rounded-2xl border-2 border-pink-300 bg-pink-50 p-8 flex flex-col items-start justify-between shadow hover:shadow-lg transition no-underline relative" data-discover="true">
                  <div className="resource-card-header text-xl font-extrabold text-red-600 mb-2 text-left">NCERT Books</div>
                  <div className="resource-card-desc text-gray-700 mb-6 sm:mb-8 text-left">
                    Unlock academic excellence with Vardaan's NCERT Books which provide you step-by-step solutions.
                  </div>
                  <div className="resource-card-illustration flex justify-start mb-2">
                    {/* SVG for NCERT Solutions */}
                    <svg width="80" height="80" fill="none">
                      <circle cx="40" cy="40" r="28" fill="#fb7185" opacity="0.12"></circle>
                      <path d="M40 25v30" stroke="#fb7185" strokeWidth="3" strokeLinecap="round"></path>
                      <circle cx="40" cy="40" r="7" fill="#fb7185"></circle>
                      <circle cx="40" cy="40" r="4" fill="#fff"></circle>
                    </svg>
                  </div>
                  <span className="resource-card-arrow absolute right-6 bottom-6 text-2xl text-pink-400">→</span>
                </Link>
              </div>
            </section>





      {/* Curriculum Overview */}
      <h2 className="show-on-mobile" style={{ marginBottom: 12, marginTop: 32, fontWeight: 700, fontSize: 24, textAlign: 'center' }}>Curriculum Overview</h2>
      <div className="show-on-mobile" style={{ marginBottom: 40 }}>
        <SeniorCiruculum />
      </div>


      <section className="hidden md:flex" style={{ width: '100%', borderRadius: 40, boxShadow: '0 2px 16px #b6e38833', margin: '48px 0 0 0', padding: '0 5vw', textAlign: 'center', flexDirection: 'column', alignItems: 'center'  }}>
               <h2 style={{ fontSize: 29, fontWeight: 900, color: '#236d1e', marginBottom: 10, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
                 Mentors Who Inspire,
               </h2>
               <h2 style={{ fontSize: 29, fontWeight: 900, color: '#236d1e', marginBottom: 10, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
     
                 <span style={{ color: '#ea580c', fontWeight: 700 }}> Educators Who Empower</span>
               </h2>
               <JuniorMentorSlider />
      </section>


       {/* mentor card slider mobile view */}
              <div className="show-on-mobile" style={{ margin: '32px 0 40px 0', display: 'flex', justifyContent: 'center' }}>
              <h2 className="show-on-mobile" style={{ marginBottom: 12, marginTop: 32, fontWeight: 700, fontSize: 24, textAlign: 'center' }}>Mentor Who Inspire, <br /> Educators Who Empower</h2>
      
                <CircularTeacherSlider />
              </div>




  


       <section style={{ width: '100%', background: '#fff7ed', borderRadius: 40, boxShadow: `0 2px 16px ${orangeAccent}33`, margin: '0 0 0px 0', paddingTop: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 0 }}>
                <h2 style={{ fontSize: 30, fontWeight: 800, color: orange, marginBottom: 16 }}>Launching Vardaan Senior App! Very Soon</h2>
                <p style={{ fontSize: 19, color: orangeDark, marginBottom: 28 }}>
                  Learn anywhere, anytime! Get the Vardaan Senior app for advanced learning on your mobile.
                </p>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a href="#" style={{ background: '#fff', border: `2px solid ${orangeAccent}`, borderRadius: 18, padding: '10px 22px', fontSize: 20, color: orange, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, boxShadow: `0 2px 8px ${orangeAccent}22`, textDecoration: 'none', marginBottom: 8 }}>
                    <FaGooglePlay style={{ fontSize: 26, marginRight: 10 }} /> Google Play
                  </a>
                  <a href="#" style={{ background: '#fff', border: `2px solid ${orangeDark}`, borderRadius: 18, padding: '10px 22px', fontSize: 20, color: orangeDark, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, boxShadow: `0 2px 8px ${orangeAccent}22`, textDecoration: 'none', marginBottom: 8 }}>
                    <FaAppStoreIos style={{ fontSize: 26, marginRight: 10 }} /> App Store
                  </a>
                </div>
                <div style={{ marginTop: 24, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ background: '#4267B2', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 2px 8px ${orangeAccent}22`, textDecoration: 'none' }} title="Facebook">
                    <FaFacebookF />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ background: '#E4405F', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 2px 8px ${orangeAccent}22`, textDecoration: 'none' }} title="Instagram">
                    <FaInstagram />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ background: '#FF0000', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 2px 8px ${orangeAccent}22`, textDecoration: 'none' }} title="YouTube">
                    <FaYoutube />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ background: '#1DA1F2', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: `0 2px 8px ${orangeAccent}22`, textDecoration: 'none' }} title="Twitter/X">
                    <FaTwitter />
                  </a>
                </div>
                <footer style={{ background: orange, width: '100%', color: '#fff', textAlign: 'center', padding: '24px 0', borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: 48 }}>
                  <div style={{ fontSize: 20, fontWeight: 600 }}>Vardaan Senior</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>A branch of Vardaan Learning Institute</div>
                  <div style={{ fontSize: 13, marginTop: 8 }}>&#169; {new Date().getFullYear()} Vardaan Learning Institute. All rights reserved.</div>
                </footer>
              </section>

      </div>
    </div>
  );
}
