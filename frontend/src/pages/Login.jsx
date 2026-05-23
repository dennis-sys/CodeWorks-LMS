import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';
import { Loader2 } from 'lucide-react';
import Logo from '../components/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50 p-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-xl border border-sky-100">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white mb-4"><Logo className="w-6 h-6" /></div>
          <h2 className="text-2xl font-black text-slate-900">Welcome to CodeWorks</h2>
          <p className="text-slate-500 mt-2 text-sm">Enter your credentials to access your dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:ring-2 focus:ring-sky-400 focus:outline-none transition-all"
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-sky-200 disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>

          <div className="flex justify-between text-sm pt-2">
            <a href="/forgot-password" className="text-sky-600 hover:underline">Forgot Password?</a>
            <span className="text-slate-500">
              No account? <Link to="/signup" className="text-sky-600 hover:underline font-medium">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
