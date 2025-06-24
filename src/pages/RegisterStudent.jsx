import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../supabaseClient';

const RegisterStudent = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    class: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // After Google sign-in, check if user needs to complete profile
  useEffect(() => {
    // Only run after OAuth redirect
    const params = new URLSearchParams(window.location.hash.replace('#', '?'));
    if (params.get('access_token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    // Try to sign up. If email is already registered, show a friendly error.
    let signUpResponse;
    try {
      signUpResponse = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: null, // disables redirect for email confirmation
          data: {
            name: form.name,
            full_name: form.name,
            class: form.class,
            mobile: form.mobile,
            phone: form.mobile,
          }
        }
      });
    } catch (err) {
      console.error('Supabase signUp threw:', err);
      setError('Unexpected error occurred during signup. Please try again later.');
      setLoading(false);
      return;
    }
    const { data, error: signUpError } = signUpResponse;
    if (signUpError) {
      console.error('Supabase signUp error:', signUpError);
      if (signUpError.message && signUpError.message.toLowerCase().includes('user already registered')) {
        setError('This email is already registered. Please log in or use a different email.');
      } else if (signUpError.message && signUpError.message.toLowerCase().includes('database')) {
        setError('A database error occurred while saving your registration. Please try again or contact support.');
      } else {
        setError(signUpError.message || 'An unknown error occurred.');
      }
      setLoading(false);
      return;
    }
    setSuccess('Registration successful! You can now log in.');
    setForm({ name: '', class: '', email: '', mobile: '', password: '' });
    setLoading(false);
    setTimeout(() => navigate('/login'), 1200);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Step-by-step signup flow
  const [step, setStep] = useState(1);
  const stepField = [
    {
      name: "email",
      type: "email",
      placeholder: "name@example.com",
      label: "Email",
      autoComplete: "email",
      validate: (val) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val),
      error: "Please enter a valid email address."
    },
    {
      name: "name",
      type: "text",
      placeholder: "Full Name",
      label: "Full Name",
      autoComplete: "name",
      validate: (val) => val.trim().length > 1,
      error: "Please enter your full name."
    },
    {
      name: "mobile",
      type: "tel",
      placeholder: "Mobile Number",
      label: "Mobile Number",
      autoComplete: "tel",
      validate: (val) => /^\d{10}$/.test(val),
      error: "Please enter a valid 10-digit mobile number."
    },
    {
      name: "class",
      type: "text",
      placeholder: "Class (e.g. 10th)",
      label: "Class",
      autoComplete: "off",
      validate: (val) => val.trim().length > 0,
      error: "Please enter your class."
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      autoComplete: "new-password",
      validate: (val) => val.length >= 6,
      error: "Password must be at least 6 characters."
    }
  ];

  const steps = stepField.map(f => f.label);
  const current = stepField[step - 1];

  const handleStepNext = async (e) => {
    e.preventDefault();
    setError("");
    // Validate current field using stepField's validate function
    if (current.validate && !current.validate(form[current.name])) {
      setError(current.error);
      return;
    }
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      // Last step: submit
      handleSubmit(e);
    }
  };

  const handleStepBack = (e) => {
    e.preventDefault();
    setError("");
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-orange-50 px-4 py-8 md:pt-24">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border border-orange-200">
        <h2 className="text-3xl font-bold text-orange-700 text-center mb-2">Create an account</h2>
        <p className="text-orange-500 text-center mb-8">Step {step} of {steps.length}: {current.label}</p>
        <form className="flex flex-col gap-4" onSubmit={handleStepNext}>
          <label className="text-orange-700 font-semibold" htmlFor={current.name}>{current.label}</label>
          <input
            id={current.name}
            name={current.name}
            type={current.type}
            placeholder={current.placeholder}
            autoComplete={current.autoComplete}
            value={form[current.name]}
            onChange={handleChange}
            className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 text-orange-700 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-2"
            required
          />
          <div className="flex gap-2 mt-2">
            {step > 1 && (
              <button type="button" onClick={handleStepBack} className="flex-1 bg-orange-100 text-orange-700 font-semibold rounded-lg py-3 hover:bg-orange-200 transition-colors">Back</button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-semibold rounded-lg py-3 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-orange-300 shadow-lg shadow-orange-500/30 transition-colors"
            >
              {step === steps.length ? (loading ? 'Registering...' : 'Finish') : 'Next'}
            </button>
          </div>
          {error && <div className="text-orange-600 mt-2 text-center text-sm">{typeof error === 'string' ? error : error?.message || JSON.stringify(error)}</div>}
          {success && <div className="text-green-600 mt-2 text-center text-sm">{success}</div>}
        </form>
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-orange-200" />
          <span className="mx-4 text-orange-400 text-sm">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-orange-200" />
        </div>
        <button
          type="button"
          onClick={async () => { setError(''); setLoading(true); const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' }); if (error) setError(error.message); setLoading(false); }}
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
          Sign Up with Google
        </button>
        <div className="text-center mt-6 text-orange-500 text-sm">
          By clicking continue, you agree to our{' '}
          <a href="#" className="text-orange-700 underline hover:text-orange-500">Terms of Service</a> and <a href="#" className="text-orange-700 underline hover:text-orange-500">Privacy Policy</a>.
        </div>
        <div className="text-center mt-2 text-orange-500">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-700 underline hover:text-orange-500">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
