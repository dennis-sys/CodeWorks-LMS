import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Assignments from './pages/Assignments';
import Certificates from './pages/Certificates';
import LearningModule from './pages/LearningModule';
import LearningModuleAI from './pages/LearningModuleAI';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();
  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-sky-500 border-t-transparent"></div>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/identity', { credentials: 'include' });
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      }
    };
    checkAuth();
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
          <Route path="courses/1" element={<ProtectedRoute><LearningModule /></ProtectedRoute>} />
          <Route path="courses/2" element={<ProtectedRoute><LearningModuleAI /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
