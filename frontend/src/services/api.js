import { useAuthStore } from '../store/authStore';

export const apiFetch = async (endpoint, options = {}) => {
  const { session } = useAuthStore.getState();
  const headers = {
    'Content-Type': 'application/json',
    ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
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