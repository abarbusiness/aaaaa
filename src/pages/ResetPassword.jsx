import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your new password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center bg-orange-50 px-2 xs:px-0" style={{minHeight: 'calc(100vh - 4rem)', height: 'calc(100vh - 4rem)', overflow: 'hidden', paddingTop: 120}}>
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-4 animate-slide-up bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-orange-700 mb-2">Reset Your Password</h2>
        <div className="mb-4 text-orange-600 text-center text-base">
          You have used a secure link to reset your password.<br />
          Please choose a new password below.<br />
          <span className="text-xs text-orange-500">This link is valid for a limited time and will log you in after resetting your password.</span>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="password"
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-700 placeholder-orange-400 caret-orange-700"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-700 placeholder-orange-400 caret-orange-700"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Set New Password'}
          </button>
        </form>
        {error && <div className="text-orange-600 mt-2 font-semibold">{error}</div>}
        {success && <div className="text-green-600 mt-2 font-semibold">{success}</div>}
      </div>
    </div>
  );
};

export default ResetPassword;
