import { useAuthStore } from '../store/authStore';

const RENDER_BACKEND = 'https://codeworks-lms.onrender.com';

function resolveApiBase() {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return RENDER_BACKEND;
  }
  return '';
}

export const API_BASE = resolveApiBase();

export const apiFetch = async (endpoint, options = {}) => {
  const { session } = useAuthStore.getState();
  const headers = {
    'Content-Type': 'application/json',
    ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}/api${endpoint}`, {
      ...options,
      headers,
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API Fetch Error:', err);
    throw err;
  }
};
