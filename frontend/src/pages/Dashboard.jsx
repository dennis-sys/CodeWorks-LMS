import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PlayCircle } from 'lucide-react';

const courses = [
  { id: 1, title: 'Introduction to Software Development', progress: 75, duration: '4 Weeks', instructor: 'Dr. Smith', status: 'Active', image: 'https://images.pexels.com/photos/33607952/pexels-photo-33607952.png' },
  { id: 2, title: 'AI Tools for Software Development', progress: 40, duration: '3 Weeks', instructor: 'Jane Doe', status: 'Active', image: '/ai-tools-course.png' },
  { id: 3, title: 'Vibe Coding', progress: 90, duration: '2 Weeks', instructor: 'Alex Chen', status: 'Active', image: 'https://images.pexels.com/photos/29445974/pexels-photo-29445974.jpeg' },
  { id: 4, title: 'Frontend Development', progress: 20, duration: '6 Weeks', instructor: 'Sarah Lee', status: 'Active', image: 'https://images.pexels.com/photos/3987019/pexels-photo-3987019.jpeg' },
  { id: 5, title: 'Backend Development', progress: 10, duration: '8 Weeks', instructor: 'Mike Ross', status: 'Active', image: 'https://images.pexels.com/photos/5380589/pexels-photo-5380589.jpeg' },
  { id: 6, title: 'Database', progress: 55, duration: '3 Weeks', instructor: 'Emily Clark', status: 'Active', image: 'https://images.pexels.com/photos/117729/pexels-photo-117729.jpeg' },
  { id: 7, title: 'Full Stack Application', progress: 0, duration: '10 Weeks', instructor: 'David Kim', status: 'Not Started', image: 'https://images.pexels.com/photos/32944547/pexels-photo-32944547.jpeg' },
];

const chartData = [
  { name: 'Completed', value: 3, color: '#0ea5e9' },
  { name: 'In Progress', value: 2, color: '#38bdf8' },
  { name: 'Upcoming', value: 2, color: '#cbd5e1' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Welcome Back 👋</h1>
          <p className="text-slate-500 mt-1">Continue your learning journey today.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-soft">
          <span className="text-sm font-medium text-slate-600">Overall Progress</span>
          <div className="w-4 h-4 rounded-full bg-sky-500 animate-pulse"></div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c.id} className="group glass rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="h-36 relative overflow-hidden">
                {c.image
                  ? <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-gradient-to-r from-sky-100 to-slate-100" />
                }
                <span className="absolute top-3 right-3 bg-white/80 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold text-sky-600 shadow-sm">
                  {c.status}
                </span>
                <div className="absolute bottom-3 left-3 font-bold text-lg text-white drop-shadow-md">{c.duration}</div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-slate-900 line-clamp-2 h-12">{c.title}</h3>
                <p className="text-sm text-slate-500">Instructor: {c.instructor}</p>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Progress</span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full transition-all duration-700" style={{width: `${c.progress}%`}} />
                  </div>
                </div>

                <button className="w-full mt-2 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 rounded-xl transition-all shadow-md hover:shadow-sky-200">
                  <PlayCircle className="w-4 h-4" />
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats & Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 shadow-soft">
          <h3 className="font-bold text-slate-700 mb-4">Course Distribution</h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="md:col-span-2 glass rounded-2xl p-6 shadow-soft">
          <h3 className="font-bold text-slate-700 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height="160">
            <BarChart data={[{day:'M',h:3},{day:'T',h:5},{day:'W',h:2},{day:'T',h:7},{day:'F',h:4},{day:'S',h:6},{day:'S',h:1}]}>
              <XAxis dataKey="day" tick={{fontSize:12}} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="h" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}