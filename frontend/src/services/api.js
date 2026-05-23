export const API_BASE = '';

export const apiFetch = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}/api${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API Fetch Error:', err);
    throw err;
  }
};
