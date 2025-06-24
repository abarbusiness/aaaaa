import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from '../supabaseClient';
import TestResultsAdmin from '../components/TestResultsAdmin';


import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import CentreManagement from './CentreManagement.jsx';
function slugify(text) {
  return text.toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}


function ArticleManager({ categories, subcategories }) {
  const [articles, setArticles] = React.useState([]);
  const [loadingArticles, setLoadingArticles] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoadingArticles(true);
      const { data: articleData } = await supabase.from('articles').select('*').order('id', { ascending: false });
      setArticles(articleData || []);
      setLoadingArticles(false);
    };
    fetchData();
  }, []);

  const handleDeleteArticle = async (idx) => {
    const art = articles[idx];
    if (window.confirm('Are you sure you want to delete this article?')) {
      const { error } = await supabase.from('articles').delete().eq('id', art.id);
      if (!error) {
        setArticles(articles.filter((_, i) => i !== idx));
      }
    }
  };

  const handleEditArticle = (article) => {
    navigate('/writearticle', {
      state: {
        articleId: article.id,
        articleTitle: article.title,
        articleContent: article.content,
        articleCategory: article.category,
        articleSubcategory: article.subcategory,
        categories,
        subcategories,
        editMode: true
      }
    });
  };

  if (!categories || categories.length === 0) {
    return <div className="w-full flex flex-col items-center justify-center py-16 text-orange-600 font-bold text-lg">Loading categories... Please add a category before creating articles.</div>;
  }
  if (!subcategories || Object.keys(subcategories).length === 0) {
    return <div className="w-full flex flex-col items-center justify-center py-16 text-orange-600 font-bold text-lg">Loading subcategories... Please add a subcategory before creating articles.</div>;
  }

  const articlesByCategory = articles.reduce((acc, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {});

  return (
    <div className="w-full mt-8">
      {loadingArticles ? (
        <div className="text-gray-500 text-lg">Loading...</div>
      ) : Object.keys(articlesByCategory).length === 0 ? (
        <div className="text-gray-400 text-lg">No articles published yet.</div>
      ) : (
        Object.entries(articlesByCategory).map(([category, articlesInCat]) => (
          <div key={category} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-orange-700">{category}</span>
              <span className="bg-orange-100 text-orange-700 rounded-full px-3 text-sm font-semibold">{articlesInCat.length}</span>
            </div>
            <div className="flex flex-wrap gap-6 justify-start">
              {articlesInCat.map((art, idx) => (
                <Card key={art.id || idx} className="w-full md:w-[350px] bg-white border border-orange-100 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="truncate text-orange-600 text-xl mb-1">{art.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm mb-2">
                      Subcategory: <b>{art.subcategory}</b>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href={art.link} className="text-orange-500 underline break-all" target="_blank" rel="noopener noreferrer">{art.link}</a>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button onClick={() => handleEditArticle(art)} className="bg-yellow-400 text-orange-700 hover:bg-yellow-500">Edit</Button>
                    <Button onClick={() => handleDeleteArticle(articles.findIndex(a => a.id === art.id))} className="bg-red-500 hover:bg-red-600">Delete</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function TabBar() {
  const [activeTab, setActiveTab] = React.useState(window.adminTab || 'dashboard');
  React.useEffect(() => {
    window.setAdminTab = setActiveTab;
    window.adminTab = activeTab;
    return () => {
      window.setAdminTab = undefined;
      window.adminTab = undefined;
    };
  }, [activeTab]);
  return (
    <AdminDashboard />
  );
}

function ManageUserTab() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      if (error) {
        setError('Failed to fetch users.');
        setUsers([]);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  // Hide sensitive/irrelevant columns from admin UI
  const HIDDEN_USER_COLUMNS = ['id', 'profile_image', 'created_at', 'updated_at'];
  let columns = users.length > 0 ? [...Object.keys(users[0]).filter(col => !HIDDEN_USER_COLUMNS.includes(col) && col !== 'role' && col !== 'centre'), 'centre', 'subscription'] : ['centre', 'subscription'];
  // Replace 'name' with 'full_name' if present
  columns = columns.map(col => col === 'name' ? 'full_name' : col);

  // Handle subscription upgrade for profiles table
  async function handleUpgradeSubscription(userId) {
    const { error } = await supabase.from('profiles').update({ subscription_status: 'active' }).eq('id', userId);
    if (!error) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, subscription_status: 'active' } : u));
    } else {
      alert('Failed to upgrade subscription. ' + (error.message || ''));
    }
  }

  // Centres state
  const [centres, setCentres] = React.useState([]);

  // Fetch centres on mount
  React.useEffect(() => {
    async function fetchCentres() {
      const { data, error } = await supabase.from('centres').select('*').order('name');
      if (!error) setCentres(data || []);
    }
    fetchCentres();
  }, []);

  // Handle centre assignment for a user
  async function handleAssignCentre(userId, centreId) {
    // Try both string and number for centreId, depending on your schema
    let updateValue = centreId === '' ? null : centreId;
    const { error } = await supabase.from('profiles').update({ centre: updateValue }).eq('id', userId);
    if (!error) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, centre: updateValue } : u));
    } else {
      console.error('Supabase error assigning centre:', error);
      alert('Failed to assign centre. ' + (error.message || ''));
    }
  }

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editUser, setEditUser] = React.useState(null); 
  const [form, setForm] = React.useState({});
  const [saving, setSaving] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const [formSuccess, setFormSuccess] = React.useState('');

  function openModal(user) {
    setEditUser(user);
    setForm(user ? columns.reduce((acc, col) => ({ ...acc, [col]: user[col] }), {}) : columns.reduce((acc, col) => ({ ...acc, [col]: '' }), {}));
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  }

  function isValidEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  async function saveUser(e) {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    setFormSuccess('');
    for (const col of columns) {
      if (!form[col]) {
        setFormError(`${col.charAt(0).toUpperCase() + col.slice(1)} is required.`);
        setSaving(false);
        return;
      }
    }
    if (!editUser && !form.password) {
      setFormError('Password is required for new users.');
      setSaving(false);
      return;
    }
    if ('email' in form && !isValidEmail(form.email)) {
      setFormError('Please enter a valid email address.');
      setSaving(false);
      return;
    }
    try {
      if (editUser) {
        const profileUpdate = { ...form };
        delete profileUpdate.password;
        const { error } = await supabase
          .from('profiles')
          .update(profileUpdate)
          .eq('id', editUser.id);
        if (error) throw error;
        setFormSuccess('User updated successfully!');
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });
        if (signUpError) throw signUpError;
        if (!data.user) throw new Error('User not created.');
        const profileUpdate = { ...form };
        delete profileUpdate.password;
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert([{ id: data.user.id, ...profileUpdate }]);
        if (profileError) throw profileError;
        setFormSuccess('User added successfully!');
      }
      setTimeout(() => {
        setModalOpen(false);
        setFormSuccess('');
      }, 800);
      setLoading(true);
      const { data } = await supabase.from('profiles').select('*');
      setUsers(data || []);
      setLoading(false);
    } catch (err) {
      setFormError(err.message || 'Failed to save user');
    }
    setSaving(false);
  }

  async function deleteUser(user) {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setSaving(true);
    setFormError('');
    setFormSuccess('');
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);
      if (error) throw error;
      setFormSuccess('User deleted successfully!');
      setLoading(true);
      const { data } = await supabase.from('profiles').select('*');
      setUsers(data || []);
      setLoading(false);
    } catch (err) {
      setFormError(err.message || 'Failed to delete user');
    }
    setSaving(false);
  }

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: 22, color: '#ea580c', fontWeight: 800, marginBottom: 18 }}>All Users</h2>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1.5px 8px #ea580c11', fontSize: 16, tableLayout: 'auto' }}>
          <thead>
            <tr style={{ background: '#fff7ed' }}>
              {columns.map(col => (
                <th key={col} style={{ padding: 12, fontWeight: 700, color: '#ea580c', textAlign: 'left', textTransform: 'capitalize', whiteSpace: 'normal', position: 'sticky', top: 0, background: '#fff7ed', zIndex: 2 }}>{col === 'centre' ? 'Centre' : col === 'subscription' ? 'Subscription' : col === 'full_name' ? 'Full Name' : col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length+1} style={{ textAlign: 'center', color: '#888', padding: 24 }}>Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={columns.length+1} style={{ textAlign: 'center', color: '#ef4444', padding: 24 }}>{error}</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={columns.length+1} style={{ textAlign: 'center', color: '#888', padding: 24 }}>No users found.</td></tr>
            ) : (
              users.map(u => (
                <tr key={u.id || u.email || Math.random()} style={{ borderTop: '1px solid #f3f3f3' }}>
                  {columns.map(col => (
                    col === 'centre' ? (
                      <td key={col} style={{ padding: 10 }}>
                        {u.subscription_status === 'active' ? (
                          <select
                            value={u.centre || ''}
                            onChange={e => handleAssignCentre(u.id, e.target.value)}
                            style={{ padding: 6, borderRadius: 6, border: '1.5px solid #ea580c66', fontSize: 15 }}
                          >
                            <option value=''>-- Select Centre --</option>
                            {centres.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        ) : null}
                      </td>
                    ) : col === 'subscription' ? (
                      <td key={col} style={{ padding: 10 }}>
                        {u.subscription_status === 'active' ? (
                          <button
                            disabled
                            style={{ background: '#22c55e', color: '#fff', padding: '6px 16px', borderRadius: 6, border: 'none', fontWeight: 600, cursor: 'not-allowed', opacity: 0.85 }}
                          >
                            Activated
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpgradeSubscription(u.id)}
                            style={{ background: '#ea580c', color: '#fff', padding: '6px 16px', borderRadius: 6, border: 'none', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Upgrade
                          </button>
                        )}
                      </td>
                    ) : (
                      <td key={col} style={{ padding: 10, wordBreak: 'break-word', whiteSpace: 'normal' }}>{u[col]}</td>
                    )
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={saveUser} style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 320, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ margin: 0, color: '#ea580c', fontWeight: 700 }}>{editUser ? 'Edit User' : 'Add New User'}</h3>
            {formSuccess && <div style={{ color: '#16a34a', fontWeight: 600 }}>{formSuccess}</div>}
            {formError && <div style={{ color: '#ef4444', fontWeight: 600 }}>{formError}</div>}
            {columns.map(col => (
              <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontWeight: 600, color: '#ea580c' }}>{col.charAt(0).toUpperCase() + col.slice(1)}</label>
                <input
                  type={col === 'email' ? 'email' : 'text'}
                  value={form[col] || ''}
                  onChange={e => setForm(f => ({ ...f, [col]: e.target.value }))}
                  style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
                  required
                />
              </div>
            ))}
            {!editUser && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontWeight: 600, color: '#ea580c' }}>Password</label>
                <input
                  type="password"
                  value={form.password || ''}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
                  required
                />
              </div>
            )}
            <div style={{
              display: 'flex',
              gap: 12,
              marginTop: 8,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <button type="submit" disabled={saving} style={{
                background: '#ea580c',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                padding: '8px 18px',
                fontWeight: 600,
                cursor: 'pointer',
                minWidth: 110,
                marginBottom: 4,
                width: '100%',
                maxWidth: 200,
              }}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" onClick={() => setModalOpen(false)} style={{
                background: '#fff',
                color: '#ea580c',
                border: '1px solid #ea580c',
                borderRadius: 6,
                padding: '8px 18px',
                fontWeight: 600,
                cursor: 'pointer',
                minWidth: 110,
                marginBottom: 4,
                width: '100%',
                maxWidth: 200,
              }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function ArticleTab({ categories, subcategories }) {
  return (
    <div style={{ padding: 32, minHeight: 600, background: '#f8fafc', borderRadius: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 28, color: '#ea580c', fontWeight: 900, letterSpacing: 0.5 }}>Article Management</h2>
      </div>
      <ArticleManager
        categories={categories}
        subcategories={subcategories}
      />
    </div>
  );
}

function CategoryManagement({ categories, setCategories, subcategories, setSubcategories }) {
  const [newCategory, setNewCategory] = React.useState('');
  const [newCategoryImage, setNewCategoryImage] = React.useState(null);
  const [editCategoryId, setEditCategoryId] = React.useState(null);
  const [editCategoryName, setEditCategoryName] = React.useState('');
  const [editCategoryImage, setEditCategoryImage] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [categoryError, setCategoryError] = React.useState('');

  const handleAddCategory = async () => {
    setCategoryError('');
    if (!newCategory) {
      setCategoryError('Category name cannot be empty.');
      return;
    }
    if (categories.some(c => c.name.toLowerCase() === newCategory.toLowerCase())) {
      setCategoryError('Category already exists.');
      return;
    }
    setSaving(true);
    const newSlug = slugify(newCategory);
    let imageUrl = null;
    if (newCategoryImage) {
      const fileExt = newCategoryImage.name.split('.').pop();
      const fileName = `${newSlug}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('category-images').upload(fileName, newCategoryImage, { upsert: true, cacheControl: '3600' });
      if (uploadError) {
        setCategoryError('Image upload failed: ' + uploadError.message);
        setSaving(false);
        return;
      }
      const { data: publicUrlData } = await supabase.storage.from('category-images').getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }
    const { data, error } = await supabase.from('category').insert([{ name: newCategory, slug: newSlug, image: imageUrl }]).select();
    if (!error && data && data[0]) {
      setCategories([...categories, data[0]]);
      setNewCategory('');
      setNewCategoryImage(null);
    } else if (error) {
      setCategoryError(error.message || 'Failed to add category.');
    }
    setSaving(false);
  };

  const handleEditCategory = (cat) => {
    setEditCategoryId(cat.id);
    setEditCategoryName(cat.name);
    setEditCategoryImage(null);
  };
  const saveEditCategory = async () => {
    if (!editCategoryName) return;
    setSaving(true);
    let imageUrl = null;
    if (editCategoryImage) {
      const fileExt = editCategoryImage.name.split('.').pop();
      const fileName = `${slugify(editCategoryName)}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('category-images').upload(fileName, editCategoryImage, { upsert: true, cacheControl: '3600' });
      if (uploadError) {
        setCategoryError('Image upload failed: ' + uploadError.message);
        setSaving(false);
        return;
      }
      const { data: publicUrlData } = await supabase.storage.from('category-images').getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }
    const updateFields = { name: editCategoryName, slug: slugify(editCategoryName) };
    if (imageUrl) updateFields.image = imageUrl;
    const { error } = await supabase.from('category').update(updateFields).eq('id', editCategoryId);
    if (!error) {
      setCategories(categories.map(cat => cat.id === editCategoryId ? { ...cat, ...updateFields } : cat));
      setEditCategoryId(null);
      setEditCategoryName('');
      setEditCategoryImage(null);
      // Call updateArticlesForCategoryOrSubcategoryChange here
      await updateArticlesForCategoryOrSubcategoryChange({ updatedCategory: { id: editCategoryId, name: editCategoryName, oldName: categories.find(c => c.id === editCategoryId).name } });
    } else {
      setCategoryError(error.message || 'Failed to update category.');
    }
    setSaving(false);
  };

  const handleDeleteCategory = async (cat) => {
    if (window.confirm(`Delete category '${cat.name}'? This will also remove its subcategories.`)) {
      setSaving(true);
      await supabase.from('category').delete().eq('id', cat.id);
      setCategories(categories.filter(c => c.id !== cat.id));
      const newSubs = { ...subcategories };
      delete newSubs[cat.id];
      setSubcategories(newSubs);
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 700, margin: '0 auto', background: '#fff7ed', borderRadius: 18, boxShadow: '0 4px 28px #ea580c11', padding: '32px 24px', marginTop: 18 }}>
      <h2 style={{ color: '#ea580c', fontSize: 26, fontWeight: 900, marginBottom: 18, letterSpacing: 0.5, textAlign: 'center' }}>📁 Category Management</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center', justifyContent: 'center' }}>
        <input
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="Add new category"
          style={{ padding: 12, borderRadius: 8, border: '1.5px solid #ea580c66', fontSize: 17, width: 220, background: '#fff', boxShadow: '0 1px 4px #ea580c0b' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setNewCategoryImage(e.target.files[0])}
          style={{ padding: 8, borderRadius: 8, border: '1.5px solid #ea580c44', background: '#fff', fontSize: 14, width: 170 }}
        />
        <button onClick={handleAddCategory} disabled={!newCategory || saving} style={{ padding: '12px 22px', background: '#ea580c', color: 'white', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: 16, boxShadow: '0 1px 4px #ea580c0b', cursor: saving ? 'wait' : 'pointer', opacity: !newCategory || saving ? 0.7 : 1 }}>
          {saving ? 'Adding...' : 'Add'}
        </button>
      </div>
      {categoryError && <div style={{ color: '#ef4444', marginBottom: 10, textAlign: 'center', fontWeight: 600 }}>{categoryError}</div>}
      <div style={{ marginTop: 18 }}>
        {categories.length > 0 ? (
          <div style={{ borderRadius: 12, boxShadow: '0 1px 8px #ea580c13', background: '#fff', padding: '18px 10px' }}>
            <div style={{ fontWeight: 800, color: '#ea580c', fontSize: 18, marginBottom: 10, letterSpacing: 0.2 }}>Existing Categories</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map((c, idx) => (
                <li key={c.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f3f3', gap: 10 }}>
                  {editCategoryId === c.id ? (
                    <>
                      <input value={editCategoryName} onChange={e => setEditCategoryName(e.target.value)} style={{ padding: 7, fontSize: 16, borderRadius: 6, border: '1.5px solid #ea580c66', marginRight: 8, width: 160 }} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => setEditCategoryImage(e.target.files[0])}
                        style={{ padding: 4, borderRadius: 6, border: '1.5px solid #ea580c44', background: '#fff', fontSize: 13, width: 120 }}
                      />
                      <button onClick={saveEditCategory} style={{ color: '#fff', background: '#22c55e', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer', fontSize: 15, fontWeight: 700, marginRight: 3 }}>Save</button>
                      <button onClick={() => { setEditCategoryId(null); setEditCategoryName(''); setEditCategoryImage(null); }} style={{ color: '#fff', background: '#ef4444', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer', fontSize: 15, fontWeight: 700 }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {c.image && <img src={c.image} alt={c.name} style={{ width: 38, height: 38, objectFit: 'cover', borderRadius: 8, marginRight: 8, border: '1.5px solid #ea580c33', background: '#fff7ed' }} />}
                      <span style={{ flex: 1, fontWeight: 700, fontSize: 17, color: '#ea580c', marginRight: 10 }}>{c.name}</span>
                      {/* Up/Down reorder buttons */}
                      <button
                        onClick={async () => {
                          setSaving(true);
                          setCategoryError("");
                          const newCategories = [...categories];
                          if (idx === 0) return;
                          // Swap with previous
                          const prev = newCategories[idx - 1];
                          // Update in DB
                          try {
                            await Promise.all([
                              supabase.from('category').update({ order: prev.order }).eq('id', c.id),
                              supabase.from('category').update({ order: c.order }).eq('id', prev.id),
                            ]);
                            // Swap locally
                            [newCategories[idx - 1], newCategories[idx]] = [newCategories[idx], newCategories[idx - 1]];
                            setCategories(newCategories.map((cat, i) => ({ ...cat, order: i }))); // Optionally update local order field
                          } catch (err) {
                            setCategoryError('Failed to update order.');
                          }
                          setSaving(false);
                        }}
                        disabled={idx === 0 || saving}
                        style={{ marginRight: 5, background: '#fbbf24', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 10px', cursor: idx === 0 || saving ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700 }}
                        title="Move Up"
                      >▲</button>
                      <button
                        onClick={async () => {
                          setSaving(true);
                          setCategoryError("");
                          const newCategories = [...categories];
                          if (idx === categories.length - 1) return;
                          // Swap with next
                          const next = newCategories[idx + 1];
                          try {
                            await Promise.all([
                              supabase.from('category').update({ order: next.order }).eq('id', c.id),
                              supabase.from('category').update({ order: c.order }).eq('id', next.id),
                            ]);
                            [newCategories[idx + 1], newCategories[idx]] = [newCategories[idx], newCategories[idx + 1]];
                            setCategories(newCategories.map((cat, i) => ({ ...cat, order: i }))); // Optionally update local order field
                          } catch (err) {
                            setCategoryError('Failed to update order.');
                          }
                          setSaving(false);
                        }}
                        disabled={idx === categories.length - 1 || saving}
                        style={{ marginRight: 10, background: '#fbbf24', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 10px', cursor: idx === categories.length - 1 || saving ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 700 }}
                        title="Move Down"
                      >▼</button>
                      <button onClick={() => handleEditCategory(c)} style={{ color: '#fff', background: '#3b82f6', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer', fontSize: 15, fontWeight: 700, marginRight: 3 }}>Edit</button>
                      <button onClick={() => handleDeleteCategory(c)} style={{ color: '#fff', background: '#ef4444', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer', fontSize: 15, fontWeight: 700 }}>Delete</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : <div style={{ color: '#b45309', fontWeight: 600, textAlign: 'center' }}>No categories yet.</div>}
      </div>
    </div>
  );
}

// Add a function to update all articles with new category/subcategory names and slugs when a category or subcategory is edited
async function updateArticlesForCategoryOrSubcategoryChange({ updatedCategory, updatedSubcategory }) {
  // If category is changed, update all articles with that category id
  if (updatedCategory) {
    const { name } = updatedCategory;
    // Find all articles with old category name (before update)
    const { data: articles } = await supabase
      .from('articles')
      .select('*')
      .eq('category', updatedCategory.oldName);
    if (articles && articles.length > 0) {
      for (const article of articles) {
        // Generate new link using the new category name/slug and current subcategory/article title
        const catSlug = slugify(name);
        const subcatSlug = slugify(article.subcategory);
        const articleSlug = slugify(article.title);
        const newLink = `/studymaterial/${catSlug}/${subcatSlug}/${articleSlug}`;
        await supabase
          .from('articles')
          .update({ category: name, link: newLink })
          .eq('id', article.id);
      }
    }
  }
  // If subcategory is changed, update all articles with that subcategory id
  if (updatedSubcategory) {
    const { name, categoryName } = updatedSubcategory;
    // Find all articles with old subcategory name (before update)
    const { data: articles } = await supabase
      .from('articles')
      .select('*')
      .eq('subcategory', updatedSubcategory.oldName)
      .eq('category', categoryName);
    if (articles && articles.length > 0) {
      for (const article of articles) {
        // Generate new link using current category name/slug and new subcategory name/slug
        const catSlug = slugify(article.category);
        const subcatSlug = slugify(name);
        const articleSlug = slugify(article.title);
        const newLink = `/studymaterial/${catSlug}/${subcatSlug}/${articleSlug}`;
        await supabase
          .from('articles')
          .update({ subcategory: name, link: newLink })
          .eq('id', article.id);
      }
    }
  }
}

// Make updateArticlesForCategoryOrSubcategoryChange globally accessible
window.updateArticlesForCategoryOrSubcategoryChange = updateArticlesForCategoryOrSubcategoryChange;

function AdminDashboard() {
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('user');
  const [categories, setCategories] = React.useState([]); 
  const [subcategories, setSubcategories] = React.useState({}); 
  const [selectedCategoryId, setSelectedCategoryId] = React.useState('');

  React.useEffect(() => {
    async function checkAdmin() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return;
      }
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('email', user.email)
        .single();
      if (error || !profile || profile.role !== 'admin') {
        return;
      }
      setLoading(false);
    }
    checkAdmin();
  }, []);

  React.useEffect(() => {
    async function fetchCategoriesAndSubcategories() {
      const { data: cats } = await supabase.from('category').select('*').order('order', { ascending: true });
      setCategories(cats || []);
      const { data: subcats } = await supabase.from('subcategories').select('*');
      const grouped = {};
      (subcats || []).forEach(sub => {
        if (!grouped[sub.category_id]) grouped[sub.category_id] = [];
        grouped[sub.category_id].push(sub);
      });
      setSubcategories(grouped);
    }
    fetchCategoriesAndSubcategories();
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin'); // or '/login' if your login route is different
  };


  const responsiveStyles = {
    container: {
      width: '100vw',
      minHeight: '100vh',
      background: '#f4f4f5',
      display: 'flex',
      flexDirection: 'row',
    },
    main: {
      marginLeft: 80,
      marginTop: 64,
      padding: 24,
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      boxSizing: 'border-box',
    },
    '@media (max-width: 900px)': {
      container: {
        flexDirection: 'column',
      },
      main: {
        marginLeft: 0,
        marginTop: 56,
        padding: 8,
      },
    },
    '@media (max-width: 600px)': {
      container: {
        flexDirection: 'column',
      },
      main: {
        marginLeft: 0,
        marginTop: 50,
        padding: 4,
      },
    },
  };

  if (loading) return <div style={{textAlign:'center',marginTop:60}}>Checking admin access...</div>;

  return (
    <div style={responsiveStyles.container}>
      <aside style={{
        width: 80,
        background: '#fff',
        borderRight: '1px solid #ececec',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
      }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
          <SidebarNavButton tabKey="user" icon="👤" tooltip="Manage Users" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarNavButton tabKey="category" icon="📚" tooltip="Manage Categories" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarNavButton tabKey="subcategory" icon="🗂️" tooltip="Manage Subcategories" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarNavButton tabKey="article" icon="📝" tooltip="Manage Articles" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarNavButton tabKey="write" icon="✍️" tooltip="Write Article" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarNavButton tabKey="notice" icon="📢" tooltip="Notice Board" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarNavButton tabKey="centre" icon="🏢" tooltip="Manage Centers" activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarNavButton tabKey="test-results" icon="📊" tooltip="Test Results" activeTab={activeTab} setActiveTab={setActiveTab} />
        </ul>
      </aside>
      <main style={{ marginLeft: 90, padding: 24, flex: 1, minHeight: '100vh', background: '#f8fafc' }}>
        {activeTab === 'user' && <ManageUserTab />}
        {activeTab === 'category' && <CategoryManagement categories={categories} setCategories={setCategories} subcategories={subcategories} setSubcategories={setSubcategories} />}
        {activeTab === 'subcategory' && <SubcategoryManagement categories={categories} subcategories={subcategories} setSubcategories={setSubcategories} selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} />}
        {activeTab === 'article' && <ArticleManager categories={categories} subcategories={subcategories} />}
        {activeTab === 'write' && <WriteArticleTab categories={categories} subcategories={subcategories} />}
        {activeTab === 'notice' && <NoticeBoardAdmin />}
        {activeTab === 'centre' && <CentreManagement />}
        {activeTab === 'test-results' && <TestResultsAdmin />}
      </main>
    </div>
  );
}

function SidebarNavButton({ tabKey, icon, tooltip, activeTab, setActiveTab }) {
  const isActive = activeTab === tabKey;
  return (
    <li style={{ marginBottom: 8, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <button
        onClick={() => setActiveTab(tabKey)}
        title={tooltip}
        style={{
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isActive ? '#fff7ed' : 'transparent',
          color: isActive ? '#ea580c' : '#b0b0b0',
          border: isActive ? '2px solid #ea580c' : '2px solid transparent',
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 22,
          cursor: 'pointer',
          transition: 'all 0.18s',
          boxShadow: isActive ? '0 2px 8px rgba(234,88,12,0.07)' : 'none',
          outline: 'none',
        }}
      >
        <span style={{ fontSize: 22 }}>{icon}</span>
      </button>
    </li>
  );
}

function WriteArticleTab({ categories, subcategories }) {
  const WriteArticle = React.lazy(() => import('./WriteArticle.jsx'));
  return (
    <React.Suspense fallback={<div>Loading Write Article...</div>}>
      <div style={{ padding: 32, minHeight: 600, background: '#f8fafc', borderRadius: 18 }}>
        <WriteArticle categories={categories} subcategories={subcategories} />
      </div>
    </React.Suspense>
  );
}

function SubcategoryManagement({ categories, subcategories, setSubcategories, selectedCategoryId, setSelectedCategoryId }) {
  const [newSubcategory, setNewSubcategory] = React.useState('');
  const [newSubcategoryImage, setNewSubcategoryImage] = React.useState(null);
  const [editSubcategoryId, setEditSubcategoryId] = React.useState(null);
  const [editSubcategoryName, setEditSubcategoryName] = React.useState('');
  const [editSubcategoryImage, setEditSubcategoryImage] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [subcategoryError, setSubcategoryError] = React.useState('');

  const handleAddSubcategory = async () => {
    setSubcategoryError('');
    if (!newSubcategory) {
      setSubcategoryError('Subcategory name cannot be empty.');
      return;
    }
    if (subcategories[selectedCategoryId] && subcategories[selectedCategoryId].some(sub => sub.name.toLowerCase() === newSubcategory.toLowerCase())) {
      setSubcategoryError('Subcategory already exists.');
      return;
    }
    setSaving(true);
    const newSlug = slugify(newSubcategory);
    let imageUrl = null;
    if (newSubcategoryImage) {
      const fileExt = newSubcategoryImage.name.split('.').pop();
      const fileName = `${newSlug}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('subcategory-images').upload(fileName, newSubcategoryImage, { upsert: true, cacheControl: '3600' });
      if (uploadError) {
        setSubcategoryError('Image upload failed: ' + uploadError.message);
        setSaving(false);
        return;
      }
      const { data: publicUrlData } = await supabase.storage.from('subcategory-images').getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }
    const { data, error } = await supabase.from('subcategories').insert([{ category_id: selectedCategoryId, name: newSubcategory, slug: newSlug, image: imageUrl }]).select();
    if (!error && data && data[0]) {
      if (!subcategories[selectedCategoryId]) subcategories[selectedCategoryId] = [];
      subcategories[selectedCategoryId].push(data[0]);
      setSubcategories({ ...subcategories });
      setNewSubcategory('');
      setNewSubcategoryImage(null);
    } else if (error) {
      setSubcategoryError(error.message || 'Failed to add subcategory.');
    }
    setSaving(false);
  };

  const handleEditSubcategory = (sub) => {
    setEditSubcategoryId(sub.id);
    setEditSubcategoryName(sub.name);
    setEditSubcategoryImage(null);
  };
  const saveEditSubcategory = async () => {
    if (!editSubcategoryName) return;
    setSaving(true);
    let imageUrl = null;
    if (editSubcategoryImage) {
      const fileExt = editSubcategoryImage.name.split('.').pop();
      const fileName = `${slugify(editSubcategoryName)}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('subcategory-images').upload(fileName, editSubcategoryImage, { upsert: true, cacheControl: '3600' });
      if (uploadError) {
        setSubcategoryError('Image upload failed: ' + uploadError.message);
        setSaving(false);
        return;
      }
      const { data: publicUrlData } = await supabase.storage.from('subcategory-images').getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }
    const updateFields = { name: editSubcategoryName, slug: slugify(editSubcategoryName) };
    if (imageUrl) updateFields.image = imageUrl;
    const { error } = await supabase.from('subcategories').update(updateFields).eq('id', editSubcategoryId);
    if (!error) {
      const newSubs = { ...subcategories };
      newSubs[selectedCategoryId] = newSubs[selectedCategoryId].map(sub => sub.id === editSubcategoryId ? { ...sub, ...updateFields } : sub);
      setSubcategories(newSubs);
      setEditSubcategoryId(null);
      setEditSubcategoryName('');
      setEditSubcategoryImage(null);
      // Call updateArticlesForCategoryOrSubcategoryChange here
      await updateArticlesForCategoryOrSubcategoryChange({ updatedSubcategory: { id: editSubcategoryId, name: editSubcategoryName, oldName: subcategories[selectedCategoryId].find(sub => sub.id === editSubcategoryId).name, categoryName: categories.find(c => c.id === selectedCategoryId).name } });
    } else {
      setSubcategoryError(error.message || 'Failed to update subcategory.');
    }
    setSaving(false);
  };

  const handleDeleteSubcategory = async (sub) => {
    if (window.confirm(`Delete subcategory '${sub.name}'?`)) {
      setSaving(true);
      await supabase.from('subcategories').delete().eq('id', sub.id);
      const newSubs = { ...subcategories };
      newSubs[selectedCategoryId] = newSubs[selectedCategoryId].filter(subcat => subcat.id !== sub.id);
      setSubcategories(newSubs);
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 700, margin: '0 auto', background: '#fff7ed', borderRadius: 18, boxShadow: '0 4px 28px #ea580c11', padding: '32px 24px', marginTop: 18 }}>
      <h2 style={{ color: '#ea580c', fontSize: 26, fontWeight: 900, marginBottom: 18, letterSpacing: 0.5, textAlign: 'center' }}>📂 Subcategory Management</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center', justifyContent: 'center' }}>
        <select
          value={selectedCategoryId}
          onChange={e => setSelectedCategoryId(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: '1.5px solid #ea580c66', fontSize: 17, width: 220, background: '#fff', boxShadow: '0 1px 4px #ea580c0b' }}
        >
          <option value="">Select a category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          value={newSubcategory}
          onChange={e => setNewSubcategory(e.target.value)}
          placeholder="Add new subcategory"
          style={{ padding: 12, borderRadius: 8, border: '1.5px solid #ea580c66', fontSize: 17, width: 220, background: '#fff', boxShadow: '0 1px 4px #ea580c0b' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setNewSubcategoryImage(e.target.files[0])}
          style={{ padding: 8, borderRadius: 8, border: '1.5px solid #ea580c44', background: '#fff', fontSize: 14, width: 170 }}
        />
        <button onClick={handleAddSubcategory} disabled={!newSubcategory || !selectedCategoryId || saving} style={{ padding: '12px 22px', background: '#ea580c', color: 'white', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: 16, boxShadow: '0 1px 4px #ea580c0b', cursor: saving ? 'wait' : 'pointer', opacity: !newSubcategory || !selectedCategoryId || saving ? 0.7 : 1 }}>
          {saving ? 'Adding...' : 'Add'}
        </button>
      </div>
      {subcategoryError && <div style={{ color: '#ef4444', marginBottom: 10, textAlign: 'center', fontWeight: 600 }}>{subcategoryError}</div>}
      <div style={{ marginTop: 18 }}>
        {subcategories[selectedCategoryId] && subcategories[selectedCategoryId].length > 0 ? (
          <div style={{ borderRadius: 12, boxShadow: '0 1px 8px #ea580c13', background: '#fff', padding: '18px 10px' }}>
            <div style={{ fontWeight: 800, color: '#ea580c', fontSize: 18, marginBottom: 10, letterSpacing: 0.2 }}>Existing Subcategories</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {subcategories[selectedCategoryId].map(sub => (
                <li key={sub.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f3f3', gap: 10 }}>
                  {editSubcategoryId === sub.id ? (
                    <>
                      <input value={editSubcategoryName} onChange={e => setEditSubcategoryName(e.target.value)} style={{ padding: 7, fontSize: 16, borderRadius: 6, border: '1.5px solid #ea580c66', marginRight: 8, width: 160 }} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => setEditSubcategoryImage(e.target.files[0])}
                        style={{ padding: 4, borderRadius: 6, border: '1.5px solid #ea580c44', background: '#fff', fontSize: 13, width: 120 }}
                      />
                      <button onClick={saveEditSubcategory} style={{ color: '#fff', background: '#22c55e', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer', fontSize: 15, fontWeight: 700, marginRight: 3 }}>Save</button>
                      <button onClick={() => { setEditSubcategoryId(null); setEditSubcategoryName(''); setEditSubcategoryImage(null); }} style={{ color: '#fff', background: '#ef4444', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer', fontSize: 15, fontWeight: 700 }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {sub.image && <img src={sub.image} alt={sub.name} style={{ width: 38, height: 38, objectFit: 'cover', borderRadius: 8, marginRight: 8, border: '1.5px solid #ea580c33', background: '#fff7ed' }} />}
                      <span style={{ flex: 1, fontWeight: 700, fontSize: 17, color: '#ea580c', marginRight: 10 }}>{sub.name}</span>
                      <button onClick={() => handleEditSubcategory(sub)} style={{ color: '#fff', background: '#3b82f6', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer', fontSize: 15, fontWeight: 700, marginRight: 3 }}>Edit</button>
                      <button onClick={() => handleDeleteSubcategory(sub)} style={{ color: '#fff', background: '#ef4444', border: 'none', borderRadius: 5, padding: '6px 14px', cursor: 'pointer', fontSize: 15, fontWeight: 700 }}>Delete</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : <div style={{ color: '#b45309', fontWeight: 600, textAlign: 'center' }}>No subcategories yet.</div>}
      </div>
    </div>
  );
}

// --- Notice Board Admin Tab ---
function NoticeBoardAdmin() {
  const [lines, setLines] = React.useState(["", "", "", "", ""]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  // Fetch latest notice on mount or tab open
  React.useEffect(() => {
    let isMounted = true;
    async function fetchNotice() {
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('id, lines')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();
        if (isMounted) {
          if (error) setError("Failed to fetch notices");
          else if (data && data.lines) setLines([...(data.lines || []), "", "", "", ""].slice(0, 5));
        }
      } catch (e) {
        if (isMounted) setError("Failed to fetch notices");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchNotice();
    return () => { isMounted = false; };
  }, []);

  // Handle save
  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    const cleanLines = lines.map(l => l.trim()).filter(l => l);
    if (cleanLines.length === 0) {
      setError("Please enter at least one notice line.");
      setSaving(false);
      return;
    }
    try {
      // Upsert (insert or update latest row)
      const { data: existing, error: fetchErr } = await supabase
        .from('notices')
        .select('id')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      let upsertResult;
      if (existing && existing.id) {
        upsertResult = await supabase
          .from('notices')
          .update({ lines: cleanLines, updated_at: new Date().toISOString() })
          .eq('id', existing.id);
      } else {
        upsertResult = await supabase
          .from('notices')
          .insert([{ lines: cleanLines }]);
      }
      if (upsertResult.error) {
        setError(upsertResult.error.message || "Failed to save notices");
      } else {
        setSuccess("Notice board updated!");
      }
    } catch (e) {
      setError(e?.message || "Failed to save notices");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 18, color: '#ea580c' }}>Notice Board Editor</h2>
      <div style={{ marginBottom: 18, color: '#666', fontSize: 16 }}>Update the lines that appear on the public notice board. Leave lines blank to hide them.</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 700, color: '#ea580c' }}>Line {i+1}</label>
              <textarea
                rows={2}
                style={{ width: '100%', borderRadius: 8, border: '1.5px solid #ea580c66', padding: 10, fontSize: 16, marginTop: 4 }}
                value={lines[i] || ""}
                onChange={e => {
                  const newLines = [...lines];
                  newLines[i] = e.target.value;
                  setLines(newLines);
                }}
                placeholder={`Notice line ${i+1}...`}
                maxLength={200}
              />
            </div>
          ))}
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
          <button
            type="submit"
            disabled={saving}
            style={{
              background: '#ea580c',
              color: '#fff',
              fontWeight: 700,
              padding: '12px 30px',
              borderRadius: 8,
              fontSize: 18,
              border: 'none',
              marginTop: 10,
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px #ea580c22',
              opacity: saving ? 0.7 : 1
            }}
          >{saving ? 'Saving...' : 'Save Notice Board'}</button>
        </form>
      )}
    </div>
  );
}

export default AdminDashboard;