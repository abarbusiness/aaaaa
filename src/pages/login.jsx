import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    // Redirect logged-in users away from /login
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate('/dashboard');
        return;
      }
      // Handle OAuth redirect logic
      const params = new URLSearchParams(window.location.hash.replace('#', '?'));
      if (params.get('access_token')) {
        navigate('/dashboard');
        return;
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      if (error.message && error.message.toLowerCase().includes('oauth')) {
        setError('This account was registered with Google. Please use "Sign in with Google".');
      } else {
        setError('Invalid email or password');
      }
      return;
    }
    navigate('/dashboard');
  };


  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError(error.message);
    setLoading(false);
  };



  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-orange-50 px-4 py-8 md:pt-24">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border border-orange-200">
        <h2 className="text-3xl font-bold text-orange-700 text-center mb-2">Login to your account</h2>
        {/* <p className="text-orange-500 text-center mb-8">Enter your email below to login to your account</p> */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-orange-700 font-semibold">Email</label>
            <input
              id="email"
              type="email"
              className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 text-orange-700 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-orange-700 font-semibold">Password</label>
              <Link to="/forgot-password" className="text-sm text-orange-500 hover:underline">Forgot your password?</Link>
            </div>
            <input
              id="password"
              type="password"
              className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 text-orange-700 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-semibold rounded-lg py-3 mt-2 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-orange-300 shadow-lg shadow-orange-500/30 transition-colors"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && (
            <div className="text-orange-600 mt-2 text-center text-sm">
              {typeof error === 'string' ? error : error?.message || JSON.stringify(error)}
            </div>
          )}
        </form>
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-orange-200" />
          <span className="mx-4 text-orange-400 text-sm">Or continue with</span>
          <div className="flex-1 h-px bg-orange-200" />
        </div>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white border border-orange-300 text-orange-700 rounded-lg py-3 font-semibold hover:bg-orange-50 transition-colors mb-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.6 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.8 5.5 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15 17.2 19.1 14 24 14c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.8 5.5 29.1 4 24 4c-7.6 0-14.1 4.3-17.7 10.7z"/>
              <path fill="#FBBC05" d="M24 44c5.8 0 10.6-1.9 14.1-5.1l-6.5-5.3c-2 1.4-4.5 2.4-7.6 2.4-5.7 0-10.5-3.9-12.2-9.1l-7 5.4C9.8 40.1 16.3 44 24 44z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.8 5.5 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z" opacity=".2"/>
            </g>
          </svg>
          Login with Google
        </button>
        <div className="text-center mt-6 text-orange-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-700 underline hover:text-orange-500">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
