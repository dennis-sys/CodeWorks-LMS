import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import { API_BASE } from '../services/api';
import {
  BookOpen, Code2, Server, Database, CheckCircle2,
  XCircle, ArrowLeft, ArrowRight, Trophy, RotateCcw,
  MonitorSmartphone, Layers, ChevronRight
} from 'lucide-react';

// ── Infographic Components ──────────────────────────────────────────────────

function WebAppOrganigram() {
  return (
    <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-x-auto">
      <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">Web Application Architecture</h4>
      <div className="flex flex-col items-center gap-0 min-w-[480px]">
        {/* User */}
        <div className="flex flex-col items-center">
          <div className="bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md flex items-center gap-2">
            <MonitorSmartphone className="w-4 h-4" /> User / Browser
          </div>
          <div className="w-0.5 h-6 bg-slate-300" />
          <ChevronRight className="w-4 h-4 text-slate-400 rotate-90 -mt-2 mb-0" />
        </div>

        {/* Frontend */}
        <div className="flex flex-col items-center">
          <div className="bg-violet-500 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md w-64 text-center">
            <div className="font-bold">Frontend Layer</div>
            <div className="text-xs font-normal opacity-80 mt-0.5">React 18 + Vite + Tailwind CSS</div>
          </div>
          <div className="text-xs text-slate-500 mt-1 mb-1">HTTP Requests via Fetch / Axios</div>
          <div className="w-0.5 h-4 bg-slate-300" />
          <ChevronRight className="w-4 h-4 text-slate-400 rotate-90 -mt-2 mb-0" />
        </div>

        {/* Backend */}
        <div className="flex flex-col items-center">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md w-64 text-center">
            <div className="font-bold">Backend Layer (API)</div>
            <div className="text-xs font-normal opacity-80 mt-0.5">Node.js + Express.js (Port 3001)</div>
          </div>
          <div className="text-xs text-slate-500 mt-1 mb-1">Supabase Client (Service Role)</div>
          <div className="w-0.5 h-4 bg-slate-300" />
          <ChevronRight className="w-4 h-4 text-slate-400 rotate-90 -mt-2 mb-0" />
        </div>

        {/* Database */}
        <div className="flex flex-col items-center">
          <div className="bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md w-64 text-center">
            <div className="font-bold">Database Layer</div>
            <div className="text-xs font-normal opacity-80 mt-0.5">Supabase (PostgreSQL) + Auth</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-6 flex-wrap justify-center">
          {[
            { color: 'bg-sky-500', label: 'Client' },
            { color: 'bg-violet-500', label: 'Frontend (React)' },
            { color: 'bg-emerald-500', label: 'Backend (Express)' },
            { color: 'bg-amber-500', label: 'Database (Supabase)' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-slate-600">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FrontendOrganigram() {
  const nodes = [
    { label: 'App.jsx (Router)', bg: 'bg-violet-500' },
    { label: 'DashboardLayout', bg: 'bg-violet-400' },
    { children: ['Dashboard', 'Assignments', 'Schedule', 'Certificates'], bg: 'bg-violet-300', textColor: 'text-violet-900' },
  ];
  const extras = ['Zustand Store (State)', 'Supabase Client (Auth)', 'Tailwind CSS (Styles)'];
  return (
    <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-x-auto">
      <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">React App Component Tree</h4>
      <div className="flex flex-col items-center gap-0 min-w-[480px]">
        {nodes.map((node, i) => (
          <div key={i} className="flex flex-col items-center">
            {node.children ? (
              <div className="flex gap-3 flex-wrap justify-center">
                {node.children.map(c => (
                  <div key={c} className={`${node.bg} ${node.textColor} px-4 py-2 rounded-xl text-xs font-semibold shadow`}>{c}</div>
                ))}
              </div>
            ) : (
              <div className={`${node.bg} text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md`}>{node.label}</div>
            )}
            {i < nodes.length - 1 && <div className="w-0.5 h-5 bg-slate-300 my-1" />}
          </div>
        ))}
        <div className="flex gap-3 mt-6 flex-wrap justify-center">
          {extras.map(e => (
            <div key={e} className="bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium">{e}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BackendOrganigram() {
  const layers = [
    { label: 'Incoming HTTP Request', bg: 'bg-sky-100 text-sky-800 border border-sky-200' },
    { label: 'Express Middleware (CORS, Helmet, Morgan, JSON Parser)', bg: 'bg-slate-100 text-slate-700 border border-slate-200' },
    { label: 'Route Handler  →  /api/courses  |  /api/auth  |  /api/assignments', bg: 'bg-emerald-100 text-emerald-800 border border-emerald-200' },
    { label: 'Auth Middleware (JWT via Supabase)', bg: 'bg-amber-100 text-amber-800 border border-amber-200' },
    { label: 'Controller (Business Logic)', bg: 'bg-violet-100 text-violet-800 border border-violet-200' },
    { label: 'Supabase Client → PostgreSQL Database', bg: 'bg-rose-100 text-rose-800 border border-rose-200' },
  ];
  return (
    <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
      <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">Express Request Pipeline</h4>
      <div className="flex flex-col items-center gap-0 max-w-lg mx-auto">
        {layers.map((l, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            <div className={`${l.bg} w-full text-center px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm`}>{l.label}</div>
            {i < layers.length - 1 && <div className="w-0.5 h-4 bg-slate-300 my-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function DatabaseOrganigram() {
  const tables = [
    { name: 'users', fields: ['id (uuid PK)', 'auth_id (uuid)', 'full_name', 'email', 'role'], color: 'bg-amber-50 border-amber-300' },
    { name: 'courses', fields: ['id (int PK)', 'title', 'instructor', 'duration', 'status'], color: 'bg-sky-50 border-sky-300' },
    { name: 'assignments', fields: ['id (uuid PK)', 'user_id (FK)', 'title', 'score', 'grade', 'submitted_at'], color: 'bg-emerald-50 border-emerald-300' },
    { name: 'enrollments', fields: ['id (uuid PK)', 'user_id (FK)', 'course_id (FK)', 'progress', 'enrolled_at'], color: 'bg-violet-50 border-violet-300' },
  ];
  return (
    <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
      <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">Database Schema (Supabase / PostgreSQL)</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tables.map(t => (
          <div key={t.name} className={`${t.color} border rounded-xl overflow-hidden shadow-sm`}>
            <div className="bg-white/60 backdrop-blur px-3 py-2 font-bold text-slate-800 text-sm border-b border-inherit">
              📋 {t.name}
            </div>
            <ul className="px-3 py-2 space-y-1">
              {t.fields.map(f => (
                <li key={f} className="text-xs text-slate-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Code Snippet Component ───────────────────────────────────────────────────

function CodeBlock({ title, language, code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-4 rounded-xl overflow-hidden shadow-md border border-slate-200">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-slate-400 text-xs font-mono">{title}</span>
        </div>
        <button onClick={handleCopy} className="text-xs text-slate-400 hover:text-white transition-colors">
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono leading-relaxed whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Quiz Data ────────────────────────────────────────────────────────────────

const quizQuestions = [
  {
    id: 1,
    question: 'What does "frontend" refer to in a web application?',
    options: [
      'The server that handles database queries',
      'The part of the app the user sees and interacts with in the browser',
      'The code that manages authentication tokens',
      'The deployment pipeline for production releases',
    ],
    correct: 1,
  },
  {
    id: 2,
    question: 'Which of the following best describes React?',
    options: [
      'A relational database management system',
      'A backend server framework built on Python',
      'A JavaScript library for building user interfaces using components',
      'A CSS framework for styling HTML elements',
    ],
    correct: 2,
  },
  {
    id: 3,
    question: 'What is the primary role of Tailwind CSS in a React project?',
    options: [
      'Managing state across components',
      'Providing utility-first CSS classes for styling directly in JSX',
      'Routing between different pages in the app',
      'Making HTTP requests to the backend API',
    ],
    correct: 1,
  },
  {
    id: 4,
    question: 'Which port does this app\'s Express backend run on by default?',
    options: ['5000', '8080', '3001', '443'],
    correct: 2,
  },
  {
    id: 5,
    question: 'What does Express.js middleware like `cors()` and `helmet()` do?',
    options: [
      'It converts JSX syntax into regular JavaScript',
      'It handles cross-origin requests and adds security HTTP headers to responses',
      'It connects the app to a PostgreSQL database',
      'It minifies CSS and JavaScript for production builds',
    ],
    correct: 1,
  },
  {
    id: 6,
    question: 'In the Express route `router.get("/courses/:id", protect, getCourseById)`, what is `:id`?',
    options: [
      'A hardcoded integer identifying the admin',
      'A route parameter that captures a dynamic value from the URL',
      'A query string for filtering database results',
      'The name of the database table to query',
    ],
    correct: 1,
  },
  {
    id: 7,
    question: 'What is Supabase built on top of?',
    options: [
      'MongoDB (NoSQL document store)',
      'SQLite (file-based relational database)',
      'Redis (in-memory key-value store)',
      'PostgreSQL (open-source relational database)',
    ],
    correct: 3,
  },
  {
    id: 8,
    question: 'What is the purpose of the Supabase `service_role` key used in the backend?',
    options: [
      'It is used in the browser to enable real-time subscriptions',
      'It provides admin-level access that bypasses Row Level Security (RLS)',
      'It generates JWT tokens for user login sessions',
      'It is the public key sent to all API clients',
    ],
    correct: 1,
  },
  {
    id: 9,
    question: 'In React, what does Zustand provide?',
    options: [
      'Server-side rendering for improved SEO performance',
      'A component library with pre-built UI elements',
      'Global state management so data can be shared across components',
      'A build tool that bundles JavaScript and CSS assets',
    ],
    correct: 2,
  },
  {
    id: 10,
    question: 'When a user logs in via Supabase Auth, what does the app receive that proves the user\'s identity?',
    options: [
      'A plain-text username and password stored in localStorage',
      'A session cookie containing the user\'s full profile',
      'A JSON Web Token (JWT) used as a Bearer token in API requests',
      'An API key generated once at account creation',
    ],
    correct: 2,
  },
];

function getGrade(pct) {
  if (pct >= 90) return { letter: 'A', label: 'Excellent!', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
  if (pct >= 80) return { letter: 'B', label: 'Great Work!', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' };
  if (pct >= 70) return { letter: 'C', label: 'Good Effort!', color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200' };
  if (pct >= 60) return { letter: 'D', label: 'Keep Practicing', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' };
  return { letter: 'F', label: 'Review & Retry', color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
}

// ── Quiz Component ───────────────────────────────────────────────────────────

function Quiz({ user, session, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [savedToDb, setSavedToDb] = useState(false);

  const score = submitted
    ? quizQuestions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0)
    : 0;
  const pct = Math.round((score / quizQuestions.length) * 100);
  const grade = getGrade(pct);
  const allAnswered = Object.keys(answers).length === quizQuestions.length;

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setSubmitting(true);
    setSubmitError('');
    setSubmitted(true);

    const finalScore = quizQuestions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    const finalPct = Math.round((finalScore / quizQuestions.length) * 100);
    const finalGrade = getGrade(finalPct);

    try {
      const token = session?.access_token;
      const res = await fetch(`${API_BASE}/api/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: 'Intro to Software Development — Module Quiz',
          course_id: 1,
          score: finalScore,
          total: quizQuestions.length,
          grade: finalGrade.letter,
          answers,
        }),
      });
      if (res.ok) {
        setSavedToDb(true);
        onComplete?.(finalScore, finalPct, finalGrade.letter);
      } else {
        const d = await res.json();
        setSubmitError(d.message || 'Could not save to database.');
        onComplete?.(finalScore, finalPct, finalGrade.letter);
      }
    } catch {
      setSubmitError('Network error — result not saved to database.');
      onComplete?.(finalScore, finalPct, finalGrade.letter);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setSubmitError('');
    setSavedToDb(false);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        {/* Grade card */}
        <div className={`rounded-2xl border-2 p-8 text-center ${grade.bg}`}>
          <Trophy className={`w-12 h-12 mx-auto mb-3 ${grade.color}`} />
          <div className={`text-6xl font-black mb-1 ${grade.color}`}>{grade.letter}</div>
          <div className={`text-xl font-bold ${grade.color}`}>{grade.label}</div>
          <div className="text-slate-600 mt-2 text-lg">
            You scored <span className="font-bold">{score} / {quizQuestions.length}</span> ({pct}%)
          </div>
          {savedToDb && (
            <div className="mt-3 inline-flex items-center gap-2 bg-white/70 px-4 py-2 rounded-xl text-sm font-medium text-emerald-700">
              <CheckCircle2 className="w-4 h-4" /> Result saved to Assignments
            </div>
          )}
          {submitError && (
            <div className="mt-3 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl">{submitError}</div>
          )}
        </div>

        {/* Answer review */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Review Your Answers</h3>
          {quizQuestions.map((q, qi) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correct;
            return (
              <div key={q.id} className={`rounded-xl border p-4 ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                  <p className="font-semibold text-slate-800 text-sm">Q{qi + 1}. {q.question}</p>
                </div>
                <div className="pl-8 space-y-1.5">
                  {q.options.map((opt, oi) => (
                    <div key={oi} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${
                      oi === q.correct ? 'bg-emerald-200 text-emerald-900' :
                      oi === userAns && !isCorrect ? 'bg-red-200 text-red-800 line-through' :
                      'text-slate-500'
                    }`}>
                      {oi === q.correct && '✓ '}{opt}
                      {oi === userAns && !isCorrect && ' (your answer)'}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={handleReset} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md">
          <RotateCcw className="w-4 h-4" /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
        <p className="text-sm text-sky-800 font-medium">📝 Answer all 10 questions, then click Submit to see your grade. Your result will be saved to Assignments.</p>
      </div>

      <div className="space-y-6">
        {quizQuestions.map((q, qi) => (
          <div key={q.id} className="glass rounded-2xl p-5 shadow-soft">
            <p className="font-bold text-slate-800 mb-4">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-500 text-white text-xs font-black mr-2">
                {qi + 1}
              </span>
              {q.question}
            </p>
            <div className="space-y-2.5 pl-9">
              {q.options.map((opt, oi) => (
                <label key={oi} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                  answers[q.id] === oi
                    ? 'bg-sky-50 border-sky-400 text-sky-900 font-medium'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}>
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={oi}
                    checked={answers[q.id] === oi}
                    onChange={() => setAnswers(prev => ({ ...prev, [q.id]: oi }))}
                    className="mt-0.5 accent-sky-500"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          {Object.keys(answers).length} / {quizQuestions.length} answered
        </span>
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
            allAnswered && !submitting
              ? 'bg-sky-500 hover:bg-sky-600 hover:shadow-sky-200'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Quiz'}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

// ── Tabs / Sections ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'frontend', label: 'Frontend', icon: Code2 },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'quiz', label: 'Quiz', icon: Trophy },
];

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">What is Software Development?</h2>
        <p className="text-slate-600 leading-relaxed">
          Software development is the process of designing, coding, testing, and maintaining applications or systems. A modern <strong>web application</strong> is split into three main layers that each handle a distinct responsibility — this is called the <strong>three-tier architecture</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {[
            { icon: '🖥️', title: 'Frontend', desc: 'What the user sees — built with React and styled with Tailwind CSS. Runs entirely in the user\'s browser.' },
            { icon: '⚙️', title: 'Backend', desc: 'The engine behind the scenes — a Node.js & Express server that handles business logic, security, and API endpoints.' },
            { icon: '🗄️', title: 'Database', desc: 'Persistent storage — Supabase provides PostgreSQL tables, Row Level Security, and built-in Auth.' },
          ].map(c => (
            <div key={c.title} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="text-3xl mb-2">{c.icon}</div>
              <h3 className="font-bold text-slate-800 mb-1">{c.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-800">The Developer Workflow</h3>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center flex-wrap">
          {['Write Code', 'Run Locally', 'Test & Debug', 'Commit (Git)', 'Deploy', 'Monitor'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-800 px-3 py-1.5 rounded-lg text-sm font-medium">
                <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
                {step}
              </div>
              {i < 5 && <ChevronRight className="w-4 h-4 text-slate-400 hidden sm:block" />}
            </div>
          ))}
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          Developers use tools like <strong>VS Code</strong> for editing, <strong>Git</strong> for version control, <strong>npm</strong> for managing packages, and platforms like <strong>Replit</strong> or <strong>Vercel</strong> for deployment.
        </p>
      </div>
    </div>
  );
}

function ArchitectureSection() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Three-Tier Web App Architecture</h2>
        <p className="text-slate-600 leading-relaxed">
          Every modern web application separates concerns into distinct layers. Each layer communicates with the next through defined interfaces — usually HTTP APIs and database queries.
        </p>
        <WebAppOrganigram />
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Key Insight:</strong> The frontend never talks to the database directly. All data must go through the backend API, which validates, authorises, and processes requests before querying Supabase. This keeps your database credentials secure on the server.
        </div>
      </div>
    </div>
  );
}

function FrontendSection() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Frontend: React + Tailwind CSS</h2>
        <p className="text-slate-600 leading-relaxed">
          React is a <strong>component-based library</strong> — you build UIs by composing small, reusable pieces called components. Each component manages its own state and renders HTML-like JSX markup.
        </p>
        <FrontendOrganigram />
        <h3 className="font-bold text-slate-800 text-lg">React Component Example</h3>
        <CodeBlock
          title="CourseCard.jsx"
          language="jsx"
          code={`import { PlayCircle } from 'lucide-react';

// A component is just a JavaScript function that returns JSX
export default function CourseCard({ title, instructor, progress }) {
  return (
    // Tailwind CSS utility classes — no separate CSS file needed!
    <div className="bg-white rounded-2xl shadow-md p-5 space-y-3">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500">by {instructor}</p>

      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full">
        <div
          className="h-full bg-sky-500 rounded-full transition-all"
          style={{ width: \`\${progress}%\` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-600">{progress}% complete</span>

      <button className="w-full flex items-center justify-center gap-2
                         bg-sky-500 hover:bg-sky-600 text-white
                         py-2.5 rounded-xl font-semibold transition-all">
        <PlayCircle className="w-4 h-4" />
        Continue Learning
      </button>
    </div>
  );
}

// Usage in a parent component:
// <CourseCard title="Intro to SWD" instructor="Dr. Smith" progress={75} />`}
        />

        <h3 className="font-bold text-slate-800 text-lg">State Management with Zustand</h3>
        <CodeBlock
          title="store/authStore.js"
          language="js"
          code={`import { create } from 'zustand';

// Zustand creates a global store — accessible in any component
export const useAuthStore = create((set) => ({
  user: null,       // The logged-in user profile
  session: null,    // The Supabase session (contains JWT)
  loading: true,    // Whether auth is still being checked

  // Actions — functions that update the store
  setUser: (user, session) => set({ user, session, loading: false }),
  clearAuth: () => set({ user: null, session: null, loading: false }),
}));

// Reading the store in any component:
// const { user, loading } = useAuthStore();

// Updating the store:
// const setUser = useAuthStore(state => state.setUser);
// setUser(profile, session);`}
        />

        <h3 className="font-bold text-slate-800 text-lg">Fetching Data from the Backend</h3>
        <CodeBlock
          title="pages/Dashboard.jsx (fetch example)"
          language="jsx"
          code={`import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const { session } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      const res = await fetch('/api/courses', {
        headers: {
          // JWT token proves the user is logged in
          Authorization: \`Bearer \${session?.access_token}\`,
        },
      });
      const data = await res.json();
      if (data.success) setCourses(data.data);
      setLoading(false);
    }

    if (session) loadCourses();
  }, [session]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-6">
      {courses.map(c => (
        <CourseCard key={c.id} {...c} />
      ))}
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}

function BackendSection() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Backend: Node.js + Express.js</h2>
        <p className="text-slate-600 leading-relaxed">
          The backend is a <strong>REST API server</strong> built with Express. It receives HTTP requests from the frontend, validates them, applies business logic, and queries the database. Every route is protected by JWT authentication middleware.
        </p>
        <BackendOrganigram />

        <h3 className="font-bold text-slate-800 text-lg">Express App Setup</h3>
        <CodeBlock
          title="src/app.js"
          language="js"
          code={`const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
require('dotenv').config();  // Loads .env variables into process.env

const app = express();

// ── Security & Utility Middleware ─────────────────────────────
app.use(helmet());               // Adds security HTTP headers
app.use(cors({ origin: '*', credentials: true })); // Allows frontend access
app.use(express.json());         // Parses JSON request bodies
app.use(morgan('dev'));           // Logs every request to the console

// ── API Routes ────────────────────────────────────────────────
app.use('/api/courses',     require('./routes/courseRoutes'));
app.use('/api/auth',        require('./routes/authRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));

// ── Global Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;`}
        />

        <h3 className="font-bold text-slate-800 text-lg">Defining a Protected Route</h3>
        <CodeBlock
          title="src/routes/courseRoutes.js"
          language="js"
          code={`const express   = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getAllCourses, getCourseById } = require('../controllers/courseController');

const router = express.Router();

// GET /api/courses  →  returns all courses (requires valid JWT)
router.get('/', protect, getAllCourses);

// GET /api/courses/:id  →  returns one course with enrollments
router.get('/:id', protect, getCourseById);

module.exports = router;`}
        />

        <h3 className="font-bold text-slate-800 text-lg">Authentication Middleware</h3>
        <CodeBlock
          title="src/middleware/authMiddleware.js"
          language="js"
          code={`const supabase = require('../config/supabase');

// This middleware runs BEFORE the controller function.
// It checks the JWT in the Authorization header.
exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if a Bearer token was sent
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify the token with Supabase (no manual decoding needed)
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) throw new Error('Invalid token');

    // 3. Attach the user to the request object for the controller
    req.user = user;
    next();  // ✅ Token is valid — continue to the controller
  } catch {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};`}
        />
      </div>
    </div>
  );
}

function DatabaseSection() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Database: Supabase (PostgreSQL)</h2>
        <p className="text-slate-600 leading-relaxed">
          Supabase is an open-source Firebase alternative built on <strong>PostgreSQL</strong> — the world's most advanced relational database. It provides a JavaScript client, built-in authentication, file storage, and real-time subscriptions out of the box.
        </p>
        <DatabaseOrganigram />

        <h3 className="font-bold text-slate-800 text-lg">Supabase Client (Backend)</h3>
        <CodeBlock
          title="src/config/supabase.js"
          language="js"
          code={`const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// The service_role key gives full admin access (bypasses RLS).
// NEVER expose this key in the frontend — server-side only!
module.exports = createClient(
  process.env.SUPABASE_URL,            // e.g. https://xxxx.supabase.co
  process.env.SUPABASE_SERVICE_ROLE_KEY
);`}
        />

        <h3 className="font-bold text-slate-800 text-lg">Querying Data — CRUD Operations</h3>
        <CodeBlock
          title="CRUD Examples with Supabase JS Client"
          language="js"
          code={`const supabase = require('../config/supabase');

// ── CREATE (Insert) ───────────────────────────────────────────
const { data, error } = await supabase
  .from('assignments')
  .insert([{
    user_id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Module Quiz',
    score: 8,
    total: 10,
    grade: 'B',
  }])
  .select()  // Returns the inserted row
  .single();

// ── READ (Select) ─────────────────────────────────────────────
const { data: courses } = await supabase
  .from('courses')
  .select('id, title, instructor')  // Select specific columns
  .eq('status', 'Active')           // WHERE status = 'Active'
  .order('title', { ascending: true });

// ── READ with Join ────────────────────────────────────────────
const { data: courseWithEnrolments } = await supabase
  .from('courses')
  .select('*, enrollments(*)')  // Join enrollments table
  .eq('id', 1)
  .single();

// ── UPDATE ────────────────────────────────────────────────────
await supabase
  .from('enrollments')
  .update({ progress: 80 })
  .eq('user_id', userId)
  .eq('course_id', courseId);

// ── DELETE ────────────────────────────────────────────────────
await supabase
  .from('assignments')
  .delete()
  .eq('id', assignmentId);`}
        />

        <h3 className="font-bold text-slate-800 text-lg">Row Level Security (RLS)</h3>
        <CodeBlock
          title="Supabase SQL — RLS Policy Example"
          language="sql"
          code={`-- Enable Row Level Security on the assignments table
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own assignments
CREATE POLICY "Users can view own assignments"
  ON assignments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only insert assignments for themselves
CREATE POLICY "Users can insert own assignments"
  ON assignments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ⚠️ The backend's service_role key bypasses ALL RLS policies.
--    Use it only in secure server-side code, never in the browser.`}
        />

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
          <strong>Best Practice:</strong> Always use the <code className="bg-emerald-100 px-1 rounded">anon</code> (public) key in your frontend and the <code className="bg-emerald-100 px-1 rounded">service_role</code> key only in your backend. Enable RLS on all public tables so users can only access their own data.
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

const COURSE_ID = 1;

export default function LearningModule() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { user, session } = useAuthStore();
  const { visitSection, setProgress } = useCourseStore();

  const courseData = useCourseStore(state => state.courses.find(c => c.id === COURSE_ID));
  const liveProgress = courseData?.progress ?? 75;
  const visitedSections = courseData?.visitedSections ?? [];

  const currentIndex = TABS.findIndex(t => t.id === activeTab);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    visitSection(COURSE_ID, tabId);
  };

  const goNext = () => {
    if (currentIndex < TABS.length - 1) switchTab(TABS[currentIndex + 1].id);
  };
  const goPrev = () => {
    if (currentIndex > 0) switchTab(TABS[currentIndex - 1].id);
  };

  const handleQuizComplete = (_score, pct, _grade) => {
    visitSection(COURSE_ID, 'quiz');
    setProgress(COURSE_ID, Math.max(liveProgress, pct >= 50 ? 100 : 90));
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'overview':      return <OverviewSection />;
      case 'architecture':  return <ArchitectureSection />;
      case 'frontend':      return <FrontendSection />;
      case 'backend':       return <BackendSection />;
      case 'database':      return <DatabaseSection />;
      case 'quiz':          return <Quiz user={user} session={session} onComplete={handleQuizComplete} />;
      default:              return null;
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Courses</span> <ChevronRight className="w-3 h-3" /> <span className="text-sky-600 font-medium">Introduction to Software Development</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Introduction to Software Development</h1>
          <p className="text-slate-500 text-sm mt-0.5">Dr. Smith · 4 Weeks · Module 1 of 6</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-500"
          style={{ width: `${liveProgress}%` }}
        />
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto bg-slate-100 p-1 rounded-2xl">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const visited = visitedSections.includes(tab.id);
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-1 justify-center ${
                isActive
                  ? 'bg-white text-sky-600 shadow-sm'
                  : visited
                  ? 'text-emerald-600 hover:bg-white/60'
                  : 'text-slate-500 hover:bg-white/60'
              }`}
            >
              {visited && !isActive
                ? <CheckCircle2 className="w-3.5 h-3.5" />
                : <Icon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>{renderSection()}</div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        {currentIndex < TABS.length - 1 && (
          <button
            onClick={goNext}
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-sky-200"
          >
            Next: {TABS[currentIndex + 1].label} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
