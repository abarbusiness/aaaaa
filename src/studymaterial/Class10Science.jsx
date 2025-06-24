import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Main App component
const Class10Science = () => {
  // State to manage the currently open chapter
  // Stores the ID of the open chapter, or null if all are closed
  const [openChapter, setOpenChapter] = useState(null);

  // Function to toggle a chapter's open/close state
  const toggleChapter = (chapterId) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  // Chapter data with dummy content links
  const chapters = [
    { id: '01', title: 'Chemical Reactions and Equations', videos: 4, docs: 46, tests: 9 },
    { id: '02', title: 'Acids, Bases and Salts', videos: 4, docs: 29, tests: 8 },
    { id: '03', title: 'Metals and Non-metals', videos: 3, docs: 30, tests: 6 },
    { id: '04', title: 'Carbon and its compounds', videos: 8, docs: 29, tests: 6 },
    { id: '05', title: 'Life Processes', videos: 4, docs: 43, tests: 7 },
    { id: '06', title: 'Control and Coordination', videos: 3, docs: 25, tests: 6 },
    { id: '07', title: 'How do Organisms Reproduce?', videos: 5, docs: 26, tests: 5 },
    { id: '08', title: 'Heredity', videos: 3, docs: 20, tests: 4 },
    { id: '09', title: 'Light - Reflection and Refraction', videos: 4, docs: 27, tests: 9 },
    { id: '10', title: 'The Human Eye and the Colourful World', videos: 3, docs: 27, tests: 6 },
    { id: '11', title: 'Electricity', videos: 7, docs: 32, tests: 7 },
    { id: '12', title: 'Magnetic Effects of Electric Current', videos: 8, docs: 28, tests: 6 },
    { id: '13', title: 'Our Environment', videos: 4, docs: 24, tests: 4 },
  ];

  const navigate = useNavigate();

  // Explicit handlers for every button of every chapter (no loops, no shared handler)
  // Chapter 1: Chemical Reactions and Equations
  const handleNCERTPDFClick01 = () => navigate('/studymaterial/class10science/Chemical Reactions and Equations/ncert-pdf');
  const handleNCERTSolutionClick01 = () => navigate('/studymaterial/class10science/Chemical Reactions and Equations/ncert-solution');
  const handlePreviousYearQuestionsClick01 = () => navigate('/studymaterial/class10/Class10Science/Class10ScienceCbsePYQ');
  const handleChapterNotesClick01 = () => navigate('/studymaterial/class10science/Chemical Reactions and Equations/chapter-notes');
  const handleMindMapClick01 = () => navigate('/studymaterial/class10science/Chemical Reactions and Equations/mind-map');

  // Chapter 2: Acids, Bases and Salts
  const handleNCERTPDFClick02 = () => navigate('/studymaterial/class10science/Acids, Bases and Salts/ncert-pdf');
  const handleNCERTSolutionClick02 = () => navigate('/studymaterial/class10science/Acids, Bases and Salts/ncert-solution');
  const handlePreviousYearQuestionsClick02 = () => navigate('/studymaterial/class10science/Acids, Bases and Salts/previous-year-questions');
  const handleChapterNotesClick02 = () => navigate('/studymaterial/class10science/Acids, Bases and Salts/chapter-notes');
  const handleMindMapClick02 = () => navigate('/studymaterial/class10science/Acids, Bases and Salts/mind-map');

  // Chapter 3: Metals and Non-metals
  const handleNCERTPDFClick03 = () => navigate('/studymaterial/class10science/Metals and Non-metals/ncert-pdf');
  const handleNCERTSolutionClick03 = () => navigate('/studymaterial/class10science/Metals and Non-metals/ncert-solution');
  const handlePreviousYearQuestionsClick03 = () => navigate('/studymaterial/class10science/Metals and Non-metals/previous-year-questions');
  const handleChapterNotesClick03 = () => navigate('/studymaterial/class10science/Metals and Non-metals/chapter-notes');
  const handleMindMapClick03 = () => navigate('/studymaterial/class10science/Metals and Non-metals/mind-map');

  // Chapter 4: Carbon and its compounds
  const handleNCERTPDFClick04 = () => navigate('/studymaterial/class10science/Carbon and its compounds/ncert-pdf');
  const handleNCERTSolutionClick04 = () => navigate('/studymaterial/class10science/Carbon and its compounds/ncert-solution');
  const handlePreviousYearQuestionsClick04 = () => navigate('/studymaterial/class10science/Carbon and its compounds/previous-year-questions');
  const handleChapterNotesClick04 = () => navigate('/studymaterial/class10science/Carbon and its compounds/chapter-notes');
  const handleMindMapClick04 = () => navigate('/studymaterial/class10science/Carbon and its compounds/mind-map');

  // Chapter 5: Life Processes
  const handleNCERTPDFClick05 = () => navigate('/studymaterial/class10science/Life Processes/ncert-pdf');
  const handleNCERTSolutionClick05 = () => navigate('/studymaterial/class10science/Life Processes/ncert-solution');
  const handlePreviousYearQuestionsClick05 = () => navigate('/studymaterial/class10science/Life Processes/previous-year-questions');
  const handleChapterNotesClick05 = () => navigate('/studymaterial/class10science/Life Processes/chapter-notes');
  const handleMindMapClick05 = () => navigate('/studymaterial/class10science/Life Processes/mind-map');

  // Chapter 6: Control and Coordination
  const handleNCERTPDFClick06 = () => navigate('/studymaterial/class10science/Control and Coordination/ncert-pdf');
  const handleNCERTSolutionClick06 = () => navigate('/studymaterial/class10science/Control and Coordination/ncert-solution');
  const handlePreviousYearQuestionsClick06 = () => navigate('/studymaterial/class10science/Control and Coordination/previous-year-questions');
  const handleChapterNotesClick06 = () => navigate('/studymaterial/class10science/Control and Coordination/chapter-notes');
  const handleMindMapClick06 = () => navigate('/studymaterial/class10science/Control and Coordination/mind-map');

  // Chapter 7: How do Organisms Reproduce?
  const handleNCERTPDFClick07 = () => navigate('/studymaterial/class10science/How do Organisms Reproduce?/ncert-pdf');
  const handleNCERTSolutionClick07 = () => navigate('/studymaterial/class10science/How do Organisms Reproduce?/ncert-solution');
  const handlePreviousYearQuestionsClick07 = () => navigate('/studymaterial/class10science/How do Organisms Reproduce?/previous-year-questions');
  const handleChapterNotesClick07 = () => navigate('/studymaterial/class10science/How do Organisms Reproduce?/chapter-notes');
  const handleMindMapClick07 = () => navigate('/studymaterial/class10science/How do Organisms Reproduce?/mind-map');

  // Chapter 8: Heredity
  const handleNCERTPDFClick08 = () => navigate('/studymaterial/class10science/Heredity/ncert-pdf');
  const handleNCERTSolutionClick08 = () => navigate('/studymaterial/class10science/Heredity/ncert-solution');
  const handlePreviousYearQuestionsClick08 = () => navigate('/studymaterial/class10science/Heredity/previous-year-questions');
  const handleChapterNotesClick08 = () => navigate('/studymaterial/class10science/Heredity/chapter-notes');
  const handleMindMapClick08 = () => navigate('/studymaterial/class10science/Heredity/mind-map');

  // Chapter 9: Light - Reflection and Refraction
  const handleNCERTPDFClick09 = () => navigate('/studymaterial/class10science/Light - Reflection and Refraction/ncert-pdf');
  const handleNCERTSolutionClick09 = () => navigate('/studymaterial/class10science/Light - Reflection and Refraction/ncert-solution');
  const handlePreviousYearQuestionsClick09 = () => navigate('/studymaterial/class10science/Light - Reflection and Refraction/previous-year-questions');
  const handleChapterNotesClick09 = () => navigate('/studymaterial/class10science/Light - Reflection and Refraction/chapter-notes');
  const handleMindMapClick09 = () => navigate('/studymaterial/class10science/Light - Reflection and Refraction/mind-map');

  // Chapter 10: The Human Eye and the Colourful World
  const handleNCERTPDFClick10 = () => navigate('/studymaterial/class10science/The Human Eye and the Colourful World/ncert-pdf');
  const handleNCERTSolutionClick10 = () => navigate('/studymaterial/class10science/The Human Eye and the Colourful World/ncert-solution');
  const handlePreviousYearQuestionsClick10 = () => navigate('/studymaterial/class10science/The Human Eye and the Colourful World/previous-year-questions');
  const handleChapterNotesClick10 = () => navigate('/studymaterial/class10science/The Human Eye and the Colourful World/chapter-notes');
  const handleMindMapClick10 = () => navigate('/studymaterial/class10science/The Human Eye and the Colourful World/mind-map');

  // Chapter 11: Electricity
  const handleNCERTPDFClick11 = () => navigate('/studymaterial/class10science/Electricity/ncert-pdf');
  const handleNCERTSolutionClick11 = () => navigate('/studymaterial/class10science/Electricity/ncert-solution');
  const handlePreviousYearQuestionsClick11 = () => navigate('/studymaterial/class10science/Electricity/previous-year-questions');
  const handleChapterNotesClick11 = () => navigate('/studymaterial/class10science/Electricity/chapter-notes');
  const handleMindMapClick11 = () => navigate('/studymaterial/class10science/Electricity/mind-map');

  // Chapter 12: Magnetic Effects of Electric Current
  const handleNCERTPDFClick12 = () => navigate('/studymaterial/class10science/Magnetic Effects of Electric Current/ncert-pdf');
  const handleNCERTSolutionClick12 = () => navigate('/studymaterial/class10science/Magnetic Effects of Electric Current/ncert-solution');
  const handlePreviousYearQuestionsClick12 = () => navigate('/studymaterial/class10science/Magnetic Effects of Electric Current/previous-year-questions');
  const handleChapterNotesClick12 = () => navigate('/studymaterial/class10science/Magnetic Effects of Electric Current/chapter-notes');
  const handleMindMapClick12 = () => navigate('/studymaterial/class10science/Magnetic Effects of Electric Current/mind-map');

  // Chapter 13: Our Environment
  const handleNCERTPDFClick13 = () => navigate('/studymaterial/class10science/Our Environment/ncert-pdf');
  const handleNCERTSolutionClick13 = () => navigate('/studymaterial/class10science/Our Environment/ncert-solution');
  const handlePreviousYearQuestionsClick13 = () => navigate('/studymaterial/class10science/Our Environment/previous-year-questions');
  const handleChapterNotesClick13 = () => navigate('/studymaterial/class10science/Our Environment/chapter-notes');
  const handleMindMapClick13 = () => navigate('/studymaterial/class10science/Our Environment/mind-map');


  return (
    <div className="mt-17 min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 font-inter text-gray-800">
      {/* Tailwind CSS CDN and Font Import */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="text-center mb-10 p-6 bg-white rounded-xl shadow-lg border border-orange-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-700 mb-2 drop-shadow-md">
          <span className="block text-xl sm:text-2xl font-medium text-gray-700">Welcome to</span>
          Vardaan Learning Institute
        </h1>
        <p className="text-xl sm:text-2xl text-orange-600 font-semibold mt-3">
          Science Class 10
        </p>
        <p className="text-lg text-gray-600 italic">
          Empowering your learning journey.
        </p>
        <p className="text-md text-gray-500 mt-2">
          188,014 students learning this week
        </p>
      </header>

      {/* Chapters Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="sr-only">Science Chapters</h2> {/* Screen reader only title */}
        <div className="flex flex-col gap-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-white rounded-xl shadow-md border border-orange-100 overflow-hidden"
            >
              {/* Chapter Header (always visible) */}
              <button
                className="w-full flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-orange-50 transition-colors duration-200"
                onClick={() => toggleChapter(chapter.id)}
              >
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-orange-600 mr-4">
                    {chapter.id}
                  </span>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {chapter.videos} videos | {chapter.docs} docs | {chapter.tests} tests
                      {chapter.progress && <span className="ml-2 text-green-600 font-medium">{chapter.progress}</span>}
                    </p>
                  </div>
                </div>
                {/* Chevron Icon for Expand/Collapse */}
                <svg
                  className={`w-6 h-6 text-orange-500 transform transition-transform duration-300 ${openChapter === chapter.id ? 'rotate-180' : ''
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Collapsible Content */}
              {openChapter === '01' && (
                <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button onClick={handleNCERTPDFClick01} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                    <button onClick={handleNCERTSolutionClick01} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                    <button onClick={handlePreviousYearQuestionsClick01} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                    <button onClick={handleChapterNotesClick01} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                    <button onClick={handleMindMapClick01} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                  </div>
                </div>
              )}
              {openChapter === '02' && (
                <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button onClick={handleNCERTPDFClick02} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                    <button onClick={handleNCERTSolutionClick02} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                    <button onClick={handlePreviousYearQuestionsClick02} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                    <button onClick={handleChapterNotesClick02} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                    <button onClick={handleMindMapClick02} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                  </div>
                </div>
              )}
              {openChapter === '03' && (
                <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button onClick={handleNCERTPDFClick03} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                    <button onClick={handleNCERTSolutionClick03} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                    <button onClick={handlePreviousYearQuestionsClick03} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                    <button onClick={handleChapterNotesClick03} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                    <button onClick={handleMindMapClick03} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                  </div>
                </div>
              )}
              {openChapter === '04' && (
                <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button onClick={handleNCERTPDFClick04} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                    <button onClick={handleNCERTSolutionClick04} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                    <button onClick={handlePreviousYearQuestionsClick04} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                    <button onClick={handleChapterNotesClick04} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                    <button onClick={handleMindMapClick04} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                  </div>
                </div>
              )}
              {openChapter === '05' && (
                <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button onClick={handleNCERTPDFClick05} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                    <button onClick={handleNCERTSolutionClick05} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                    <button onClick={handlePreviousYearQuestionsClick05} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                    <button onClick={handleMindMapClick05} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                    <button onClick={handleChapterNotesClick05} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                </div>
              </div>
            )}
            {openChapter === '06' && (
              <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button onClick={handleNCERTPDFClick06} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                  <button onClick={handleNCERTSolutionClick06} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                  <button onClick={handlePreviousYearQuestionsClick06} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                  <button onClick={handleChapterNotesClick06} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                  <button onClick={handleMindMapClick06} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                </div>
              </div>
            )}
            {openChapter === '07' && (
              <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button onClick={handleNCERTPDFClick07} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                  <button onClick={handleNCERTSolutionClick07} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                  <button onClick={handlePreviousYearQuestionsClick07} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                  <button onClick={handleChapterNotesClick07} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                  <button onClick={handleMindMapClick07} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                </div>
              </div>
            )}
            {openChapter === '08' && (
              <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button onClick={handleNCERTPDFClick08} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                  <button onClick={handleNCERTSolutionClick08} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                  <button onClick={handlePreviousYearQuestionsClick08} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                  <button onClick={handleChapterNotesClick08} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                  <button onClick={handleMindMapClick08} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                </div>
              </div>
            )}
            {openChapter === '09' && (
              <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button onClick={handleNCERTPDFClick09} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                  <button onClick={handleNCERTSolutionClick09} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                  <button onClick={handlePreviousYearQuestionsClick09} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                  <button onClick={handleChapterNotesClick09} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                  <button onClick={handleMindMapClick09} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                </div>
              </div>
            )}
            {openChapter === '10' && (
              <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button onClick={handleNCERTPDFClick10} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                  <button onClick={handleNCERTSolutionClick10} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                  <button onClick={handlePreviousYearQuestionsClick10} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                  <button onClick={handleChapterNotesClick10} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                  <button onClick={handleMindMapClick10} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                </div>
              </div>
            )}
            {openChapter === '11' && (
  <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <button onClick={handleNCERTPDFClick11} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
      <button onClick={handleNCERTSolutionClick11} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
      <button onClick={handlePreviousYearQuestionsClick11} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
      <button onClick={handleChapterNotesClick11} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
      <button onClick={handleMindMapClick11} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
    </div>
  </div>
)}
              {openChapter === '12' && (
  <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <button onClick={handleNCERTPDFClick12} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
      <button onClick={handleNCERTSolutionClick12} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
      <button onClick={handlePreviousYearQuestionsClick12} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
      <button onClick={handleChapterNotesClick12} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                </div>
              </div>
            )}
            {openChapter === '12' && (
              <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button onClick={handleNCERTPDFClick12} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                  <button onClick={handleNCERTSolutionClick12} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                  <button onClick={handlePreviousYearQuestionsClick12} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                  <button onClick={handleChapterNotesClick12} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                  <button onClick={handleMindMapClick12} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                </div>
              </div>
            )}
            {openChapter === '13' && (
              <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50 animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button onClick={handleNCERTPDFClick13} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT PDF</button>
                  <button onClick={handleNCERTSolutionClick13} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">NCERT Solution</button>
                  <button onClick={handlePreviousYearQuestionsClick13} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Previous Year Questions</button>
                  <button onClick={handleChapterNotesClick13} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Chapter Notes</button>
                  <button onClick={handleMindMapClick13} className="flex flex-col items-center justify-center p-6 bg-orange-500 text-orange-600 rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75">Mind Map</button>
                </div>
              </div>
            )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg border border-orange-200 text-gray-600">
        <p>&copy; 2024 Vardaan Learning Institute. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Class10Science;
