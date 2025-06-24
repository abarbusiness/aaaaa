import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password reset email sent! Please check your inbox.');
    }
  };

  return (
    <div className="w-screen flex items-center justify-center bg-orange-50 px-2 xs:px-0" style={{minHeight: 'calc(100vh - 4rem)', height: 'calc(100vh - 4rem)', overflow: 'hidden', paddingTop: 120}}>
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-4 animate-slide-up bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Forgot Password?</h2>
        <p className="mb-4 text-orange-600 text-center">Enter your email address and we'll send you a link to reset your password.</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-700 placeholder-orange-400 caret-orange-700"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
        {error && <div className="text-orange-600 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
        <Link to="/login" className="mt-4 text-orange-500 hover:underline">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
