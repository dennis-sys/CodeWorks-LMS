import { useAuthStore } from '../store/authStore';

const RENDER_BACKEND = 'https://codeworks-lms.onrender.com';

function resolveApiBase() {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  // In dev mode the Vite proxy forwards /api → localhost:3001, so use a relative base.
  // In production builds use the deployed Render backend.
  if (import.meta.env.DEV) return '';
  return RENDER_BACKEND;
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
