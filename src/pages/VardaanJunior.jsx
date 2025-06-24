import React from 'react';
import supabase from '../supabaseClient';
import { FaWhatsapp, FaPhoneAlt, FaGooglePlay, FaAppStoreIos, FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import JuniorMentorSlider from '../components/JuniorMentorSlider';
import CircularTeacherSlider from '../components/CircularTeacherSlider';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './VardaanJunior.css';
import CurriculumCardSlider from "../components/CurriculumCardSlider.jsx";



export default function VardaanJunior() {
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

  // Global style to ensure full width and no scroll
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box;
        width: 100vw !important;
        overflow-x: hidden !important;
      }
      *, *:before, *:after {
        box-sizing: inherit;
      }
      @media (max-width: 600px) {
        .vj-notice-img {
          width: 98vw !important;
        }
        .vj-notice-abs {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 2 !important;
          pointer-events: none;
        }
        .vj-notice-text {
          font-size: 4vw !important;
          text-align: center !important;
          margin: 0 auto !important;
          max-width: 92vw !important;
        }
        .vj-wrapper {
          padding: 0 !important;
        }
        .vj-hero {
          min-height: 400px !important;
          padding: 0 0 24px 0 !important;
        }
        .vj-hide-mobile {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  return (
    <>

      <Navbar />
      <div className="vj-wrapper" style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive, sans-serif stencil', width: '100vw', maxWidth: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #e9f9e4 0%, #b6e388 50%, #25d366 100%)', color: '#236d1e', overflowX: 'hidden', padding: 0 }}>
        <section className="vj-hero" style={{
          width: '100vw',
          minHeight: 620,
          background: "#111",
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
            <div className="vj-logo-row" style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 0 }}>

              <img src="https://yfxhswegzytlpjchmtsj.supabase.co/storage/v1/object/public/website-assets//juniorlogo.png" alt="Vardaan Logo" style={{ height: 150, margin: '0 0px', verticalAlign: 'middle' }} />
              {/* <span style={{ fontFamily: 'Stencil', fontSize: 48, color: '#25d366', letterSpacing: 2, fontWeight: 900, marginTop: 20 }}>JUNIOR</span> */}
            </div>
            {/* Mobile-only top padding for logo */}
            <style>{`
            @media (max-width: 600px) {
              .vj-logo-row {
                padding-top: 32px !important;
              }
            }
          `}</style>
            <div style={{ fontSize: 18, fontWeight: 300, color: '#B3C6B1', marginBottom: 14, textShadow: '0 2px 8px #000', whiteSpace: 'nowrap' }}>Powered by - Vardaan Learning Institute</div>

            <div style={{ fontSize: 40, fontWeight: 800, marginBottom: 12, textAlign: 'center', textShadow: '0 4px 16px #000' }}>
              Building <span style={{ color: '#25d366' }}>Future</span> not Just<br />Students
            </div>
            <div style={{ color: '#25d366', fontSize: 40, fontWeight: 600, marginBottom: 10, textAlign: 'center', textShadow: '0 4px 16px #000' }}>
              For Class 1 to 5 Students
            </div>


            <div className="vj-tab-row hide-on-mobile" style={{
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
                    background: activeTab === i ? '#25d366' : '#20b86b',
                    color: activeTab === i ? '#fff' : '#fff',
                    fontWeight: 700,
                    padding: '14px 32px',
                    fontSize: 17,
                    minWidth: 140,
                    border: 'none',
                    borderRight: i !== tabs.length - 1 ? '1.5px solid #b6e388' : 'none',
                    borderRadius: i === 0 ? '28px 0 0 28px' : i === tabs.length - 1 ? '0 28px 28px 0' : 0,
                    outline: 'none',
                    boxShadow: activeTab === i ? '0 2px 8px #25d36633' : 'none',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    position: 'relative',
                    borderBottom: activeTab === i ? '4px solid #25d366' : '4px solid transparent',
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
            <div className="vj-cta-row" style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center', flexWrap: 'wrap', margin: '16px 0 0 0', }}>
              <a href="#" style={{ background: '#ef1900', color: '#fff', fontWeight: 700, padding: '10px 22px', borderRadius: 40, fontSize: 16, boxShadow: '0 2px 8px #236d1e22', textDecoration: 'none', transition: 'background 0.2s', border: 'none', minWidth: 140, textAlign: 'center' }}>Join Now</a>
              <a href="#" style={{ background: '#fff', color: '#ef1900', fontWeight: 700, padding: '10px 22px', borderRadius: 40, fontSize: 16, boxShadow: '0 2px 8px #236d1e22', textDecoration: 'none', border: '2px solid #ef1900', transition: 'background 0.2s', minWidth: 140, textAlign: 'center' }}>Contact Us</a>
            </div>
            {/* Responsive tab row styling for mobile */}
            <style>{`
            @media (max-width: 600px) {
              .vj-tab-row {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 12px !important;
              }
              .vj-tab-row button {
                min-width: 0 !important;
                width: 100% !important;
                border-radius: 18px !important;
                margin-bottom: 0 !important;
              }
              .vj-cta-row {
                flex-direction: row !important;
                align-items: center !important;
                gap: 12px !important;
                padding: 0 0 0 0 !important;
              }
              .vj-cta-row a {
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
        <section style={{ width: '100%', background: 'linear-gradient(120deg, #e0ffe8 0%, #b6e388 100%)', borderRadius: 40, boxShadow: '0 2px 16px #25d36633', margin: '48px 0', padding: '44px 5vw 38px 5vw', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: '#25d366', marginBottom: 14, letterSpacing: 0.5, textShadow: '0 2px 8px #fff8' }}>
            ✨ What Makes Us Different?
          </h2>
          <ul style={{ fontSize: 20, color: '#236d1e', textAlign: 'left', maxWidth: 900, margin: '0 auto 32px auto', paddingLeft: 0, listStyle: 'none', lineHeight: 1.7 }}>
            <li style={{ marginBottom: 8 }}>🎉 <b>Fun & Interactive</b> lessons for all subjects</li>
            <li style={{ marginBottom: 8 }}>🧠 <b>Step-by-step coding for kids</b> — from basics to mini projects</li>
            <li style={{ marginBottom: 8 }}>🎨 <b>Story telling</b> to build imagination and moral values.</li>
            <li style={{ marginBottom: 8 }}>📊 <b>Regular tests</b> to track progress</li>
            <li style={{ marginBottom: 8 }}>📝 <b>Online result access</b> for parents (via dashboard)</li>
            <li style={{ marginBottom: 8 }}>📘 <b>Vardaan Worksheets</b> – daily/weekly practice to strengthen concepts</li>
            <li style={{ marginBottom: 8 }}>🚀 <b>Intro to Tech</b> – by Ankit Bhaiya</li>
          </ul>
          <div style={{ background: 'rgba(255,255,255,0.93)', borderRadius: 24, boxShadow: '0 2px 12px #25d36622', padding: '28px 20px', maxWidth: 700, margin: '0 auto', marginBottom: 0, textAlign: 'left', position: 'relative' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#25d366', marginBottom: 10, textAlign: 'center' }}>
              <span role="img" aria-label="rocket">🚀</span> <span style={{ color: '#236d1e' }}>A weekly special session covering amazing real-world tech:</span>
            </div>
            <ul style={{ fontSize: 18, color: '#236d1e', paddingLeft: 22, margin: 0, lineHeight: 1.8 }}>
              <li>🤖 Artificial Intelligence</li>
              <li>🧩 Machine Learning</li>
              <li>🎨 Graphics & Presentation skills</li>
              <li>💻 Coding basics</li>
              <li>✈️ Aerospace Wonders</li>
              <li>🌟 Future of Technology</li>
            </ul>
          </div>
        </section>











        {/* Curriculum Overview – Vardaan Junior desktop only  */}
        <section className="hide-on-mobile" style={{
          width: '100%',
          minHeight: 420,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(120deg, #25d366 0%, #b6e388 60%, #e0ffe8 100%)',
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          boxShadow: '0 4px 32px #25d36633',
          position: 'relative',
          overflow: 'hidden',
          padding: '56px 12px 44px 12px',
          marginTop: 48,
          marginBottom: 48
        }}>
          {/* Decorative shapes */}
          <div style={{ position: 'absolute', top: -50, left: -70, width: 180, height: 180, background: '#25d366', opacity: 0.08, borderRadius: '50%', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: -60, right: -80, width: 240, height: 240, background: '#b6e388', opacity: 0.11, borderRadius: '50%', zIndex: 0 }} />
          <h2 className="vj-curriculum-heading" style={{ fontSize: 38, fontWeight: 900, letterSpacing: 1, margin: 0, color: '#236d1e', textShadow: '2px 5px 0 #fff', zIndex: 2, marginBottom: 18 }}>
            Curriculum Overview
          </h2>
          <div style={{ maxWidth: 1100, width: '100%', display: 'flex', flexWrap: 'wrap', gap: 36, justifyContent: 'center', zIndex: 2 }}>
            {/* Group 1 */}
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 28, boxShadow: '0 4px 24px #25d36622', padding: '32px 24px', minWidth: 300, maxWidth: 360, flex: '1 1 320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#fbbf24', marginBottom: 10 }}>🟣Classes 1 – 2</div>
              <div style={{ fontWeight: 600, color: '#236d1e', marginBottom: 12 }}>Foundation Stage</div>
              <div style={{ fontSize: 15, color: '#236d1e', marginBottom: 8 }}>At this level, we focus on developing basic skills, strong language, early number sense, and love for learning through fun.</div>
              <div style={{ fontWeight: 700, color: '#25d366', marginBottom: 8 }}>Subjects Offered:</div>
              <ul style={{ fontSize: 16, color: '#236d1e', paddingLeft: 20, margin: 0 }}>
                <li>📗 English (Reading, Writing, Phonics)</li>
                <li>📗 Hindi (Varnmala, Word Formation)</li>
                <li>📗 Mathematics (Numbers, Shapes, Patterns, Addition/Subtraction)</li>
                <li>📗 Environmental Studies (Myself, Family, Nature, Safety Rules)</li>
                <li>📗 General Knowledge (Basic facts, Festivals, India, World)</li>
                <li>📗 Drawing & Craft (Creativity boost)</li>
                <li>📗 Moral Science / Value Education</li>
                <li>📗 Computer (Introduction to devices, keyboard, mouse)</li>
              </ul>
            </div>
            {/* Group 2 */}
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 28, boxShadow: '0 4px 24px #25d36622', padding: '32px 24px', minWidth: 300, maxWidth: 360, flex: '1 1 320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#38bdf8', marginBottom: 10 }}>📘Classes 3 – 4</div>
              <div style={{ fontWeight: 600, color: '#236d1e', marginBottom: 12 }}>Skill-Building Stage</div>
              <div style={{ fontSize: 15, color: '#236d1e', marginBottom: 8 }}>Here, the focus is on improving comprehension, problem-solving, and logical thinking.</div>
              <div style={{ fontWeight: 700, color: '#25d366', marginBottom: 8 }}>Subjects Offered:</div>
              <ul style={{ fontSize: 16, color: '#236d1e', paddingLeft: 20, margin: 0 }}>
                <li>📘 English (Grammar, Comprehension, Writing Skills)</li>
                <li>📘 Hindi (Grammar, Paragraph writing, Stories)</li>
                <li>📘 Mathematics (Addition/Subtraction with carry/borrow, Multiplication, Division, Word Problems)</li>
                <li>📘 Science (Plants, Animals, Human Body, Weather)</li>
                <li>📘 Social Studies (Community Helpers, Transport, States of India)</li>
                <li>📘 Computer (MS Paint, Typing, Intro to MS Word)</li>
                <li>📘 General Knowledge (India, Famous Personalities, Sports, etc.)</li>
                <li>📘 Drawing / Craft</li>
                <li>📘 Moral Science</li>
              </ul>
            </div>
            {/* Group 3 */}
            <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 28, boxShadow: '0 4px 24px #25d36622', padding: '32px 24px', minWidth: 300, maxWidth: 360, flex: '1 1 320px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#a259e6', marginBottom: 10 }}>📚 Class 5</div>
              <div style={{ fontWeight: 600, color: '#236d1e', marginBottom: 12 }}>Preparation for Middle School</div>
              <div style={{ fontSize: 15, color: '#236d1e', marginBottom: 8 }}>In Class 5, students are prepped with board-level format, subject-wise discipline, and detailed content.</div>
              <div style={{ fontWeight: 700, color: '#25d366', marginBottom: 8 }}>Subjects Offered:</div>
              <ul style={{ fontSize: 16, color: '#236d1e', paddingLeft: 20, margin: 0 }}>
                <li>📕 English (Grammar + Creative Writing + Literature)</li>
                <li>📕 Hindi (Grammar, Story Writing, Literature)</li>
                <li>📕 Mathematics (Fractions, Decimals, Geometry, Word Problems)</li>
                <li>📕 Science (Basic Physics, Chemistry, Biology concepts)</li>
                <li>📕 Social Studies (History, Geography, Civics basics)</li>
                <li>📕 Computer Science (MS Word, MS PowerPoint, Internet Intro)</li>
                <li>📕 General Knowledge</li>
                <li>📕 Drawing / Craft</li>
                <li>📕 Moral Science / Value Education</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Curriculum Overview */}
        <h2 className="show-on-mobile" style={{ marginBottom: 12, marginTop: 32, fontWeight: 700, fontSize: 24, textAlign: 'center' }}>Curriculum Overview</h2>
        <div className="show-on-mobile" style={{ marginBottom: 40 }}>
          <CurriculumCardSlider />
        </div>

         {/* Study Material Section */}
              <section className="landing-section study-resources-section py-16 bg-white">
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

        {/* Mentors Who Inspire, Educators Who Empower */}
        <section className="hidden md:flex" style={{ width: '100%', borderRadius: 40, boxShadow: '0 2px 16px #b6e38833', margin: '48px 0 0 0', padding: '0 5vw', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}>
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


        <section style={{ width: '100%', background: 'linear-gradient(120deg, #e0ffe8 0%, #EEFCF8 100%)', borderRadius: 40, boxShadow: '0 2px 16px #b6e38833', margin: '0 0 0px 0', paddingTop: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 0 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: '#236d1e', marginBottom: 16 }}>Launching Vardaan Junior App!  very soon</h2>
          <p style={{ fontSize: 19, color: '#236d1e', marginBottom: 28 }}>
            Learn anywhere, anytime! Get the Vardaan app for fun learning on your mobile.
          </p>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#" style={{ background: '#fff', border: '2px solid #3dbd3d', borderRadius: 18, padding: '10px 22px', fontSize: 20, color: '#236d1e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 8px #b6e38822', textDecoration: 'none', marginBottom: 8 }}>
              <FaGooglePlay style={{ fontSize: 26, marginRight: 10 }} /> Google Play
            </a>
            <a href="#" style={{ background: '#fff', border: '2px solid #236d1e', borderRadius: 18, padding: '10px 22px', fontSize: 20, color: '#236d1e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 2px 8px #b6e38822', textDecoration: 'none', marginBottom: 8 }}>
              <FaAppStoreIos style={{ fontSize: 26, marginRight: 10 }} /> App Store
            </a>
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#" target="_blank" rel="noopener noreferrer" style={{ background: '#4267B2', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: '0 2px 8px #b6e38822', textDecoration: 'none' }} title="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" style={{ background: '#E4405F', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: '0 2px 8px #b6e38822', textDecoration: 'none' }} title="Instagram">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" style={{ background: '#FF0000', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: '0 2px 8px #b6e38822', textDecoration: 'none' }} title="YouTube">
              <FaYoutube />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" style={{ background: '#1DA1F2', color: '#fff', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, boxShadow: '0 2px 8px #b6e38822', textDecoration: 'none' }} title="Twitter/X">
              <FaTwitter />
            </a>
          </div>
          <footer style={{ background: 'linear-gradient(90deg, #236d1e 0%, #25d366 100%)', width: '100%', color: '#fff', textAlign: 'center', padding: '24px 0', borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: 48 }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>Vardaan Junior</div>
          <div style={{ fontSize: 14, marginTop: 4 }}>A branch of Vardaan Learning Institute</div>
          <div style={{ fontSize: 13, marginTop: 8 }}>© {new Date().getFullYear()} Vardaan Learning Institute. All rights reserved.</div>
        </footer>
        </section>

        
      </div>
    </>
  );
}


