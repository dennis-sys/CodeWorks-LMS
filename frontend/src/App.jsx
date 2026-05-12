import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from './services/supabase';
import { useAuthStore } from './store/authStore';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Assignments from './pages/Assignments';
import Certificates from './pages/Certificates';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();
  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-2 border-sky-500 border-t-transparent"></div></div>;
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const setUserFromSession = useAuthStore(state => state.setUser);
  
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {  data } = await supabase.auth.getSession();
      if (data.session?.user) {
        const {   userData } = await supabase
          .from('users')
          .select('*')
          .eq('auth_id', data.session.user.id)
          .single();
        setUserFromSession(userData, data.session);
      } else {
        setUserFromSession(null, null);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {  subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const {   userData } = await supabase
            .from('users')
            .select('*')
            .eq('auth_id', session.user.id)
            .single();
          setUserFromSession(userData, session);
        } else if (event === 'SIGNED_OUT') {
          setUserFromSession(null, null);
        }
      }
    );

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
          <Route path="assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
          <Route path="certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;