import React from 'react';
import { useNavigate } from 'react-router-dom';

const Class10 = () => {
  const navigate = useNavigate();
  // Individual handlers for each subject button (no loop, no shared function)
  const handleScienceClick = () => navigate('/studymaterial/class10/Class10Science');
  const handleMathematicsClick = () => navigate('/studymaterial/class10/Class10Mathematics');
  const handleSocialScienceClick = () => navigate('/studymaterial/class10/Class10SocialScience');
  const handleEnglishClick = () => navigate('/studymaterial/class10/Class10English');
  const handleEnglishGrammarClick = () => navigate('/studymaterial/class10/Class10EnglishGrammar');

  

  return (
    <div className=" mt-17 min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 font-inter text-gray-800">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          /* Custom marquee styles */
          .marquee-container {
            overflow: hidden;
            white-space: nowrap;
            box-sizing: border-box;
          }
          .marquee-content {
            display: inline-flex; /* Use flexbox for horizontal arrangement of items */
            padding-left: 100%;
            animation: marquee 30s linear infinite; /* Adjust duration for speed */
          }
          .marquee-item {
            display: inline-block;
            margin-right: 2rem; /* Space between blog items */
            cursor: pointer;
            text-align: center;
            flex-shrink: 0; /* Prevent items from shrinking */
          }
          .marquee-item img {
            border-radius: 0.5rem; /* Rounded corners for images */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
            transition: transform 0.2s ease-in-out;
          }
          .marquee-item:hover img {
            transform: scale(1.05); /* Slight zoom on hover */
          }
          .marquee-item span {
            display: block;
            margin-top: 0.5rem;
            font-size: 0.9rem;
            color: #4a5568; /* Tailwind gray-700 */
            white-space: normal; /* Allow text to wrap */
            max-width: 150px; /* Limit text width */
          }

          /* Adjust marquee speed for smaller screens if needed */
          @media (max-width: 640px) {
            .marquee-content {
              animation: marquee 20s linear infinite; /* Faster scroll on small screens */
            }
          }

          @keyframes marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

      {/* Header Section - Improved UI */}
      <header className="relative flex flex-col items-center justify-center mb-10 py-12 px-6 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-300 rounded-3xl shadow-2xl border-2 border-orange-200 overflow-hidden">
        {/* Decorative SVG background pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="3" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
        {/* Main Title */}
        <div className="relative z-10 text-2xl sm:text-5xl md:text-7xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-3 text-center whitespace-nowrap" style={{whiteSpace: 'nowrap'}}>
          Class 10 Study Materials
        </div>
       
        <p className="relative z-10 text-base sm:text-lg text-white/80 mb-4 text-center">
          Choose your subject and start learning!
        </p>
        {/* CTA Button (optional) */}
        <button
          className="relative z-10 mt-2 px-6 py-2 bg-white text-orange-600 font-semibold rounded-full shadow hover:bg-orange-50 transition"
          onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
        >
          Explore Subjects
        </button>
      </header>

      {/* Subject Selection Grid */}
      <section className="max-w-6xl mx-auto mb-12">
        <h2 className="sr-only">Choose a Subject</h2> {/* Screen reader only title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <button onClick={handleScienceClick} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">
            <img src="/SubjectLogo/science.png" alt="Science Icon" className="w-36 h-36 mb-4 rounded-lg shadow-md" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center mb-2">Science Class 10</h3>
          </button>
          <button onClick={handleMathematicsClick} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">
            <img src="/SubjectLogo/maths.png" alt="Maths Icon" className="w-36 h-36 mb-4 rounded-lg shadow-md" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center mb-2">Mathematics Class 10</h3>
          </button>
          <button onClick={handleSocialScienceClick} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">
            <img src="/SubjectLogo/history.png" alt="Social Science Icon" className="w-36 h-36 mb-4 rounded-lg shadow-md" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center mb-2">Social Studies Class 10</h3>
          </button>
          <button onClick={handleEnglishClick} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">
            <img src="/SubjectLogo/English Language.png" alt="English Icon" className="w-36 h-36 mb-4 rounded-lg shadow-md" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center mb-2">English Class 10</h3>
          </button>
          <button onClick={handleEnglishGrammarClick} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl hover:scale-105 transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">
            <img src="/SubjectLogo/GrammarLanguage.png" alt="English Grammar Advanced Icon" className="w-36 h-36 mb-4 rounded-lg shadow-md" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center mb-2">English Grammar </h3>
          </button>
        </div>
      </section>

  
      

      
    </div>
  );
};

export default Class10;
