import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

export default function CentreManagement() {
  const [centres, setCentres] = useState([]);
  const [newCentre, setNewCentre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCentres();
  }, []);

  async function fetchCentres() {
    setLoading(true);
    setError('');
    const { data, error } = await supabase.from('centres').select('*').order('name');
    if (error) setError('Failed to fetch centres');
    else setCentres(data || []);
    setLoading(false);
  }

  async function handleAddCentre(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!newCentre.trim()) {
      setError('Centre name required');
      return;
    }
    const { error } = await supabase.from('centres').insert([{ name: newCentre.trim() }]);
    if (error) setError('Failed to add centre');
    else {
      setSuccess('Centre added');
      setNewCentre('');
      fetchCentres();
    }
  }

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: 22, color: '#ea580c', fontWeight: 800, marginBottom: 18 }}>Centre Management</h2>
      <form onSubmit={handleAddCentre} style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <input
          value={newCentre}
          onChange={e => setNewCentre(e.target.value)}
          placeholder="Add new centre"
          style={{ padding: 10, borderRadius: 8, border: '1.5px solid #ea580c66', fontSize: 17, width: 220 }}
        />
        <button type="submit" style={{ background: '#ea580c', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 24px', fontWeight: 700, fontSize: 16 }}>
          Add Centre
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
      <div style={{ marginTop: 18 }}>
        <h3 style={{ fontWeight: 700, color: '#ea580c', marginBottom: 8 }}>All Centres</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul style={{ paddingLeft: 20 }}>
            {centres.map(c => (
              <li key={c.id} style={{ marginBottom: 8 }}>{c.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
