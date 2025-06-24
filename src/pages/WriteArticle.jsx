// WriteArticle.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import supabase from '../supabaseClient';

// Make supabase available on window for TinyMCE upload handler
if (typeof window !== 'undefined' && !window.supabase) {
  window.supabase = supabase;
}

function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function WriteArticle({ categories: propCategories, subcategories: propSubcategories }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Admin check state (must be before all other hooks)
  const [user, setUser] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);

  // Listen for login/logout and re-check admin status
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session || !session.user) {
        setUser(false);
        setCheckingRole(false);
        return;
      }
      (async () => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        if (!profile || profile.role !== 'admin') {
          setUser(false);
          setCheckingRole(false);
        } else {
          setUser(session.user);
          setCheckingRole(false);
        }
      })();
    });
    return () => {
      if (typeof authListener?.subscription?.unsubscribe === 'function') {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Early return for admin check
  useEffect(() => {
    async function checkAdmin() {
      const { data: { user: sessionUser } } = await supabase.auth.getUser();
      if (!sessionUser) {
        setCheckingRole(false);
        setUser(false);
        return;
      }
      // Fetch user profile (assuming 'profiles' table has 'role' field)
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', sessionUser.id)
        .single();
      if (!profile || profile.role !== 'admin') {
        setCheckingRole(false);
        setUser(false);
        return;
      }
      setUser(sessionUser);
      setCheckingRole(false);
    }
    checkAdmin();
     
  }, []);

  // Always call all hooks, but conditionally render content
  // Use state from navigation if in edit mode
  const editMode = location.state && location.state.editMode;
  const articleId = location.state?.articleId || null;
  const [selectedArticleCat, setSelectedArticleCat] = useState(location.state?.articleCategory || '');
  const [selectedArticleSubcat, setSelectedArticleSubcat] = useState(location.state?.articleSubcategory || '');
  const [articleTitle, setArticleTitle] = useState(location.state?.articleTitle || '');
  const [articleContent, setArticleContent] = useState(location.state?.articleContent || '');
  const [articleLink, setArticleLink] = useState(location.state?.articleLink || '');
  const [saving, setSaving] = useState(false);
  const [articleError, setArticleError] = useState('');
  const [articleSuccess, setArticleSuccess] = useState('');

  // Use props as fallback if categories/subcategories not in location.state
  const categories = location.state?.categories || propCategories;
  const subcategories = location.state?.subcategories || propSubcategories;

  useEffect(() => {
    if (selectedArticleCat && selectedArticleSubcat && articleTitle) {
      const catObj = categories.find(c => String(c.id) === String(selectedArticleCat));
      const subcatObj = (subcategories[selectedArticleCat] || []).find(s => String(s.id) === String(selectedArticleSubcat));
      if (catObj && subcatObj) {
        const catSlug = slugify(catObj.name);
        const subcatSlug = slugify(subcatObj.name);
        setArticleLink(`/studymaterial/${catSlug}/${subcatSlug}/${slugify(articleTitle)}`);
      } else {
        setArticleLink('');
      }
    } else {
      setArticleLink('');
    }
  }, [selectedArticleCat, selectedArticleSubcat, articleTitle, categories, subcategories]);

  useEffect(() => {
    async function fetchLatestArticle() {
      if (editMode && articleId) {
        const { data } = await supabase
          .from('articles')
          .select('*')
          .eq('id', articleId)
          .single();
        if (data) {
          setArticleTitle(data.title || '');
          setArticleContent(data.content || '');
          // Set category and subcategory by matching new name to category/subcategory options
          const catObj = categories.find(c => c.name === data.category) || categories.find(c => String(c.id) === String(data.category));
          setSelectedArticleCat(catObj ? catObj.id : '');
          if (catObj && subcategories[catObj.id]) {
            const subcatObj = (subcategories[catObj.id] || []).find(s => s.name === data.subcategory) || (subcategories[catObj.id] || []).find(s => String(s.id) === String(data.subcategory));
            setSelectedArticleSubcat(subcatObj ? subcatObj.id : '');
          } else {
            setSelectedArticleSubcat('');
          }
        }
      }
    }
    fetchLatestArticle();
    // Only run on mount or when articleId changes
  }, [editMode, articleId, categories, subcategories]);

  if (checkingRole) {
    return null;
  }
  if (user === false) {
    return <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 24, color: '#ea580c' }}>Access denied. Admins only.</div>;
  }

  const handleSaveArticle = async () => {
    setArticleError('');
    setArticleSuccess('');
    if (selectedArticleCat && selectedArticleSubcat && articleTitle && articleContent) {
      setSaving(true);
      let generatedLink = '';
      const catObj = categories.find(c => String(c.id) === String(selectedArticleCat));
      const subcatObj = (subcategories[selectedArticleCat] || []).find(s => String(s.id) === String(selectedArticleSubcat));
      if (catObj && subcatObj) {
        const catSlug = slugify(catObj.name);
        const subcatSlug = slugify(subcatObj.name);
        generatedLink = `/studymaterial/${catSlug}/${subcatSlug}/${slugify(articleTitle)}`;
      }
      if (editMode && articleId) {
        // Update existing article
        const { error } = await supabase
          .from('articles')
          .update({
            category: catObj ? slugify(catObj.name) : selectedArticleCat,
            subcategory: subcatObj ? slugify(subcatObj.name) : selectedArticleSubcat,
            title: articleTitle,
            content: articleContent,
            link: generatedLink
          })
          .eq('id', articleId);
        if (!error) {
          setSaving(false);
          setArticleSuccess('Article updated successfully!');
          setTimeout(() => navigate('/admindashboard'), 1200);
        } else {
          setArticleError(error.message || 'Failed to update article.');
          setSaving(false);
        }
      } else {
        // Create new article
        const { data, error } = await supabase
          .from('articles')
          .insert([
            {
              category: catObj ? slugify(catObj.name) : selectedArticleCat,
              subcategory: subcatObj ? slugify(subcatObj.name) : selectedArticleSubcat,
              title: articleTitle,
              content: articleContent,
              link: generatedLink
            }
          ])
          .select();
        if (!error && data && data.length > 0) {
          setSaving(false);
          setArticleSuccess('Article published successfully!');
          setTimeout(() => navigate('/admindashboard'), 1200);
        } else if (error) {
          setArticleError((error && error.message) ? `Failed to save article: ${error.message}` : 'Failed to save article.');
          setSaving(false);
        }
      }
    } else {
      setArticleError('All fields are required to save the article.');
    }
  };

  return (
    <div style={{ width: '100vw', maxWidth: '100%', margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #ea580c12', padding: '4vw', minHeight: '100vh', boxSizing: 'border-box' }}>
      <h2 style={{ color: '#ea580c', fontWeight: 900, fontSize: 26, marginBottom: 18 }}>{editMode ? 'Edit Article' : 'Write a New Article'}</h2>
      {articleError && <div style={{ color: 'red', fontWeight: 600, marginBottom: 12 }}>{articleError}</div>}
      {articleSuccess && <div style={{ color: 'green', fontWeight: 600, marginBottom: 12 }}>{articleSuccess}</div>}
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <select
          value={selectedArticleCat}
          onChange={e => { setSelectedArticleCat(e.target.value); setSelectedArticleSubcat(''); }}
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', minWidth: 180 }}
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={selectedArticleSubcat}
          onChange={e => setSelectedArticleSubcat(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', minWidth: 180 }}
          disabled={!selectedArticleCat}
        >
          <option value="">Select Subcategory</option>
          {(subcategories[selectedArticleCat] || []).map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="Article Title"
        value={articleTitle}
        onChange={e => setArticleTitle(e.target.value)}
        style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc', marginBottom: 18, fontSize: 18 }}
      />
      <Editor
        apiKey={window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? '5vw4w3awxdew4eads3y7rt5tvpxmwz99f09s2vsopbhxtjqr' : '5vw4w3awxdew4eads3y7rt5tvpxmwz99f09s2vsopbhxtjqr'}
        value={articleContent}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
            'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount',
          ],
          toolbar: [
            'undo redo | formatselect | bold italic backcolor',
            'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
            'removeformat | help',
          ].join(' | '),
        }}
        onEditorChange={setArticleContent}
      />
      <button
        onClick={handleSaveArticle}
        disabled={saving}
        style={{
          marginTop: 24,
          background: '#ea580c',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 32px',
          fontWeight: 700,
          fontSize: 18,
          cursor: 'pointer',
          boxShadow: '0 2px 8px #ea580c22',
          width: '100%',
          maxWidth: 400,
          alignSelf: 'center',
          display: 'block',
        }}
      >
        {saving ? (editMode ? 'Saving...' : 'Publishing...') : (editMode ? 'Save Changes' : 'Publish Article')}
      </button>
    </div>
  );
}