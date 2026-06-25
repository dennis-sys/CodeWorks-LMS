import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import { API_BASE } from '../services/api';
import {
  BookOpen, Map, Hammer, Link2, Layers, Trophy,
  CheckCircle2, ArrowLeft, ArrowRight, ChevronRight,
  ExternalLink, Globe, RotateCcw, Send, Github
} from 'lucide-react';

const COURSE_ID = 7;

const TABS = [
  { id: 'overview',    label: 'Overview',        icon: BookOpen },
  { id: 'planning',    label: 'Project Planning', icon: Map      },
  { id: 'building',    label: 'Building',         icon: Hammer   },
  { id: 'connecting',  label: 'Connecting',       icon: Link2    },
  { id: 'vibecoding',  label: 'Vibe Coding',      icon: Layers   },
  { id: 'assignment',  label: 'Assignment',       icon: Trophy   },
];

// ── Shared Utility ────────────────────────────────────────────────────────────

function CodeBlock({ title, code }) {
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

// ── Sections ──────────────────────────────────────────────────────────────────

function OverviewSection() {
  const stack = [
    { icon: '🎨', label: 'React + Tailwind',   sub: 'Frontend UI',          color: 'bg-violet-500'  },
    { icon: '🚦', label: 'Express + Node',     sub: 'Backend API',           color: 'bg-emerald-500' },
    { icon: '🗄️', label: 'Supabase',           sub: 'Database + Auth',       color: 'bg-sky-500'     },
    { icon: '🤖', label: 'Qwen AI',            sub: 'Code generation',        color: 'bg-amber-500'   },
    { icon: '☁️', label: 'Netlify + Render',   sub: 'Deploy front + backend', color: 'bg-rose-500'    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Full Stack Application — Capstone</h2>
        <p className="text-slate-600 leading-relaxed">
          This is the capstone module. You have learned React, AI tooling, Vibe Coding, frontend deployment, Express APIs, Supabase databases — now you combine all of it into a single, fully deployed, full-stack application. A full-stack app means you own <strong>every layer</strong>: the interface users see, the server that handles requests, and the database that stores data.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Your capstone project must be something <strong>real and personally meaningful</strong> — a portfolio piece you would be proud to show an employer. Use Qwen AI to generate the code, but you design the product, choose the features, and make the decisions. That is the skill that matters.
        </p>

        <div className="my-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">The Full Stack — All Layers Connected</h4>
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-center">
            {stack.map((s, i) => (
              <div key={s.label} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className={`${s.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md`}>{s.icon}</div>
                  <div className="font-bold text-slate-800 text-xs mt-1.5 text-center">{s.label}</div>
                  <div className="text-slate-500 text-[10px] text-center max-w-[80px] mt-0.5">{s.sub}</div>
                </div>
                {i < stack.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0 rotate-90 sm:rotate-0 my-1 sm:my-0 sm:mb-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '🎨', title: 'Frontend (React + Tailwind)', desc: 'The user interface — pages, components, navigation, forms, state management with Zustand or React Context. Deployed to Netlify or Vercel.' },
            { icon: '🚂', title: 'Backend (Express + Node)',    desc: 'The REST API — routes, controllers, middleware, JWT auth verification. Handles requests from the frontend. Deployed to Render.' },
            { icon: '🗄️', title: 'Database (Supabase)',        desc: 'PostgreSQL tables with relationships, RLS security policies, and the auto-generated REST API. Stores all app data permanently.' },
            { icon: '🤖', title: 'AI Tooling (Qwen AI)',       desc: 'Every file is generated with a precise Qwen prompt. You provide the spec; Qwen writes the code. Your job is knowing what to ask for and how to assemble it correctly.' },
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
        <h3 className="text-xl font-bold text-slate-800">What the Capstone Requires</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '01', title: 'Plan Your Product',      desc: 'Choose a real problem to solve. Define your tables, pages, API endpoints, and user flows before writing any code.' },
            { step: '02', title: 'Build with Vibe Coding', desc: 'Generate every file with Qwen AI using precise prompts. Assemble in the correct order. Test each layer before connecting them.' },
            { step: '03', title: 'Deploy & Submit',        desc: 'Frontend on Netlify/Vercel. Backend on Render. Push code to GitHub. Submit live URL + GitHub repo + reflection rubric.' },
          ].map(s => (
            <div key={s.step} className="bg-rose-50 border border-rose-200 rounded-xl p-4">
              <div className="text-3xl font-black text-rose-200 mb-2">{s.step}</div>
              <h4 className="font-bold text-rose-800 mb-1 text-sm">{s.title}</h4>
              <p className="text-xs text-rose-700 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-sky-800">
          <strong>Capstone Stack:</strong> React 18 + Vite + Tailwind CSS · Node.js + Express.js · Supabase (PostgreSQL + Auth) · Qwen AI · GitHub · Netlify (frontend) · Render (backend)
        </div>
      </div>
    </div>
  );
}

function PlanningSection() {
  const appIdeas = [
    { emoji: '📋', name: 'Task Manager',         tables: 'tasks, categories, users',                        pages: 'Dashboard, Task List, Add Task, Profile' },
    { emoji: '📝', name: 'Study Notes App',       tables: 'notes, subjects, tags',                            pages: 'Home, Notes Grid, Note Editor, Search' },
    { emoji: '🛒', name: 'Marketplace',           tables: 'products, orders, reviews, users',                 pages: 'Shop, Product Detail, Cart, My Listings' },
    { emoji: '📅', name: 'Event Booking',         tables: 'events, bookings, venues, users',                  pages: 'Events, Event Detail, My Bookings, Admin' },
    { emoji: '💬', name: 'Community Forum',       tables: 'posts, comments, categories, votes',               pages: 'Feed, Post Detail, New Post, Profile' },
    { emoji: '📊', name: 'Habit Tracker',         tables: 'habits, completions, streaks, users',              pages: 'Dashboard, Habits, History, Stats' },
    { emoji: '🍽️', name: 'Recipe Saver',          tables: 'recipes, ingredients, tags, collections',          pages: 'Browse, Recipe Detail, Add Recipe, My Cookbook' },
    { emoji: '💼', name: 'Job Application Tracker', tables: 'applications, companies, contacts, stages',      pages: 'Board (Kanban), Company Detail, Add Application' },
  ];

  const wireframeChecklist = [
    'What is the ONE core action the user takes? (create a task, book an event, post a note)',
    'What pages does the app need? (list them all — usually 4–6 pages)',
    'What does the home/dashboard page show when a user logs in?',
    'Where does authentication happen? (login page or modal?)',
    'What forms does the app need? (create, edit)',
    'What data is displayed on each page? (map this to your DB tables)',
    'What does a guest see vs a logged-in user?',
  ];

  const dbDesignExample = `-- Planning your database before writing any code
-- Example: Job Application Tracker

-- 1. List all the "things" your app tracks
--    → companies, applications, contacts, interview_stages

-- 2. Define the columns each thing needs
CREATE TABLE companies (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  website     TEXT,
  location    TEXT,
  industry    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE applications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id    UUID REFERENCES companies(id) ON DELETE CASCADE,
  role_title    TEXT NOT NULL,
  status        TEXT CHECK (status IN ('applied','interview','offer','rejected')) DEFAULT 'applied',
  applied_date  DATE DEFAULT CURRENT_DATE,
  salary_range  TEXT,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contacts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  role           TEXT,
  email          TEXT,
  linkedin_url   TEXT
);

-- 3. Ask yourself:
--    ✅ Can I insert a row into every table?
--    ✅ Do all foreign keys point to tables that already exist?
--    ✅ Is every piece of data I want to display covered by a column?`;

  const endpointPlan = `# Plan your API endpoints BEFORE generating any code
# Format: METHOD /path — what it does

GET    /api/companies              — List all companies
GET    /api/companies/:id          — Get one company + its applications
POST   /api/companies              — Create a company
PUT    /api/companies/:id          — Update a company

GET    /api/applications           — List logged-in user's applications (auth required)
GET    /api/applications/:id       — Get one application + contacts (auth required)
POST   /api/applications           — Submit a new application (auth required)
PUT    /api/applications/:id       — Update status/notes (auth required)
DELETE /api/applications/:id       — Delete application (auth required)

GET    /api/applications/:id/contacts  — List contacts for an application
POST   /api/applications/:id/contacts  — Add a contact (auth required)
DELETE /api/contacts/:id               — Delete a contact (auth required)

# Total: 12 endpoints across 3 resources
# Rule of thumb: 4–6 endpoints per major resource is healthy for a capstone`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Project Planning — Before You Write Any Code</h2>
        <p className="text-slate-600 leading-relaxed">
          The most common reason full-stack projects fail or stall is starting to code before the plan is clear. A strong plan means you know exactly which files to generate, in what order, with what content. 30 minutes of planning saves 5 hours of confusion.
        </p>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-800">
          <strong>Planning rule:</strong> Before asking Qwen to generate a single file, you should be able to answer: <em>"What tables does my database have? What pages does my app have? What API endpoints does my backend expose?"</em> If you cannot answer all three, keep planning.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Choosing Your Capstone Idea</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Choose an idea that is <strong>specific enough to build in weeks, not months</strong>, and <strong>personally interesting enough to motivate you</strong>. Avoid "social media apps" or "clone of Instagram" — the scope is too large. Pick something with a clear core action.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {appIdeas.map(idea => (
            <div key={idea.name} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{idea.emoji}</span>
                <h4 className="font-bold text-slate-800">{idea.name}</h4>
              </div>
              <div className="text-xs text-slate-500 space-y-1">
                <div><span className="font-medium text-slate-600">Tables:</span> {idea.tables}</div>
                <div><span className="font-medium text-slate-600">Pages:</span> {idea.pages}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Scope check:</strong> A good capstone has 3–5 database tables, 4–6 pages, and 8–15 API endpoints. If you need more than that for version 1, cut features and ship — you can always add more later.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Wireframing Checklist</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          You do not need a design tool. A piece of paper or a simple list is enough. Answer every question below before moving on:
        </p>
        <div className="space-y-2">
          {wireframeChecklist.map((item, i) => (
            <div key={i} className="flex gap-3 items-start bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
              <p className="text-sm text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Database Design — Plan Tables First</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Map out every table and column in plain English before touching SQL. Ask: "What are the things my app tracks?" Each thing is a table. Each property of a thing is a column. Every table that belongs to a user needs a <code className="bg-slate-100 px-1 rounded font-mono text-xs">user_id</code> foreign key.
        </p>
        <CodeBlock title="Example: planning tables for a Job Tracker" code={dbDesignExample} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">API Endpoint Plan</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          List every API endpoint before generating a single controller. This becomes the spec you hand to Qwen — it tells the AI exactly what functions to export and what each one does.
        </p>
        <CodeBlock title="API endpoint plan — Job Tracker example" code={endpointPlan} />
      </div>
    </div>
  );
}

function BuildingSection() {
  const fullStackStructure = `your-project/
│
├── frontend/                      ← React + Vite + Tailwind app
│   ├── src/
│   │   ├── components/            ← Reusable UI (Navbar, Button, Card, Modal)
│   │   ├── pages/                 ← One file per route (Home, Dashboard, Detail)
│   │   ├── hooks/                 ← Custom hooks (useJobs, useCompanies)
│   │   ├── store/                 ← Zustand stores (authStore, appStore)
│   │   ├── services/
│   │   │   └── api.js             ← Axios/fetch helper pointing to your backend
│   │   ├── lib/
│   │   │   └── supabase.js        ← Frontend anon client (for Auth only)
│   │   ├── App.jsx                ← Router setup + ProtectedRoute
│   │   └── main.jsx
│   ├── .env                       ← VITE_API_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
│   ├── index.html
│   └── package.json
│
├── backend/                       ← Express + Node.js API
│   ├── src/
│   │   ├── controllers/           ← Business logic (one file per resource)
│   │   ├── routes/                ← Route definitions (one file per resource)
│   │   ├── middleware/            ← authMiddleware, errorMiddleware
│   │   ├── lib/
│   │   │   └── supabase.js        ← Admin client (service role key)
│   │   └── server.js              ← Entry point
│   ├── .env                       ← SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, CORS_ORIGIN, PORT
│   └── package.json
│
└── README.md                      ← Project description + setup instructions`;

  const frontendApiService = `// frontend/src/services/api.js
// Central fetch helper — all backend calls go through here

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper: make authenticated requests (attaches Supabase JWT)
export async function apiFetch(path, options = {}, session = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(session?.access_token
      ? { Authorization: \`Bearer \${session.access_token}\` }
      : {}),
    ...options.headers,
  };
  const res = await fetch(\`\${API_BASE}\${path}\`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  if (res.status === 204) return null;   // DELETE — no body
  return res.json();
}

// Usage in a component or hook:
// const jobs = await apiFetch('/api/applications', {}, session);
// const job  = await apiFetch('/api/applications', {
//   method: 'POST',
//   body: JSON.stringify({ company_id, role_title, status }),
// }, session);`;

  const protectedRoute = `// frontend/src/App.jsx — routing with auth protection

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Home          from './pages/Home';
import Login         from './pages/Login';
import Dashboard     from './pages/Dashboard';
import ApplicationDetail from './pages/ApplicationDetail';
import AddApplication    from './pages/AddApplication';

// Redirects to /login if the user is not authenticated
function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user)   return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/applications/:id" element={<ProtectedRoute><ApplicationDetail /></ProtectedRoute>} />
        <Route path="/applications/new" element={<ProtectedRoute><AddApplication /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}`;

  const authStore = `// frontend/src/store/authStore.js — Supabase auth state (Zustand)

import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set) => ({
  user:    null,
  session: null,
  loading: true,

  init: async () => {
    // Check for an existing session on page load
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, session, loading: false });

    // Listen for auth state changes (login, logout, token refresh)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, session });
    });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
}));`;

  const backendServerFull = `// backend/src/server.js — full entry point for a capstone

import express from 'express';
import cors    from 'cors';
import dotenv  from 'dotenv';
dotenv.config();

import companiesRoutes    from './routes/companiesRoutes.js';
import applicationsRoutes from './routes/applicationsRoutes.js';
import contactsRoutes     from './routes/contactsRoutes.js';

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5000',
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────
app.use('/api/companies',    companiesRoutes);
app.use('/api/applications', applicationsRoutes);
app.use('/api/contacts',     contactsRoutes);

// ── Health check ──────────────────────────────────────
app.get('/health', (_req, res) => res.json({ ok: true, ts: new Date() }));

// ── Global error handler ──────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => console.log(\`🚀 API running on port \${PORT}\`));`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Building the Full Stack</h2>
        <p className="text-slate-600 leading-relaxed">
          A full-stack project is two separate applications — a <strong>frontend</strong> and a <strong>backend</strong> — that communicate over HTTP. They live in separate folders, are deployed to separate platforms, and are connected by a single environment variable: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">VITE_API_URL</code>. Keep them completely independent — the frontend never talks to the database directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '🎨', title: 'Frontend responsibilities', color: 'border-violet-200 bg-violet-50 text-violet-800', items: ['Render UI components', 'Manage client-side state (Zustand)', 'Call the backend API', 'Handle auth token (attach to requests)', 'Navigate between pages (React Router)', 'Show loading & error states'] },
            { icon: '🚂', title: 'Backend responsibilities',  color: 'border-emerald-200 bg-emerald-50 text-emerald-800', items: ['Receive HTTP requests from frontend', 'Verify JWT tokens (auth middleware)', 'Validate request body', 'Query the Supabase database', 'Return JSON responses', 'Handle errors and status codes'] },
          ].map(side => (
            <div key={side.title} className={`rounded-xl border p-4 ${side.color}`}>
              <div className="text-2xl mb-2">{side.icon}</div>
              <h4 className="font-bold mb-2 text-sm">{side.title}</h4>
              <ul className="space-y-1">
                {side.items.map(item => (
                  <li key={item} className="text-xs flex gap-2">
                    <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0 opacity-60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-2">
        <h3 className="text-xl font-bold text-slate-900">Full Stack File Structure</h3>
        <CodeBlock title="Project structure — frontend/ + backend/" code={fullStackStructure} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Frontend — Key Files to Generate</h3>

        <h4 className="font-bold text-slate-800">1. API service helper</h4>
        <p className="text-slate-600 text-sm">All backend calls go through one file. This makes it easy to change the base URL, add default headers, or swap to Axios later.</p>
        <CodeBlock title="frontend/src/services/api.js — authenticated fetch helper" code={frontendApiService} />

        <h4 className="font-bold text-slate-800">2. Auth store</h4>
        <p className="text-slate-600 text-sm">Manages the Supabase session globally. Any component can call <code className="bg-slate-100 px-1 rounded font-mono text-xs">useAuthStore()</code> to get the current user or session token.</p>
        <CodeBlock title="frontend/src/store/authStore.js — Supabase + Zustand" code={authStore} />

        <h4 className="font-bold text-slate-800">3. Routing with protected routes</h4>
        <CodeBlock title="frontend/src/App.jsx — routes + ProtectedRoute" code={protectedRoute} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-2">
        <h3 className="text-xl font-bold text-slate-900">Backend — Entry Point</h3>
        <CodeBlock title="backend/src/server.js — full entry point" code={backendServerFull} />
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600">
          <strong>Pattern to follow for every resource:</strong> <code className="bg-slate-100 px-1 rounded font-mono text-xs">lib/supabase.js</code> → <code className="bg-slate-100 px-1 rounded font-mono text-xs">middleware/authMiddleware.js</code> → <code className="bg-slate-100 px-1 rounded font-mono text-xs">controllers/[resource]Controller.js</code> → <code className="bg-slate-100 px-1 rounded font-mono text-xs">routes/[resource]Routes.js</code> → mount in <code className="bg-slate-100 px-1 rounded font-mono text-xs">server.js</code>
        </div>
      </div>
    </div>
  );
}

function ConnectingSection() {
  const envFiles = `# frontend/.env — variables the React app needs
# Must be prefixed with VITE_ to be accessible in browser code
VITE_API_URL=http://localhost:3001          # backend URL (local)
VITE_SUPABASE_URL=https://xxx.supabase.co  # your Supabase project URL
VITE_SUPABASE_ANON_KEY=eyJ...              # public anon key only

# backend/.env — variables the Express server needs (NEVER committed to git)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...           # secret — bypasses RLS
CORS_ORIGIN=http://localhost:5000          # frontend origin
PORT=3001                                  # server port
NODE_ENV=development

# ── In production, update to real URLs ───────────────────
# frontend Netlify/Vercel env vars:
VITE_API_URL=https://your-backend.onrender.com

# backend Render env vars:
CORS_ORIGIN=https://your-frontend.netlify.app
NODE_ENV=production`;

  const corsConfig = `// backend/src/server.js — correct CORS configuration

// ✅ CORRECT — specific origin from environment variable
app.use(cors({
  origin: process.env.CORS_ORIGIN,   // set this in Render env vars
  credentials: true,                  // required if using cookies or Authorization header
}));

// ✅ ALSO VALID during development — allow all origins
app.use(cors());

// ❌ WRONG — hardcoded origin will break in production
app.use(cors({ origin: 'http://localhost:5000' }));

// ── CORS error checklist ──────────────────────────────────
// "CORS policy blocked" in browser console means:
// 1. CORS_ORIGIN on backend doesn't match your frontend URL exactly
//    (no trailing slash, correct protocol https:// not http://)
// 2. The backend is not running / not deployed correctly
// 3. The browser is sending a preflight OPTIONS request that is being rejected
//    → Make sure express.json() and cors() are applied BEFORE your routes`;

  const authFlow = `// ── How auth flows through the full stack ────────────────

// STEP 1: User logs in on the frontend
import { supabase } from '../lib/supabase';

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  // data.session.access_token is now available
  // Supabase stores it automatically in localStorage
}

// STEP 2: Frontend attaches the token to every API request
async function getMyApplications(session) {
  const res = await fetch(\`\${API_BASE}/api/applications\`, {
    headers: {
      Authorization: \`Bearer \${session.access_token}\`,
    },
  });
  return res.json();
}

// STEP 3: Backend middleware verifies the token
// backend/src/middleware/authMiddleware.js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' });

  req.user = data.user;    // user.id is available to all controllers
  next();
}

// STEP 4: Controller uses req.user.id to scope queries to the logged-in user
export async function getMyApplications(req, res) {
  const { data, error } = await supabase
    .from('applications')
    .select('*, companies(*)')
    .eq('user_id', req.user.id)    // only this user's rows
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}`;

  const deploymentChecklist = `# ── Deployment checklist — frontend (Netlify) ────────────

1. Push code to GitHub:
   git add . && git commit -m "feat: capstone app complete" && git push

2. Netlify → New Site → Import from GitHub → select your repo

3. Configure build:
   Base directory:    frontend
   Build command:     npm run build
   Publish directory: frontend/dist

4. Environment variables (Netlify → Site Settings → Env Vars):
   VITE_API_URL           = https://your-backend.onrender.com
   VITE_SUPABASE_URL      = https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJ...

5. Add _redirects file for SPA routing:
   # frontend/public/_redirects
   /*  /index.html  200

6. Trigger a new deploy — your frontend is live!

# ── Deployment checklist — backend (Render) ──────────────

1. Render → New → Web Service → Connect GitHub repo

2. Configure:
   Root Directory:  backend
   Build Command:   npm install
   Start Command:   node src/server.js

3. Environment variables (Render Dashboard → Environment):
   SUPABASE_URL              = https://xxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY = eyJ...
   CORS_ORIGIN               = https://your-frontend.netlify.app
   NODE_ENV                  = production

4. After deploy, copy Render URL → update VITE_API_URL in Netlify
   Then re-deploy the frontend (trigger manual deploy)`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Connecting Frontend to Backend</h2>
        <p className="text-slate-600 leading-relaxed">
          Getting the frontend and backend to talk to each other is where most students get stuck. It involves three things: the right <strong>environment variables</strong>, a correct <strong>CORS configuration</strong>, and attaching the <strong>auth token</strong> to every protected request. Get these three right and the connection will work locally and in production.
        </p>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Environment Variables — Both Sides</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          The frontend and backend each have their own <code className="bg-slate-100 px-1 rounded font-mono text-xs">.env</code> file. Frontend variables must be prefixed with <code className="bg-slate-100 px-1 rounded font-mono text-xs">VITE_</code>. Backend variables are plain. <strong>Never commit either file to GitHub</strong> — add <code className="bg-slate-100 px-1 rounded font-mono text-xs">.env</code> to <code className="bg-slate-100 px-1 rounded font-mono text-xs">.gitignore</code> in both folders.
        </p>
        <CodeBlock title=".env files — frontend and backend" code={envFiles} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">CORS — Why It Blocks & How to Fix It</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          CORS (Cross-Origin Resource Sharing) is a browser security feature that blocks requests from one domain to another unless the server explicitly allows it. Your frontend (<code className="bg-slate-100 px-1 rounded font-mono text-xs">netlify.app</code>) calling your backend (<code className="bg-slate-100 px-1 rounded font-mono text-xs">onrender.com</code>) is cross-origin. The Express <code className="bg-slate-100 px-1 rounded font-mono text-xs">cors()</code> middleware must whitelist your frontend URL.
        </p>
        <CodeBlock title="CORS configuration + common errors" code={corsConfig} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Auth Flow — Login to Protected Data</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Supabase issues a JWT when a user logs in. The frontend stores it and attaches it to every API call. The backend verifies it using the Supabase SDK. Once verified, the user's ID is attached to <code className="bg-slate-100 px-1 rounded font-mono text-xs">req.user</code> and every database query is scoped to that user only.
        </p>
        <CodeBlock title="End-to-end auth flow — login → API call → DB query" code={authFlow} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Deployment — Step by Step</h3>
        <CodeBlock title="Deploy frontend (Netlify) + backend (Render)" code={deploymentChecklist} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { step: '1', title: 'Deploy backend first', desc: 'Get your Render URL before touching Netlify — you need it for VITE_API_URL.' },
            { step: '2', title: 'Then deploy frontend', desc: 'Set VITE_API_URL in Netlify env vars to your Render backend URL.' },
            { step: '3', title: 'Update CORS_ORIGIN', desc: 'Copy your Netlify URL and paste it as CORS_ORIGIN in Render environment.' },
            { step: '4', title: 'Trigger a re-deploy', desc: 'After updating env vars on either platform, trigger a manual re-deploy for changes to take effect.' },
          ].map(tip => (
            <div key={tip.step} className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex gap-3">
              <div className="w-7 h-7 rounded-full bg-rose-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0">{tip.step}</div>
              <div>
                <h4 className="font-bold text-rose-800 text-sm">{tip.title}</h4>
                <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VibeCodingSection() {
  const qwenPlanningPrompt = `You are a senior full-stack developer.

I am building a Job Application Tracker full-stack app with:
- Frontend: React 18 + Vite + Tailwind CSS + React Router v6 + Zustand
- Backend: Node.js + Express.js
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth (email/password)

Generate a COMPLETE file list for this project in assembly order.
For each file include:
- The file path
- One sentence describing what it does
- All other files it imports from

Do not generate any code yet — just the file list.`;

  const qwenPagePrompt = `You are a senior React developer using React 18, Tailwind CSS, React Router v6, and Zustand.

Generate the COMPLETE file for: frontend/src/pages/Dashboard.jsx

Context:
- This is the main page after login for a Job Application Tracker
- User can see all their job applications in a Kanban-style board
- Columns: Applied, Interview, Offer, Rejected
- Each card shows: company name, role title, date applied, status badge
- "Add Application" button navigates to /applications/new
- Clicking a card navigates to /applications/:id
- Uses useApplications hook from '../hooks/useApplications'
- Uses useAuthStore from '../store/authStore' (for session and signOut)
- useApplications returns: { applications, loading, error }
- applications is an array of { id, role_title, status, applied_date, companies: { name } }
- Colour per status: applied=sky, interview=amber, offer=emerald, rejected=rose
- Top navbar: app logo left, user email + Sign Out button right
- Import { apiFetch } from '../services/api' if needed
- Tailwind only — no external component libraries
- Export as default function Dashboard()
- No placeholder comments — complete, working code only`;

  const qwenHookPrompt = `You are a senior React developer.

Generate the COMPLETE file for: frontend/src/hooks/useApplications.js

Requirements:
- Import { useAuthStore } from '../store/authStore'
- Import { apiFetch, API_BASE } from '../services/api'
- Export named function useApplications()
- State: applications (array), loading (bool), error (string|null)
- On mount: fetch GET /api/applications using session from authStore, handle auth token
- Return: { applications, loading, error, addApplication, updateApplication, deleteApplication, refetch }
- addApplication(data): POST /api/applications, add to state optimistically
- updateApplication(id, updates): PUT /api/applications/:id, update in state
- deleteApplication(id): DELETE /api/applications/:id, remove from state
- All functions: async, catch errors, throw with message
- Use useCallback for all mutation functions
- ES module syntax (export function ...)`;

  const gitWorkflow = `# ── Git workflow for your capstone project ───────────────

# Day 1 — start the project
mkdir my-capstone && cd my-capstone
git init
echo "node_modules/\n.env\ndist/" > .gitignore
git add .gitignore
git commit -m "init: project scaffold"

# Create repo on GitHub → copy the remote URL
git remote add origin https://github.com/yourname/my-capstone.git
git push -u origin main

# ── Daily workflow ────────────────────────────────────────
# Work on a feature
git add .
git commit -m "feat: add applications kanban board"
git push

# Descriptive commit message prefixes:
# feat:    new feature
# fix:     bug fix
# style:   CSS / UI changes only
# refactor: code change with no feature/fix
# docs:    README or documentation
# chore:   config, dependency updates

# ── Useful commands ───────────────────────────────────────
git status               # see which files changed
git log --oneline        # see commit history
git diff                 # see changes before staging
git stash                # temporarily save changes without committing`;

  const rubricItems = [
    { area: 'Frontend', points: 20, checks: ['4+ pages implemented', 'Protected routes (auth required)', 'Loading & error states on all data fetches', 'Responsive layout (mobile + desktop)', 'Clean, consistent Tailwind design'] },
    { area: 'Backend',  points: 20, checks: ['8+ REST API endpoints', 'JWT auth middleware on protected routes', 'Input validation on POST/PUT routes', 'Consistent error handling (status codes)', 'CORS correctly configured'] },
    { area: 'Database', points: 15, checks: ['3+ related tables', 'Foreign key relationships', 'RLS policies enabled', 'No sensitive data hardcoded', 'Data persists across sessions'] },
    { area: 'Deployment', points: 15, checks: ['Frontend deployed (Netlify/Vercel)', 'Backend deployed (Render)', 'Both connected and working live', 'Environment variables set correctly', 'GitHub repo public with clear README'] },
    { area: 'Code Quality', points: 15, checks: ['AI prompts used systematically', 'Files assembled in correct dependency order', 'No hardcoded API URLs', 'No console.log left in production', 'Components separated (not one giant file)'] },
    { area: 'Reflection', points: 15, checks: ['Explains the product clearly', 'Describes each tech layer\'s role', 'Honest about challenges faced', 'Describes how AI was used', '200+ words'] },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Vibe Coding — Capstone Edition</h2>
        <p className="text-slate-600 leading-relaxed">
          Vibe-coding a full-stack capstone is the same process as the individual modules — precise prompts, correct assembly order — but scaled up. The key difference is you start with a <strong>planning prompt</strong> that produces the complete file list before generating a single file.
        </p>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-800">
          <strong>Capstone vibe-coding rule:</strong> Generate the file list first. Then generate each file in dependency order (database → backend lib → middleware → controllers → routes → server → frontend lib → hooks → pages → components). Never generate a file that imports something you haven't generated yet.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Prompt 1 — Get the Complete File List</h3>
        <p className="text-slate-600 text-sm leading-relaxed">Start every capstone with this planning prompt. Paste it into Qwen and give it your specific app idea. The output is your build checklist — work through it file by file.</p>
        <CodeBlock title="Qwen AI prompt — file list in dependency order" code={qwenPlanningPrompt} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Prompt 2 — Generate a Custom Hook</h3>
        <p className="text-slate-600 text-sm leading-relaxed">Custom hooks are the glue between your API service and your React pages. Generate one per resource (applications, companies, contacts).</p>
        <CodeBlock title="Qwen AI prompt — useApplications.js" code={qwenHookPrompt} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Prompt 3 — Generate a Page with State</h3>
        <CodeBlock title="Qwen AI prompt — Dashboard.jsx (Kanban board)" code={qwenPagePrompt} />
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Prompt quality tip:</strong> The more context you give Qwen — what hook to use, what it returns, what props each component receives, what the colour scheme is — the less you will need to edit the output. Treat the prompt like a spec document, not just a command.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Git Workflow for Your Capstone</h3>
        <p className="text-slate-600 text-sm leading-relaxed">Commit after every working feature — not after every file. This keeps your history clean and gives you safe rollback points.</p>
        <CodeBlock title="Git — daily workflow + commit message conventions" code={gitWorkflow} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Self-Review Rubric</h3>
        <p className="text-slate-600 text-sm leading-relaxed">Before submitting, check every item below. This is the same rubric used to mark your assignment.</p>
        <div className="space-y-4">
          {rubricItems.map(area => (
            <div key={area.area} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-800">{area.area}</h4>
                <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">{area.points} pts</span>
              </div>
              <div className="space-y-1.5">
                {area.checks.map(check => (
                  <div key={check} className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-3.5 h-3.5 rounded border border-slate-300 flex-shrink-0" />
                    {check}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Assignment ────────────────────────────────────────────────────────────────

const AI_TOOLS = ['Qwen AI', 'ChatGPT', 'Gemini'];

const RUBRIC_AREAS = [
  { id: 'frontend',  label: '🎨 Frontend (React + Tailwind)',      max: 20 },
  { id: 'backend',   label: '🚂 Backend (Express REST API)',        max: 20 },
  { id: 'database',  label: '🗄️ Database (Supabase)',              max: 15 },
  { id: 'deploy',    label: '☁️ Deployment (Netlify + Render)',    max: 15 },
  { id: 'quality',   label: '✨ Code Quality & AI Usage',           max: 15 },
  { id: 'reflection',label: '📝 Reflection (200+ words)',           max: 15 },
];

const SELF_MARKS = [
  { value: '0',   label: 'Not done',   pct: 0   },
  { value: '25',  label: 'Attempted',  pct: 0.25 },
  { value: '50',  label: 'Partial',    pct: 0.5  },
  { value: '75',  label: 'Good',       pct: 0.75 },
  { value: '100', label: 'Complete',   pct: 1.0  },
];

function getGrade(score) {
  if (score >= 90) return { letter: 'A', label: 'Outstanding!',      color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
  if (score >= 75) return { letter: 'B', label: 'Great Work!',        color: 'text-sky-600',     bg: 'bg-sky-50 border-sky-200' };
  if (score >= 60) return { letter: 'C', label: 'Good Effort!',       color: 'text-rose-600',    bg: 'bg-rose-50 border-rose-200' };
  if (score >= 45) return { letter: 'D', label: 'Needs Improvement',  color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200' };
  return              { letter: 'F', label: 'Review & Retry',      color: 'text-red-600',     bg: 'bg-red-50 border-red-200' };
}

function AssignmentSection({ session, onComplete }) {
  const [tool,        setTool]        = useState('');
  const [liveUrl,     setLiveUrl]     = useState('');
  const [githubUrl,   setGithubUrl]   = useState('');
  const [marks,       setMarks]       = useState({});
  const [reflection,  setReflection]  = useState('');
  const [submitted,   setSubmitted]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [result,      setResult]      = useState(null);
  const [savedToDb,   setSavedToDb]   = useState(false);
  const [dbError,     setDbError]     = useState('');

  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;
  const allMarked = RUBRIC_AREAS.every(a => marks[a.id] !== undefined);
  const canSubmit = tool && liveUrl.trim() && allMarked && reflection.trim();

  const totalScore = RUBRIC_AREAS.reduce((acc, area) => {
    const pct = SELF_MARKS.find(m => m.value === marks[area.id])?.pct ?? 0;
    return acc + Math.round(area.max * pct);
  }, 0);
  const maxScore = RUBRIC_AREAS.reduce((a, r) => a + r.max, 0); // 100

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const pct   = Math.round((totalScore / maxScore) * 100);
    const grade = getGrade(totalScore);
    setResult({ score: totalScore, total: maxScore, pct, grade });
    setSubmitted(true);
    onComplete?.(totalScore, pct, grade.letter);
    try {
      const token = session?.access_token;
      const res = await fetch(`${API_BASE}/api/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: `Full Stack Capstone (${tool})`,
          course_id: COURSE_ID,
          score: totalScore,
          total: maxScore,
          grade: grade.letter,
          answers: { tool, liveUrl: liveUrl.trim(), githubUrl: githubUrl.trim(), marks, reflection: reflection.trim() },
        }),
      });
      if (res.ok) setSavedToDb(true);
      else { const d = await res.json(); setDbError(d.message || 'Could not save to database.'); }
    } catch { setDbError('Network error — result not saved.'); }
    finally { setSubmitting(false); }
  };

  const handleReset = () => {
    setTool(''); setLiveUrl(''); setGithubUrl(''); setMarks({}); setReflection('');
    setSubmitted(false); setResult(null); setSavedToDb(false); setDbError('');
  };

  if (submitted && result) {
    const { score, total, pct, grade } = result;
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl border-2 p-8 text-center ${grade.bg}`}>
          <Trophy className={`w-12 h-12 mx-auto mb-3 ${grade.color}`} />
          <div className={`text-6xl font-black mb-1 ${grade.color}`}>{grade.letter}</div>
          <div className={`text-xl font-bold ${grade.color}`}>{grade.label}</div>
          <div className="text-slate-600 mt-2 text-lg">
            Self-assessed score: <span className="font-bold">{score} / {total}</span> ({pct}%)
          </div>
          {savedToDb && (
            <div className="mt-3 inline-flex items-center gap-2 bg-white/70 px-4 py-2 rounded-xl text-sm font-medium text-emerald-700">
              <CheckCircle2 className="w-4 h-4" /> Result saved to Assignments
            </div>
          )}
          {dbError && <div className="mt-3 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl">{dbError}</div>}
        </div>

        <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Score Breakdown</h3>
          {RUBRIC_AREAS.map(area => {
            const pctVal = SELF_MARKS.find(m => m.value === marks[area.id])?.pct ?? 0;
            const earned = Math.round(area.max * pctVal);
            return (
              <div key={area.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  {earned > 0
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    : <span className="w-4 h-4 rounded-full border-2 border-slate-300 inline-block" />}
                  <span className={earned > 0 ? 'text-slate-800' : 'text-slate-400'}>{area.label}</span>
                </div>
                <span className={`font-bold text-sm ${earned > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>{earned}/{area.max}</span>
              </div>
            );
          })}
          <div className="border-t border-slate-200 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className={grade.color}>{score}/100</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 shadow-soft space-y-2">
          <h4 className="font-bold text-slate-800">Your Submission</h4>
          <p className="text-sm text-slate-600"><span className="font-medium">AI tool:</span> {tool}</p>
          {liveUrl && (
            <p className="text-sm text-slate-600 flex items-center gap-1">
              <span className="font-medium">Live URL:</span>
              <a href={liveUrl} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
                {liveUrl} <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          )}
          {githubUrl && (
            <p className="text-sm text-slate-600 flex items-center gap-1">
              <span className="font-medium">GitHub:</span>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
                {githubUrl} <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          )}
          <p className="text-sm text-slate-600"><span className="font-medium">Reflection ({wordCount} words):</span> {reflection}</p>
        </div>

        <button onClick={handleReset} className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md">
          <RotateCcw className="w-4 h-4" /> Resubmit Assignment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-100 rounded-xl"><Trophy className="w-6 h-6 text-rose-600" /></div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Full Stack Capstone Assignment</h2>
            <p className="text-slate-500 text-sm">Plan · Build · Deploy · Submit</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <h3 className="font-bold text-slate-800">Assignment Brief</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Build a complete full-stack application using <strong>React + Tailwind</strong> (frontend), <strong>Node.js + Express</strong> (backend), and <strong>Supabase</strong> (database + auth). Use <strong>Qwen AI</strong> to generate all files. Deploy the frontend to Netlify or Vercel and the backend to Render. Submit your live URL, GitHub link, and a 200-word reflection.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { icon: '📐', label: 'Step 1', desc: 'Plan tables, pages, endpoints' },
              { icon: '🤖', label: 'Step 2', desc: 'Generate files with Qwen AI' },
              { icon: '🔗', label: 'Step 3', desc: 'Connect frontend + backend' },
              { icon: '🌐', label: 'Step 4', desc: 'Deploy + push to GitHub' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-bold text-xs text-slate-700">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
          <h4 className="font-semibold text-rose-800 mb-2 text-sm">Marking Rubric (100 points total)</h4>
          <div className="space-y-1.5">
            {RUBRIC_AREAS.map(a => (
              <div key={a.id} className="flex justify-between text-xs text-rose-900 bg-white/60 rounded-lg px-3 py-1.5">
                <span>{a.label}</span><span className="font-bold">{a.max} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-5">
        <h3 className="font-bold text-slate-800 text-lg">Submit Your Work</h3>

        {/* AI tool */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">1. Which AI tool did you use to build this? *</label>
          <div className="grid grid-cols-3 gap-3">
            {AI_TOOLS.map(t => (
              <label key={t} className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                tool === t ? 'bg-rose-50 border-rose-400 text-rose-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}>
                <input type="radio" name="tool" value={t} checked={tool === t} onChange={() => setTool(t)} className="sr-only" />
                <span className="text-xl">{t === 'Qwen AI' ? '🟠' : t === 'ChatGPT' ? '🟢' : '🔵'}</span>
                {t}
                {t === 'Qwen AI' && <span className="text-xs bg-amber-400 text-white px-1.5 py-0.5 rounded-full">Recommended</span>}
              </label>
            ))}
          </div>
        </div>

        {/* URLs */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">2. Live app URL *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)}
              placeholder="https://my-capstone.netlify.app"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all"
            />
          </div>
          {liveUrl && !/^https?:\/\/.{3,}/.test(liveUrl.trim()) && (
            <p className="text-xs text-red-500">Please enter a valid URL starting with https://</p>
          )}

          <label className="block text-sm font-semibold text-slate-700">GitHub repository URL (optional)</label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)}
              placeholder="https://github.com/yourname/my-capstone"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all"
            />
          </div>
        </div>

        {/* Self-assessment rubric */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">3. Self-assessment — rate each area of your project *</label>
          <div className="space-y-4">
            {RUBRIC_AREAS.map(area => (
              <div key={area.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{area.label}</span>
                  <span className="text-xs text-slate-400 font-mono">/ {area.max} pts</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {SELF_MARKS.map(m => (
                    <label key={m.value} className={`flex flex-col items-center gap-0.5 p-2 rounded-xl border cursor-pointer transition-all text-xs font-medium ${
                      marks[area.id] === m.value
                        ? 'bg-rose-50 border-rose-400 text-rose-800 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}>
                      <input type="radio" name={area.id} value={m.value}
                        checked={marks[area.id] === m.value}
                        onChange={() => setMarks(prev => ({ ...prev, [area.id]: m.value }))}
                        className="sr-only"
                      />
                      <span className="font-bold">{m.value}%</span>
                      <span className="text-center leading-tight">{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {allMarked && (
            <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-3 text-center">
              <span className="text-sm font-bold text-rose-700">Self-assessed total: </span>
              <span className="text-lg font-black text-rose-800">{totalScore} / 100</span>
              <span className="text-sm text-rose-600 ml-2">({Math.round((totalScore / maxScore) * 100)}%)</span>
            </div>
          )}
        </div>

        {/* Reflection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            4. Write a reflection (minimum 200 words) *
            <span className={`ml-2 text-xs font-normal ${wordCount >= 200 ? 'text-emerald-600' : 'text-slate-400'}`}>
              {wordCount}/200 words
            </span>
          </label>
          <textarea
            value={reflection} onChange={e => setReflection(e.target.value)}
            rows={7}
            placeholder="Describe your app — what it does and why you chose it. Explain each tech layer: how the React frontend communicates with the Express backend, how the Supabase database stores data, how auth works end-to-end. Describe how you used Qwen AI to generate the code. What challenges did you face? What would you build next? What did this project teach you about full-stack development?"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className={`w-full flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
            canSubmit && !submitting
              ? 'bg-rose-500 hover:bg-rose-600 hover:shadow-rose-200'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Capstone</>}
        </button>

        {!canSubmit && (
          <p className="text-xs text-center text-slate-400">
            {!tool ? 'Select an AI tool · ' : ''}
            {!liveUrl.trim() ? 'Enter your live URL · ' : ''}
            {!allMarked ? 'Rate all 6 rubric areas · ' : ''}
            {!reflection.trim() ? 'Write a reflection' : ''}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function LearningModuleFullStack() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const { visitSection, setProgress } = useCourseStore();

  const courseData      = useCourseStore(state => state.courses.find(c => c.id === COURSE_ID));
  const liveProgress    = courseData?.progress ?? 0;
  const visitedSections = courseData?.visitedSections ?? [];
  const currentIndex    = TABS.findIndex(t => t.id === activeTab);

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    visitSection(COURSE_ID, tabId);
  };

  const goNext = () => { if (currentIndex < TABS.length - 1) switchTab(TABS[currentIndex + 1].id); };
  const goPrev = () => { if (currentIndex > 0) switchTab(TABS[currentIndex - 1].id); };

  const handleAssignmentComplete = (_score, pct, _grade) => {
    visitSection(COURSE_ID, 'assignment');
    setProgress(COURSE_ID, Math.max(liveProgress, pct >= 50 ? 100 : 90));
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'overview':   return <OverviewSection />;
      case 'planning':   return <PlanningSection />;
      case 'building':   return <BuildingSection />;
      case 'connecting': return <ConnectingSection />;
      case 'vibecoding': return <VibeCodingSection />;
      case 'assignment': return <AssignmentSection session={session} onComplete={handleAssignmentComplete} />;
      default:           return null;
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
            <span>Courses</span> <ChevronRight className="w-3 h-3" />
            <span className="text-rose-600 font-medium">Full Stack Application</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Full Stack Application</h1>
          <p className="text-slate-500 text-sm mt-0.5">Alex Thompson · 8 Weeks · Module 7 of 7</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: `${liveProgress}%` }} />
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto bg-slate-100 p-1 rounded-2xl">
        {TABS.map(tab => {
          const Icon     = tab.icon;
          const visited  = visitedSections.includes(tab.id);
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-1 justify-center ${
                isActive  ? 'bg-white text-rose-600 shadow-sm'
                : visited ? 'text-rose-600 hover:bg-white/60'
                          : 'text-slate-500 hover:bg-white/60'
              }`}
            >
              {visited && !isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>{renderSection()}</div>

      {/* Prev / Next navigation */}
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
          <button onClick={goNext} className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-rose-200">
            Next: {TABS[currentIndex + 1].label} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
