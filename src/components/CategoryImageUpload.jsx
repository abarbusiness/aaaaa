import React, { useState } from 'react';
import supabase from '../supabaseClient';

export default function CategoryImageUpload({ category, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB.');
      return;
    }
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${category.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('category-images').upload(fileName, file, {
        upsert: true,
        cacheControl: '3600',
      });
      if (uploadError) {
        setError('Upload failed: ' + uploadError.message);
        setUploading(false);
        return;
      }
      const { data: publicUrlData } = await supabase.storage.from('category-images').getPublicUrl(fileName);
      const imageUrl = publicUrlData.publicUrl;
      const { error: updateErr } = await supabase.from('category').update({ image: imageUrl }).eq('id', category.id);
      if (updateErr) {
        setError('Failed to update category: ' + updateErr.message);
        setUploading(false);
        return;
      }
      onUpload && onUpload(imageUrl);
    } catch {
      setError('Unexpected error occurred.');
    }
    setUploading(false);
  };

  return (
    <div style={{ marginTop: 8 }}>
      <label style={{ fontWeight: 600, color: '#ea580c' }}>
        Category Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ marginLeft: 8 }}
        />
      </label>
      {uploading && <span style={{ marginLeft: 12, color: '#fb923c' }}>Uploading...</span>}
      {error && <div style={{ color: 'red', marginTop: 4 }}>{error}</div>}
    </div>
  );
}
