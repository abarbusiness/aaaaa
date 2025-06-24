import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import supabase from '../supabaseClient';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motionPresets';
import './Navbar.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Senior', href: '/vardaan-senior' },
  { name: 'Junior', href: '/vardaan-junior' },
  {
    name: 'Study Material', href: '/studymaterial',
    dropdown: [
      { name: 'Study Material', href: '/studymaterial' },

      { name: 'Notes', href: '/notes' },
      { name: 'TEST Paper', href: '/testpaper' },
      { name: 'Books Solution', href: '/book-solutions' },
      { name: 'NCERT', href: '/ncertbooks' },
      { name: 'Syllabus', href: '/syllabus' },
    ]
  },
];


export default function Navbar({ className = "" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [overHero, setOverHero] = useState(true);
  const dropdownTimeout = useRef();
  const location = useLocation();

  useEffect(() => {
    // Always default to not over hero
    setOverHero(false);
    // Try to find the hero section (landing page only)
    const checkAndObserve = () => {
      const hero = document.querySelector('.landing-hero.hero-with-video');
      if (!hero) {
        setOverHero(false);
        return;
      }
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          setOverHero(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    };
    // Run once after mount
    const cleanup = checkAndObserve();
    // Also run again after a short delay in case the hero loads late
    const timeout = setTimeout(checkAndObserve, 300);
    return () => {
      if (cleanup) cleanup();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session?.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <>
      <motion.header
        initial="initial"
        animate="animate"
        variants={fadeIn}
        className={`navbar-fixed w-full transition-all duration-300 print:hidden 
        ${overHero ? 'navbar-over-hero' : 'bg-white shadow-sm border-orange-100/80'}
        ${scrolled && !overHero ? ' navbar-scrolled' : ''}
        ${className}
      `}>
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      <nav className="w-full flex items-center justify-between py-2 px-4 lg:px-12 font-poppins" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-14 w-auto drop-shadow-sm transition-transform duration-300 hover:scale-105" src="https://yfxhswegzytlpjchmtsj.supabase.co/storage/v1/object/public/website-assets//logo.png" alt="vardaan learning institute" style={{ filter: 'invert(33%) sepia(99%) saturate(7472%) hue-rotate(7deg) brightness(94%) contrast(104%)' }} />
          </Link>
        </div>
        <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>

          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full bg-white p-3 transition-all duration-300 md:hidden hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            tabIndex={0}
            aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ width: 54, height: 54, outline: 'none', border: 'none', boxShadow: 'none' }}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="relative w-7 h-7 flex flex-col justify-between items-center">
              <span className={`block h-1 w-7 rounded-full bg-[#EA1900] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-3' : ''}`}></span>
              <span className={`block h-1 w-7 rounded-full bg-[#EA1900] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-1 w-7 rounded-full bg-[#EA1900] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-3' : ''}`}></span>
            </span>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            item.dropdown ? (
              <div key={item.name} className="relative navbar-dropdown-wrapper"
                onMouseEnter={() => {
                  if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                  setDropdownOpen(item.name);
                }}
                onMouseLeave={() => {
                  dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 150);
                }}
              >
                <div className="flex items-center">
                  <Link
                    to="#"
                    onClick={e => e.preventDefault()}
                    className={`group relative text-base font-bold uppercase tracking-wide px-3 py-1 rounded-md transition-all duration-200 font-poppins flex items-center gap-1 ${location.pathname === item.href ? 'text-[#EA1900]' : 'text-[#EA1900] hover:text-[#EA1900]'}`}
                    style={{ letterSpacing: '0.06em' }}
                  >
                    <span className="navbar-page-name-minimal font-poppins font-semibold tracking-wide transition-colors duration-200" style={{ fontSize: '1.08em', letterSpacing: '0.04em', color: '#EA1900' }}>{item.name}</span>
                    <svg className="ml-1" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="#ca3500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span
                      className={`
          pointer-events-none
          absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] rounded-full bg-[#ffa500] transition-all duration-300
          w-0 group-hover:w-4/5 group-hover:left-1/2 group-hover:-translate-x-1/2
          ${location.pathname === item.href ? 'w-4/5' : ''}
        `}
                      style={{ transitionProperty: 'width,left' }}
                    />
                  </Link>
                  <div className={`navbar-dropdown-menu absolute left-0 top-full mt-2 w-56 rounded-xl bg-white shadow-lg border border-orange-100 transition-all duration-200 z-40 ${dropdownOpen === item.name ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    {item.dropdown.map((drop) => (
                      <Link
                        key={drop.name}
                        to={drop.href}
                        className="block px-6 py-3 font-semibold hover:bg-orange-50 hover:text-orange-700 rounded-xl transition-all duration-150"
                        style={{ color: '#EA1900', fontSize: '1.08em', letterSpacing: '0.04em' }}
                        onClick={() => setDropdownOpen(null)}
                      >
                        {drop.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={`group relative text-base font-bold uppercase tracking-wide px-3 py-1 rounded-md transition-all duration-200 font-poppins 
                  ${location.pathname === item.href ? 'text-[#ca3500]' : 'text-[#ca3500] hover:text-[#ca3500]'}`}
                style={{ letterSpacing: '0.06em' }}
              >
                <span
                  className={`navbar-page-name-minimal font-poppins font-semibold tracking-wide transition-colors duration-200`}
                  style={{ fontSize: '1.08em', letterSpacing: '0.04em', color: '#EA1900' }}
                >
                  {item.name}
                </span>
                <span
                  className={`
                    pointer-events-none
                    absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] rounded-full bg-[#ffa500] transition-all duration-300
                    w-0 group-hover:w-4/5 group-hover:left-1/2 group-hover:-translate-x-1/2
                    ${location.pathname === item.href ? 'w-4/5' : ''}
                  `}
                  style={{ transitionProperty: 'width,left' }}
                />
              </Link>
            )
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-2">
          <a
            href="tel:+919508841336"
            className="call-btn flex items-center justify-center bg-[#EA1900] hover:bg-[#b91500] text-white rounded-full p-3 mr-1 shadow-none transition-colors duration-150"
            title="Call Vardaan"
            style={{ width: 40, height: 40 }}
          >
            <img src="/phone-call.png" alt="Call" style={{ width: 40, height: 40, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </a>
          <a
            href="https://wa.me/919508841336"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full p-3 mr-1 shadow-none transition-colors duration-150"
            title="WhatsApp Vardaan"
            style={{ width: 40, height: 40, display: 'inline-flex', marginLeft: 4 }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          </a>
          {loggedIn ? (
            <Link to="/dashboard" className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" style={{ color: '#fff' }}>
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" style={{ color: '#fff' }}>
              Student Login <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-black/60 transition-opacity duration-200" onClick={() => setMobileMenuOpen(false)} />
        )}
        <Dialog.Panel className={`fixed top-0 left-0 z-40 w-screen h-screen max-w-none bg-white px-0 py-0 transition-transform duration-200 flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full w-full">
            <nav className="flex-1 flex flex-col gap-1 px-4 pt-6 overflow-y-auto" style={{ minHeight: 0 }}>
              {navigation.map((item) => (
                item.dropdown ? (
                  <div key={item.name} className="flex flex-col mb-1">
                    <span
                      className="font-extrabold text-2xl text-[#EA1900] py-3 px-2"
                      style={{ cursor: 'default', background: 'none', boxShadow: 'none' }}
                    >
                      {item.name}
                    </span>
                    <div className="ml-3 flex flex-col gap-0.5">
                      {item.dropdown.map((drop) => (
                        <Link
                          key={drop.name}
                          to={drop.href}
                          className="text-lg text-[#222] py-2 px-3 pl-5 font-semibold rounded hover:bg-orange-50 transition-colors"
                          style={{ marginLeft: 2, background: 'none', boxShadow: 'none' }}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {drop.name}
                        </Link>
                      ))}
                    </div>
                    <div className="my-2 border-b border-orange-100/80"></div>
                  </div>
                ) : (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className="font-extrabold text-2xl text-[#EA1900] py-3 px-2 block" style={{ background: 'none', boxShadow: 'none', color: '#EA1900' }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <div className="my-2 border-b border-orange-100/80"></div>
                  </div>
                )
              ))}
            </nav>
            <div className="px-4 pb-5 pt-2 sticky bottom-0 left-0 bg-white z-50 w-full">
              <Link
                to="/login"
                className="block w-full rounded-lg px-5 py-4 text-xl font-extrabold leading-7 text-white bg-[#EA1900] hover:bg-[#b91500] text-center transition-all duration-150"
                style={{ boxShadow: 'none', background: '#EA1900', color: '#fff' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Student Login
              </Link>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </motion.header>
      {/* Placeholder to avoid layout shift due to fixed navbar */}
      <div className="navbar-placeholder" />
    </>
  );
}
