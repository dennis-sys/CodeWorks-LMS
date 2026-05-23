import { useState, useEffect } from 'react';
import { CheckCircle, BookOpen, RefreshCw } from 'lucide-react';

const gradeColors = {
  A: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  B: 'bg-sky-100 text-sky-700 border-sky-200',
  C: 'bg-violet-100 text-violet-700 border-violet-200',
  D: 'bg-amber-100 text-amber-700 border-amber-200',
  F: 'bg-red-100 text-red-700 border-red-200',
};

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAssignments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/assignments', { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setAssignments(data.data);
      } else {
        setError(data.message || 'Failed to load assignments.');
      }
    } catch {
      setError('Network error — could not reach the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight">Assignments 📝</h1>
        <button
          onClick={fetchAssignments}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-sky-500 border-t-transparent" />
        </div>
      )}

      {error && !loading && (
        <div className="glass rounded-2xl p-5 border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && assignments.length === 0 && (
        <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-soft gap-4">
          <BookOpen className="w-12 h-12 text-slate-300" />
          <div>
            <p className="font-bold text-slate-600 text-lg">No assignments yet</p>
            <p className="text-slate-400 text-sm mt-1">
              Complete a module quiz to see your results here.
            </p>
          </div>
        </div>
      )}

      {!loading && !error && assignments.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Submitted', value: assignments.length, icon: '📋' },
              {
                label: 'Average Score',
                value: Math.round(assignments.reduce((a, x) => a + (x.score / x.total) * 100, 0) / assignments.length) + '%',
                icon: '📊',
              },
              {
                label: 'Best Grade',
                value: ['A', 'B', 'C', 'D', 'F'].find(g => assignments.some(a => a.grade === g)) || '—',
                icon: '🏆',
              },
              {
                label: 'Latest',
                value: formatDate(assignments[0]?.submitted_at).split(',')[0],
                icon: '🕐',
              },
            ].map(card => (
              <div key={card.label} className="glass rounded-2xl p-4 shadow-soft text-center">
                <div className="text-2xl mb-1">{card.icon}</div>
                <div className="text-xl font-black text-slate-800">{card.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {assignments.map((a) => {
              const pct = Math.round((a.score / a.total) * 100);
              const gradeStyle = gradeColors[a.grade] || gradeColors.F;
              return (
                <div key={a.id} className="glass rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{a.title}</h3>
                      <p className="text-sm text-slate-500">Submitted: {formatDate(a.submitted_at)}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 font-medium">{a.score}/{a.total} ({pct}%)</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-5 py-2 rounded-xl border font-black text-2xl ${gradeStyle}`}>
                    {a.grade}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
