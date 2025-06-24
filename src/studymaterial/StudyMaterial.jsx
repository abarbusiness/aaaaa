import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudyMaterial = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Study Effectively",
      thumbnail: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      title: "Top 10 Science Tips",
      thumbnail: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      title: "Exam Stress? Try These Tricks!",
      thumbnail: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80"
    }
    // Add more blog posts as needed
  ];

  // Handler for blog post click
  const handleBlogClick = (id, title) => {
    // For now, just log. You can add navigation or modal logic here.
    console.log(`Blog clicked: ${title} (ID: ${id})`);
  };

 

  const navigate = useNavigate();
  

  // Dedicated navigation handlers for each class and board
  // Junior CBSE
  const handleClass1CBSE = () => navigate('/studymaterial/class1');
  const handleClass2CBSE = () => navigate('/studymaterial/class2');
  const handleClass3CBSE = () => navigate('/studymaterial/class3');
  const handleClass4CBSE = () => navigate('/studymaterial/class4');
  const handleClass5CBSE = () => navigate('/studymaterial/class5');
  // Junior ICSE
  const handleClass1ICSE = () => navigate('/studymaterial/class1icse');
  const handleClass2ICSE = () => navigate('/studymaterial/class2icse');
  const handleClass3ICSE = () => navigate('/studymaterial/class3icse');
  const handleClass4ICSE = () => navigate('/studymaterial/class4icse');
  const handleClass5ICSE = () => navigate('/studymaterial/class5icse');
  // Senior CBSE
  const handleClass6CBSE = () => navigate('/studymaterial/class6');
  const handleClass7CBSE = () => navigate('/studymaterial/class7');
  const handleClass8CBSE = () => navigate('/studymaterial/class8');
  const handleClass9CBSE = () => navigate('/studymaterial/class9');
  const handleClass10CBSE = () => navigate('/studymaterial/class10');
  const handleClass11CBSE = () => navigate('/studymaterial/class11');
  const handleClass12CBSE = () => navigate('/studymaterial/class12');
  // Senior ICSE
  const handleClass6ICSE = () => navigate('/studymaterial/class6icse');
  const handleClass7ICSE = () => navigate('/studymaterial/class7icse');
  const handleClass8ICSE = () => navigate('/studymaterial/class8icse');
  const handleClass9ICSE = () => navigate('/studymaterial/class9icse');
  const handleClass10ICSE = () => navigate('/studymaterial/class10icse');
  const handleClass11ICSE = () => navigate('/studymaterial/class11icse');
  const handleClass12ICSE = () => navigate('/studymaterial/class12icse');

  return (
    <div className="study-material-page">
      <style jsx>{`
        .study-material-page {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
          color: #1f2937;
          margin-top: 4rem;
          padding-left: 3rem;
          padding-right: 3rem;
        }
        @media (max-width: 640px) {
          .study-material-page {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            margin-top: 2rem;
          }
          .main-heading {
            font-size: 1.6rem;
            margin-bottom: 1.2rem;
          }
          .main-heading {
            padding-top: 0;
          }
          @media (max-width: 640px) {
            .main-heading {
              padding-top: 3.25rem;
            }
          }
          .section-container {
            padding: 0.5rem;
          }
          .max-w-6xl,
          .max-w-7xl,
          section,
          .section-container {
            padding-left: 0.25rem !important;
            padding-right: 0.25rem !important;
            margin-left: 0.25rem !important;
            margin-right: 0.25rem !important;
            padding: 0.5rem !important;
          }
          .marquee-container {
            height: 90px;
          }
          .marquee-item img {
            width: 90px !important;
            height: 54px !important;
          }
          .rounded-xl {
            border-radius: 0.75rem;
          }
        }

        /* Marquee Styles */
        .marquee-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 140px;
          background: #fff7ed;
        }
        .marquee-content {
          display: flex;
          width: max-content;
          animation: marquee-scroll 20s linear infinite;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-item {
          flex: 0 0 auto;
          margin-right: 2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        /* Main Heading Styles */
        .main-heading {
          font-size: 2.75rem;
          font-weight: 900;
          text-align: center;
          margin-bottom: 2.5rem;
          color: #ea580c;
          letter-spacing: -1px;
        }

        /* Header Styles */
        .page-header {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          padding: 4rem 1rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .page-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        
        .page-header p {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 42rem;
          margin: 0 auto;
        }
        
        /* Section Styles */
        .section-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 1.5rem;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .section-header-bar {
          width: 0.5rem;
          height: 2.5rem;
          border-radius: 0.25rem;
          margin-right: 0.75rem;
        }
        
        .senior-section {
          border: 2.5px solid #f97316;
          border-radius: 0.75rem;
          padding: 1.5rem 1.5rem 2rem 1.5rem;
          margin-bottom: 2.5rem;
          background: #fff7ed;
          box-shadow: 0 2px 8px rgba(249, 115, 22, 0.05);
        }
        .section-header.senior .section-header-bar {
          background-color: #f97316;
        }
        
        .junior-section {
          border: 2.5px solid #10b981;
          border-radius: 0.75rem;
          padding: 1.5rem 1.5rem 2rem 1.5rem;
          margin-bottom: 2.5rem;
          background: #ecfdf5;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.05);
        }
        .section-header.junior .section-header-bar {
          background-color: #10b981;
        }
        
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
        }
        
        /* Button Group Styles */
        .button-group {
          margin-bottom: 2rem;
        }
        
        .button-group-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #374151;
        }
        
        .buttons-grid {
          display: grid;
          gap: 0.75rem;
        }
        
        .senior-buttons {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .junior-buttons {
          grid-template-columns: repeat(2, 1fr);
        }
        
        @media (min-width: 640px) {
          .senior-buttons {
            grid-template-columns: repeat(3, 1fr);
          }
          .junior-buttons {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 768px) {
          .senior-buttons {
            grid-template-columns: repeat(4, 1fr);
          }
          .junior-buttons {
            grid-template-columns: repeat(5, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .senior-buttons {
            grid-template-columns: repeat(7, 1fr);
          }
        }
        
        /* Custom Button Styles */
        .class-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .class-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .class-button:active {
          transform: translateY(0);
        }
        
        /* Senior Button Variants */
        .senior-cbse {
          background-color: #f97316;
          color: white;
        }
        
        .senior-cbse:hover {
          background-color: #ea580c;
        }
        
        .senior-icse {
          background-color: #fdba74;
          color: #9a3412;
        }
        
        .senior-icse:hover {
          background-color: #fb923c;
        }
        
        /* Junior Button Variants */
        .junior-cbse {
          background-color: #10b981;
          color: white;
        }
        
        .junior-cbse:hover {
          background-color: #059669;
        }
        
        .junior-icse {
          background-color: #86efac;
          color: #065f46;
        }
        
        .junior-icse:hover {
          background-color: #4ade80;
        }
        
        /* Features Section */
        .features-section {
          background-color: white;
          border-radius: 0.75rem;
          padding: 2rem;
          margin-bottom: 3rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }
        
        .features-title {
          font-size: 1.75rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .features-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(1, 1fr);
        }
        
        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .feature-card {
          text-align: center;
          padding: 1.5rem;
        }
        
        .feature-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        
        .feature-icon.senior {
          background-color: #ffedd5;
        }
        
        .feature-icon.junior {
          background-color: #dcfce7;
        }
        
        .feature-icon.general {
          background-color: #dbeafe;
        }
        
        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .feature-description {
          color: #6b7280;
        }
        
        /* Footer */
        .page-footer {
          text-align: center;
          padding: 2rem 0;
          color: #6b7280;
        }
      /* Insights Grid Styles */
      .insights-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 2rem;
        margin-top: 2rem;
      }
      @media (min-width: 640px) {
        .insights-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (min-width: 1024px) {
        .insights-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .insight-card {
        background: #fff7ed;
        border: 1.5px solid #fdba74;
        border-radius: 1rem;
        box-shadow: 0 2px 8px rgba(249, 115, 22, 0.08);
        overflow: hidden;
        transition: transform 0.18s, box-shadow 0.18s;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .insight-card:hover {
        transform: translateY(-4px) scale(1.03);
        box-shadow: 0 8px 24px rgba(249, 115, 22, 0.13);
      }
      .insight-img {
        width: 100%;
        height: 170px;
        object-fit: cover;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
      .insight-content {
        padding: 1.25rem 1rem 1.5rem 1rem;
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .insight-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: #ea580c;
        margin-bottom: 0.5rem;
        text-align: left;
      }
      .insight-desc {
        color: #374151;
        font-size: 0.98rem;
        margin-bottom: 1.2rem;
        flex: 1 1 auto;
      }
      .insight-btn {
        background: #ea580c;
        color: #fff;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem 1.25rem;
        font-weight: 600;
        font-size: 0.97rem;
        cursor: pointer;
        transition: background 0.18s;
        align-self: flex-start;
      }
      .insight-btn:hover {
        background: #f97316;
      }
      .vardaan-logo {
        display: block;
        max-width: 100%;
        max-height: 170px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 0;
        object-fit: contain;
      }
      .credit-mobile-text {
        font-size: 1.15rem;
        color: #374151;
        line-height: 1.7;
        margin: 0 auto;
        padding: 1.25rem 1rem;
        border-radius: 0.75rem;
        background: #fff7ed;
        border-left: 5px solid #ea580c;
        box-shadow: 0 2px 8px rgba(249, 115, 22, 0.06);
      }
      @media (max-width: 640px) {
        .credit-mobile-text {
          font-size: 1.22rem;
          background: #fef3c7;
          border-left: 7px solid #ea580c;
          box-shadow: 0 4px 16px rgba(249, 115, 22, 0.13);
          padding: 1.5rem 1.1rem;
        }
      }
      `}</style>

     

      {/* Main Content */}
      <main className="section-container">
        {/* Senior Classes Section */}
        <h1 className="main-heading text-orange-600">Study Material</h1>

        <div className="senior-section">

          <div className="section-header senior">
            <div className="section-header-bar"></div>
            <h2 className="section-title">Vardaan Senior (Classes 6-12)</h2>
          </div>
          
          {/* CBSE Buttons Group */}
          <div className="button-group">
            <h3 className="button-group-title">CBSE</h3>
            <div className="buttons-grid senior-buttons">
              <button onClick={handleClass6CBSE} className="class-button senior-cbse">Class 6</button>
<button onClick={handleClass7CBSE} className="class-button senior-cbse">Class 7</button>
<button onClick={handleClass8CBSE} className="class-button senior-cbse">Class 8</button>
<button onClick={handleClass9CBSE} className="class-button senior-cbse">Class 9</button>
<button onClick={handleClass10CBSE} className="class-button senior-cbse">Class 10</button>
<button onClick={handleClass11CBSE} className="class-button senior-cbse">Class 11</button>
<button onClick={handleClass12CBSE} className="class-button senior-cbse">Class 12</button>
            </div>
          </div>
          
          {/* ICSE Buttons Group */}
          <div className="button-group">
            <h3 className="button-group-title">ICSE</h3>
            <div className="buttons-grid senior-buttons">
              <button onClick={handleClass6ICSE} className="class-button senior-icse">Class 6</button>
<button onClick={handleClass7ICSE} className="class-button senior-icse">Class 7</button>
<button onClick={handleClass8ICSE} className="class-button senior-icse">Class 8</button>
<button onClick={handleClass9ICSE} className="class-button senior-icse">Class 9</button>
<button onClick={handleClass10ICSE} className="class-button senior-icse">Class 10</button>
<button onClick={handleClass11ICSE} className="class-button senior-icse">Class 11</button>
<button onClick={handleClass12ICSE} className="class-button senior-icse">Class 12</button>
            </div>
          </div>
        </div>

        {/* Junior Classes Section */}
        <div className="junior-section">
          <div className="section-header junior">
            <div className="section-header-bar"></div>
            <h2 className="section-title">Vardaan Junior (Classes 1-5)</h2>
          </div>
          
          {/* CBSE Buttons Group */}
          <div className="button-group">
            <h3 className="button-group-title">CBSE</h3>
            <div className="buttons-grid junior-buttons">
              <button onClick={handleClass1CBSE} className="class-button junior-cbse">Class 1</button>
<button onClick={handleClass2CBSE} className="class-button junior-cbse">Class 2</button>
<button onClick={handleClass3CBSE} className="class-button junior-cbse">Class 3</button>
<button onClick={handleClass4CBSE} className="class-button junior-cbse">Class 4</button>
<button onClick={handleClass5CBSE} className="class-button junior-cbse">Class 5</button>
            </div>
          </div>
          
          {/* ICSE Buttons Group */}
          <div className="button-group">
            <h3 className="button-group-title">ICSE</h3>
            <div className="buttons-grid junior-buttons">
              <button onClick={handleClass1ICSE} className="class-button junior-icse">Class 1</button>
<button onClick={handleClass2ICSE} className="class-button junior-icse">Class 2</button>
<button onClick={handleClass3ICSE} className="class-button junior-icse">Class 3</button>
<button onClick={handleClass4ICSE} className="class-button junior-icse">Class 4</button>
<button onClick={handleClass5ICSE} className="class-button junior-icse">Class 5</button>
            </div>
          </div>
        </div>

       {/* Why Our Study Materials? Section */}
       <section className="max-w-6xl mx-auto my-12 p-8 bg-white rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-3xl sm:text-4xl font-semibold text-orange-600 mb-6 pb-2 border-b-2 border-orange-300 text-center">
          Why Choose Our Study Materials?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-orange-100 p-4 rounded-full mb-4 shadow-md">
              <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.747 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Curated for Clarity</h3>
            <p className="text-gray-700">Our materials simplify complex topics, making them easy to understand and remember for your exams.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-orange-100 p-4 rounded-full mb-4 shadow-md">
              <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 20v-3m0 0l-1.5-1.5M12 17l1.5-1.5M12 17v-.01M10 12H9M14 12h1M7 16h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Exam-Focused Content</h3>
            <p className="text-gray-700">Get access to past year questions, solutions, and focused notes to target key exam concepts effectively.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-orange-100 p-4 rounded-full mb-4 shadow-md">
              <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible & Accessible</h3>
            <p className="text-gray-700">Study anytime, anywhere with our responsive design and easily downloadable PDFs and notes.</p>
          </div>
        </div>
      </section>


      {/* Blog Section Redesigned: Card Grid */}
      <section className="max-w-6xl mx-auto mb-12 p-8 bg-white rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-3xl sm:text-4xl font-semibold text-orange-600 mb-6 pb-2 border-b-2 border-orange-300 text-center">
          Latest Insights & Study Tips
        </h2>
        <div className="insights-grid">
          {blogPosts.map((blog) => (
            <div key={blog.id} className="insight-card" onClick={() => handleBlogClick(blog.id, blog.title)}>
              <img src={blog.thumbnail} alt={blog.title} className="insight-img" />
              <div className="insight-content">
                <h3 className="insight-title">{blog.title}</h3>
                <p className="insight-desc">A short description about "{blog.title}" goes here. You can update this with real summaries later.</p>
                <button className="insight-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

        {/* Other Important Buttons Section */}
        <section className="max-w-6xl mx-auto mb-12 p-8 bg-white rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-3xl sm:text-4xl font-semibold text-orange-600 mb-6 pb-2 border-b-2 border-orange-300 text-center">
          Explore More from Vardaan Learning Institute
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full items-center">
          <button style={{backgroundColor:"#FFF7ED"}}
             onClick={() => navigate('/vardaan-junior')}
             className="flex flex-col items-center justify-center p-2 sm:p-3 bg-orange-500 text-green-600 rounded-xl shadow-md
                       hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75 w-full max-w-xs"
           >
             <img src="juniorlogo.png" className="vardaan-logo" alt="Vardaan Junior Logo"/>
             <span className="text-base font-semibold">Vardaan Junior</span>
           </button>
          <button style={{backgroundColor:"#FFF7ED"}}
             onClick={() => navigate('/vardaan-senior')}
             className="flex flex-col items-center justify-center p-2 sm:p-3 bg-orange-500 text-orange-500 rounded-xl shadow-md
                       hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75 w-full max-w-xs"
           >
             <img src="seniorlogo.png" className="vardaan-logo" alt="Vardaan Senior Logo"/>
             <span className="text-base font-semibold">Vardaan Senior</span>
           </button>
                  </div>
      </section>

      {/* Credit Section for Ankit Bhaiya */}
      <section className="max-w-6xl mx-auto mb-12 p-8 bg-white rounded-xl shadow-lg border border-orange-200 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-orange-600 mb-4">
          A Special Thanks to Ankit Bhaiya!
        </h2>
        <p className="credit-mobile-text">
          This platform is proudly created and dedicated to the vision of
          <strong className="text-orange-700 font-bold ml-1">Ankit Bhaiya</strong>, whose unwavering commitment to education inspires us all. His dedication has been instrumental in bringing this learning experience to life.
        </p>
      </section>


      </main>
    </div>
  );
};

export default StudyMaterial;