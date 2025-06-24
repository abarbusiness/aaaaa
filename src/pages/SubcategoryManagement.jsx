import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

// Slugify helper function
function slugify(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function SubcategoryManagement({ categories, subcategories, setSubcategories, selectedCategoryId, setSelectedCategoryId }) {
  const [newSubcategory, setNewSubcategory] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editSubcatId, setEditSubcatId] = useState(null);
  const [editSubcatName, setEditSubcatName] = useState('');

  useEffect(() => {
    async function fetchSubcategories() {
      if (!selectedCategoryId) return;
      setSaving(true);
      setError('');
      const { data, error: fetchError } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category_id', selectedCategoryId);
      if (!fetchError) {
        setSubcategories({
          ...subcategories,
          [selectedCategoryId]: data || []
        });
      } else {
        setError(fetchError.message || 'Failed to fetch subcategories.');
      }
      setSaving(false);
    }
    fetchSubcategories();
    // eslint-disable-next-line
  }, [selectedCategoryId]);

  const handleAddSubcategory = async () => {
    setError('');
    if (!selectedCategoryId || !newSubcategory) {
      setError('Select a category and enter a subcategory name.');
      return;
    }
    setSaving(true);
    const newSlug = slugify(newSubcategory);
    const { data, error: insertError } = await supabase.from('subcategories').insert([{ name: newSubcategory, category_id: selectedCategoryId, slug: newSlug }]).select();
    if (!insertError && data && data[0]) {
      setSubcategories({
        ...subcategories,
        [selectedCategoryId]: [...(subcategories[selectedCategoryId] || []), data[0]]
      });
      setNewSubcategory('');
    } else if (insertError) {
      setError(insertError.message || 'Failed to add subcategory.');
    }
    setSaving(false);
  };

  const handleDeleteSubcategory = async (subcatId) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) return;
    setSaving(true);
    const { error: deleteError } = await supabase.from('subcategories').delete().eq('id', subcatId);
    if (!deleteError) {
      setSubcategories({
        ...subcategories,
        [selectedCategoryId]: (subcategories[selectedCategoryId] || []).filter(s => s.id !== subcatId)
      });
    } else {
      setError(deleteError.message || 'Failed to delete subcategory.');
    }
    setSaving(false);
  };

  const handleEditSubcategory = (subcat) => {
    setEditSubcatId(subcat.id);
    setEditSubcatName(subcat.name);
  };

  const saveEditSubcategory = async () => {
    if (!editSubcatName) return;
    setSaving(true);
    const newSlug = slugify(editSubcatName);
    // Get old subcategory name before update
    const oldSubcat = (subcategories[selectedCategoryId] || []).find(s => s.id === editSubcatId);
    const oldName = oldSubcat ? oldSubcat.name : '';
    const { error: updateError } = await supabase.from('subcategories').update({ name: editSubcatName, slug: newSlug }).eq('id', editSubcatId);
    if (!updateError) {
      setSubcategories({
        ...subcategories,
        [selectedCategoryId]: (subcategories[selectedCategoryId] || []).map(s => s.id === editSubcatId ? { ...s, name: editSubcatName, slug: newSlug } : s)
      });
      setEditSubcatId(null);
      setEditSubcatName('');
      // --- Update all articles with this subcategory name ---
      // Find category name for this subcategory
      const categoryObj = categories.find(cat => cat.id === selectedCategoryId);
      const categoryName = categoryObj ? categoryObj.name : '';
      // Use the updateArticlesForCategoryOrSubcategoryChange function from admindashboard.jsx
      if (window.updateArticlesForCategoryOrSubcategoryChange) {
        await window.updateArticlesForCategoryOrSubcategoryChange({
          updatedSubcategory: {
            id: editSubcatId,
            name: editSubcatName,
            oldName,
            categoryName
          }
        });
      }
    } else {
      setError(updateError.message || 'Failed to update subcategory.');
    }
    setSaving(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ color: '#ea580c', fontWeight: 800, fontSize: 28, marginBottom: 18 }}>Subcategory Management</h2>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 600, color: '#ea580c' }}>Select Category:</label>
        <select
          value={selectedCategoryId}
          onChange={e => setSelectedCategoryId(Number(e.target.value))}
          style={{ marginLeft: 12, padding: 8, borderRadius: 6, border: '1.5px solid #ea580c66', fontSize: 16 }}
        >
          <option value=''>-- Select --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {selectedCategoryId && (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
            <input
              value={newSubcategory}
              onChange={e => setNewSubcategory(e.target.value)}
              placeholder="Add new subcategory"
              style={{ padding: 10, borderRadius: 8, border: '1.5px solid #ea580c66', fontSize: 16, width: 200 }}
            />
            <button
              onClick={handleAddSubcategory}
              disabled={saving}
              style={{ padding: '10px 18px', background: '#ea580c', color: 'white', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 1px 4px #ea580c0b' }}
            >
              Add
            </button>
          </div>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {(subcategories[selectedCategoryId] || []).length === 0 ? (
              <li style={{ color: '#888', fontStyle: 'italic', marginBottom: 10 }}>
                No subcategories yet.
              </li>
            ) : (
              (subcategories[selectedCategoryId] || []).map(subcat => (
                <li key={subcat.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                  {editSubcatId === subcat.id ? (
                    <>
                      <input
                        value={editSubcatName}
                        onChange={e => setEditSubcatName(e.target.value)}
                        style={{ padding: 7, borderRadius: 7, border: '1.5px solid #ea580c66', fontSize: 15, width: 160 }}
                      />
                      <button onClick={saveEditSubcategory} disabled={saving} style={{ background: '#ea580c', color: 'white', border: 'none', borderRadius: 6, padding: '7px 16px', fontWeight: 700 }}>Save</button>
                      <button onClick={() => { setEditSubcatId(null); setEditSubcatName(''); }} style={{ background: '#eee', color: '#888', border: 'none', borderRadius: 6, padding: '7px 14px' }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <span style={{ fontWeight: 600, fontSize: 17 }}>{subcat.name}</span>
                      <button onClick={() => handleEditSubcategory(subcat)} style={{ background: '#fff7ed', color: '#ea580c', border: '1.2px solid #ea580c44', borderRadius: 6, padding: '6px 14px', marginLeft: 6, fontWeight: 700, cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleDeleteSubcategory(subcat.id)} style={{ background: '#fff0f0', color: '#d32f2f', border: '1.2px solid #d32f2f44', borderRadius: 6, padding: '6px 14px', marginLeft: 6, fontWeight: 700, cursor: 'pointer' }}>Delete</button>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default SubcategoryManagement;
