import { createContext, useContext } from 'react';
import { useAuthStore } from '../store/authStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const store = useAuthStore();
  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
