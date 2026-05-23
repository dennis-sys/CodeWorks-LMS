import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }),
  clearAuth: () => set({ user: null, loading: false }),
  setLoading: (loading) => set({ loading }),
}));
