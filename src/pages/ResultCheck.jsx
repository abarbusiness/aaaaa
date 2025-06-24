import React, { useState, useRef } from 'react';

import { db } from '../firebase-config';
import LottieAnimation from '../components/LottieAnimation';
import { doc, getDoc } from 'firebase/firestore';

const ResultCheck = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  const fetchStudentData = async (phoneNumber) => {
    setLoading(true);
    setError(null);
    try {
      const studentDocRef = doc(db, 'students', phoneNumber);
      const docSnapshot = await getDoc(studentDocRef);
      if (docSnapshot.exists()) {
        setStudentData(docSnapshot.data());
      } else {
        setError('No data found for this phone number');
      }
    } catch {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStudentData(phoneNumber);
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  return (
    <div>
      <div className="w-screen flex flex-col items-center justify-center bg-orange-50 py-0" style={{ minHeight: 'calc(100vh - 4rem)', height: 'calc(100vh - 4rem)', overflow: 'hidden' }}>
        <div className="w-full px-2 sm:px-0">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="mx-auto w-full max-w-xl">
              <div ref={resultRef} id="result-card" className="relative rounded-lg mx-auto w-full">
                {/* Compact, minimal result card for fitting all content */}
                {/* Watermark Logo */}

                {studentData === null && (
                  <>
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full animate-slide-up gap-4 md:gap-8">
                      <div className="relative rounded-3xl shadow-xl overflow-hidden border border-orange-100 w-full max-w-2xl mx-auto px-2 xs:px-0">

                        <h2 className="p-4 xs:p-5 text-center text-2xl xs:text-3xl sm:text-4xl font-bold tracking-wide animate-fade-in border-orange-100 rounded-xl shadow-sm" style={{ color: '#ca3500', background: '#fff8ec' }}>Check Your Result</h2>

                        {/* Accent Bar */}
                        <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-orange-400 to-yellow-400 rounded-tr-3xl rounded-br-3xl" />
                        <div className="flex flex-col sm:flex-row items-center p-7 pl-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-100 w-full">
                          {/* Lottie Animation on left */}
                          <div className="hidden sm:flex flex-1 items-center justify-center">
                            <LottieAnimation style={{ width: 220, height: 220 }} />
                          </div>
                          {/* Form on right */}
                          <form className="space-y-6 sm:space-y-8 flex-1 w-full bg-white rounded-2xl px-6 py-8" onSubmit={handleSubmit}>

                            <div>
                              <label htmlFor="phoneNumber" className="block text-xs sm:text-sm font-medium text-orange-700">
                                Registered Phone Number
                              </label>
                              <div className="mt-3">
                                <input
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  type="tel"
                                  autoComplete="off"
                                  required
                                  value={phoneNumber}
                                  onChange={(e) => setPhoneNumber(e.target.value)}
                                  className="appearance-none block w-full px-5 py-3 border border-orange-300 rounded-xl placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-orange-700 bg-white text-base sm:text-lg transition-all duration-200"
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="w-full flex items-center justify-center text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-none outline-none transition-all duration-200"
                              disabled={loading}
                            >
                              {loading ? (
                                <span className="flex items-center">
                                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                  </svg>
                                  Checking...
                                </span>
                              ) : (
                                'Check Result'
                              )}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {error && (
                  <p className="text-red-600 mt-4 text-center font-semibold bg-red-50 rounded-2xl py-3 px-4">{error}</p>
                )}
                {studentData && (
                  <div ref={resultRef} id="result-section" className="mx-auto mt-8 w-full max-w-2xl">
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">
                      {/* Accent Bar */}
                      <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-orange-400 to-yellow-400 rounded-tr-3xl rounded-br-3xl" />
                      {/* Student Info */}
                      <div className="flex flex-col sm:flex-row items-center gap-6 p-7 pl-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-100">
                        <img
                          src={studentData.image}
                          alt="Student"
                          className="w-20 h-20 object-cover rounded-full border-4 border-orange-300 shadow-md bg-white"
                        />
                        <div className="flex-1 min-w-0 flex flex-col gap-2 items-center sm:items-start">
                          <span className="text-3xl font-extrabold text-orange-700 tracking-tight bg-orange-100 px-4 py-2 rounded-2xl shadow mb-1">
                            {studentData.name || 'N/A'}
                          </span>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                            <span className="bg-orange-50 rounded px-3 py-1 font-semibold border border-orange-200">Class: {studentData.class || 'N/A'}</span>
                            <span className="bg-orange-50 rounded px-3 py-1 font-semibold border border-orange-200">Phone: {studentData.mobile || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      {/* Test Results */}
                      <div className="flex flex-col gap-10 p-8 bg-white">
                        {Array.isArray(studentData.tests) && studentData.tests.length > 0 ? (
                          studentData.tests.map((test, idx) => {
                            const totalMax = test.subjects.reduce((sum, s) => sum + Number(s.maxMarks || 0), 0);
                            const totalObtained = test.subjects.reduce((sum, s) => sum + Number(s.obtainedMarks || 0), 0);
                            const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : '0.00';
                            const grade = calculateGrade(Number(percentage));
                            return (
                              <section key={idx} className="w-full bg-white border border-orange-100 rounded-2xl shadow p-6 transition-all">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                                  <span className="font-bold text-xl text-gray-900 truncate">{test.testName}</span>
                                  <span className="text-xs text-gray-400 font-normal">{test.date || 'N/A'}</span>
                                </div>
                                <div className="overflow-x-auto rounded-xl">
                                  <table className="w-full text-sm bg-white text-gray-800 rounded-xl">
                                    <thead>
                                      <tr className="bg-gradient-to-r from-orange-100 to-yellow-50">
                                        <th className="px-4 py-3 font-bold text-left rounded-tl-xl">Subject</th>
                                        <th className="px-4 py-3 font-bold text-center">Max</th>
                                        <th className="px-4 py-3 font-bold text-center">Obtained</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {test.subjects.map((subject, subIdx) => (
                                        <tr key={subIdx} className={subIdx % 2 === 0 ? 'bg-orange-50' : 'bg-white'}>
                                          <td className="px-4 py-3 text-left whitespace-nowrap rounded-l-xl">{subject.subject || 'N/A'}</td>
                                          <td className="px-4 py-3 text-center">{subject.maxMarks || 'N/A'}</td>
                                          <td className="px-4 py-3 text-center font-bold text-orange-700 rounded-r-xl">{subject.obtainedMarks || 'N/A'}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                {/* Summary Bar */}
                                <div className="flex flex-wrap gap-4 items-center justify-end mt-5">
                                  <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm shadow">Total: {totalObtained} / {totalMax}</span>
                                  <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm shadow">{percentage}%</span>
                                  <span className={`px-4 py-2 rounded-full font-bold text-sm shadow ${grade === 'A+' ? 'bg-green-100 text-green-700' : grade === 'A' ? 'bg-green-50 text-green-600' : grade === 'B' ? 'bg-blue-50 text-blue-600' : grade === 'C' ? 'bg-yellow-50 text-yellow-700' : grade === 'D' ? 'bg-orange-50 text-orange-700' : 'bg-red-100 text-red-700'}`}>{grade}</span>
                                </div>
                              </section>
                            );
                          })
                        ) : (
                          <p className="text-center text-orange-400 font-normal mt-2 text-sm">No test records found.</p>
                        )}
                      </div>
                      {/* Action Buttons */}
                      <div className="flex justify-center gap-6 p-8 pt-0 border-t border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50 print:hidden">
                        <button
                          type="button"
                          onClick={() => { setStudentData(null); setPhoneNumber(''); setError(null); }}
                          className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Check Other Result
                        </button>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 print:hidden"
                        >
                          Print
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCheck;
