import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Loader2, Eye, EyeOff, CheckCircle, Brain, Network, Zap } from 'lucide-react';
import Logo from '../components/Logo';
import { API_BASE } from '../services/api';
import NeuralNet from '../components/NeuralNet';
import AuthLandingPanel from '../components/AuthLandingPanel';

export default function SignUp() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState('');
  const [success,      setSuccess]      = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showMobileAuth, setShowMobileAuth] = useState(() => Boolean(location.state?.showAuth));

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const validate = () => {
    if (!form.fullName.trim())                  return 'Full name is required.';
    if (!form.email.trim())                     return 'Email is required.';
    if (form.password.length < 6)              return 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim(), password: form.password, fullName: form.fullName.trim() }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.message || 'Sign up failed. Please try again.'); return; }
      setSuccess(true);
    } catch {
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const LeftPanel = () => (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#030712] flex-col">
      <NeuralNet />
      <div className="absolute inset-0 bg-gradient-to-br from-[#030712]/60 via-transparent to-[#030712]/80 pointer-events-none" />

      <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/40">
          <Logo className="w-5 h-5" />
        </div>
        <span className="text-white font-black text-lg tracking-tight">CodeWorks Academy</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
        <div className="mb-5">
          <h1 className="text-4xl font-black text-white leading-tight mb-2">
            Learn. Build. Deploy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
              Ship real, secure and scalable software products.
            </span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            CodeWorks Academy Project pairs structured courses with AI-guided mentorship so that a vibecoder developer can ship software systems using low code technology.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Brain,   label: 'AI-Powered',   sub: 'Smart guidance' },
            { icon: Network, label: 'Full Stack',    sub: '7 live courses' },
            { icon: Zap,     label: 'Live Sessions', sub: 'Engage with experts' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 flex flex-col gap-1">
              <Icon className="w-4 h-4 text-sky-400" />
              <p className="text-white text-xs font-bold">{label}</p>
              <p className="text-slate-500 text-[10px]">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen flex">
        <LeftPanel />
        <div className="flex-1 lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 sm:p-10">
          <div className="w-full max-w-md text-center">
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">You're in! 🎉</h2>
            <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">
              We sent a confirmation link to <strong className="text-slate-700">{form.email}</strong>. Click it to activate your account, then sign in.
            </p>
            <Link
              to="/login"
              className="inline-block w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-sky-200 text-center"
            >
              Go to Sign In →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <LeftPanel />

      {!showMobileAuth && (
        <div className="lg:hidden">
          <AuthLandingPanel
            onSignIn={() => navigate('/login', { state: { showAuth: true } })}
            onCreateAccount={() => setShowMobileAuth(true)}
            description="CodeWorks Academy Project pairs structured courses with AI-guided mentorship so that a vibecoder developer can ship software systems using low code technology."
          />
        </div>
      )}

      {/* ── RIGHT — Sign Up Panel ── */}
      <div className={`${showMobileAuth ? 'flex' : 'hidden'} lg:flex flex-1 lg:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 sm:p-10 relative overflow-hidden`}>

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative w-full max-w-md">

          {showMobileAuth && (
            <button
              type="button"
              onClick={() => setShowMobileAuth(false)}
              className="mb-5 text-sm font-semibold text-slate-500 hover:text-sky-600 lg:hidden"
            >
              ← Back to landing
            </button>
          )}

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Logo className="w-5 h-5" />
            </div>
            <span className="text-slate-900 font-black text-lg">CodeWorks</span>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-2xl bg-slate-100 p-1 mb-8">
            <Link
              to="/login"
              state={{ showAuth: true }}
              className="flex-1 text-center py-2.5 rounded-xl text-slate-500 text-sm font-semibold hover:text-slate-700 transition-colors"
            >
              Sign In
            </Link>
            <span className="flex-1 text-center py-2.5 rounded-xl bg-white text-slate-900 text-sm font-bold shadow-sm">
              Create Account
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900">Start your journey 🚀</h2>
            <p className="text-slate-500 text-sm mt-1">Create a free account and begin learning today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Jane Doe"
                value={form.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:outline-none transition-all text-slate-900 placeholder-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:outline-none transition-all text-slate-900 placeholder-slate-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:outline-none transition-all text-slate-900 placeholder-slate-400 pr-12"
                  required
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:outline-none transition-all text-slate-900 placeholder-slate-400 pr-12"
                  required
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl">
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-sky-200 disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
                : 'Create Account →'
              }
            </button>

            <p className="text-center text-sm text-slate-500 pt-1">
              Already have an account?{' '}
              <Link to="/login" state={{ showAuth: true }} className="text-sky-600 hover:underline font-semibold">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
