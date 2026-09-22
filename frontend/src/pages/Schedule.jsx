import { Calendar, Clock, MapPin, Video } from 'lucide-react';

const scheduleData = [
  { id: 1, course: 'Introduction to Software Development', instructor: 'CodeWorks Team', date: 'Oct 10, 2026', time: '2:00 PM EAT', status: 'Upcoming', link: 'https://us05web.zoom.us/j/87445956173?pwd=x5lAzOmvkH5DJxq7n6UaO54uDXdq6j.1' },
  { id: 2, course: 'AI Tools for Software Development', instructor: 'CodeWorks Team', date: 'Oct 17, 2026', time: '11:30 AM EAT', status: 'Upcoming', link: '#' },
  { id: 3, course: 'Vibe Coding', instructor: 'CodeWorks Team', date: 'Oct 24, 2026', time: '1:00 PM EAT', status: 'Upcoming', link: '#' },
  { id: 4, course: 'Frontend Development', instructor: 'CodeWorks Team', date: 'Oct 31, 2026', time: '10:00 AM EAT', status: 'Upcoming', link: '#' },
  { id: 5, course: 'Backend Development', instructor: 'CodeWorks Team', date: 'Nov 7, 2026', time: '10:00 AM EAT', status: 'Upcoming', link: '#' },
  { id: 6, course: 'Database', instructor: 'CodeWorks Team', date: 'Nov 14, 2026', time: '2:00 PM EAT', status: 'Upcoming', link: '#' },
  { id: 7, course: 'Full Stack Application', instructor: 'CodeWorks Team', date: 'Nov 21, 2026', time: '2:00 PM EAT', status: 'Upcoming', link: '#' },
];

export default function Schedule() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black tracking-tight">Class Schedule 📅</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scheduleData.map((item) => (
          <div key={item.id} className="glass rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start gap-4 shadow-soft">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">{item.course}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4" /> <span>{item.instructor}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" /> {item.date} &nbsp; <Clock className="w-4 h-4" /> {item.time}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${item.status === 'Live' ? 'bg-red-100 text-red-600' : 'bg-sky-100 text-sky-600'}`}>
                {item.status}
              </span>
              {item.link && item.link !== '#' ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all text-sm font-medium"
                >
                  <Video className="w-4 h-4" /> Join Class
                </a>
              ) : (
                <button className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all text-sm font-medium">
                  <Video className="w-4 h-4" /> Join Class
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}