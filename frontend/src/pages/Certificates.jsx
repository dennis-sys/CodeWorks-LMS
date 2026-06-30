import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Award, Download, Lock, CheckCircle, Loader2, Trophy } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { apiFetch } from '../services/api';
import { useAuthStore } from '../store/authStore';
import CertificateTemplate from '../components/CertificateTemplate';

const CERT_COURSES = [
  { id: 3, title: 'Vibe Coding',            accentColor: '#f59e0b', icon: '⚡', tagline: 'AI-Powered full-stack project',     path: '/courses/3' },
  { id: 4, title: 'Frontend Development',   accentColor: '#8b5cf6', icon: '🎨', tagline: 'UI design & React applications',    path: '/courses/4' },
  { id: 5, title: 'Backend Development',    accentColor: '#10b981', icon: '⚙️', tagline: 'APIs, servers & authentication',    path: '/courses/5' },
  { id: 6, title: 'Database Engineering',   accentColor: '#6366f1', icon: '🗄️', tagline: 'SQL, Supabase & data modelling',   path: '/courses/6' },
  { id: 7, title: 'Full Stack Application', accentColor: '#f43f5e', icon: '🚀', tagline: 'End-to-end production deployment', path: '/courses/7' },
];

const PASS_PCT = 75;

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function Certificates() {
  const user    = useAuthStore(s => s.user);
  const session = useAuthStore(s => s.session);

  const studentName = user?.full_name || user?.email?.split('@')[0] || 'Student';

  const [assignments, setAssignments]     = useState([]);
  const [loadingData, setLoadingData]     = useState(true);
  const [generating,  setGenerating]      = useState(null);   // course id currently being PDF-ed
  const [previewData, setPreviewData]     = useState(null);   // data fed to the hidden template

  const certRef = useRef(null);

  /* ── Fetch assignments ── */
  useEffect(() => {
    if (!session) return;
    apiFetch('/assignments')
      .then(res => setAssignments(res.data || []))
      .catch(() => {})
      .finally(() => setLoadingData(false));
  }, [session]);

  /* ── Derive earned certs: best pct >= 75 per course ── */
  const earned = useMemo(() => {
    const map = {};
    for (const c of CERT_COURSES) {
      const hits = assignments
        .filter(a => a.course_id === c.id && a.total > 0)
        .map(a => ({ ...a, pct: Math.round((a.score / a.total) * 100) }))
        .filter(a => a.pct >= PASS_PCT)
        .sort((a, b) => b.pct - a.pct);
      if (hits.length) map[c.id] = hits[0];
    }
    return map;
  }, [assignments]);

  /* ── Capture the hidden template and save PDF ── */
  useEffect(() => {
    if (!previewData || !certRef.current) return;

    const timer = setTimeout(async () => {
      try {
        const canvas = await html2canvas(certRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1122, 793] });
        pdf.addImage(imgData, 'PNG', 0, 0, 1122, 793);
        pdf.save(`CodeWorks-Certificate-${previewData.courseTitle.replace(/\s+/g, '-')}.pdf`);
      } catch (e) {
        console.error('Certificate PDF error:', e);
      } finally {
        setGenerating(null);
        setPreviewData(null);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [previewData]);

  const handleDownload = (course, assignment) => {
    if (generating) return;
    setGenerating(course.id);
    setPreviewData({
      courseTitle:  course.title,
      accentColor:  course.accentColor,
      dateStr:      fmtDate(assignment.submitted_at),
      pct:          assignment.pct,
    });
  };

  const total   = CERT_COURSES.length;
  const counted = Object.keys(earned).length;

  return (
    <div className="space-y-8">

      {/* ── Page header ── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Certificates 🎓</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Score <span className="font-semibold text-sky-600">75%+</span> on a module assignment to unlock your personalised certificate.
          </p>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-soft self-start">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="4" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="#0ea5e9" strokeWidth="4"
                strokeDasharray={`${(counted / total) * 125.6} 125.6`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-800">
              {counted}/{total}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Earned</p>
            <p className="text-lg font-black text-slate-900">{counted} Certificate{counted !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* ── Certificate grid ── */}
      {loadingData ? (
        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm font-medium">Loading your results…</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CERT_COURSES.map(course => {
            const assignment = earned[course.id];
            const isEarned   = !!assignment;

            return isEarned
              ? <EarnedCard
                  key={course.id}
                  course={course}
                  assignment={assignment}
                  studentName={studentName}
                  generating={generating === course.id}
                  onDownload={() => handleDownload(course, assignment)}
                />
              : <LockedCard key={course.id} course={course} />;
          })}
        </div>
      )}

      {/* ── Hidden certificate template (captured by html2canvas) ── */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1, pointerEvents: 'none' }}>
        {previewData && (
          <CertificateTemplate
            ref={certRef}
            studentName={studentName}
            courseTitle={previewData.courseTitle}
            dateStr={previewData.dateStr}
            pct={previewData.pct}
            accentColor={previewData.accentColor}
          />
        )}
      </div>
    </div>
  );
}

/* ── Earned certificate card ── */
function EarnedCard({ course, assignment, studentName, generating, onDownload }) {
  const dateStr = fmtDate(assignment.submitted_at);

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-soft border-2 bg-white flex flex-col"
      style={{ borderColor: `${course.accentColor}60` }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: course.accentColor }}
      />

      {/* Colour top stripe */}
      <div className="h-1.5 w-full" style={{ background: course.accentColor }} />

      <div className="p-6 flex flex-col gap-5 flex-1">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0"
              style={{ background: `${course.accentColor}18`, border: `1.5px solid ${course.accentColor}40` }}
            >
              {course.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Certificate of Completion</p>
              <h3 className="font-black text-slate-900 text-lg leading-tight">{course.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
            <CheckCircle className="w-3.5 h-3.5" />
            Earned
          </div>
        </div>

        {/* Certificate preview card */}
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-5 flex gap-4 items-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ background: `${course.accentColor}20`, border: `3px solid ${course.accentColor}` }}
          >
            <Trophy className="w-7 h-7" style={{ color: course.accentColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 truncate">{studentName}</p>
            <p className="text-xs text-slate-500 mt-0.5">{course.tagline}</p>
            <div className="flex items-center gap-3 mt-2">
              <span
                className="text-xs font-black px-2 py-0.5 rounded-lg"
                style={{ background: `${course.accentColor}18`, color: course.accentColor }}
              >
                {assignment.pct}% Score
              </span>
              <span className="text-xs text-slate-400">{dateStr}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={onDownload}
          disabled={generating}
          className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all text-white shadow-md disabled:opacity-70 hover:opacity-90 active:scale-[0.98]"
          style={{ background: course.accentColor, boxShadow: `0 4px 16px ${course.accentColor}50` }}
        >
          {generating
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF…</>
            : <><Download className="w-4 h-4" /> Download Certificate PDF</>
          }
        </button>
      </div>
    </div>
  );
}

/* ── Locked certificate card ── */
function LockedCard({ course }) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-soft border-2 border-slate-100 bg-white/60 flex flex-col opacity-70">
      <div className="h-1.5 w-full bg-slate-200" />
      <div className="p-6 flex flex-col gap-5 flex-1">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-slate-100 border border-slate-200 flex-shrink-0 grayscale">
              {course.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Certificate of Completion</p>
              <h3 className="font-black text-slate-500 text-lg leading-tight">{course.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
            <Lock className="w-3.5 h-3.5" />
            Locked
          </div>
        </div>

        {/* Locked placeholder */}
        <div className="rounded-xl bg-slate-50 border border-dashed border-slate-200 p-5 flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
            <Lock className="w-7 h-7 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">Not yet earned</p>
          <p className="text-xs text-slate-400">Score <span className="font-bold text-slate-600">75%+</span> on the {course.title} assignment to unlock this certificate</p>
        </div>

        {/* Go to course */}
        <Link
          to={course.path}
          className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all bg-slate-100 hover:bg-slate-200 text-slate-600"
        >
          Start Module →
        </Link>
      </div>
    </div>
  );
}
