import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import NotFound from './NotFound';
import './ArticlePage.css';

function extractHeadings(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const headings = [];
  div.querySelectorAll('h1, h2, h3').forEach(h => {
    headings.push({
      text: h.textContent,
      id: h.id || h.textContent.toLowerCase().replace(/\s+/g, '-'),
      level: parseInt(h.tagName[1])
    });
    h.id = h.id || h.textContent.toLowerCase().replace(/\s+/g, '-');
  });
  return headings;
}

// Smooth scroll for TOC links
function scrollToHeading(id) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 40, // offset for sticky navs
      behavior: 'smooth'
    });
  }
}

export default function ArticlePage() {
  const { category, subcategory, slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState([]);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .eq('subcategory', subcategory)
        .eq('link', `/studymaterial/${category}/${subcategory}/${slug}`);
      if (data && data.length > 0) {
        setArticle(data[0]);
        setHeadings(extractHeadings(data[0].content));
      } else {
        setArticle(null);
        setHeadings([]);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [category, subcategory, slug]);

  // Scroll to top functionality
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Responsive check
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 800;

  // Highlight active heading in TOC
  useEffect(() => {
    if (!article || !headings.length) return;
    const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current = new window.IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the heading closest to the top
          const topmost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] }
    );
    headingElements.forEach(el => observerRef.current.observe(el));
    return () => observerRef.current && observerRef.current.disconnect();
  }, [article, headings]);

  if (loading) return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f4f4f5'}}><span>Loading...</span></div>;
  if (!article) return <NotFound />;

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #fff7ed 0%, #fff 60%, #fef3c7 100%)', padding: 0, margin: 0, display:'flex',alignItems:'flex-start',justifyContent:'center', position:'relative'}}>
      {/* Table of Contents - collapsible on mobile, highlights active section, smooth scroll */}
      {headings.length > 1 && (
        isMobile ? (
          <div style={{position:'fixed', top:10, left:0, width:'100vw', zIndex:1000, display:'flex', justifyContent:'center'}}>
            <button onClick={()=>setTocOpen(o=>!o)} style={{background:'#ea580c', color:'#fff', border:'none', borderRadius:8, padding:'10px 22px', fontWeight:700, fontSize:16, boxShadow:'0 2px 8px #ea580c33', marginBottom:10, cursor:'pointer'}}>
              {tocOpen ? 'Hide Contents' : 'Show Contents'}
            </button>
            {tocOpen && (
              <nav style={{background:'#fff7ed', padding:'18px 16px', borderRadius:10, boxShadow:'0 2px 8px #ea580c11', maxHeight:'60vh', overflowY:'auto', fontSize:15, color:'#ea580c', fontWeight:600, marginLeft:10}}>
                <div style={{marginBottom:10, fontWeight:900, fontSize:18, color:'#ea580c'}}>Contents</div>
                <ul style={{listStyle:'none', padding:0, margin:0}}>
                  {headings.map(h => (
                    <li key={h.id} style={{marginLeft: (h.level-1)*14, marginBottom:7}}>
                      <a href={`#${h.id}`} onClick={e => {e.preventDefault(); scrollToHeading(h.id);}} style={{
                        color: activeId === h.id ? '#fff' : '#ea580c',
                        background: activeId === h.id ? '#ea580c' : 'transparent',
                        borderRadius: 6,
                        padding: activeId === h.id ? '4px 10px' : '0',
                        textDecoration:'none',
                        fontWeight:h.level===1?900:600, fontSize:h.level===1?17:15
                      }}>{h.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        ) : (
          <nav style={{position:'sticky', top:40, alignSelf:'flex-start', marginRight:40, background:'#fff7ed', padding:'16px 20px', borderRadius:10, boxShadow:'0 2px 8px #ea580c11', minWidth:220, maxHeight:'80vh', overflowY:'auto', fontSize:15, color:'#ea580c', fontWeight:600}}>
            <div style={{marginBottom:10, fontWeight:900, fontSize:18, color:'#ea580c'}}>Contents</div>
            <ul style={{listStyle:'none', padding:0, margin:0}}>
              {headings.map(h => (
                <li key={h.id} style={{marginLeft: (h.level-1)*14, marginBottom:7}}>
                  <a href={`#${h.id}`} onClick={e => {e.preventDefault(); scrollToHeading(h.id);}} style={{
                    color: activeId === h.id ? '#fff' : '#ea580c',
                    background: activeId === h.id ? '#ea580c' : 'transparent',
                    borderRadius: 6,
                    padding: activeId === h.id ? '4px 10px' : '0',
                    textDecoration:'none',
                    fontWeight:h.level===1?900:600, fontSize:h.level===1?17:15
                  }}>{h.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )
      )}
      <div style={{ width: '100%', maxWidth: 900, background: '#fff', borderRadius: 10, padding: '32px 5vw', boxShadow: '0 2px 16px rgba(0,0,0,0.10)', marginTop: isMobile && headings.length > 1 ? 70 : 0 }}>
        <h1 style={{ color: '#ea580c', marginBottom: 12 }}>{article.title}</h1>
        <div style={{ color: '#888', marginBottom: 20 }}>
          <a href={`/studymaterial/${article.category}`} style={{ color: '#ea580c', textDecoration: 'underline', marginRight: 6 }}>
            {article.category}
          </a>
          /
          <a href={`/studymaterial/${article.category}/${article.subcategory}`} style={{ color: '#ea580c', textDecoration: 'underline', marginLeft: 6 }}>
            {article.subcategory}
          </a>
        </div>
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        <button onClick={handleBackToTop} style={{margin:'40px auto 0 auto',display:'block',background:'#ea580c',color:'#fff',border:'none',borderRadius:8,padding:'12px 28px',fontWeight:700,fontSize:17,boxShadow:'0 2px 8px #ea580c33',cursor:'pointer'}}>Back to Top</button>
      </div>
    </div>
  );
}
