import { useState } from 'react';
import { User, Phone, Mail, Edit, LogOut, ChevronDown, Progress } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';

export default function ProfileDropdown({ progress = 65 }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useState(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(data);
      setLoading(false);
    };
    if (user) fetchProfile();
  }, [user]);

  if (loading || !profile) return null;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 p-2 rounded-full hover:bg-sky-50">
        <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-semibold">
          {profile.full_name?.[0]?.toUpperCase() || 'U'}
        </div>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-card border border-sky-100 p-4 z-50">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-700"><User size={16} /><span>{profile.full_name}</span></div>
            <div className="flex items-center gap-2 text-gray-500"><Mail size={16} /><span className="truncate">{profile.email}</span></div>
            <div className="flex items-center gap-2 text-gray-500"><Phone size={16} /><span>{profile.phone || 'N/A'}</span></div>
            
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Overall Progress</span><span>{progress}%</span></div>
              <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-sky-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div></div>
            </div>

            <div className="border-t border-gray-100 pt-3 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                <Edit size={14} /> Edit Profile
              </button>
              <button onClick={logout} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}