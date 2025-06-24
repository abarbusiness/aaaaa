import { Link } from 'react-router-dom';

import { fadeIn } from '../utils/motionPresets';
import { AcademicCapIcon, UserGroupIcon, ChartBarIcon, NewspaperIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <motion.div
      className="w-screen flex flex-col justify-center items-center bg-orange-50"
      style={{minHeight: 'calc(100vh - 4rem)', height: 'calc(100vh - 4rem)', overflow: 'hidden'}}
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <section className="w-full my-6 bg-white rounded-2xl shadow-lg p-4 sm:p-8 flex flex-col items-center md:flex-row md:justify-center lg:justify-start">
        <img
          src="/logo.png"
          alt="vardaan learning institute logo"
          loading="eager"
          width="176"
          height="176"
          className="w-32 sm:w-44 mb-6 md:mb-0 md:mr-6 lg:mr-12"
          style={{maxWidth: '100%'}}
        />
        <div className="flex flex-col items-center md:items-start lg:items-start">
          <h1 className="font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-orange-700 mb-3 text-center md:text-left lg:text-left">
            Welcome to vardaan learning institute
          </h1>
          <div className="flex flex-wrap gap-6 justify-center mb-7 md:justify-start lg:justify-start">
            <div className="flex flex-col items-center min-w-[100px] flex-1 md:w-1/2 lg:w-1/3">
              <AcademicCapIcon className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400 mb-2" />
              <span className="font-bold text-orange-500 text-base sm:text-lg md:text-xl lg:text-2xl text-center md:text-left lg:text-left">Expert Faculty</span>
            </div>
            <div className="flex flex-col items-center min-w-[100px] flex-1 md:w-1/2 lg:w-1/3">
              <UserGroupIcon className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400 mb-2" />
              <span className="font-bold text-orange-500 text-base sm:text-lg md:text-xl lg:text-2xl text-center md:text-left lg:text-left">Personalized Attention</span>
            </div>
            <div className="flex flex-col items-center min-w-[100px] flex-1 md:w-1/2 lg:w-1/3">
              <ChartBarIcon className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400 mb-2" />
              <span className="font-bold text-orange-500 text-base sm:text-lg md:text-xl lg:text-2xl text-center md:text-left lg:text-left">Proven Results</span>
            </div>
            <div className="flex flex-col items-center min-w-[100px] flex-1 md:w-1/2 lg:w-1/3">
              <NewspaperIcon className="h-8 w-8 sm:h-10 sm:w-10 text-orange-400 mb-2" />
              <span className="font-bold text-orange-500 text-base sm:text-lg md:text-xl lg:text-2xl text-center md:text-left lg:text-left">Latest Study Material</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mb-7 md:justify-start lg:justify-start">
            <Link
              to="/login"
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 md:text-lg lg:text-xl"
            >
              Student Login
            </Link>
            <Link
              to="/results"
              className="px-6 py-3 rounded-full border-2 border-orange-500 text-orange-500 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center hover:bg-orange-700 hover:text-white transition duration-300"
            >
              Check Result
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}