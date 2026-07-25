import { useAuthStore } from '../store/authStore';

const RENDER_BACKEND = 'https://codeworks-lms.onrender.com';

function resolveApiBase() {
  // VITE_API_URL explicitly set (even to '' for same-origin Replit deployment)
  if (import.meta.env.VITE_API_URL !== undefined) return import.meta.env.VITE_API_URL;
  // Dev mode: Vite proxy forwards /api → localhost:3001
  if (import.meta.env.DEV) return '';
  // Production build without an explicit URL: use the deployed Render backend
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
