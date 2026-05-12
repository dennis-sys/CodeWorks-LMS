import { Download, Award, Share2 } from 'lucide-react';

const certs = [
  { id: 1, course: 'Introduction to Software Development', date: 'Issued May 2026', percent: 100 },
];

export default function Certificates() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black tracking-tight">Certificates 🎓</h1>
      {certs.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl">
          <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">No Certificates Yet</h3>
          <p className="text-slate-500 mt-2">Complete a course to earn your first certificate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certs.map((c) => (
            <div key={c.id} className="glass rounded-2xl p-6 relative overflow-hidden shadow-soft border-2 border-sky-100">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-200 rounded-full blur-3xl opacity-50" />
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="font-bold text-xl text-slate-900">{c.course}</h3>
                  <p className="text-slate-500 mt-1">{c.date} • {c.percent}% Completion</p>
                </div>
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                  <Award className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-xl hover:bg-slate-800 transition-all">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button className="flex items-center justify-center gap-2 bg-sky-100 text-sky-600 px-4 py-2 rounded-xl hover:bg-sky-200 transition-all">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}