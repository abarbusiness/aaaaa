import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import './CategoryPage.css';

const DefaultSubcatIcon = () => (
  <span style={{
    display: 'inline-block',
    width: 38, height: 38,
    borderRadius: 7, background: '#fff7ed',
    border: '1.5px solid #fbbf24',
    textAlign: 'center', lineHeight: '38px', fontSize: 22, color: '#fb923c', fontWeight: 700
  }}>📂</span>
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

export default function SubcategoryListPage() {
  const [subcategories, setSubcategories] = useState([]);
  const [articlesBySubcat, setArticlesBySubcat] = useState({});
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let { data: subcats1 } = await supabase.from('subcategory').select('id, name, slug, image');
      let { data: subcats2 } = await supabase.from('subcategories').select('id, name, slug, image');
      const allSubcats = [...(subcats1 || []), ...(subcats2 || [])];
      setSubcategories(allSubcats);
      const { data: allArticles } = await supabase.from('articles').select('*');
      const grouped = {};
      allSubcats.forEach(subcat => {
        grouped[subcat.slug] = allArticles.filter(a => a.subcategory === subcat.slug || a.subcategory === subcat.name);
      });
      setArticlesBySubcat(grouped);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f4f4f5'}}><span>Loading...</span></div>;

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #fff7ed 0%, #fff 60%, #fef3c7 100%)', padding: 0, margin: 0, display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{ width: '100%', maxWidth: 900, background: '#fff', borderRadius: 18, padding: '40px 5vw', boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>
        <h1 style={{ color: '#ea580c', marginBottom: 20 }}>All Subcategories</h1>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {subcategories.map((subcat, idx) => {
            const articles = articlesBySubcat[subcat.slug] || [];
            const { videos, docs, tests } = getSummary(articles);
            const isOpen = openIdx === idx;
            return (
              <li key={subcat.id} style={{ marginBottom: 18, borderRadius: 12, boxShadow: '0 2px 10px #ea580c18', background: isOpen ? '#fff7ed' : '#fff', border: '1.5px solid #fbbf24', transition: 'background 0.18s' }}>
                <div
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 24px', cursor: 'pointer', fontWeight: 800, fontSize: '1.18rem', color: '#ea580c', borderRadius: 12,
                    background: isOpen ? '#fff7ed' : '#fff', boxShadow: isOpen ? '0 2px 10px #fbbf2433' : 'none', transition: 'background 0.18s, box-shadow 0.18s'
                  }}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {subcat.image ? (
                      <img src={subcat.image} alt={subcat.name} style={{ width: 38, height: 38, borderRadius: 7, objectFit: 'cover', background: '#fff7ed', border: '1.5px solid #fbbf24' }} />
                    ) : <DefaultSubcatIcon />}
                    <span>{subcat.name}</span>
                    <span style={{ fontWeight: 500, color: '#b45309', fontSize: 15, marginLeft: 8 }}>
                      {videos > 0 && <span>{videos} videos</span>}
                      {docs > 0 && <span style={{ marginLeft: videos > 0 ? 8 : 0 }}>{docs} docs</span>}
                      {tests > 0 && <span style={{ marginLeft: docs > 0 || videos > 0 ? 8 : 0 }}>{tests} tests</span>}
                    </span>
                  </span>
                  <span style={{ fontSize: 22, color: '#fb923c', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.18s' }}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                  <div style={{ padding: '0 24px 18px 24px' }}>
                    {articles.length === 0 ? (
                      <div style={{ color: '#b45309', fontWeight: 600, marginTop: 6 }}>No articles yet.</div>
                    ) : (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {articles.map((item, i) => (
                          <li key={item.id} style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid #f3f3f3', paddingBottom: 10 }}>
                            {item.image ? (
                              <img src={item.image} alt={item.title} loading="lazy" width="38" height="38" style={{ width: 38, height: 38, borderRadius: 7, objectFit: 'cover', background: '#fff7ed', border: '1.5px solid #fbbf24' }} />
                            ) : <DefaultSubcatIcon />}
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
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
