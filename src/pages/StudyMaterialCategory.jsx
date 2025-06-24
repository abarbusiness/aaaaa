import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import SubcategoryDropdownMenu from '../components/SubcategoryDropdownMenu';
import './StudyMaterialCategory.css';

export default function StudyMaterialCategory() {
  const { category } = useParams();
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: catData } = await supabase
        .from('category')
        .select('*')
        .eq('slug', category)
        .single();
      setCategoryInfo(catData);
      let subcatRes = await supabase
        .from('subcategory')
        .select('id, name, slug, image')
        .eq('category_id', catData?.id);
      if (!subcatRes.data || subcatRes.data.length === 0) {
        subcatRes = await supabase
          .from('subcategories')
          .select('id, name, slug, image')
          .eq('category_id', catData?.id);
      }
      setSubcategories(subcatRes.data || []);
      const { data: articlesData } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category);
      setArticles(articlesData || []);
      setLoading(false);
    }
    fetchData();
  }, [category]);

  if (loading) return (
    <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(120deg, #fff7ed 0%, #fff 60%, #fef3c7 100%)'}}>
      <div className="loader-modern" style={{border:'6px solid #fff7ed',borderTop:'6px solid #ea580c',borderRadius:'50%',width:60,height:60,animation:'spin 1s linear infinite'}}></div>
    </div>
  );
  if (!categoryInfo) return <div>Category not found.</div>;

  return (
    <div className="edurev-category-root">
      <section className="edurev-category-header">
        <div className="edurev-category-header-content">
          <img src={categoryInfo.image || '/icons/science.png'} alt={categoryInfo.name + ' image'} loading="eager" width="80" height="80" className="edurev-category-img" />
          <div>
            <h1 className="edurev-category-title">{categoryInfo.name}</h1>
            <div className="edurev-category-subtitle">Practice Questions, Notes, Videos & More</div>
          </div>
        </div>
      </section>
      <SubcategoryDropdownMenu subcategories={subcategories} articles={articles} />
    </div>
  );
}
