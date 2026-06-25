import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PlayCircle } from 'lucide-react';
import { useCourseStore, getActivityLog } from '../store/courseStore';

const COURSE_META = [
  { id: 1, title: 'Introduction to Software Development', duration: '4 Weeks', instructor: 'Dr. Smith', status: 'Active', image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg' },
  { id: 2, title: 'AI Tools for Software Development', duration: '3 Weeks', instructor: 'Jane Doe', status: 'Active', image: 'https://images.pexels.com/photos/8294606/pexels-photo-8294606.jpeg' },
  { id: 3, title: 'Vibe Coding', duration: '2 Weeks', instructor: 'Alex Chen', status: 'Active', image: 'https://images.pexels.com/photos/29445974/pexels-photo-29445974.jpeg' },
  { id: 4, title: 'Frontend Development', duration: '6 Weeks', instructor: 'Sarah Lee', status: 'Active', image: 'https://images.pexels.com/photos/3987019/pexels-photo-3987019.jpeg' },
  { id: 5, title: 'Backend Development', duration: '8 Weeks', instructor: 'Mike Ross', status: 'Active', image: 'https://images.pexels.com/photos/5380589/pexels-photo-5380589.jpeg' },
  { id: 6, title: 'Database', duration: '3 Weeks', instructor: 'Emily Clark', status: 'Active', image: 'https://images.pexels.com/photos/117729/pexels-photo-117729.jpeg' },
  { id: 7, title: 'Full Stack Application', duration: '10 Weeks', instructor: 'David Kim', status: 'Not Started', image: 'https://images.pexels.com/photos/32944547/pexels-photo-32944547.jpeg' },
];

const DIST_COLOURS = {
  Completed:   '#0ea5e9',
  'In Progress': '#f59e0b',
  'Not Started': '#cbd5e1',
};

// Build the last-7-days bar-chart data from the activity log
function buildWeeklyData() {
  const log   = getActivityLog();
  const days  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d   = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    result.push({ day: days[d.getDay()], sections: log[key] || 0, date: key });
  }
  return result;
}

const courseRoutes = { 1: '/courses/1', 2: '/courses/2', 3: '/courses/3', 4: '/courses/4', 5: '/courses/5', 6: '/courses/6', 7: '/courses/7' };

// Custom bar tooltip
function ActivityTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-bold text-slate-700">{label}</p>
      <p className="text-sky-600 font-semibold">{val} section{val !== 1 ? 's' : ''} visited</p>
    </div>
  );
}

// Custom pie tooltip
function DistTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-bold text-slate-700">{name}</p>
      <p className="text-slate-500">{value} course{value !== 1 ? 's' : ''}</p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const storeCourses = useCourseStore(state => state.courses);

  const courses = COURSE_META.map(meta => {
    const stored = storeCourses.find(c => c.id === meta.id);
    return { ...meta, progress: stored?.progress ?? 0 };
  });

  // Derive pie chart slices from live progress values
  const completed   = courses.filter(c => c.progress === 100).length;
  const inProgress  = courses.filter(c => c.progress > 0 && c.progress < 100).length;
  const notStarted  = courses.filter(c => c.progress === 0).length;
  const distData = [
    { name: 'Completed',   value: completed,  color: DIST_COLOURS['Completed']   },
    { name: 'In Progress', value: inProgress, color: DIST_COLOURS['In Progress'] },
    { name: 'Not Started', value: notStarted, color: DIST_COLOURS['Not Started'] },
  ].filter(d => d.value > 0);

  const weeklyData    = buildWeeklyData();
  const totalActivity = weeklyData.reduce((a, d) => a + d.sections, 0);
  const peakDay       = weeklyData.reduce((a, d) => d.sections > a.sections ? d : a, weeklyData[0]);

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

                <button
                  onClick={() => courseRoutes[c.id] ? navigate(courseRoutes[c.id]) : null}
                  className={`w-full mt-2 flex items-center justify-center gap-2 font-semibold py-2.5 rounded-xl transition-all shadow-md ${courseRoutes[c.id] ? 'bg-sky-500 hover:bg-sky-600 text-white hover:shadow-sky-200 cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
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

        {/* Course Distribution — live from progress */}
        <div className="glass rounded-2xl p-6 shadow-soft flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-700">Course Distribution</h3>
            <span className="text-xs text-slate-400">{courses.length} total</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">Completed vs in-progress vs not started</p>

          <div className="flex items-center gap-4 flex-1 min-h-0">
            {/* Donut */}
            <div className="w-32 h-32 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distData}
                    innerRadius={34}
                    outerRadius={52}
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {distData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip content={<DistTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend + counts */}
            <div className="flex flex-col gap-2 flex-1">
              {[
                { name: 'Completed',   color: DIST_COLOURS['Completed'],   val: completed  },
                { name: 'In Progress', color: DIST_COLOURS['In Progress'], val: inProgress },
                { name: 'Not Started', color: DIST_COLOURS['Not Started'], val: notStarted },
              ].map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-slate-600 flex-1">{item.name}</span>
                  <span className="text-xs font-bold text-slate-800">{item.val}</span>
                </div>
              ))}
              <div className="mt-1 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Completion rate</span>
                <span className="text-xs font-black text-sky-600">
                  {courses.length > 0 ? Math.round((completed / courses.length) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity — from live localStorage log */}
        <div className="md:col-span-2 glass rounded-2xl p-6 shadow-soft">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-700">Weekly Activity</h3>
            <span className="text-xs text-slate-400">Last 7 days</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-xs text-slate-500">
                <span className="font-bold text-slate-700">{totalActivity}</span> sections visited
              </span>
            </div>
            {totalActivity > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs text-slate-500">
                  Peak: <span className="font-bold text-slate-700">{peakDay.day}</span> ({peakDay.sections})
                </span>
              </div>
            )}
          </div>

          {totalActivity === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center gap-2 text-slate-400">
              <div className="text-3xl">📚</div>
              <p className="text-sm font-medium">No activity yet this week</p>
              <p className="text-xs">Start a course to see your trend</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={weeklyData} barCategoryGap="30%">
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide allowDecimals={false} />
                <Tooltip content={<ActivityTooltip />} cursor={{ fill: '#f1f5f9', radius: 6 }} />
                <Bar
                  dataKey="sections"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                >
                  {weeklyData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.sections === peakDay.sections && entry.sections > 0
                        ? '#0ea5e9'
                        : entry.sections > 0 ? '#bae6fd' : '#e2e8f0'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
}