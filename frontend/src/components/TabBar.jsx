import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, Award } from 'lucide-react';

const tabs = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Class Schedule', path: '/schedule', icon: Calendar },
  { name: 'Assignments', path: '/assignments', icon: FileText },
  { name: 'Certificate', path: '/certificate', icon: Award },
];

export default function TabBar() {
  const location = useLocation();
  
  return (
    <>
      {/* Desktop Top Tabs */}
      <nav className="hidden md:flex bg-white border-b border-sky-100 px-6 py-3 gap-2">
        {tabs.map(tab => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              location.pathname === tab.path 
                ? 'bg-sky-50 text-sky-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={18} />
            {tab.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Bottom Tabs */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-sky-100 px-4 py-2 flex justify-around z-50">
        {tabs.map(tab => {
          const isActive = location.pathname === tab.path;
          return (
            <Link key={tab.path} to={tab.path} className="flex flex-col items-center gap-1">
              <tab.icon size={20} className={isActive ? 'text-sky-600' : 'text-gray-400'} />
              <span className={`text-xs ${isActive ? 'text-sky-600 font-medium' : 'text-gray-500'}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}