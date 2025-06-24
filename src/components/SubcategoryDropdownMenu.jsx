import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoryPage.css'; // For consistent styling

// Helper: fallback icon for subcategory/article
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

// Guess article type from fields
const getArticleType = item => {
  if (item.type) return item.type;
  if (item.pages) return 'doc';
  if (item.videoUrl || item.video) return 'video';
  if (item.test || item.questions) return 'test';
  return 'doc';
};

// Count summary for subcategory
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

export default function SubcategoryDropdownMenu({ subcategories = [], articles = [] }) {
  const [openIdx, setOpenIdx] = useState(null);
  if (!subcategories.length) return null;
  return (
    <div style={{ width: '100%', maxWidth: 700, margin: '0 auto', marginTop: 24 }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {subcategories.map((subcat, idx) => {
          const subcatArticles = articles.filter(
            a => a.subcategory === subcat.slug || a.subcategory === subcat.name
          );
          const { videos, docs, tests } = getSummary(subcatArticles);
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
                  {/* Progress bar if available */}
                  {typeof subcat.progress === 'number' && (
                    <div style={{ margin: '7px 0 14px 0', height: 8, background: '#f3f3f3', borderRadius: 6, position: 'relative' }}>
                      <div style={{ width: `${subcat.progress}%`, height: '100%', background: '#fbbf24', borderRadius: 6, transition: 'width 0.2s' }} />
                      <span style={{ position: 'absolute', left: 8, top: -20, fontSize: 13, color: '#fb923c', fontWeight: 700 }}>{subcat.progress}% completed</span>
                    </div>
                  )}
                  {subcatArticles.length === 0 ? (
                    <div style={{ color: '#b45309', fontWeight: 600, marginTop: 6 }}>No articles yet.</div>
                  ) : (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {subcatArticles.map((item, i) => (
                        <li key={i} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                          {item.image ? (
                            <img src={item.image} alt={item.title} style={{ width: 38, height: 38, borderRadius: 7, objectFit: 'cover', background: '#fff7ed', border: '1.5px solid #fbbf24' }} />
                          ) : <DefaultSubcatIcon />}
                          {item.link ? (
                            <a
                              href={item.link}
                              className="facet-child facet-child-link"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontWeight: 700, color: '#ea580c', fontSize: '1.05rem', textDecoration: 'underline' }}
                            >
                              {item.title || item.name}
                            </a>
                          ) : (
                            <span style={{ fontWeight: 700, color: '#ea580c', fontSize: '1.05rem' }}>{item.title || item.name}</span>
                          )}
                          {/* Article type tag */}
                          <span style={typeTagStyle(getArticleType(item))}>{getArticleType(item).toUpperCase()}</span>
                          {item.pages && (
                            <span style={{ color: '#f59e42', fontSize: '0.98rem', marginLeft: 10 }}> | {item.pages} pages</span>
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
  );
}
