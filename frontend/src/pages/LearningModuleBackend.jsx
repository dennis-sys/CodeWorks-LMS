import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import { API_BASE } from '../services/api';
import {
  BookOpen, Server, GitBranch, Database, Layers, Trophy,
  CheckCircle2, ArrowLeft, ArrowRight, ChevronRight,
  ExternalLink, Globe, RotateCcw, Send
} from 'lucide-react';

const COURSE_ID = 5;

const TABS = [
  { id: 'overview',    label: 'Overview',          icon: BookOpen   },
  { id: 'express',     label: 'Express & Routes',  icon: Server     },
  { id: 'restapi',     label: 'REST API Design',   icon: GitBranch  },
  { id: 'supabase',    label: 'Supabase',          icon: Database   },
  { id: 'vibecoding',  label: 'Vibe Coding',       icon: Layers     },
  { id: 'assignment',  label: 'Assignment',        icon: Trophy     },
];

// ── Shared Utility Components ─────────────────────────────────────────────────

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

function SetupSteps({ tool, steps, color, link }) {
  return (
    <div className={`rounded-2xl border overflow-hidden shadow-sm ${color.border}`}>
      <div className={`${color.header} px-5 py-3 flex items-center justify-between`}>
        <div className="font-bold text-white">{tool}</div>
        {link && (
          <a href={link} target="_blank" rel="noreferrer"
             className="flex items-center gap-1 text-xs text-white/80 hover:text-white transition-colors">
            Visit <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
      <div className="p-4 space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className={`w-6 h-6 rounded-full ${color.badge} text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5`}>
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-slate-800 text-sm">{step.title}</div>
              {step.desc && <div className="text-slate-500 text-xs mt-0.5">{step.desc}</div>}
              {step.code && <CodeBlock title={step.codeTitle || 'terminal'} code={step.code} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────

function OverviewSection() {
  const flowSteps = [
    { icon: '🌐', label: 'Client',      sub: 'Browser sends HTTP request', color: 'bg-sky-500'     },
    { icon: '🚦', label: 'Middleware',  sub: 'Auth, logging, parsing',     color: 'bg-amber-500'   },
    { icon: '🗺️', label: 'Router',     sub: 'Match URL to handler',        color: 'bg-emerald-500' },
    { icon: '⚙️', label: 'Controller', sub: 'Business logic',              color: 'bg-violet-500'  },
    { icon: '🗄️', label: 'Supabase',   sub: 'Database query & response',   color: 'bg-green-600'   },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Backend Development</h2>
        <p className="text-slate-600 leading-relaxed">
          The backend is everything that runs on a server — the logic the user never sees but always depends on. It receives requests from the frontend, validates them, queries the database, and sends back structured data. This module teaches you <strong>Node.js + Express.js</strong> for building REST APIs, and <strong>Supabase</strong> for the database layer — the exact stack used by CodeWorks Academy itself.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Like the Frontend module, you will use <strong>Qwen AI</strong> to generate every backend file, following a precise file assembly order so imports are always correct. By the end you will have a fully deployed REST API serving real JSON data.
        </p>

        <div className="my-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">The HTTP Request–Response Cycle</h4>
          <div className="flex flex-col sm:flex-row items-center gap-2 justify-center">
            {flowSteps.map((s, i) => (
              <div key={s.label} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className={`${s.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md`}>{s.icon}</div>
                  <div className="font-bold text-slate-800 text-xs mt-1.5 text-center">{s.label}</div>
                  <div className="text-slate-500 text-xs text-center max-w-[80px] mt-0.5">{s.sub}</div>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0 rotate-90 sm:rotate-0 my-1 sm:my-0 sm:mb-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '🟩', title: 'Node.js',    desc: 'JavaScript runtime that runs outside the browser. Lets you write server-side code in the same language as your frontend.' },
            { icon: '🚂', title: 'Express.js', desc: 'Minimal web framework for Node.js. Defines routes, applies middleware, and sends HTTP responses with very little boilerplate.' },
            { icon: '🗄️', title: 'Supabase',   desc: 'Open-source Firebase alternative. Provides a PostgreSQL database, REST + realtime APIs, and auth — all with a generous free tier.' },
            { icon: '🔑', title: 'JWT Auth',   desc: 'JSON Web Tokens. The frontend sends a signed token with each request; the backend verifies it to confirm the user\'s identity.' },
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
        <h3 className="text-xl font-bold text-slate-800">What You Will Build</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '01', title: 'Learn the Foundations', desc: 'Express routes, middleware, HTTP methods, status codes, and REST API conventions.' },
            { step: '02', title: 'Connect Supabase',      desc: 'Set up a Supabase project, create tables, and query data from your Express controllers.' },
            { step: '03', title: 'Vibe Code & Deploy',    desc: 'Use Qwen AI to generate every backend file, test with Postman/curl, then deploy to Render.' },
          ].map(s => (
            <div key={s.step} className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="text-3xl font-black text-emerald-200 mb-2">{s.step}</div>
              <h4 className="font-bold text-emerald-800 mb-1 text-sm">{s.title}</h4>
              <p className="text-xs text-emerald-700 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-sky-800">
          <strong>Module Stack:</strong> Node.js · Express.js · Supabase (PostgreSQL) · JWT Auth · CORS · dotenv · Render (deployment) · Postman (testing)
        </div>
      </div>
    </div>
  );
}

function ExpressSection() {
  const serverSetup = `// backend/src/server.js — Entry point
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

import userRoutes    from './routes/userRoutes.js';
import courseRoutes  from './routes/courseRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware (applied to every request) ─────────────
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5000',
  credentials: true,
}));
app.use(express.json());           // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────
app.use('/api/users',       userRoutes);
app.use('/api/courses',     courseRoutes);
app.use('/api/assignments', assignmentRoutes);

// ── Health check ──────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ── Start server ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});`;

  const routeExample = `// backend/src/routes/courseRoutes.js
import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';

const router = Router();

// Public routes (no auth required)
router.get('/',    getAllCourses);      // GET  /api/courses
router.get('/:id', getCourseById);     // GET  /api/courses/42

// Protected routes (JWT required)
router.post('/',     requireAuth, createCourse);   // POST   /api/courses
router.put('/:id',   requireAuth, updateCourse);   // PUT    /api/courses/42
router.delete('/:id',requireAuth, deleteCourse);   // DELETE /api/courses/42

export default router;`;

  const middlewareExample = `// backend/src/middleware/authMiddleware.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware: validates the JWT sent in the Authorization header
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // Verify the JWT with Supabase Auth
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = data.user;   // Attach user to request for downstream handlers
  next();                 // Call next() to continue to the route handler
}

// Middleware: log every incoming request (great for debugging)
export function requestLogger(req, _res, next) {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.path}\`);
  next();
}`;

  const controllerExample = `// backend/src/controllers/courseController.js
import { supabase } from '../lib/supabase.js';

// GET /api/courses — return all published courses
export async function getAllCourses(_req, res) {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/courses/:id — return a single course
export async function getCourseById(req, res) {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Course not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/courses — create a new course (protected)
export async function createCourse(req, res) {
  const { title, description, instructor } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });

  try {
    const { data, error } = await supabase
      .from('courses')
      .insert([{ title, description, instructor }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Express.js — Routes & Middleware</h2>
        <p className="text-slate-600 leading-relaxed">
          Express.js is the most popular Node.js web framework. It sits between the internet and your database — receiving HTTP requests, running them through a chain of <strong>middleware</strong> functions, matching them to a <strong>route</strong>, and sending back a response. Every backend file you write in this module plugs into this pipeline.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Middleware',   icon: '🚦', color: 'border-amber-200 bg-amber-50 text-amber-700',    desc: 'A function that runs before the route handler. Used for auth checks, logging, body parsing, CORS headers. Calls next() to continue the chain.' },
            { title: 'Router',      icon: '🗺️', color: 'border-emerald-200 bg-emerald-50 text-emerald-700', desc: 'Groups related routes into one file. app.use(\'/api/courses\', courseRoutes) mounts all course routes under that prefix.' },
            { title: 'Controller',  icon: '⚙️', color: 'border-violet-200 bg-violet-50 text-violet-700',  desc: 'The handler function for a specific route. Reads req (request), does work (query DB, validate), writes res (response).' },
          ].map(c => (
            <div key={c.title} className={`rounded-xl border p-4 ${c.color}`}>
              <span className="text-2xl">{c.icon}</span>
              <h4 className="font-bold mt-2 mb-1 text-sm">{c.title}</h4>
              <p className="text-xs leading-relaxed opacity-80">{c.desc}</p>
            </div>
          ))}
        </div>

        <CodeBlock title="backend/src/server.js — entry point" code={serverSetup} />
        <CodeBlock title="backend/src/routes/courseRoutes.js — route definitions" code={routeExample} />
        <CodeBlock title="backend/src/middleware/authMiddleware.js — JWT verification" code={middlewareExample} />
        <CodeBlock title="backend/src/controllers/courseController.js — business logic" code={controllerExample} />

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Separation of concerns:</strong> Routes only define <em>what URL maps to what controller</em>. Controllers contain the <em>actual logic</em>. Middleware handles <em>cross-cutting concerns</em> like auth and logging. Keep these three layers separate — it makes every file easier to read, test, and change independently.
        </div>
      </div>
    </div>
  );
}

function RestApiSection() {
  const httpMethods = `// ── HTTP Methods — what each one means ───────────────────
GET    /api/courses          → Return a list of all courses
GET    /api/courses/5        → Return one course (id = 5)
POST   /api/courses          → Create a new course (body has the data)
PUT    /api/courses/5        → Replace course 5 entirely
PATCH  /api/courses/5        → Update only specific fields of course 5
DELETE /api/courses/5        → Delete course 5

// ── Status Codes — what you send back ────────────────────
200 OK            → Successful GET or PUT
201 Created       → Successful POST (new resource created)
204 No Content    → Successful DELETE (nothing to return)
400 Bad Request   → Client sent invalid data (missing field, wrong type)
401 Unauthorized  → No token or invalid token
403 Forbidden     → Valid token but user lacks permission
404 Not Found     → The requested resource doesn't exist
409 Conflict      → Duplicate entry (e.g. email already registered)
500 Internal Error→ Something crashed server-side`;

  const restConventions = `// ── RESTful route naming conventions ────────────────────

// ✅ GOOD — nouns, plural, no verbs in the URL
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id

// Nested resources (user's enrollments)
GET    /api/users/:userId/enrollments
POST   /api/users/:userId/enrollments

// ❌ BAD — verbs in URL, non-plural, redundant prefixes
GET    /api/getUsers
POST   /api/createNewUser
DELETE /api/user/deleteUser/5

// ── JSON response shape conventions ──────────────────────
// Always use consistent shapes your frontend can rely on

// Success (single resource)
res.status(200).json({
  data: { id: 1, title: 'React Fundamentals', ... },
});

// Success (list)
res.status(200).json({
  data: [...],
  count: 12,
});

// Error
res.status(404).json({
  error: 'Course not found',
  code:  'NOT_FOUND',
});`;

  const validationExample = `// backend/src/controllers/assignmentController.js
// ── Input validation before touching the database ────────

export async function submitAssignment(req, res) {
  const { course_id, title, score, total, grade } = req.body;
  const user_id = req.user.id;  // set by requireAuth middleware

  // 1. Validate required fields
  if (!course_id || !title || score === undefined || !total) {
    return res.status(400).json({
      error: 'Missing required fields: course_id, title, score, total',
    });
  }

  // 2. Validate types and ranges
  if (typeof score !== 'number' || score < 0 || score > total) {
    return res.status(400).json({ error: 'score must be 0–total' });
  }

  // 3. Insert into database
  const { data, error } = await supabase
    .from('assignments')
    .insert([{ user_id, course_id, title, score, total, grade }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  // 4. Respond with 201 Created + the new record
  res.status(201).json(data);
}`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">REST API Design</h2>
        <p className="text-slate-600 leading-relaxed">
          REST (Representational State Transfer) is a set of conventions for structuring HTTP APIs. A RESTful API uses <strong>HTTP methods</strong> to express intent, <strong>URLs</strong> to identify resources, and <strong>JSON</strong> for the data payload. Following REST conventions means any developer — including your future self — can understand your API without reading the code.
        </p>

        <CodeBlock title="HTTP methods & status codes" code={httpMethods} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { code: '2xx', color: 'bg-emerald-100 text-emerald-700', label: 'Success', codes: ['200 OK', '201 Created', '204 No Content'] },
            { code: '4xx', color: 'bg-amber-100 text-amber-700',     label: 'Client Error', codes: ['400 Bad Request', '401 Unauthorized', '404 Not Found', '409 Conflict'] },
            { code: '5xx', color: 'bg-red-100 text-red-700',         label: 'Server Error', codes: ['500 Internal Server Error', '503 Service Unavailable'] },
            { code: '3xx', color: 'bg-sky-100 text-sky-700',         label: 'Redirect', codes: ['301 Moved Permanently', '302 Found (temporary redirect)'] },
          ].map(g => (
            <div key={g.code} className={`rounded-xl border p-4 ${g.color.replace('text-', 'border-').replace('-700', '-200').replace('bg-', 'bg-')}`}>
              <div className={`inline-block px-2 py-1 rounded-lg text-xs font-bold font-mono mb-2 ${g.color}`}>{g.code} — {g.label}</div>
              <div className="space-y-1">
                {g.codes.map(c => <div key={c} className="text-xs font-mono text-slate-600">{c}</div>)}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock title="REST conventions & response shapes" code={restConventions} />
        <CodeBlock title="Input validation pattern" code={validationExample} />

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
          <strong>Golden rule:</strong> Validate all input <em>before</em> touching the database. Return specific, actionable error messages — not just "error". Your frontend needs to know exactly what went wrong so it can show the right message to the user.
        </div>
      </div>
    </div>
  );
}

function SupabaseSection() {
  const supabaseClient = `// backend/src/lib/supabase.js — Supabase admin client
import { createClient } from '@supabase/supabase-js';

// Use SERVICE_ROLE_KEY on the backend (bypasses Row Level Security)
// NEVER expose this key to the frontend
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);`;

  const schemaSQL = `-- Run in Supabase SQL Editor to create your tables

-- Users table (linked to Supabase Auth)
CREATE TABLE users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  instructor  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments (which user is taking which course)
CREATE TABLE enrollments (
  id          SERIAL PRIMARY KEY,
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id   INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  progress    INTEGER DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)  -- prevent duplicate enrollments
);

-- Assignments (submitted work)
CREATE TABLE assignments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id    INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  score        INTEGER DEFAULT 0,
  total        INTEGER DEFAULT 10,
  grade        TEXT,
  answers      JSONB,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);`;

  const queryExamples = `// ── Supabase query patterns — used in controllers ────────
import { supabase } from '../lib/supabase.js';

// SELECT all rows
const { data, error } = await supabase
  .from('courses')
  .select('*');

// SELECT with filter + ordering
const { data } = await supabase
  .from('assignments')
  .select('*')
  .eq('user_id', userId)
  .order('submitted_at', { ascending: false });

// SELECT with joins (course + enrollment data in one query)
const { data } = await supabase
  .from('enrollments')
  .select(\`
    *,
    courses ( id, title, instructor )
  \`)
  .eq('user_id', userId);

// INSERT a new row
const { data, error } = await supabase
  .from('assignments')
  .insert([{ user_id, course_id, title, score, total, grade }])
  .select()
  .single();

// UPDATE specific fields
const { data, error } = await supabase
  .from('enrollments')
  .update({ progress: 75 })
  .eq('user_id', userId)
  .eq('course_id', courseId)
  .select()
  .single();

// DELETE a row
const { error } = await supabase
  .from('enrollments')
  .delete()
  .eq('id', enrollmentId);

// UPSERT (insert or update if duplicate unique key)
const { data, error } = await supabase
  .from('enrollments')
  .upsert([{ user_id, course_id, progress }], { onConflict: 'user_id,course_id' })
  .select()
  .single();`;

  const envExample = `# backend/.env — never commit this file to GitHub

SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...  (Settings → API → service_role)
SUPABASE_ANON_KEY=eyJ...          (Settings → API → anon public)

PORT=3001
CORS_ORIGIN=http://localhost:5000

# In production (Render):
# CORS_ORIGIN=https://your-app.netlify.app`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Supabase — Database & Auth</h2>
        <p className="text-slate-600 leading-relaxed">
          Supabase provides a hosted <strong>PostgreSQL</strong> database, an <strong>auto-generated REST API</strong>, and <strong>Auth</strong> — all managed from a web dashboard. On the backend you connect to it using the official JavaScript SDK with your <em>service role key</em> (which bypasses Row Level Security for admin operations). The frontend uses the <em>anon key</em> for user-facing auth only.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🗄️', title: 'PostgreSQL', color: 'border-green-200 bg-green-50 text-green-800', desc: 'Full relational database. Tables, joins, foreign keys, indexes — all standard SQL. Create tables in the Supabase Dashboard → Table Editor or via SQL Editor.' },
            { icon: '🔑', title: 'Auth',        color: 'border-sky-200 bg-sky-50 text-sky-800',     desc: 'Handles signup, login, JWT issuance, and session refresh. Supports email/password, magic link, OAuth (Google, GitHub). User IDs are UUIDs in auth.users.' },
            { icon: '⚡', title: 'Auto API',    color: 'border-violet-200 bg-violet-50 text-violet-800', desc: 'Every table automatically gets REST and GraphQL endpoints. Use the JS SDK (from() .select() .insert()) instead of writing raw SQL queries.' },
          ].map(c => (
            <div key={c.title} className={`rounded-xl border p-4 ${c.color}`}>
              <span className="text-2xl">{c.icon}</span>
              <h4 className="font-bold mt-2 mb-1 text-sm">{c.title}</h4>
              <p className="text-xs leading-relaxed opacity-80">{c.desc}</p>
            </div>
          ))}
        </div>

        <CodeBlock title="backend/src/lib/supabase.js — admin client" code={supabaseClient} />
        <CodeBlock title="SQL — create all tables (run in Supabase SQL Editor)" code={schemaSQL} />
        <CodeBlock title="Supabase query patterns — all CRUD operations" code={queryExamples} />
        <CodeBlock title="backend/.env — environment variables" code={envExample} />

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
          <strong>Security:</strong> The <code className="bg-red-100 px-1 rounded font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code> bypasses all Row Level Security policies — it has full read/write access to your database. <strong>Never</strong> expose it to the browser. Use it only in backend server code. The frontend uses the <code className="bg-red-100 px-1 rounded font-mono text-xs">VITE_SUPABASE_ANON_KEY</code> instead.
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-sm">
          <h4 className="font-bold text-slate-800">Getting Your Supabase Keys</h4>
          <ol className="space-y-1 text-slate-600 text-xs list-decimal list-inside">
            <li>Go to <strong>supabase.com</strong> → your project → <strong>Settings</strong> (gear icon)</li>
            <li>Click <strong>API</strong> in the left sidebar</li>
            <li>Copy <strong>Project URL</strong> → paste as <code className="bg-slate-100 px-1 rounded">SUPABASE_URL</code></li>
            <li>Copy <strong>anon public</strong> key → paste as <code className="bg-slate-100 px-1 rounded">SUPABASE_ANON_KEY</code></li>
            <li>Copy <strong>service_role</strong> key → paste as <code className="bg-slate-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function VibeCodingSection() {
  const backendStructure = `backend/
├── src/
│   ├── controllers/         ← Business logic (one file per resource)
│   │   ├── userController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── assignmentController.js
│   │
│   ├── routes/              ← URL-to-controller mapping (one file per resource)
│   │   ├── userRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   └── assignmentRoutes.js
│   │
│   ├── middleware/          ← Functions that run before route handlers
│   │   ├── authMiddleware.js    ← JWT verification
│   │   └── errorMiddleware.js  ← Catches unhandled errors
│   │
│   ├── lib/                 ← Shared clients & utilities
│   │   └── supabase.js          ← Supabase admin client (service role key)
│   │
│   └── server.js            ← Entry point — creates Express app, registers middleware & routes
│
├── .env                     ← SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PORT, CORS_ORIGIN
├── .env.example             ← Safe-to-commit example (no real values)
├── .gitignore               ← Must include .env and node_modules
└── package.json             ← Dependencies (express, @supabase/supabase-js, cors, dotenv)`;

  const qwenServerPrompt = `You are a senior Node.js backend developer using Express.js and Supabase.

Generate the COMPLETE file for: backend/src/server.js

Requirements:
- Import express, cors, dotenv
- Call dotenv.config() before anything else
- Import and mount these routers:
    /api/users       → userRoutes
    /api/courses     → courseRoutes
    /api/enrollments → enrollmentRoutes
    /api/assignments → assignmentRoutes
- Apply express.json() and cors() as global middleware
- CORS_ORIGIN comes from process.env.CORS_ORIGIN (default: 'http://localhost:5000')
- Add a GET /health endpoint returning { status: 'ok', timestamp: new Date() }
- Listen on process.env.PORT or 3001
- Use ES module syntax (import/export, not require)
- No placeholder comments — complete, working code only`;

  const qwenControllerPrompt = `You are a senior Node.js backend developer using Express.js and Supabase.

Generate the COMPLETE file for: backend/src/controllers/courseController.js

Requirements:
- Import supabase from '../lib/supabase.js'
- Export these named functions: getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse
- getAllCourses: SELECT * FROM courses ORDER BY created_at ASC, return 200 + array
- getCourseById: SELECT by id param, return 404 if not found
- createCourse: INSERT with { title, description, instructor } from req.body, validate title required, return 201 + new row
- updateCourse: UPDATE by id param using req.body fields, return updated row
- deleteCourse: DELETE by id param, return 204
- Every function: wrap in try/catch, return 500 + error.message on failure
- Use async/await throughout
- ES module syntax (export function ...)`;

  const assemblyOrder = [
    { n: 1, file: 'package.json',           why: 'Defines all dependencies — generate first so npm install knows what to fetch' },
    { n: 2, file: '.env + .env.example',    why: 'Environment config — needed before any server code runs' },
    { n: 3, file: '.gitignore',             why: 'Protects secrets — must exist before first git commit' },
    { n: 4, file: 'src/lib/supabase.js',    why: 'Shared DB client — imported by all controllers' },
    { n: 5, file: 'src/middleware/*.js',    why: 'Auth + error handlers — used by routes, so generate before routes' },
    { n: 6, file: 'src/controllers/*.js',   why: 'Business logic — imported by routes, so generate before routes' },
    { n: 7, file: 'src/routes/*.js',        why: 'Route definitions — import controllers, mount in server' },
    { n: 8, file: 'src/server.js',          why: 'Entry point — imports everything; generate last to avoid missing imports' },
  ];

  const localTestingCmds = `# ── Testing your backend locally with Git Bash ──────────

# Step 1: Navigate into the backend folder
cd backend

# Step 2: Install all dependencies
npm install

# Step 3: Start the dev server (nodemon auto-restarts on changes)
npm run dev

# Step 4: Test endpoints with curl (Git Bash)
# GET all courses
curl http://localhost:3001/api/courses

# POST — create a course (with JSON body)
curl -X POST http://localhost:3001/api/courses \\
  -H "Content-Type: application/json" \\
  -d '{"title":"My Course","instructor":"Jane"}'

# Health check
curl http://localhost:3001/health`;

  const renderDeploy = `# ── Deploying backend to Render ─────────────────────────
# Render is the recommended platform for Express backends (free tier)

1. Push your code to GitHub
   git add .
   git commit -m "Backend API complete"
   git push origin main

2. Go to render.com → New → Web Service

3. Connect your GitHub repository

4. Configure the service:
   Name:             codeworks-backend (or any name)
   Root Directory:   backend
   Build Command:    npm install
   Start Command:    node src/server.js

5. Add environment variables (Environment tab):
   SUPABASE_URL              = https://xxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY = eyJ...
   CORS_ORIGIN               = https://your-frontend.netlify.app
   NODE_ENV                  = production

6. Click "Create Web Service"
   Render builds and deploys. Your backend URL will be:
   https://your-service-name.onrender.com`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Vibe Coding — Backend Deep Dive</h2>
        <p className="text-slate-600 leading-relaxed">
          This section walks you through using <strong>Qwen AI</strong> to generate every backend file — from the Express server to each controller — then assembling them in the correct order, testing locally with Git Bash, and deploying to <strong>Render</strong>.
        </p>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
          <strong>Same approach as the Frontend module:</strong> define the file path, write a precise Qwen prompt that specifies exactly what the file needs to import and export, copy the output, paste it into VS Code, and move on to the next file. Always generate in the order below.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Backend File Structure — Annotated</h3>
        <CodeBlock title="backend/ — complete directory structure" code={backendStructure} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { folder: 'controllers/', color: 'border-violet-200 bg-violet-50 text-violet-700', rule: 'Contains the actual logic for each operation. One file per resource (users, courses, assignments). Never import one controller from another.' },
            { folder: 'routes/',      color: 'border-emerald-200 bg-emerald-50 text-emerald-700', rule: 'Maps HTTP verbs + URL patterns to controller functions. Routes should contain no logic — just router.get(..., controller.fn) calls.' },
            { folder: 'middleware/',  color: 'border-amber-200 bg-amber-50 text-amber-700', rule: 'Reusable functions that intercept requests before they reach controllers. Auth check, input sanitisation, error catching.' },
            { folder: 'lib/',         color: 'border-sky-200 bg-sky-50 text-sky-700', rule: 'Shared utilities used across the app — the Supabase client is the primary resident here. Import from lib/, never instantiate clients inside controllers.' },
          ].map(f => (
            <div key={f.folder} className={`rounded-xl border p-4 ${f.color}`}>
              <code className="font-mono font-bold text-sm">{f.folder}</code>
              <p className="text-xs leading-relaxed mt-2 opacity-80">{f.rule}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Generating Files with Qwen AI</h3>

        <h4 className="font-bold text-slate-800">Example: Generating server.js</h4>
        <CodeBlock title="Qwen AI prompt — server.js" code={qwenServerPrompt} />

        <h4 className="font-bold text-slate-800">Example: Generating a Controller</h4>
        <CodeBlock title="Qwen AI prompt — courseController.js" code={qwenControllerPrompt} />

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-slate-800 text-sm">File Assembly Order</h4>
          <p className="text-xs text-slate-500">Generate files in this order — each file only imports things from files already generated above it.</p>
          {assemblyOrder.map(f => (
            <div key={f.n} className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{f.n}</div>
              <div>
                <code className="text-emerald-700 font-mono text-xs font-bold">{f.file}</code>
                <p className="text-xs text-slate-500 mt-0.5">{f.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Local Testing with Git Bash</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Test every endpoint locally before deploying. Use <strong>curl</strong> in Git Bash or install <a href="https://www.postman.com" target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline">Postman</a> for a visual interface.
        </p>
        <CodeBlock title="Git Bash — install, run, and test" code={localTestingCmds} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Deploying to Render</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          <strong>Render</strong> is the recommended platform for deploying Express backends. It has a generous free tier, auto-deploys from GitHub on every push, and handles environment variables securely.
        </p>
        <CodeBlock title="Deploying backend to Render" code={renderDeploy} />
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>After deploying:</strong> Update your frontend's <code className="bg-amber-100 px-1 rounded text-xs font-mono">VITE_API_URL</code> environment variable in Netlify/Vercel to point to your new Render backend URL (e.g. <code className="bg-amber-100 px-1 rounded text-xs font-mono">https://my-backend.onrender.com</code>). The frontend and backend are deployed separately — they connect via this URL.
        </div>
      </div>
    </div>
  );
}

// ── Assignment ────────────────────────────────────────────────────────────────

const AI_TOOLS     = ['Qwen AI', 'ChatGPT', 'Gemini'];
const DEPLOY_PLATFORMS = ['Render', 'Railway', 'Fly.io', 'Cyclic'];

function getScore(tool, platform, apiUrl, endpoints, reflection) {
  const validUrl = /^https?:\/\/.{3,}/.test(apiUrl.trim());
  const endpointCount = parseInt(endpoints) || 0;
  const words = reflection.trim().split(/\s+/).filter(Boolean).length;
  let score = 0;
  if (validUrl)           score += 3;
  if (endpointCount >= 3) score += 2;
  else if (endpointCount >= 1) score += 1;
  if (tool)               score += 2;
  if (platform)           score += 1;
  if (words >= 50)        score += 2;
  return { score, total: 10, validUrl, endpointCount, words };
}

function getGrade(score) {
  if (score >= 9) return { letter: 'A', label: 'Outstanding!',     color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
  if (score >= 7) return { letter: 'B', label: 'Great Work!',       color: 'text-sky-600',     bg: 'bg-sky-50 border-sky-200' };
  if (score >= 5) return { letter: 'C', label: 'Good Effort!',      color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
  if (score >= 3) return { letter: 'D', label: 'Needs Improvement', color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200' };
  return             { letter: 'F', label: 'Review & Retry',     color: 'text-red-600',     bg: 'bg-red-50 border-red-200' };
}

function AssignmentSection({ session, onComplete }) {
  const [tool, setTool]           = useState('');
  const [platform, setPlatform]   = useState('');
  const [apiUrl, setApiUrl]       = useState('');
  const [endpoints, setEndpoints] = useState('');
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult]       = useState(null);
  const [savedToDb, setSavedToDb] = useState(false);
  const [dbError, setDbError]     = useState('');

  const wordCount  = reflection.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit  = tool && platform && apiUrl.trim() && endpoints && reflection.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const { score, total, validUrl, endpointCount } = getScore(tool, platform, apiUrl, endpoints, reflection);
    const pct   = Math.round((score / total) * 100);
    const grade = getGrade(score);
    setResult({ score, total, pct, grade, validUrl, endpointCount });
    setSubmitted(true);
    onComplete?.(score, pct, grade.letter);
    try {
      const token = session?.access_token;
      const res = await fetch(`${API_BASE}/api/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: `Backend Development — REST API (${tool} · ${platform})`,
          course_id: COURSE_ID,
          score,
          total,
          grade: grade.letter,
          answers: { tool, platform, apiUrl: apiUrl.trim(), endpoints: parseInt(endpoints) || 0, reflection: reflection.trim() },
        }),
      });
      if (res.ok) setSavedToDb(true);
      else { const d = await res.json(); setDbError(d.message || 'Could not save to database.'); }
    } catch { setDbError('Network error — result not saved to database.'); }
    finally { setSubmitting(false); }
  };

  const handleReset = () => {
    setTool(''); setPlatform(''); setApiUrl(''); setEndpoints(''); setReflection('');
    setSubmitted(false); setResult(null); setSavedToDb(false); setDbError('');
  };

  if (submitted && result) {
    const { score, total, pct, grade, validUrl, endpointCount } = result;
    return (
      <div className="space-y-6">
        <div className={`rounded-2xl border-2 p-8 text-center ${grade.bg}`}>
          <Trophy className={`w-12 h-12 mx-auto mb-3 ${grade.color}`} />
          <div className={`text-6xl font-black mb-1 ${grade.color}`}>{grade.letter}</div>
          <div className={`text-xl font-bold ${grade.color}`}>{grade.label}</div>
          <div className="text-slate-600 mt-2 text-lg">
            You scored <span className="font-bold">{score} / {total}</span> ({pct}%)
          </div>
          {savedToDb && (
            <div className="mt-3 inline-flex items-center gap-2 bg-white/70 px-4 py-2 rounded-xl text-sm font-medium text-emerald-700">
              <CheckCircle2 className="w-4 h-4" /> Result saved to Assignments
            </div>
          )}
          {dbError && <div className="mt-3 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl">{dbError}</div>}
        </div>

        <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Marking Breakdown</h3>
          {[
            { label: 'Valid live API URL submitted',    earned: validUrl ? 3 : 0,                          max: 3, pass: validUrl },
            { label: '3+ endpoints implemented',        earned: endpointCount >= 3 ? 2 : endpointCount >= 1 ? 1 : 0, max: 2, pass: endpointCount >= 3 },
            { label: 'AI tool declared',                earned: tool ? 2 : 0,       max: 2, pass: !!tool },
            { label: 'Deploy platform declared',        earned: platform ? 1 : 0,   max: 1, pass: !!platform },
            { label: 'Reflection is 50+ words',         earned: wordCount >= 50 ? 2 : 0, max: 2, pass: wordCount >= 50 },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                {row.pass
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  : <span className="w-4 h-4 rounded-full border-2 border-slate-300 inline-block" />}
                <span className={row.pass ? 'text-slate-800' : 'text-slate-400'}>{row.label}</span>
              </div>
              <span className={`font-bold text-sm ${row.pass ? 'text-emerald-600' : 'text-slate-400'}`}>{row.earned}/{row.max}</span>
            </div>
          ))}
          <div className="border-t border-slate-200 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className={grade.color}>{score}/10</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 shadow-soft space-y-2">
          <h4 className="font-bold text-slate-800">Your Submission</h4>
          <p className="text-sm text-slate-600"><span className="font-medium">AI tool:</span> {tool}</p>
          <p className="text-sm text-slate-600"><span className="font-medium">Platform:</span> {platform}</p>
          <p className="text-sm text-slate-600 flex items-center gap-1">
            <span className="font-medium">API URL:</span>
            <a href={apiUrl} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
              {apiUrl} <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className="text-sm text-slate-600"><span className="font-medium">Endpoints built:</span> {endpointCount}</p>
          <p className="text-sm text-slate-600"><span className="font-medium">Reflection ({wordCount} words):</span> {reflection}</p>
        </div>

        <button onClick={handleReset} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md">
          <RotateCcw className="w-4 h-4" /> Resubmit Assignment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 rounded-xl"><Trophy className="w-6 h-6 text-emerald-600" /></div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Backend Project Assignment</h2>
            <p className="text-slate-500 text-sm">Build · Test · Deploy · Submit</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <h3 className="font-bold text-slate-800">Assignment Brief</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Use <strong>Qwen AI</strong> (or ChatGPT / Gemini) to vibe-code a <strong>Node.js + Express</strong> REST API connected to a <strong>Supabase</strong> database. Build at least <strong>3 working endpoints</strong> (e.g. GET /api/items, POST /api/items, GET /api/items/:id). Test locally with Git Bash, deploy to <strong>Render</strong> (or Railway / Fly.io), and submit the live API URL.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { icon: '🤖', label: 'Step 1', desc: 'Use AI to generate backend files' },
              { icon: '🔧', label: 'Step 2', desc: 'Assemble files in VS Code' },
              { icon: '🖥️', label: 'Step 3', desc: 'Test with curl / Postman' },
              { icon: '🌐', label: 'Step 4', desc: 'Deploy to Render' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-bold text-xs text-slate-700">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <h4 className="font-semibold text-emerald-800 mb-2 text-sm">Marking Criteria</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: 'Valid live API URL submitted',  points: '3 pts' },
              { label: '3+ endpoints implemented',      points: '2 pts' },
              { label: 'AI tool declared',              points: '2 pts' },
              { label: 'Deploy platform declared',      points: '1 pt'  },
              { label: 'Reflection is 50+ words',       points: '2 pts' },
            ].map(c => (
              <div key={c.label} className="flex justify-between text-xs text-emerald-900 bg-white/60 rounded-lg px-3 py-1.5">
                <span>{c.label}</span><span className="font-bold">{c.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-5">
        <h3 className="font-bold text-slate-800 text-lg">Submit Your Work</h3>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">1. Which AI tool did you use? *</label>
          <div className="grid grid-cols-3 gap-3">
            {AI_TOOLS.map(t => (
              <label key={t} className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                tool === t ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}>
                <input type="radio" name="tool" value={t} checked={tool === t} onChange={() => setTool(t)} className="sr-only" />
                <span className="text-xl">{t === 'Qwen AI' ? '🟠' : t === 'ChatGPT' ? '🟢' : '🔵'}</span>
                {t}
                {t === 'Qwen AI' && <span className="text-xs bg-amber-400 text-white px-1.5 py-0.5 rounded-full">Recommended</span>}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">2. Where did you deploy? *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {DEPLOY_PLATFORMS.map(p => (
              <label key={p} className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                platform === p ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}>
                <input type="radio" name="platform" value={p} checked={platform === p} onChange={() => setPlatform(p)} className="sr-only" />
                <span className="text-lg">{p === 'Render' ? '🟣' : p === 'Railway' ? '🚂' : p === 'Fly.io' ? '✈️' : '♻️'}</span>
                <span className="text-center">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">3. Paste your live API URL *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="url"
              value={apiUrl}
              onChange={e => setApiUrl(e.target.value)}
              placeholder="https://my-backend.onrender.com"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            />
          </div>
          {apiUrl && !/^https?:\/\/.{3,}/.test(apiUrl.trim()) && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid URL starting with https://</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">4. How many endpoints did you build? *</label>
          <div className="grid grid-cols-4 gap-2">
            {['1', '2', '3', '4', '5', '6', '7', '8+'].map(n => (
              <label key={n} className={`flex items-center justify-center p-2.5 rounded-xl border cursor-pointer text-sm font-bold transition-all ${
                endpoints === n ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}>
                <input type="radio" name="endpoints" value={n} checked={endpoints === n} onChange={() => setEndpoints(n)} className="sr-only" />
                {n}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            5. Write a reflection (minimum 50 words) *
            <span className={`ml-2 text-xs font-normal ${wordCount >= 50 ? 'text-emerald-600' : 'text-slate-400'}`}>
              {wordCount}/50 words
            </span>
          </label>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            rows={5}
            placeholder="Describe what endpoints you built, how you connected Supabase, how you used AI to generate the code, what you tested, how the deployment went, and what you learned about how the backend and frontend connect."
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className={`w-full flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
            canSubmit && !submitting
              ? 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-emerald-200'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Assignment</>}
        </button>

        {!canSubmit && (
          <p className="text-xs text-center text-slate-400">Complete all fields above to enable submission</p>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function LearningModuleBackend() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const { visitSection, setProgress } = useCourseStore();

  const courseData = useCourseStore(state => state.courses.find(c => c.id === COURSE_ID));
  const liveProgress     = courseData?.progress ?? 0;
  const visitedSections  = courseData?.visitedSections ?? [];

  const currentIndex = TABS.findIndex(t => t.id === activeTab);

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
      case 'express':    return <ExpressSection />;
      case 'restapi':    return <RestApiSection />;
      case 'supabase':   return <SupabaseSection />;
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
            <span className="text-emerald-600 font-medium">Backend Development</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Backend Development</h1>
          <p className="text-slate-500 text-sm mt-0.5">Eng.Denis · 6 Weeks · Module 5 of 6</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${liveProgress}%` }} />
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto bg-slate-100 p-1 rounded-2xl">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const visited  = visitedSections.includes(tab.id);
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-1 justify-center ${
                isActive  ? 'bg-white text-emerald-600 shadow-sm'
                : visited ? 'text-emerald-600 hover:bg-white/60'
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
          <button onClick={goNext} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-emerald-200">
            Next: {TABS[currentIndex + 1].label} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
