// --- EduRev-Inspired Modern Category Page ---
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SubcategoryDropdownMenuStyled from '../components/SubcategoryDropdownMenuStyled';
import supabase from '../supabaseClient';
import NotFound from './NotFound';
import './CategoryPage.css';

// Utility: Cache with expiry
function getCache(key) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { value, expiry } = JSON.parse(cached);
    if (expiry && Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}
function setCache(key, value, ttlMs = 3600000) { // default 1 hour
  const expiry = Date.now() + ttlMs;
  localStorage.setItem(key, JSON.stringify({ value, expiry }));
}

export default function CategoryPage() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const cacheKey = `articles_${category}`;
      const cached = getCache(cacheKey);
      if (cached) {
        setArticles(cached);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('articles')
        .select('*')
        .ilike('category', category);
      setArticles(data || []);
      setCache(cacheKey, data || []);
      setLoading(false);
    };
    const fetchCategoryInfo = async () => {
      const cacheKey = `categoryinfo_${category}`;
      const cached = getCache(cacheKey);
      if (cached) {
        setCategoryImage(cached.image || null);
        setCategoryName(cached.name || category.replace(/-/g, ' '));
        setSubcategories(cached.subcategories || []);
        return;
      }
      const { data } = await supabase
        .from('category')
        .select('name, image, id')
        .eq('slug', category)
        .single();
      setCategoryImage(data?.image || null);
      setCategoryName(data?.name || category.replace(/-/g, ' '));
      let subcategoriesArr = [];
      if (data?.id) {
        let subcatData = null;
        let subcatRes = await supabase
          .from('subcategory')
          .select('id, name, slug, image')
          .eq('category_id', data.id);
        if (subcatRes.data && subcatRes.data.length > 0) {
          subcatData = subcatRes.data;
        } else {
          subcatRes = await supabase
            .from('subcategories')
            .select('id, name, slug, image')
            .eq('category_id', data.id);
          if (subcatRes.data && subcatRes.data.length > 0) {
            subcatData = subcatRes.data;
          }
        }
        subcategoriesArr = subcatData || [];
        setSubcategories(subcategoriesArr);
      } else {
        setSubcategories([]);
      }
      setCache(cacheKey, {
        image: data?.image || null,
        name: data?.name || category.replace(/-/g, ' '),
        subcategories: subcategoriesArr
      });
    };

    fetchArticles();
    fetchCategoryInfo();
  }, [category]);

  if (loading) return (
    <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(120deg, #fff7ed 0%, #fff 60%, #fef3c7 100%)'}}>
      <div className="loader-modern" style={{border:'6px solid #fff7ed',borderTop:'6px solid #ea580c',borderRadius:'50%',width:60,height:60,animation:'spin 1s linear infinite'}}></div>
    </div>
  );
  if (articles.length === 0) return <NotFound />;

  // --- Stats Bar Data (customize as needed) ---
  const stats = [
    { icon: '📚', label: '30+ Courses' },
    { icon: '📝', label: '1000+ Notes & Videos' },
    { icon: '⬇️', label: 'Download Notes as PDF' },
    { icon: '🧑‍💻', label: 'Unlimited Practice Tests' }
  ];

  return (
    <div className="edurev-category-root">
      {/* Header Section */}
      <section className="edurev-category-header">
        <div className="edurev-category-header-content">
          <img src={categoryImage || '/icons/science.png'} alt={category + ' image'} className="edurev-category-img" />
          <div>
            <h1 className="edurev-category-title">{categoryName}</h1>
            <div className="edurev-category-subtitle">Practice Questions, Notes, Videos & More</div>
          </div>
        </div>
        {/* Removed CTA button as requested */}
      </section>
      {/* Stats Bar */}
      <section className="edurev-category-stats-bar">
        {stats.map((stat, i) => (
          <div key={i} className="edurev-category-stat">
            <span className="edurev-category-stat-icon">{stat.icon}</span>
            <span className="edurev-category-stat-label">{stat.label}</span>
          </div>
        ))}
      </section>
      {/* Subcategory Dropdown/Accordion Menu */}
      <section style={{ marginTop: 32 }}>
        <SubcategoryDropdownMenuStyled
          subcategories={subcategories}
          articles={articles}
        />
      </section>
    </div>
  );
}
