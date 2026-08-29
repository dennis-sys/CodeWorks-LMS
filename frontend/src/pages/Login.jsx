import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';
import { Loader2, Brain, Cpu, Network, Zap } from 'lucide-react';
import Logo from '../components/Logo';
import NeuralNet from '../components/NeuralNet';

export default function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', data.user.id)
        .single();
      useAuthStore.getState().setUser(profile, data.session);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT — Neural Network ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#030712] flex-col">
        <NeuralNet />

        {/* Dark gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030712]/60 via-transparent to-[#030712]/80 pointer-events-none" />

        {/* Floating layer badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
          <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/40">
            <Logo className="w-5 h-5" />
          </div>
          <span className="text-white font-black text-lg tracking-tight">CodeWorks Academy</span>
        </div>

        {/* Bottom info panel */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
          <div className="mb-5">
            <h1 className="text-4xl font-black text-white leading-tight mb-2">
              Learn. Build. Deploy<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                Ship real, secure and scalable software products.
              </span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Academy Project is an online coding course that focuses on software development and artificial intelligence upskilling for the new generation of low code software engineers.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Brain,   label: 'AI-Powered',    sub: 'Smart guidance'   },
              { icon: Network, label: 'Full Stack',     sub: '7 live courses'   },
              { icon: Zap,     label: 'Live Sessions',  sub: 'Engage with experts'   },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 flex flex-col gap-1"
              >
                <Icon className="w-4 h-4 text-sky-400" />
                <p className="text-white text-xs font-bold">{label}</p>
                <p className="text-slate-500 text-[10px]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT — Auth Panel ── */}
      <div className="flex-1 lg:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 sm:p-10 relative overflow-hidden">

        {/* Soft background blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Logo className="w-5 h-5" />
            </div>
            <span className="text-slate-900 font-black text-lg">CodeWorks</span>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-2xl bg-slate-100 p-1 mb-8">
            <span className="flex-1 text-center py-2.5 rounded-xl bg-white text-slate-900 text-sm font-bold shadow-sm">
              Sign In
            </span>
            <Link
              to="/signup"
              className="flex-1 text-center py-2.5 rounded-xl text-slate-500 text-sm font-semibold hover:text-slate-700 transition-colors"
            >
              Create Account
            </Link>
          </div>

          <div className="mb-7">
            <h2 className="text-2xl font-black text-slate-900">Welcome 👋</h2>
            <p className="text-slate-500 text-sm mt-1">Sign in to continue your learning journey.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:outline-none transition-all text-slate-900 placeholder-slate-400"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs text-sky-600 hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 focus:outline-none transition-all text-slate-900 placeholder-slate-400"
                required
              />
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
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                : 'Sign In →'
              }
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            New to CodeWorks?{' '}
            <Link to="/signup" className="text-sky-600 hover:underline font-semibold">
              Create a free account
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
