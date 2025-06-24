import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import TestResults from '../components/TestResults';
import '../components/TestResults.css';

const ProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [savingField, setSavingField] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const fileInputRef = React.useRef();
const userIdRef = React.useRef(null); // Cache the authenticated user id

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        
        const user = userData?.user;
        if (!user?.id) {
          setError('User not logged in or user ID missing.');
          setLoading(false);
          return;
        }
        userIdRef.current = user.id; // Cache the authenticated user id

        // Initial profile data from user metadata
        const meta = user.user_metadata || {};
        let profileData = {
          id: user.id,
          full_name: meta.name || meta.full_name || '',
          father_name: meta.father_name || '',
          email: user.email || '',
          phone: meta.mobile || meta.phone || '',
          class: meta.class || '',
          profile_image: meta.profile_image || '',
        };

        // Fetch from profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          profileData = { ...profileData, ...data };
        } else {
          // Insert new profile if doesn't exist
          const { error: insertError } = await supabase.from('profiles').insert([profileData]);
          if (insertError) console.error('Profile insert error:', insertError);
        }

        // If 'centre' column exists and is non-empty, fetch the centre name from the 'centre' table
        if (profileData.centre && String(profileData.centre).trim() !== '') {
          try {
            const { data: centre, error: centreError } = await supabase
              .from('centres')
              .select('name')
              .eq('id', profileData.centre)
              .single();
            if (!centreError && centre && centre.name) {
              profileData.centre_name = centre.name;
            } else {
              profileData.centre_name = '';
            }
          } catch (err) {
            profileData.centre_name = '';
          }
        } else {
          profileData.centre_name = '';
        }

        setProfile(profileData);
        setAvatarPreview(profileData.profile_image);
      } catch (err) {
        setError(`Failed to load profile: ${err.message}`);
        console.error('Profile error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarChange = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image must be less than 10MB');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      // Remove old image if exists
      if (profile.profile_image) {
        const oldPath = profile.profile_image.split('/').pop();
        await supabase.storage.from('profile-photos').remove([oldPath]);
      }

      // Upload new image
      const fileExt = file.name.split('.').pop();
      const userId = userIdRef.current;
      if (!userId) {
        setUploadError('User ID not available. Please reload the page and try again.');
        setUploading(false);
        return;
      }
      const filePath = `avatars/${userId}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data, error: publicUrlError } = await supabase.storage
        .from('profile-photos')
        .getPublicUrl(filePath);
      if (publicUrlError || !data?.publicUrl) {
        throw publicUrlError || new Error('Failed to get public URL for uploaded image.');
      }
      const publicUrl = data.publicUrl;

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_image: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      setProfile(p => ({ ...p, profile_image: publicUrl }));
      setAvatarPreview(publicUrl);
    } catch (err) {
      let msg = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
      setUploadError('Failed to upload avatar: ' + msg);
      console.error('Avatar upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      if (profile.profile_image) {
        const oldPath = profile.profile_image.split('/').pop();
        await supabase.storage.from('profile-photos').remove([oldPath]);
      }

      const userId = userIdRef.current;
      const { error } = await supabase
        .from('profiles')
        .update({ profile_image: null })
        .eq('id', userId);

      if (error) throw error;

      setProfile(p => ({ ...p, profile_image: null }));
      setAvatarPreview(null);
    } catch (err) {
      setUploadError(err.message);
      console.error('Avatar remove error:', err);
    }
  };

  const handleFieldUpdate = async (field) => {
    if (!fieldValue.trim()) {
      setFieldError(`${field} cannot be empty`);
      return;
    }

    setSavingField(true);
    setFieldError('');

    try {
      const userId = userIdRef.current;
      const { error } = await supabase
        .from('profiles')
        .update({ [field]: fieldValue })
        .eq('id', userId);

      if (error) throw error;

      setProfile(p => ({ ...p, [field]: fieldValue }));
      setEditingField(null);
    } catch (err) {
      setFieldError(`Failed to update ${field}: ${err.message}`);
      console.error('Update error:', err);
    } finally {
      setSavingField(false);
    }
  };

  if (loading) return <div className="loader">Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-col-container">
      <div className="profile-col-card">
        <div className="profile-col-avatar">
          <div className="profile-col-avatar-wrapper">
            <img
              src={avatarPreview ? `${avatarPreview}?t=${Date.now()}` : 'https://yfxhswegzytlpjchmtsj.supabase.co/storage/v1/object/public/website-assets//web-app-manifest-512x512.png'}
              alt="Profile"
              className="profile-col-avatar-img"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://yfxhswegzytlpjchmtsj.supabase.co/storage/v1/object/public/website-assets//web-app-manifest-512x512.png'; }}
            />
            <button
              className="profile-col-avatar-edit"
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              aria-label="Change profile picture"
            >
              <svg width="20" height="20" fill="none" stroke="#1976d2" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13h3l9-9a2.121 2.121 0 00-3-3l-9 9v3z" />
              </svg>
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
          </div>
          {uploadError && <div className="profile-col-error-message">{uploadError}</div>}
          {profile.centre_name && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.7em' }}>
              <span className="profile-centre-highlight">{profile.centre_name}</span>
            </div>
          )}
        </div>
        <div className="profile-col-details">
          <div className="profile-col-row">
            <div className="profile-col-label">Full Name</div>
            <div className="profile-col-value">
              {editingField === 'full_name' ? (
                <span className="profile-col-edit-inline">
                  <input
                    className="profile-col-input"
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="profile-col-save"
                    onClick={() => handleFieldUpdate('full_name')}
                    disabled={savingField}
                    aria-label="Save"
                  >
                    <svg width="16" height="16" fill="none" stroke="#1976d2" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </button>
                  <button
                    className="profile-col-cancel"
                    onClick={() => { setEditingField(null); setFieldError(''); }}
                    aria-label="Cancel"
                  >
                    <svg width="16" height="16" fill="none" stroke="#d32f2f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                  {fieldError && <span className="profile-col-error-message">{fieldError}</span>}
                </span>
              ) : (
                <>
                  <span>{profile.full_name || '-'}</span>
                  <button
                    className="profile-col-edit"
                    onClick={() => { setEditingField('full_name'); setFieldValue(profile.full_name || ''); }}
                    aria-label="Edit Full Name"
                  >
                    <svg width="16" height="16" fill="none" stroke="#1976d2" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 013 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="profile-col-row">
            <div className="profile-col-label">Father's Name</div>
            <div className="profile-col-value">
              {editingField === 'father_name' ? (
                <span className="profile-col-edit-inline">
                  <input
                    className="profile-col-input"
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="profile-col-save"
                    onClick={() => handleFieldUpdate('father_name')}
                    disabled={savingField}
                    aria-label="Save"
                  >
                    <svg width="16" height="16" fill="none" stroke="#1976d2" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </button>
                  <button
                    className="profile-col-cancel"
                    onClick={() => { setEditingField(null); setFieldError(''); }}
                    aria-label="Cancel"
                  >
                    <svg width="16" height="16" fill="none" stroke="#d32f2f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                  {fieldError && <span className="profile-col-error-message">{fieldError}</span>}
                </span>
              ) : (
                <>
                  <span>{profile.father_name || '-'}</span>
                  <button
                    className="profile-col-edit"
                    onClick={() => { setEditingField('father_name'); setFieldValue(profile.father_name || ''); }}
                    aria-label="Edit Father's Name"
                  >
                    <svg width="16" height="16" fill="none" stroke="#1976d2" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 013 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="profile-col-row">
            <div className="profile-col-label">Email</div>
            <div className="profile-col-value">
              <span>{profile.email || '-'}</span>
            </div>
          </div>
          <div className="profile-col-row">
            <div className="profile-col-label">Phone</div>
            <div className="profile-col-value">
              {editingField === 'phone' ? (
                <span className="profile-col-edit-inline">
                  <input
                    className="profile-col-input"
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="profile-col-save"
                    onClick={() => handleFieldUpdate('phone')}
                    disabled={savingField}
                    aria-label="Save"
                  >
                    <svg width="16" height="16" fill="none" stroke="#1976d2" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </button>
                  <button
                    className="profile-col-cancel"
                    onClick={() => { setEditingField(null); setFieldError(''); }}
                    aria-label="Cancel"
                  >
                    <svg width="16" height="16" fill="none" stroke="#d32f2f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                  {fieldError && <span className="profile-col-error-message">{fieldError}</span>}
                </span>
              ) : (
                <>
                  <span>{profile.phone || '-'}</span>
                  <button
                    className="profile-col-edit"
                    onClick={() => { setEditingField('phone'); setFieldValue(profile.phone || ''); }}
                    aria-label="Edit Phone"
                  >
                    <svg width="16" height="16" fill="none" stroke="#1976d2" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 013 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="profile-col-row">
            <div className="profile-col-label">Class</div>
            <div className="profile-col-value">
              {editingField === 'class' ? (
                <span className="profile-col-edit-inline">
                  <input
                    className="profile-col-input"
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="profile-col-save"
                    onClick={() => handleFieldUpdate('class')}
                    disabled={savingField}
                    aria-label="Save"
                  >
                    <svg width="16" height="16" fill="none" stroke="#1976d2" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </button>
                  <button
                    className="profile-col-cancel"
                    onClick={() => { setEditingField(null); setFieldError(''); }}
                    aria-label="Cancel"
                  >
                    <svg width="16" height="16" fill="none" stroke="#d32f2f" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                  {fieldError && <span className="profile-col-error-message">{fieldError}</span>}
                </span>
              ) : (
                <>
                  <span>{profile.class || '-'}</span>
                  <button
                    className="profile-col-edit"
                    onClick={() => { setEditingField('class'); setFieldValue(profile.class || ''); }}
                    aria-label="Edit Class"
                  >
                    <svg width="16" height="16" fill="none" stroke="#1976d2" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 013 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    <style jsx>{`
      
        .profile-col-card {
          background: #fff;
          border-radius: 16px;
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: 1.5rem 0 1.5rem 0;
          box-sizing: border-box;
        }
        .profile-col-avatar {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 0;
          margin-right: 2.1rem;
        }
        .profile-col-avatar-wrapper {
          position: relative;
          margin-bottom: 0.8rem;
        }
        .profile-col-avatar-img {
          width: 128px;
          height: 128px;
          border-radius: 50%;
          object-fit: cover;
          border: 3.5px solid #1976d2;
          background: #f6f8fa;
        }
        .profile-col-avatar-edit {
          position: absolute;
          bottom: 7px;
          right: 7px;
          background: #fff;
          border: 1.5px solid #1976d2;
          border-radius: 50%;
          padding: 0.23rem;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(25, 118, 210, 0.09);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .profile-col-avatar-edit:hover {
          background: #e3f0fc;
        }
        .profile-col-avatar-edit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .profile-col-avatar-remove {
          background: none;
          color: #d32f2f;
          font-weight: 500;
          border: none;
          margin-top: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .profile-col-avatar-remove:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .profile-col-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 0;
        }
        .profile-col-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0.7rem 0;
          border-bottom: 1px solid #e6eaf0;
          width: 100%;
        }
        .profile-col-label {
          flex: 0 0 110px;
          color: #6a7280;
          font-weight: 600;
          font-size: 1rem;
          text-align: left;
        }
        .profile-col-value {
}

.profile-centre-highlight {
  background: linear-gradient(90deg, #e3f0fc 40%, #b3e5fc 100%);
  color: #1976d2;
  font-weight: bold;
  border-radius: 6px;
  padding: 0.18em 0.75em;
  font-size: 1.09rem;
  box-shadow: 0 1px 7px 0 rgba(25,118,210,0.07);
  letter-spacing: 0.02em;
  display: inline-block;
}
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #1a1a1a;
          font-size: 1.05rem;
        }
        .profile-col-edit {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.13rem 0.13rem 0.13rem 0.23rem;
          border-radius: 0.2rem;
          display: flex;
          align-items: center;
          transition: background 0.2s;
        }
        .profile-col-edit:hover {
          background: #e3f0fc;
        }
        .profile-col-edit-inline {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .profile-col-input {
          border: 1.5px solid #b7c6e2;
          border-radius: 0.5rem;
          padding: 0.5rem 0.85rem;
          font-size: 1.01rem;
          background: #f6f8fa;
          min-width: 120px;
        }
        .profile-col-input:focus {
          outline: none;
          border-color: #1976d2;
          background: #e3f0fc;
        }
        .profile-col-save, .profile-col-cancel {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.13rem 0.13rem;
          border-radius: 0.2rem;
          display: flex;
          align-items: center;
          transition: background 0.2s;
        }
        .profile-col-save:hover {
          background: #e3f0fc;
        }
        .profile-col-cancel:hover {
          background: #fdeaea;
        }
        .profile-col-error-message {
          color: #d32f2f;
          font-size: 0.97rem;
          margin-left: 0.4rem;
          font-weight: 600;
        }
        @media (max-width: 600px) {
          .profile-col-card {
            flex-direction: column;
            align-items: center;
            padding: 1.1rem 0.2rem 1rem 0.2rem;
            border-radius: 12px;
          }
          .profile-col-avatar {
            margin-right: 0;
            margin-bottom: 1.2rem;
          }
          .profile-col-avatar-img {
            width: 180px;
            height: 180px;
            border-width: 3px;
          }
          .profile-col-label {
            flex-basis: 90px;
            font-size: 0.95rem;
          }
          .profile-col-input {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .avatar-section-new {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.6rem;
        }
        .avatar-wrapper-new {
          position: relative;
          margin-bottom: 1.1rem;
        }
        .avatar-image-new {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #4F8EF7;
          background: #f7fafd;
          transition: box-shadow 0.2s;
        }
        .avatar-edit-button-new {
          position: absolute;
          bottom: 6px;
          right: 6px;
          background: #fff;
          border: 1.5px solid #4F8EF7;
          border-radius: 50%;
          padding: 0.32rem;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(79, 142, 247, 0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .avatar-edit-button-new:hover {
          background: #eaf2fe;
        }
        .avatar-edit-button-new:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .remove-avatar-button-new {
          background: none;
          color: #F75E5E;
          font-weight: 500;
          border: none;
          margin-top: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .remove-avatar-button-new:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .profile-header-new {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .profile-name-new {
          font-size: 1.7rem;
          font-weight: 700;
          color: #2d3846;
          margin-bottom: 0.1rem;
        }
        .profile-email-new {
          font-size: 1.04rem;
          color: #4F8EF7;
          font-weight: 500;
        }
        .profile-fields-new {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .profile-field-new {
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
        }
        .field-label-new {
          font-weight: 600;
          color: #8692a6;
          font-size: 0.98rem;
          margin-bottom: 0.18rem;
        }
        .view-field-group-new {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e6eaf0;
          padding: 0.65rem 0 0.1rem 0;
        }
        .field-value-new {
          font-weight: 500;
          color: #2d3846;
          font-size: 1.06rem;
          flex: 1;
        }
        .edit-button-new {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.18rem 0.18rem 0.18rem 0.3rem;
          border-radius: 0.3rem;
          display: flex;
          align-items: center;
          transition: background 0.2s;
        }
        .edit-button-new:hover {
          background: #eaf2fe;
        }
        .edit-field-group-new {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          align-items: flex-start;
          margin-top: 0.1rem;
        }
        .edit-input-new {
          border: 1.5px solid #b7c6e2;
          border-radius: 0.5rem;
          padding: 0.6rem 1rem;
          font-size: 1.03rem;
          width: 190px;
          background: #f7fafd;
          transition: border-color 0.2s;
        }
        .edit-input-new:focus {
          outline: none;
          border-color: #4F8EF7;
          background: #eaf2fe;
        }
        .edit-buttons-new {
          display: flex;
          gap: 0.3rem;
          align-items: center;
        }
        .save-button-new, .cancel-button-new {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.18rem 0.18rem;
          border-radius: 0.3rem;
          display: flex;
          align-items: center;
          transition: background 0.2s;
        }
        .save-button-new:hover {
          background: #eaf2fe;
        }
        .cancel-button-new:hover {
          background: #fbeaea;
        }
        .error-message-new {
          color: #F75E5E;
          font-size: 0.97rem;
          margin-top: 0.18rem;
          font-weight: 600;
        }
        @media (max-width: 600px) {
          .profile-card-new {
            padding: 1.1rem 0.2rem 1rem 0.2rem;
            border-radius: 12px;
          }
          .avatar-image-new {
            width: 70px;
            height: 70px;
            border-width: 2px;
          }
          .edit-input-new {
            width: 100%;
            min-width: 0;
          }
        }
      `}</style>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');
  const [passError, setPassError] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data?.user?.email || '');
    };
    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassMsg('');
    setPassError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPassError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError('Passwords do not match');
      return;
    }

    setPassLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error('User email not found');

      // Verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      });

      if (signInError) throw signInError;

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setPassMsg('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPassError(err.message);
      console.error('Password change error:', err);
    } finally {
      setPassLoading(false);
    }
  };

  const tabs = [
    // Dashboard: Home/Speedometer
    { name: 'Dashboard', key: 'dashboard', icon: 'M12 3C7.03 3 3 7.03 3 12h3a6 6 0 1112 0h3c0-4.97-4.03-9-9-9zm0 18a9 9 0 01-9-9h3a6 6 0 0012 0h3a9 9 0 01-9 9z' },
    // Profile: User Circle
    { name: 'Profile', key: 'profile', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
    // Test Paper: Document Text
    { name: 'Test Paper', key: 'testpaper', icon: 'M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V8l-6-6H7zm7 1.5V9h5.5L14 3.5zM8 13h8v2H8v-2zm0 4h5v2H8v-2z' },
    // Test Results: Chart Bar
    { name: 'Test Results', key: 'testresults', icon: 'M3 17h2v-7H3v7zm4 0h2v-4H7v4zm4 0h2V7h-2v10zm4 0h2v-2h-2v2zm4 0h2v-9h-2v9z' },
    // Payments: Credit Card
    { name: 'Payments', key: 'payments', icon: 'M2 7h20v2H2V7zm0 4h20v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6zm4 4a1 1 0 100 2 1 1 0 000-2z' },
    // Notice: Bell
    { name: 'Notice', key: 'notice', icon: 'M18 16v-5a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2zm-6 5a2 2 0 002-2h-4a2 2 0 002 2z' },
    // Change Password: Key
    { name: 'Change Password', key: 'changepassword', icon: 'M7 14a2 2 0 114 0h6a2 2 0 110 4h-6a2 2 0 11-4 0v-4zm2 0v-2a4 4 0 118 0v2' },
  ];

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <img
          src="/logo.png"
          alt="Vardaan Learning Institute"
          className="logo"
        />
        <div className="spacer" />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="logo-container">
          <img
            src="/logo.png"
            alt="Vardaan Learning Institute"
            className="sidebar-logo"
            onClick={() => navigate('/')}
          />
        </div>

        <nav className="sidebar-nav">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`nav-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.key);
                setSidebarOpen(false);
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
              </svg>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>

        <div className="user-section">
          <div className="user-email">{userEmail}</div>
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content no-scroll">
        <div className="content-card">
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <h1>Welcome to Your Dashboard</h1>
              <p>Overview and quick links will appear here.</p>
            </div>
          )}

          {activeTab === 'profile' && <ProfileTab />}

          {activeTab === 'payments' && (
            <div className="tab-content">
              <h1>Payments</h1>
              <p>Your payment history and options will appear here.</p>
            </div>
          )}

          {activeTab === 'notice' && (
            <div className="tab-content">
              <h1>Notice</h1>
              <p>Notices and updates will appear here.</p>
            </div>
          )}

          {activeTab === 'changepassword' && (
            <div className="password-change-form">
              <h1>Change Password</h1>
              <form onSubmit={handlePasswordSubmit} className="change-password-inline-form">
                <input
                  type="password"
                  id="currentPassword"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="inline-password-input"
                />
                <input
                  type="password"
                  id="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="inline-password-input"
                />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="inline-password-input"
                />
                <button
                  type="submit"
                  className="submit-button inline-password-btn"
                  disabled={passLoading}
                >
                  {passLoading ? 'Changing...' : 'Change Password'}
                </button>
                {passError && <div className="error-message" style={{marginLeft: 12}}>{passError}</div>}
                {passMsg && <div className="success-message" style={{marginLeft: 12}}>{passMsg}</div>}
              </form>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8fafc;
        }

        /* Mobile Header */
        .mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 40;
        }

        @media (min-width: 768px) {
          .mobile-header {
            display: none;
          }
        }

        .sidebar-toggle {
          color: #f97316;
          background: none;
          border: none;
          cursor: pointer;
        }

        .logo {
          height: 2.5rem;
          filter: invert(53%) sepia(34%) saturate(2871%) hue-rotate(346deg) brightness(94%) contrast(86%);
        }

        .spacer {
          width: 2rem;
        }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 16rem;
          background-color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 50;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 0;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        @media (min-width: 768px) {
          .sidebar {
            transform: translateX(0);
            position: sticky;
            top: 0;
            height: 100vh;
          }
        }

        .sidebar-header {
          display: flex;
          justify-content: flex-end;
          padding: 0 1.5rem 1rem;
        }

        @media (min-width: 768px) {
          .sidebar-header {
            display: none;
          }
        }

        .sidebar-close {
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          padding: 0 1.5rem;
        }

        .sidebar-logo {
          height: 4rem;
          cursor: pointer;
          filter: invert(53%) sepia(34%) saturate(2871%) hue-rotate(346deg) brightness(94%) contrast(86%);
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 1rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          color: #4b5563;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background-color: #f3f4f6;
          color: #1f2937;
        }

        .nav-item.active {
          background-color: #fff7ed;
          color: #f97316;
        }

        .user-section {
          padding: 1.5rem;
          border-top: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .user-email {
          font-size: 0.875rem;
          color: #6b7280;
          word-break: break-all;
          text-align: center;
        }

        .logout-button {
          background: linear-gradient(to right, #f97316, #fb923c);
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-button:hover {
          background: linear-gradient(to right, #ea580c, #f97316);
        }

        /* Main Content */
        .main-content, .dashboard-container, .content-card, html, body {
          overflow: hidden !important;
        }
        .main-content.no-scroll {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2.5rem 1rem 2.5rem 1rem;
          min-height: 100vh;
        }

        .content-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
          width: 100%;
          max-width: 48rem;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 0;
          min-height: 60vh;
        }
        .change-password-inline-form {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .inline-password-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          min-width: 0;
          max-width: none;
        }
          border-radius: 0.5rem;
          font-size: 1rem;
        }
        .inline-password-btn {
          padding: 0.5rem 1.25rem;
          white-space: nowrap;
        }
        @media (max-width: 600px) {
          .change-password-inline-form {
            flex-direction: column;
            align-items: stretch;
            gap: 0.5rem;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            padding: 2rem;
          }
        }

        h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        p {
          color: #6b7280;
        }

        /* Password Change Form */
        .password-change-form {
          max-width: 28rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }

        input:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }

        .error-message {
          color: #ef4444;
          margin: 0.5rem 0;
          font-size: 0.875rem;
        }

        .success-message {
          color: #10b981;
          margin: 0.5rem 0;
          font-size: 0.875rem;
        }

        .submit-button {
          background: linear-gradient(to right, #f97316, #fb923c);
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          margin-top: 1rem;
        }

        .submit-button:hover {
          background: linear-gradient(to right, #ea580c, #f97316);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;