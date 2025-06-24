import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import NotFound from './NotFound';

// Helper: fallback icon for article
const DefaultArticleIcon = () => (
  <span style={{
    display: 'inline-block',
    width: 38, height: 38,
    borderRadius: 7, background: '#fff7ed',
    border: '1.5px solid #fbbf24',
    textAlign: 'center', lineHeight: '38px', fontSize: 22, color: '#fb923c', fontWeight: 700
  }}>📄</span>
);

const typeTagStyle = type => {
  switch (type) {
    case 'video': return { background: '#fbbf24', color: '#fff', borderRadius: 8, padding: '2px 10px', fontWeight: 700, fontSize: 13, marginLeft: 6 };
    case 'doc': return { background: '#ea580c', color: '#fff', borderRadius: 8, padding: '2px 10px', fontWeight: 700, fontSize: 13, marginLeft: 6 };
    case 'test': return { background: '#22c55e', color: '#fff', borderRadius: 8, padding: '2px 10px', fontWeight: 700, fontSize: 13, marginLeft: 6 };
    default: return { background: '#e5e7eb', color: '#18181b', borderRadius: 8, padding: '2px 10px', fontWeight: 700, fontSize: 13, marginLeft: 6 };
  }
};

const getArticleType = item => {
  if (item.type) return item.type;
  if (item.pages) return 'doc';
  if (item.videoUrl || item.video) return 'video';
  if (item.test || item.questions) return 'test';
  return 'doc';
};

const getSummary = (articles = []) => {
  let videos = 0, docs = 0, tests = 0;
  articles.forEach(a => {
    const type = getArticleType(a);
    if (type === 'video') videos++;
    else if (type === 'test') tests++;
    else docs++;
  });
  return { videos, docs, tests };
};

export default function SubcategoryPage() {
  const { category, subcategory } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [subcatInfo, setSubcatInfo] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .eq('subcategory', subcategory);
      setArticles(data || []);
      // Try to fetch subcategory info (with image if available)
      let subcatRes = await supabase
        .from('subcategory')
        .select('id, name, slug, image')
        .eq('slug', subcategory)
        .single();
      if (!subcatRes.data) {
        subcatRes = await supabase
          .from('subcategories')
          .select('id, name, slug, image')
          .eq('slug', subcategory)
          .single();
      }
      setSubcatInfo(subcatRes.data || { name: subcategory });
      setLoading(false);
    };
    fetchArticles();
  }, [category, subcategory]);

  if (loading) return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f4f4f5'}}><span>Loading...</span></div>;
  if (articles.length === 0) return <NotFound />;

  // Summary counts
  const { videos, docs, tests } = getSummary(articles);

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #fff7ed 0%, #fff 60%, #fef3c7 100%)', padding: 0, margin: 0, display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{ width: '100%', maxWidth: 900, background: '#fff', borderRadius: 18, padding: '40px 5vw', boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14 }}>
          {subcatInfo?.image ? (
            <img src={subcatInfo.image} alt={subcatInfo.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', background: '#fff7ed', border: '1.5px solid #fbbf24' }} />
          ) : <DefaultArticleIcon />}
          <div>
            <h1 style={{ color: '#ea580c', marginBottom: 3, fontSize: 28 }}>{subcatInfo?.name || subcategory}</h1>
            <div style={{ color: '#b45309', fontWeight: 600, fontSize: 16 }}>
              {videos > 0 && <span>{videos} videos</span>}
              {docs > 0 && <span style={{ marginLeft: videos > 0 ? 8 : 0 }}>{docs} docs</span>}
              {tests > 0 && <span style={{ marginLeft: docs > 0 || videos > 0 ? 8 : 0 }}>{tests} tests</span>}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <button
            onClick={() => setDropdownOpen(open => !open)}
            style={{
              background: '#fb923c', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, padding: '10px 18px', fontSize: 18, cursor: 'pointer', marginBottom: 6, width: '100%', textAlign: 'left', boxShadow: '0 2px 8px #fb923c33', transition: 'box-shadow 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}
          >
            <span>Articles</span>
            <span style={{ fontSize: 22, color: '#fff', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.18s' }}>{dropdownOpen ? '▲' : '▼'}</span>
          </button>
          {dropdownOpen && (
            <ul style={{ marginTop: 10, marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
              {articles.map((item, i) => (
                <li key={item.id} style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid #f3f3f3', paddingBottom: 10 }}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} style={{ width: 38, height: 38, borderRadius: 7, objectFit: 'cover', background: '#fff7ed', border: '1.5px solid #fbbf24' }} />
                  ) : <DefaultArticleIcon />}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#ea580c', fontSize: '1.08rem' }}>{item.title || item.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                      <span style={typeTagStyle(getArticleType(item))}>{getArticleType(item).toUpperCase()}</span>
                      {item.pages && (
                        <span style={{ color: '#f59e42', fontSize: '0.98rem', marginLeft: 6 }}> | {item.pages} pages</span>
                      )}
                    </div>
                  </div>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', fontWeight: 700, fontSize: 18, textDecoration: 'underline' }}>Open</a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
