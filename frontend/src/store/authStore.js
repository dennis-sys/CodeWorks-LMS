import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  
  setUser: (user, session) => set({ user, session, loading: false }),
  clearAuth: () => set({ user: null, session: null, loading: false }),
  setLoading: (state) => set({ loading: state }),
}));