import React from "react";
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TeacherSlider from '../components/TeacherSlider';
import VideoCrousel from '../components/videocrousel';
import MobileCrousel from '../components/MobileCrousel';
import StandoutSection from '../components/StandoutSection';
import CircularTeacherSlider from '../components/CircularTeacherSlider';
import './LandingPageCritical.css';
import './LandingPage.css';

// Add smooth scroll CSS to document root (best for single page apps)
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

import JuniorMentorSlider from "../components/JuniorMentorSlider";

// Utility: Cache with expiry
function getCache(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { value, expiry } = JSON.parse(cached);
    if (expiry && Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}
function setCache(key, value, ttlMs = 3600000) { // default 1 hour
  const expiry = Date.now() + ttlMs;
  localStorage.setItem(key, JSON.stringify({ value, expiry }));
}

const LandingPage = () => {
  // Example: cache testimonials (replace with your actual fetch logic)
  React.useEffect(() => {
    const cacheKey = 'testimonials';
    const cached = getCache(cacheKey);
    if (cached) {
      // setTestimonials(cached); // Uncomment if you have a setTestimonials
      return;
    }
    // Example fetch (replace with your API)
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        // setTestimonials(data); // Uncomment if you have a setTestimonials
        setCache(cacheKey, data);
      });
  }, []);

  return (
    <>
      <Navbar />
      {/* HERO SECTION */}
      <section
        className="hero-section landing-hero hero-with-video relative w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[540px] flex flex-col md:flex-row items-center justify-center overflow-hidden bg-[#1a1a1a]"
      >
        {/* Background Video */}
        <video
          className="hero-bg-video  absolute inset-0 w-full h-full object-cover z-0"
          // src="https://vardaan.netlify.app/ankitbhaiya/11.webm"
          src="https://yfxhswegzytlpjchmtsj.supabase.co/storage/v1/object/public/website-assets//11.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black bg-opacity-80 z-10" />
        <div className="relative z-20 bottom-0 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-4 sm:px-6 pt-2 sm:pt-4 pb-0">
          {/* Left: Text and CTAs */}
          <div className="flex-1 flex flex-col items-start justify-center text-left gap-3 md:gap-5">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="hidden sm:block">
                <div className="flex flex-row items-center gap-x-4" style={{ alignItems: 'center' }}>
                  <h1 className="text-white text-base sm:text-lg md:text-xl font-bold leading-tight m-0 p-0 whitespace-nowrap" style={{ marginBottom: 0, lineHeight: 1 }}>Welcome to</h1>
                  <img src="/logo orange.png" alt="Vardaan Logo" className="inline-block" style={{ height: '7em', verticalAlign: 'middle', marginBottom: 18 }} />
                </div>
                <div className="flex flex-col items-start w-full" style={{ gap: '0.55em' }}>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ff422b]">Vardaan Learning Institute</div>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-2xl sm:text-3xl md:text-4xl font-extrabold">
                    <span className="text-white">Building</span>
                    <span className="text-orange-400">Future</span>
                    <span className="text-white">not Just</span>
                  </div>
                  <div className="hidden sm:block text-white text-2xl sm:text-3xl md:text-4xl font-extrabold">Students</div>
                </div>
              </div>
            </div>
            {/* Mobile Only Images */}
            <div className="sm:hidden w-screen flex flex-col items-center justify-end gap-0 py-0 m-0">
              <img src="/hero/Junior.png" alt="Vardaan Junior" className="w-screen max-w-none block rounded-none sm:w-3/4 sm:max-w-xs object-contain shadow-lg m-0" />
              {/* Mobile Only Buttons */}
              <div className="flex flex-row w-full justify-center items-center gap-3 mt-2">
                <Link to="/vardaan-junior">
                  <button className="vardaan-theme-btn text-white font-semibold rounded-full shadow py-1 px-6 text-sm">Vardaan Junior</button>
                </Link>
                <Link to="/vardaan-senior">
                  <button className="vardaan-theme-btn text-white font-semibold rounded-full shadow py-1 px-6 text-sm">Vardaan Senior</button>
                </Link>
              </div>
              <div className="text-center font-bold text-bold text-3xl text-orange-500 mt-2 rounded-full px-4 py-1 shadow-lg">
                +91 9508841336
              </div>
            </div>
            <div className="hidden sm:flex flex-row flex-nowrap items-center justify-between w-full gap-2 sm:gap-4 mb-4">
              <div className="flex flex-row flex-nowrap gap-2 sm:gap-4">
                <Link to="/vardaan-junior">
                  <button className="vardaan-theme-btn text-white font-semibold rounded-full shadow transition whitespace-nowrap" style={{ fontSize: '1.5rem',  }}>Vardaan Junior</button>
                </Link>
                <Link to="/vardaan-senior">
                  <button className="vardaan-theme-btn text-white font-semibold rounded-full shadow transition whitespace-nowrap" style={{ fontSize: '1.5rem',  }}>Vardaan Senior</button>
                </Link>
              </div>
            </div>
            {/* Show mobile number just below buttons on sm+ only */}
            <div className="hidden sm:block w-full text-left mt-2">
              <span className="text-orange-400 text-2xl sm:text-3xl md:text-4xl font-bold whitespace-nowrap">+91 9508841336</span>
            </div>
            
          </div>
          {/* Right: Teacher Illustration */}
          {/* Desktop/Tablet Only Image */}
          <div className="hidden sm:flex flex-1 h-full flex-col items-center md:items-end justify-end">
            <img src="/hero/teacher.png" alt="Teacher" className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] object-contain" />
          </div>
        </div>
      </section>


      {/* CATEGORY CARDS SECTION */}
      <section className="landing-section py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6 sm:mb-8 text-[#ea1900]">Find Your Perfect Learning Track</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 max-w-4xl mx-auto w-full">
          {/* Junior Card */}
          <div className="flex-1 flex flex-col items-center p-8 rounded-2xl border-2 border-blue-300 bg-blue-50 shadow-xl hover:shadow-2xl transition w-[95%]">
            <span className="text-6xl mb-2" role="img" aria-label="children">🧒</span>
            <div className="w-full">
              <span className="block font-bold px-4 py-2 rounded-full mb-3 text-lg text-left shadow" style={{
                background: 'linear-gradient(90deg, #55d6ff 0%, #b5f3fc 100%)',
                color: '#fff',
                boxShadow: '0 2px 12px #b5f3fc55',
                fontWeight: 700,
                letterSpacing: 0.2,
              }}>Vardaan Junior</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-red-600 text-center mb-2">For Class 1 to 5</div>
            <div className="text-gray-700 mb-4 text-left w-full">
              <div className="mb-1 flex items-start"><span className="mr-2">📍</span><span><b>Classes 1 to 3</b>: Build strong foundations in all Subjects with clarity</span></div>
              <div className="mb-1 flex items-start"><span className="mr-2">🟦</span><span><b>Classes 4 & 5</b>: Prepare for upper school with deeper concepts</span></div>
              <div className="mb-1 flex items-start"><span className="mr-2">🧠</span><span><b>Focus</b>: Make learning joyful, consistent, and confidence-boosting</span></div>
            </div>
            <div className="flex gap-3 mb-5">
              <span className="bg-white border border-blue-300 text-blue-700 font-bold px-4 py-2 rounded-full text-base shadow">Class I-III</span>
              <span className="bg-white border border-blue-300 text-blue-700 font-bold px-4 py-2 rounded-full text-base shadow">Class IV-V</span>
            </div>
            <Link to="/vardaan-junior" className="w-full">
              <button className="w-full py-2 sm:py-3 vardaan-theme-btn text-white text-base sm:text-lg font-bold rounded-full shadow-lg transition">Explore Junior</button>
            </Link>
          </div>
          {/* Senior Card */}
          <div className="flex-1 flex flex-col items-center p-8 rounded-2xl border-2 border-orange-300 bg-orange-50 shadow-xl hover:shadow-2xl transition w-[95%]">
            <span className="text-6xl mb-2" role="img" aria-label="senior">🎓</span>
            <div className="w-full">
              <span className="block font-bold px-4 py-2 rounded-full mb-3 text-lg text-left shadow" style={{
                background: 'linear-gradient(90deg, #ffb347 0%, #ffd6a5 100%)',
                color: '#fff',
                boxShadow: '0 2px 12px #ffd6a555',
                fontWeight: 700,
                letterSpacing: 0.2,
              }}>Vardaan Senior</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-red-600 text-center mb-2">For Class 6 to 12</div>
            <div className="text-gray-700 mb-4 text-left w-full">
              <div className="mb-1 flex items-start"><span className="mr-2">🔍</span><span><b>Classes 6 to 8</b>: Strengthen your base, master the basics</span></div>
              <div className="mb-1 flex items-start"><span className="mr-2">📚</span><span><b>Classes 9 & 10</b>: Ace boards with strategy & structure</span></div>
              <div className="mb-1 flex items-start"><span className="mr-2">🎯</span><span><b>Classes 11 & 12</b>: Be exam-ready (JEE, NEET, Boards) with precision</span></div>
            </div>
            <div className="flex gap-3 mb-5">
              <span className="bg-white border border-orange-300 text-orange-700 font-bold px-4 py-2 rounded-full text-base shadow">Std VI-VIII</span>
              <span className="bg-white border border-orange-300 text-orange-700 font-bold px-4 py-2 rounded-full text-base shadow">IX-X</span>
              <span className="bg-white border border-orange-300 text-orange-700 font-bold px-4 py-2 rounded-full text-base shadow">XI-XII</span>
            </div>
            <Link to="/vardaan-senior" className="w-full">
              <button className="w-full py-2 sm:py-3 vardaan-theme-btn text-white text-base sm:text-lg font-bold rounded-full shadow-lg transition">Explore Senior</button>
            </Link>
          </div>
        </div>
      </section>




      <div className="hidden sm:block">
        <VideoCrousel />
      </div>

      <div className="block sm:hidden">
        <MobileCrousel />
      </div>





      {/* Meet Ankit Bhaiya Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6 sm:mb-8 text-[#ea1900]">Meet Ankit Bhaiya</h2>
        <img src="/ankitbhaiya/5 Ankit bhaiya meet.png" alt="Ankit Bhaiya" className="mx-auto w-full max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl rounded-xl shadow-lg" />
      </section>


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

      {/* mentor card slider mobile view */}
      <div className="show-on-mobile" style={{ background: '#fff', color: '#111', margin: 0, zIndex: 10, position: 'relative', padding: 0, borderRadius: 0, overflowX: 'hidden', width: '100vw', maxWidth: '100vw', left: 0, right: 0, boxSizing: 'border-box' }}>
        <h2 className="show-on-mobile" style={{ margin: 0, fontWeight: 700, fontSize: 24, textAlign: 'center', width: '100vw', maxWidth: '100vw', padding: 0, left: 0, right: 0, boxSizing: 'border-box', color: '#ea580c' }}>Mentor Who Inspire, <br /> Educators Who Empower</h2>
        <CircularTeacherSlider />

      </div>



      <section className="hidden md:flex" style={{ width: '100vw', maxWidth: '100vw', background: '#fff', borderRadius: 0, boxShadow: '0 2px 16px #b6e38833', margin: 0, padding: 0, textAlign: 'center', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
        <h2 style={{ fontSize: 29, fontWeight: 900, color: '#236d1e', marginBottom: 10, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
          Mentors Who Inspire,
        </h2>
        <h2 style={{ fontSize: 29, fontWeight: 900, color: '#236d1e', marginBottom: 10, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>

          <span style={{ color: '#ea580c', fontWeight: 700 }}> Educators Who Empower</span>
        </h2>
        <JuniorMentorSlider />
      </section>






      {/* Why Choose Vardaan Section */}
      <section className="landing-section landing-features-section py-16 bg-gray-50">
        <h2 className="features-title text-4xl font-extrabold text-center text-red-500 mb-10">Why Choose Vardaan?</h2>
        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="feature-card bg-white rounded-2xl shadow-md p-8 flex flex-col items-start text-left">
            <span className="feature-icon text-4xl mb-4">📚</span>
            <div className="feature-title text-xl font-bold mb-2">Comprehensive Courses</div>
            <div className="feature-desc text-gray-600">Wide range of subjects and topics for all classes, designed by experts.</div>
          </div>
          <div className="feature-card bg-white rounded-2xl shadow-md p-8 flex flex-col items-start text-left">
            <span className="feature-icon text-4xl mb-4">🧑‍🏫</span>
            <div className="feature-title text-xl font-bold mb-2">Expert Teachers</div>
            <div className="feature-desc text-gray-600">Learn from experienced educators and mentors, anytime, anywhere.</div>
          </div>
          <div className="feature-card bg-white rounded-2xl shadow-md p-8 flex flex-col items-start text-left">
            <span className="feature-icon text-4xl mb-4">📝</span>
            <div className="feature-title text-xl font-bold mb-2">Practice &amp; Tests</div>
            <div className="feature-desc text-gray-600">Unlimited practice questions, mock tests, and instant feedback.</div>
          </div>
          <div className="feature-card bg-white rounded-2xl shadow-md p-8 flex flex-col items-start text-left">
            <span className="feature-icon text-4xl mb-4">🎯</span>
            <div className="feature-title text-xl font-bold mb-2">Personalized Learning</div>
            <div className="feature-desc text-gray-600">Adaptive learning paths and recommendations based on your progress.</div>
          </div>
        </div>
      </section>














      {/* Testimonials Section */}
      <section className="landing-section landing-testimonials-section redesigned-testimonials py-16 bg-white">
        <h2 className="testimonials-title text-4xl font-extrabold text-center text-red-500 mb-10">What Our Students Say</h2>
        <div className="testimonials-grid modern grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="testimonial-card modern bg-gray-50 rounded-2xl shadow-md p-8 flex flex-col items-start text-left">
            <div className="testimonial-quote text-lg italic mb-6">“Vardaan Junior made learning so much fun! The quizzes and videos are amazing.”</div>
            <div className="testimonial-author flex items-center gap-2">
              <span className="testimonial-author-name font-bold text-gray-800">Aarav</span>
              <span className="testimonial-author-meta text-gray-500">Class 6</span>
            </div>
          </div>
          <div className="testimonial-card modern bg-gray-50 rounded-2xl shadow-md p-8 flex flex-col items-start text-left">
            <div className="testimonial-quote text-lg italic mb-6">“The mock tests and notes helped me top my exams. Highly recommended!”</div>
            <div className="testimonial-author flex items-center gap-2">
              <span className="testimonial-author-name font-bold text-gray-800">Priya</span>
              <span className="testimonial-author-meta text-gray-500">Class 10</span>
            </div>
          </div>
          <div className="testimonial-card modern bg-gray-50 rounded-2xl shadow-md p-8 flex flex-col items-start text-left">
            <div className="testimonial-quote text-lg italic mb-6">“Best platform for CBSE prep. The teachers are really supportive.”</div>
            <div className="testimonial-author flex items-center gap-2">
              <span className="testimonial-author-name font-bold text-gray-800">Rohan</span>
              <span className="testimonial-author-meta text-gray-500">Class 12</span>
            </div>
          </div>
        </div>
      </section>



      {/* Footer Love Line */}
      <div className="w-full text-center my-6 sm:my-9" style={{ margin: '24px 0px 6px' }}>
        <span className="footer-love-line text-xl sm:text-[2.1rem] font-extrabold text-orange-600" style={{ letterSpacing: '1.2px' }}>
          Students <span style={{ fontSize: '1.5rem', margin: '0px 6px' }}>❤️</span> Vardaan
        </span>
      </div>

      {/* Mobile  Footer */}
      <footer className="landing-footer widget-footer bg-[#ea1900] text-white pt-8 sm:pt-12 pb-4 mt-8 sm:mt-12 w-full block sm:hidden">
        <div className="widget-footer-card brand-card flex flex-col items-start">
          <img alt="vardaan learning institute" className="footer-logo-ea1900 mb-3 sm:mb-4 w-24 sm:w-32 h-auto" src="https://yfxhswegzytlpjchmtsj.supabase.co/storage/v1/object/public/website-assets//logo.png" />
          <div className="widget-footer-brand-desc text-xs sm:text-sm opacity-90">Empowering Classes 1-12 with adaptive learning, expert teachers, and engaging resources for every step of your academic journey.</div>
        </div>
        <div className="widget-footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 w-full px-2 sm:px-0">
          {/* Brand Card */}

          <div className="widget-footer-card flex flex-col items-start">
            <div className="widget-footer-col-title font-bold mb-1 sm:mb-2">Courses</div>
            <Link to="/vardaan-junior" className="mb-1 hover:underline text-white">Vardaan Junior</Link>
            <Link to="/vardaan-senior" className="mb-1 hover:underline text-white">Vardaan Senior</Link>
            <Link to="/results" className="mb-1 hover:underline text-white">Result</Link>
          </div>
          {/* Quick Links */}
          <div className="widget-footer-card flex flex-col items-start">
            <div className="widget-footer-col-title font-bold mb-1 sm:mb-2">Quick Links</div>
            <Link to="/studymaterial" className="mb-1 hover:underline text-white">Notes</Link>
            <Link to="/ncert-pdf" className="mb-1 hover:underline text-white">NCERT PDF</Link>
            <Link to="/reference-books" className="mb-1 hover:underline text-white">Reference Book</Link>
            <Link to="/login" className="mb-1 hover:underline text-white">Student Login</Link>
          </div>


        </div>
        {/* Social & Store */}
        <div className="widget-footer-card widget-footer-social-card flex flex-col items-start gap-4">
          <div className="widget-footer-store-buttons flex gap-2 sm:gap-4 items-center">
            <h3 className="text-white text-xs sm:text-base font-semibold">+91 9508841336<br />learningvardaan@gmail.com</h3>
          </div>
          <div className="widget-footer-socials flex flex-row gap-2 sm:gap-3 mt-2">
            <a href="#" aria-label="Facebook"><img alt="Facebook" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" /></a>
            <a href="#" aria-label="Instagram"><img alt="Instagram" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/733/733558.png" /></a>
            <a href="#" aria-label="LinkedIn"><img alt="LinkedIn" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" /></a>
            <a href="#" aria-label="X"><img alt="X (Twitter)" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" /></a>
            <a href="#" aria-label="YouTube"><img alt="YouTube" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" /></a>
          </div>
        </div>
        <div className="widget-footer-bottom text-center text-[10px] sm:text-xs opacity-90 mt-6 sm:mt-10">
          <span>2025 Vardaan Learning Institute. All rights reserved.</span>
        </div>
      </footer>

      {/* Desktop Footer */}
      <footer className="landing-footer widget-footer bg-[#ea1900] text-white pt-8 sm:pt-12 pb-4 mt-8 sm:mt-12 w-full hidden sm:block">

        <div className="widget-footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 w-full px-2 sm:px-0">
          {/* Brand Card */}
          <div className="widget-footer-card brand-card flex flex-col items-start">
            <img alt="vardaan learning institute" className="footer-logo-ea1900 mb-3 sm:mb-4 w-24 sm:w-32 h-auto" src="https://yfxhswegzytlpjchmtsj.supabase.co/storage/v1/object/public/website-assets//logo.png" />
            <div className="widget-footer-brand-desc text-xs sm:text-sm opacity-90">Empowering Classes 1-12 with adaptive learning, expert teachers, and engaging resources for every step of your academic journey.</div>
          </div>

          <div className="widget-footer-card flex flex-col items-start">
            <div className="widget-footer-col-title font-bold mb-1 sm:mb-2">Courses</div>
            <Link to="/vardaan-junior" className="mb-1 hover:underline text-white">Vardaan Junior</Link>
            <Link to="/vardaan-senior" className="mb-1 hover:underline text-white">Vardaan Senior</Link>
            <Link to="/results" className="mb-1 hover:underline text-white">Result</Link>
            <Link to="/login" className="mb-1 hover:underline text-white">Student Login</Link>
          </div>
          {/* Quick Links */}
          <div className="widget-footer-card flex flex-col items-start">
            <div className="widget-footer-col-title font-bold mb-1 sm:mb-2">Quick Links</div>
            <Link to="/notes" className="mb-1 hover:underline text-white">Notes</Link>
            <Link to="/ncertbooks" className="mb-1 hover:underline text-white">NCERT</Link>
            <Link to="/book-solution" className="mb-1 hover:underline text-white">Books Solution</Link>
            <Link to="/syllabus" className="mb-1 hover:underline text-white">Syllabus</Link>
            <Link to="/testpapers" className="mb-1 hover:underline text-white">Test Papers</Link>
          </div>
          {/* Social & Store */}
          <div className="widget-footer-card widget-footer-social-card flex flex-col items-start gap-4">
            <div className="widget-footer-store-buttons flex gap-2 sm:gap-4 items-center">
              <h3 className="text-white text-xs sm:text-base font-semibold">+91 9508841336<br />learningvardaan@gmail.com</h3>
            </div>
            <div className="widget-footer-socials flex flex-row gap-2 sm:gap-3 mt-2">
              <a href="#" aria-label="Facebook"><img alt="Facebook" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/733/733547.png" /></a>
              <a href="#" aria-label="Instagram"><img alt="Instagram" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/733/733558.png" /></a>
              <a href="#" aria-label="LinkedIn"><img alt="LinkedIn" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" /></a>
              <a href="#" aria-label="X"><img alt="X (Twitter)" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" /></a>
              <a href="#" aria-label="YouTube"><img alt="YouTube" className="w-5 sm:w-7 h-5 sm:h-7" src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" /></a>
            </div>
          </div>


        </div>

        <div className="widget-footer-bottom text-center text-[10px] sm:text-xs opacity-90 mt-6 sm:mt-10">
          <span>2025 Vardaan Learning Institute. All rights reserved.</span>
        </div>
      </footer>

    </>
  );
}

export default LandingPage;
