import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const assignments = [
  { id: 1, title: 'Build a React Component', due: 'May 14', status: 'pending' },
  { id: 2, title: 'Database Schema Design', due: 'May 20', status: 'submitted' },
];

export default function Assignments() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black tracking-tight">Assignments 📝</h1>
      <div className="space-y-4">
        {assignments.map((a) => (
          <div key={a.id} className="glass rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
            <div className="flex items-center gap-4">
              {a.status === 'pending' ? (
                <div className="p-3 rounded-xl bg-sky-100 text-sky-600"><AlertCircle className="w-6 h-6" /></div>
              ) : (
                <div className="p-3 rounded-xl bg-green-100 text-green-600"><CheckCircle className="w-6 h-6" /></div>
              )}
              <div>
                <h3 className="font-bold text-slate-900">{a.title}</h3>
                <p className="text-sm text-slate-500">Due: {a.due}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl transition-all font-medium text-sm">
              <Upload className="w-4 h-4" /> Submit Work
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}