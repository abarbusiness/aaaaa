import React, { useState } from 'react';
import './SubcategoryDropdownMenuStyled.css';

const DefaultSubcatIcon = () => (
  <span className="subcat-img" style={{display:'inline-block',textAlign:'center',lineHeight:'44px',fontSize:22,color:'#fb923c',fontWeight:700,border:'2px solid #fbbf24',background:'#fff7ed'}}>📂</span>
);

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

export default function SubcategoryDropdownMenuStyled({ subcategories = [], articles = [] }) {
  const [openIdx, setOpenIdx] = useState(null);
  if (!subcategories.length) return null;
  return (
    <div className="subcat-dropdown-root">
      {subcategories.map((subcat, idx) => {
        const subcatArticles = articles.filter(
          a => a.subcategory === subcat.slug || a.subcategory === subcat.name
        );
        const { videos, docs, tests } = getSummary(subcatArticles);
        const isOpen = openIdx === idx;
        return (
          <div key={subcat.id} className={`subcat-dropdown-item${isOpen ? ' open' : ''}`}>
            <div
              className="subcat-dropdown-header"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span className="subcat-number">{(idx+1).toString().padStart(2, '0')}</span>
                <span className="subcat-title">{subcat.name}</span>
                <span className="subcat-summary">
                  {subcatArticles.length > 0 ? (
                    <span>{subcatArticles.length} resource{subcatArticles.length > 1 ? 's' : ''}</span>
                  ) : (
                    <span style={{color:'#f87171'}}>No study material</span>
                  )}
                </span>
              </span>
              <span className={`subcat-arrow${isOpen ? ' open' : ''}`}>{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
              <div className="subcat-dropdown-articles">
                {subcatArticles.length === 0 ? (
                  <div style={{ color: '#b45309', fontWeight: 600, marginTop: 6 }}>No articles yet.</div>
                ) : (
                  <ul className="subcat-dropdown-article-list">
                    {subcatArticles.map((item, i) => (
                      item.link ? (
                        <li key={item.id} style={{padding:0,margin:0,border:'none',background:'none'}}>
                          <a
                            className="subcat-dropdown-article article-link-row"
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', width: '100%' }}
                          >
                            <div style={{ flex: 1 }}>
                              <div className="article-title">{item.title || item.name}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                                {(getArticleType(item) === 'video' || getArticleType(item) === 'test') && (
                                  <span className={`article-type ${getArticleType(item)}`}>{getArticleType(item).toUpperCase()}</span>
                                )}
                                {item.pages && (
                                  <span className="article-pages"> | {item.pages} pages</span>
                                )}
                              </div>
                            </div>
                          </a>
                        </li>
                      ) : (
                        <li key={item.id} className="subcat-dropdown-article">
                          <div style={{ flex: 1 }}>
                            <div className="article-title">{item.title || item.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                              {(getArticleType(item) === 'video' || getArticleType(item) === 'test') && (
                                <span className={`article-type ${getArticleType(item)}`}>{getArticleType(item).toUpperCase()}</span>
                              )}
                              {item.pages && (
                                <span className="article-pages"> | {item.pages} pages</span>
                              )}
                            </div>
                          </div>
                        </li>
                      )
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
