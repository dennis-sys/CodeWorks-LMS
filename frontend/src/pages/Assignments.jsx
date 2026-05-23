import { useState, useEffect } from 'react';
import { CheckCircle, BookOpen, RefreshCw, Clock, CalendarCheck, AlertTriangle, ClipboardList } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { API_BASE } from '../services/api';
import { useNavigate } from 'react-router-dom';

const gradeColors = {
  A: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  B: 'bg-sky-100 text-sky-700 border-sky-200',
  C: 'bg-violet-100 text-violet-700 border-violet-200',
  D: 'bg-amber-100 text-amber-700 border-amber-200',
  F: 'bg-red-100 text-red-700 border-red-200',
};

const ALL_QUIZZES = [
  {
    title: 'Intro to Software Development — Module Quiz',
    course: 'Introduction to Software Development',
    courseId: 1,
    deadline: new Date('2025-12-31T23:59:00'),
    route: '/courses/1',
  },
];

function getDeadline(title) {
  const q = ALL_QUIZZES.find(q => title?.includes(q.title) || q.title.includes(title));
  return q?.deadline ?? null;
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function formatDateShort(date) {
  if (!date) return '—';
  return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isOverdue(deadline) {
  return deadline && new Date() > deadline;
}

export default function Assignments() {
  const { session } = useAuthStore();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAssignments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/assignments`, {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
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
    if (session) fetchAssignments();
  }, [session]);

  const submittedTitles = new Set(assignments.map(a => a.title));
  const pendingQuizzes = ALL_QUIZZES.filter(q => !submittedTitles.has(q.title));

  const onTimeCount = assignments.filter(a => {
    const dl = getDeadline(a.title);
    return dl && new Date(a.submitted_at) <= dl;
  }).length;

  const lateCount = assignments.filter(a => {
    const dl = getDeadline(a.title);
    return dl && new Date(a.submitted_at) > dl;
  }).length;

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

      {!loading && !error && (
        <>
          {/* Pending section */}
          {pendingQuizzes.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-amber-500" />
                Pending
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-xs font-black">
                  {pendingQuizzes.length}
                </span>
              </h2>
              <div className="space-y-3">
                {pendingQuizzes.map((q) => {
                  const overdue = isOverdue(q.deadline);
                  return (
                    <div
                      key={q.title}
                      className="glass rounded-2xl p-5 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl flex-shrink-0 ${overdue ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-600'}`}>
                          <ClipboardList className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{q.title}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">{q.course}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <CalendarCheck className={`w-3.5 h-3.5 flex-shrink-0 ${overdue ? 'text-red-500' : 'text-slate-400'}`} />
                            <span className={`text-xs font-medium ${overdue ? 'text-red-600' : 'text-slate-500'}`}>
                              Deadline: {formatDateShort(q.deadline)}
                            </span>
                            {overdue
                              ? <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">⚠ Overdue</span>
                              : <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">Pending</span>
                            }
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(q.route)}
                        className="flex-shrink-0 px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md"
                      >
                        Start Quiz
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submitted section */}
          {assignments.length === 0 && pendingQuizzes.length === 0 && (
            <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-soft gap-4">
              <BookOpen className="w-12 h-12 text-slate-300" />
              <div>
                <p className="font-bold text-slate-600 text-lg">No assignments yet</p>
                <p className="text-slate-400 text-sm mt-1">Complete a module quiz to see your results here.</p>
              </div>
            </div>
          )}

          {assignments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                Submitted
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black">
                  {assignments.length}
                </span>
              </h2>

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
                    label: 'On Time',
                    value: `${onTimeCount} / ${assignments.length}`,
                    icon: '✅',
                  },
                ].map(card => (
                  <div key={card.label} className="glass rounded-2xl p-4 shadow-soft text-center">
                    <div className="text-2xl mb-1">{card.icon}</div>
                    <div className="text-xl font-black text-slate-800">{card.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
                  </div>
                ))}
              </div>

              {lateCount > 0 && (
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span><strong>{lateCount}</strong> submission{lateCount > 1 ? 's were' : ' was'} submitted after the deadline.</span>
                </div>
              )}

              <div className="space-y-4">
                {assignments.map((a) => {
                  const pct = Math.round((a.score / a.total) * 100);
                  const gradeStyle = gradeColors[a.grade] || gradeColors.F;
                  const deadline = getDeadline(a.title);
                  const submittedAt = a.submitted_at ? new Date(a.submitted_at) : null;
                  const late = deadline && submittedAt && submittedAt > deadline;
                  const onTime = deadline && submittedAt && submittedAt <= deadline;

                  return (
                    <div key={a.id} className="glass rounded-2xl p-5 shadow-soft space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 flex-shrink-0">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">{a.title}</h3>
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
                        <div className={`px-5 py-2 rounded-xl border font-black text-2xl flex-shrink-0 ${gradeStyle}`}>
                          {a.grade}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-1 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>Submitted: <span className="font-medium text-slate-700">{formatDate(a.submitted_at)}</span></span>
                        </div>
                        {deadline && (
                          <div className="flex items-center gap-2 text-xs">
                            <CalendarCheck className={`w-3.5 h-3.5 flex-shrink-0 ${late ? 'text-red-500' : 'text-slate-400'}`} />
                            <span className="text-slate-500">
                              Deadline: <span className="font-medium text-slate-700">{formatDateShort(deadline)}</span>
                            </span>
                            {onTime && (
                              <span className="ml-1 inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                ✓ On time
                              </span>
                            )}
                            {late && (
                              <span className="ml-1 inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                ⚠ Late
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
