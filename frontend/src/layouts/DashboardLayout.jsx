import React, { useState } from 'react';  // ← ADD THIS
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, Award, Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../services/supabase';

const navItems = [
  { path: '/', label: 'Main Dashboard', icon: LayoutDashboard },
  { path: '/schedule', label: 'Class Schedule', icon: Calendar },
  { path: '/assignments', label: 'Assignments', icon: FileText },
  { path: '/certificates', label: 'Certificates', icon: Award },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    useAuthStore.getState().clearAuth();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-surface-light">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform glass border-r border-sky-100 transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col p-6">
          <Link to="/" className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white font-black text-lg">C</div>
            <span className="font-bold text-xl tracking-tight">CodeWorks</span>
          </Link>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-all"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 glass border-b border-sky-100 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md hover:bg-sky-50">
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="relative hidden md:block">
              <input type="text" placeholder="Search courses, assignments..." className="w-64 rounded-full border border-sky-200 bg-white/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="h-9 w-9 rounded-full bg-sky-100 flex items-center justify-center font-bold text-sky-600">
                {user?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">{user?.full_name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}