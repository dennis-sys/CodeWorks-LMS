import { useAuthStore } from '../store/authStore';

const RENDER_BACKEND = 'https://codeworks-lms.onrender.com';

function normalizeApiBase(value) {
  return value.replace(/\/+$/, '').replace(/\/api$/, '');
}

function resolveApiBase() {
  const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
  if (configuredApiUrl) return normalizeApiBase(configuredApiUrl);

  // Vite proxy forwards /api → localhost:3001 during development.
  if (import.meta.env.DEV) return '';

  // Replit production serves the frontend and API from the same Express app.
  // Separate static hosts (Netlify, Cloudflare Pages, etc.) must use Render.
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  if (hostname.endsWith('.replit.dev') || hostname.endsWith('.replit.app')) return '';

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
    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      const error = new Error(payload?.message || `API Error: ${res.status}`);
      error.status = res.status;
      error.payload = payload;
      throw error;
    }
    return payload;
  } catch (err) {
    console.error('API Fetch Error:', err);
    throw err;
  }
};
