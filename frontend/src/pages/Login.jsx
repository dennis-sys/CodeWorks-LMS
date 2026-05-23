import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Loader2 } from 'lucide-react';
import Logo from '../components/Logo';

export default function Login() {
  const { user, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-sky-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50 p-4">
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-xl border border-sky-100">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white mb-4">
            <Logo className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Welcome to CodeWorks</h2>
          <p className="text-slate-500 mt-2 text-sm">Sign in to access your dashboard.</p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-sky-200 flex items-center justify-center"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
