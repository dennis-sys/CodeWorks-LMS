import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, Award, Menu, X, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    useAuthStore.getState().clearAuth();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-surface-light">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col glass border-r border-sky-100 transition-all duration-300
          lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        <div className="flex h-full flex-col p-3">
          {/* Logo + collapse toggle */}
          <div className={`flex items-center mb-8 mt-2 ${collapsed ? 'justify-center' : 'justify-between px-1'}`}>
            {!collapsed && (
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white font-black text-lg">C</div>
                <span className="font-bold text-xl tracking-tight">CodeWorks</span>
              </Link>
            )}
            {collapsed && (
              <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white font-black text-lg">C</Link>
            )}
            {/* Collapse button — desktop only */}
            <button
              onClick={() => setCollapsed(v => !v)}
              className="hidden lg:flex items-center justify-center h-7 w-7 rounded-md text-slate-400 hover:bg-sky-50 hover:text-sky-600 transition-all shrink-0"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all
                    ${isActive ? 'bg-sky-50 text-sky-600' : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'}
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            className={`mt-auto flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-all
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
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
