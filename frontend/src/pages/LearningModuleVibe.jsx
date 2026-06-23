import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import { API_BASE } from '../services/api';
import {
  BookOpen, Cpu, Layers, Code2, Settings, Trophy,
  CheckCircle2, ArrowLeft, ArrowRight, ChevronRight,
  ExternalLink, Globe, RotateCcw, Send, FolderOpen,
  Database, Server, Monitor
} from 'lucide-react';

const COURSE_ID = 3;

const TABS = [
  { id: 'overview',   label: 'Overview',       icon: BookOpen },
  { id: 'tools',      label: 'AI Tools',        icon: Cpu },
  { id: 'structure',  label: 'File Structure',  icon: Layers },
  { id: 'assembly',   label: 'Assembling Files',icon: Code2 },
  { id: 'setup',      label: 'Setup Guide',     icon: Settings },
  { id: 'assignment', label: 'Assignment',      icon: Trophy },
];

// ── Infographic Components ────────────────────────────────────────────────────

function VibeCodingFlow() {
  const steps = [
    { icon: '💬', label: 'Describe', sub: 'Write a prompt in plain English', color: 'bg-amber-500' },
    { icon: '🤖', label: 'Generate', sub: 'AI writes code for you',           color: 'bg-orange-500' },
    { icon: '🗂️', label: 'Structure', sub: 'Organise into files & folders',   color: 'bg-violet-500' },
    { icon: '🔧', label: 'Assemble',  sub: 'Connect frontend, backend & DB',  color: 'bg-sky-500' },
    { icon: '🚀', label: 'Deploy',    sub: 'Push to GitHub & go live',         color: 'bg-emerald-500' },
  ];
  return (
    <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
      <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">The Vibe Coding Workflow</h4>
      <div className="flex flex-col sm:flex-row items-center gap-2 justify-center">
        {steps.map((s, i) => (
          <div key={s.label} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex flex-col items-center">
              <div className={`${s.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md`}>{s.icon}</div>
              <div className="font-bold text-slate-800 text-xs mt-1.5 text-center">{s.label}</div>
              <div className="text-slate-500 text-xs text-center max-w-[90px] mt-0.5">{s.sub}</div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0 rotate-90 sm:rotate-0 my-1 sm:my-0 sm:mb-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolComparisonTable() {
  const tools = [
    { name: 'Qwen AI', icon: '🟠', bestFor: 'Detailed code generation & full apps', cost: 'Free', setup: '⭐⭐⭐⭐⭐', quality: '⭐⭐⭐⭐⭐', context: 'Large', highlight: true },
    { name: 'ChatGPT', icon: '🟢', bestFor: 'Versatile coding & explanations',       cost: 'Free + Pro', setup: '⭐⭐⭐⭐⭐', quality: '⭐⭐⭐⭐', context: 'Large', highlight: false },
    { name: 'Gemini',  icon: '🔵', bestFor: 'Google ecosystem integration',          cost: 'Free + Pro', setup: '⭐⭐⭐⭐⭐', quality: '⭐⭐⭐⭐', context: 'Very Large', highlight: false },
  ];
  return (
    <div className="my-4 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full min-w-[550px] text-sm">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="px-4 py-3 text-left font-semibold">Tool</th>
            <th className="px-4 py-3 text-left font-semibold">Best For</th>
            <th className="px-4 py-3 text-left font-semibold">Cost</th>
            <th className="px-4 py-3 text-center font-semibold">Ease of Use</th>
            <th className="px-4 py-3 text-center font-semibold">Code Quality</th>
            <th className="px-4 py-3 text-center font-semibold">Context Window</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((t, i) => (
            <tr key={t.name} className={t.highlight ? 'bg-amber-50 border-l-4 border-l-amber-400' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-4 py-3 font-bold text-slate-800">
                {t.icon} {t.name}
                {t.highlight && <span className="ml-2 text-xs bg-amber-400 text-white px-2 py-0.5 rounded-full">Recommended</span>}
              </td>
              <td className="px-4 py-3 text-slate-600">{t.bestFor}</td>
              <td className="px-4 py-3 text-slate-600">{t.cost}</td>
              <td className="px-4 py-3 text-center">{t.setup}</td>
              <td className="px-4 py-3 text-center">{t.quality}</td>
              <td className="px-4 py-3 text-center text-xs text-slate-600">{t.context}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SetupSteps({ tool, steps, color, link }) {
  return (
    <div className={`rounded-2xl border overflow-hidden shadow-sm ${color.border}`}>
      <div className={`${color.header} px-5 py-3 flex items-center justify-between`}>
        <div className="font-bold text-white">{tool}</div>
        <a href={link} target="_blank" rel="noreferrer"
           className="flex items-center gap-1 text-xs text-white/80 hover:text-white transition-colors">
          Visit <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <div className="p-4 space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className={`w-6 h-6 rounded-full ${color.badge} text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5`}>
              {i + 1}
            </div>
            <div>
              <div className="font-semibold text-slate-800 text-sm">{step.title}</div>
              {step.desc && <div className="text-slate-500 text-xs mt-0.5">{step.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
          <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
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
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Vibe Coding</h2>
        <p className="text-slate-600 leading-relaxed">
          This module builds directly on <strong>AI Tools for Software Development</strong>. Where the previous module introduced you to AI tools that generate apps in the cloud, Vibe Coding goes further — teaching you to use AI chat tools like <strong>Qwen AI</strong>, ChatGPT, and Gemini to write code <em>file by file</em>, assemble a real full-stack project structure, and push it to GitHub from your own machine.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Instead of relying on a cloud IDE to do everything, you'll be in the driver's seat: crafting prompts, receiving code, organising it into a professional file structure, and connecting the frontend, backend, and database yourself. This is how professional developers use AI in real workflows.
        </p>
        <VibeCodingFlow />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {[
            { icon: '🟠', title: 'Qwen AI First', desc: 'Qwen AI (by Alibaba Cloud) generates exceptionally detailed, production-ready code. It handles large context windows perfectly — ideal for writing entire files at once.' },
            { icon: '🗂️', title: 'Real File Structure', desc: 'You will learn to create and organise a professional monorepo with separate frontend/ and backend/ directories — exactly how real projects are built.' },
            { icon: '🔧', title: 'Full-Stack Assembly', desc: 'React + Tailwind for UI, Express + Node.js for the API, and Supabase for the database. Each layer is generated by AI and wired together by you.' },
            { icon: '📦', title: 'GitHub-Ready', desc: 'Every file lands in a Git repository. You will commit, push, and connect to GitHub — the same workflow used at every software company in the world.' },
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
        <h3 className="text-xl font-bold text-slate-800">AI Tools Module vs. Vibe Coding Module</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="font-bold text-slate-700 mb-3">AI Tools for Software Development</h4>
            <ul className="space-y-2">
              {[
                'Use cloud IDEs (Replit, Lovable, Bolt)',
                'AI builds the whole app for you',
                'No local installation needed',
                'Great for rapid prototyping',
                'Limited control over file structure',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-slate-400 mt-0.5">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-bold text-amber-700 mb-3">Vibe Coding (This Module)</h4>
            <ul className="space-y-2">
              {[
                'Use AI chat tools (Qwen, ChatGPT, Gemini)',
                'You assemble files guided by AI output',
                'VS Code + Git Bash on your machine',
                'Full control over every file',
                'Push to GitHub & deploy anywhere',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-amber-500 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-sky-800">
          <strong>Stack for this module:</strong> React + Tailwind CSS (Frontend) · Express + Node.js (Backend) · Supabase (Database)
        </div>
      </div>
    </div>
  );
}

function ToolsSection() {
  const tools = [
    {
      name: 'Qwen AI', icon: '🟠', color: 'border-amber-300 bg-amber-50',
      headerColor: 'bg-amber-500', tagline: 'Alibaba\'s powerful AI — the recommended tool for this module',
      badge: '★ Recommended',
      what: 'Qwen AI (qwen.ai / chat.qwen.ai) is Alibaba Cloud\'s large language model, available for free. It excels at generating long, complete code files — perfect for vibe coding. When you paste a detailed prompt, Qwen returns entire React components, Express route files, or Supabase schema SQL in one shot, with minimal hallucination.',
      features: [
        'Free to use — no credit card required',
        'Exceptionally large context window (handles big codebases)',
        'Generates complete files, not just snippets',
        'Strong at React, Tailwind, Express, and SQL',
        'Follows instructions precisely — great for structured prompts',
        'Available at chat.qwen.ai (Alibaba Cloud login)',
      ],
      tip: 'Qwen responds best to structured prompts. Start with "You are a senior full-stack developer. Generate the complete file for..." and specify the exact filename, imports, and purpose.',
    },
    {
      name: 'ChatGPT', icon: '🟢', color: 'border-emerald-300 bg-emerald-50',
      headerColor: 'bg-emerald-600', tagline: 'OpenAI\'s flagship model — versatile and widely used',
      badge: null,
      what: 'ChatGPT (chatgpt.com) by OpenAI is the most widely used AI coding assistant in the world. GPT-4o (the free tier model) is excellent at explaining what code does, helping you debug, and generating clean React and Node.js code. It\'s a solid alternative when Qwen is unavailable.',
      features: [
        'Free tier available (GPT-4o mini)',
        'Excellent code explanations and debugging help',
        'Large community — easy to find prompt examples',
        'Strong at JavaScript, React, and Node.js',
        'ChatGPT Projects: organise prompts per app',
        'Canvas mode: edit generated code inline',
      ],
      tip: 'Use ChatGPT when you need an explanation or hit a bug. Paste the error message and say "Here is my code and the error. What is wrong and how do I fix it?"',
    },
    {
      name: 'Gemini', icon: '🔵', color: 'border-violet-300 bg-violet-50',
      headerColor: 'bg-violet-600', tagline: 'Google\'s AI — integrated with Google Workspace',
      badge: null,
      what: 'Gemini (gemini.google.com) is Google\'s AI model. Gemini 2.0 Flash (free) has a very large context window and is particularly good at understanding an entire codebase at once. If you use Google Drive, Docs, or Sheets, Gemini integrates directly into those tools. It\'s a strong alternative to Qwen and ChatGPT.',
      features: [
        'Free tier available (Gemini 2.0 Flash)',
        'Largest free context window of the three',
        'Good at understanding multi-file projects',
        'Integrated with Google Docs and Drive',
        'Gemini Code Assist available in VS Code',
        'Multimodal — can read screenshots of UI designs',
      ],
      tip: 'Gemini is great for understanding an existing codebase. Paste multiple files and ask "Given this file structure, generate the missing backend route for user authentication."',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft">
        <h2 className="text-2xl font-black text-slate-900 mb-2">AI Writing Tools — Deep Dive</h2>
        <p className="text-slate-600 text-sm">These three tools generate code from your plain-English prompts. All three are free. <strong>Qwen AI is recommended</strong> for this module — it produces the most complete, production-quality files.</p>
        <ToolComparisonTable />
      </div>
      {tools.map(tool => (
        <div key={tool.name} className={`glass rounded-2xl overflow-hidden shadow-soft border ${tool.color}`}>
          <div className={`${tool.headerColor} text-white px-6 py-4`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{tool.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black">{tool.name}</h3>
                  {tool.badge && <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-semibold">{tool.badge}</span>}
                </div>
                <p className="text-sm opacity-80">{tool.tagline}</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-slate-700 leading-relaxed text-sm">{tool.what}</p>
            <div>
              <h4 className="font-bold text-slate-800 mb-2 text-sm">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.features.map(f => (
                  <div key={f} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-xs text-amber-800">
              <strong>💡 Pro Tip:</strong> {tool.tip}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StructureSection() {
  const fileStructure = `my-vibe-app/
├── frontend/                  ← React + Tailwind CSS
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        ← Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/             ← Full page views
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── store/             ← State management (Zustand)
│   │   │   └── authStore.js
│   │   ├── services/          ← API calls & Supabase client
│   │   │   ├── api.js
│   │   │   └── supabase.js
│   │   ├── App.jsx            ← Root component + routing
│   │   └── main.jsx           ← Entry point
│   ├── .env                   ← VITE_SUPABASE_URL etc.
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/                   ← Express + Node.js API
│   ├── src/
│   │   ├── config/
│   │   │   └── supabase.js    ← Supabase service-role client
│   │   ├── controllers/       ← Business logic
│   │   │   ├── authController.js
│   │   │   └── userController.js
│   │   ├── middleware/        ← Auth guards, error handlers
│   │   │   └── authMiddleware.js
│   │   ├── routes/            ← Express route definitions
│   │   │   ├── authRoutes.js
│   │   │   └── userRoutes.js
│   │   └── app.js             ← Express app setup + CORS
│   ├── server.js              ← Entry point (starts server)
│   ├── .env                   ← SUPABASE_URL, SECRET etc.
│   └── package.json
│
├── .gitignore                 ← Ignores node_modules, .env
└── README.md`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Full-Stack File Structure</h2>
        <p className="text-slate-600 leading-relaxed">
          Before writing a single line of code, professional developers define the file structure. This is the blueprint of your app — it tells you where every file belongs and how the parts connect. When vibe coding, you give this structure to the AI so it generates files that fit together perfectly.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Why this matters:</strong> When you ask Qwen AI to "generate the Express route file for authentication", it needs to know the structure. Telling it <em>"this file lives at backend/src/routes/authRoutes.js and imports from ../controllers/authController.js"</em> produces correct, connected code — not isolated snippets.
        </div>
        <CodeBlock title="project-structure.txt" code={fileStructure} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-5">
        <h3 className="text-xl font-bold text-slate-800">Understanding Each Layer</h3>
        {[
          {
            icon: <Monitor className="w-5 h-5 text-violet-600" />,
            title: 'frontend/',
            color: 'border-violet-200 bg-violet-50',
            badge: 'React + Tailwind CSS',
            badgeColor: 'bg-violet-100 text-violet-700',
            points: [
              'components/ — small, reusable pieces of UI (buttons, cards, navbars)',
              'pages/ — full views that map to a URL route (e.g. /login shows Login.jsx)',
              'store/ — global state shared across pages (logged-in user, cart items, etc.)',
              'services/ — all API calls and the Supabase client live here, not in components',
              'App.jsx — defines which page shows at which URL using React Router',
              'vite.config.js — tells Vite to proxy /api calls to your backend during development',
            ],
          },
          {
            icon: <Server className="w-5 h-5 text-emerald-600" />,
            title: 'backend/',
            color: 'border-emerald-200 bg-emerald-50',
            badge: 'Express + Node.js',
            badgeColor: 'bg-emerald-100 text-emerald-700',
            points: [
              'routes/ — defines the URL paths your API listens on (GET /api/users, POST /api/auth/login)',
              'controllers/ — the actual logic: validate input, talk to the database, return a response',
              'middleware/ — code that runs between the request arriving and the controller responding (auth checks)',
              'config/supabase.js — creates the Supabase client using the service-role key (admin access)',
              'app.js — assembles all middleware and routes into one Express application',
              'server.js — starts the server and listens on a port (default: 3001)',
            ],
          },
          {
            icon: <Database className="w-5 h-5 text-sky-600" />,
            title: 'Supabase (Database)',
            color: 'border-sky-200 bg-sky-50',
            badge: 'PostgreSQL + Auth',
            badgeColor: 'bg-sky-100 text-sky-700',
            points: [
              'Supabase is a hosted PostgreSQL database with a built-in REST API',
              'auth.users — Supabase automatically manages this table for authentication',
              'public.users — you create this to store app-specific profile data',
              'Row Level Security (RLS) — database policies that control who can read/write each row',
              'SQL Editor in the Supabase dashboard — paste AI-generated SQL to create tables',
              'The backend uses the SERVICE ROLE KEY to bypass RLS for trusted operations',
            ],
          },
        ].map(layer => (
          <div key={layer.title} className={`rounded-2xl border p-5 ${layer.color}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">{layer.icon}</div>
              <div>
                <h4 className="font-bold text-slate-800 font-mono">{layer.title}</h4>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${layer.badgeColor}`}>{layer.badge}</span>
              </div>
            </div>
            <ul className="space-y-1.5">
              {layer.points.map(p => (
                <li key={p} className="flex items-start gap-2 text-xs text-slate-700">
                  <FolderOpen className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-3">
        <h3 className="text-lg font-bold text-slate-800">Prompt: Ask Qwen to Generate Your Structure</h3>
        <CodeBlock
          title="Qwen AI prompt — generate file structure"
          code={`You are a senior full-stack developer.
          
I am building a full-stack web application with the following stack:
- Frontend: React 18 + Vite + Tailwind CSS
- Backend: Express.js + Node.js (port 3001)
- Database: Supabase (PostgreSQL)

Generate the complete file and folder structure for this project as a monorepo.
Show every file and folder using a tree diagram.
Include:
- frontend/src with components/, pages/, store/, services/
- backend/src with routes/, controllers/, middleware/, config/
- .env files (with placeholder variable names only, no real values)
- package.json files for both frontend and backend
- A root .gitignore

After the tree, list the purpose of each top-level folder in one sentence.`}
        />
      </div>
    </div>
  );
}

function AssemblySection() {
  const frontendInit = `# 1. Create the frontend with Vite
npm create vite@latest frontend -- --template react
cd frontend
npm install

# 2. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Install React Router and other dependencies
npm install react-router-dom zustand @supabase/supabase-js`;

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

  const backendInit = `# 1. Create the backend folder and initialise npm
mkdir backend && cd backend
npm init -y

# 2. Install Express and dependencies
npm install express cors dotenv @supabase/supabase-js

# 3. Install nodemon for auto-reload during development
npm install -D nodemon

# 4. Add start script to package.json
# "scripts": { "dev": "nodemon src/server.js" }`;

  const supabaseSQL = `-- Run this in Supabase SQL Editor (dashboard.supabase.com)
-- Creates a public profile table linked to auth.users

CREATE TABLE public.users (
  id        bigserial PRIMARY KEY,
  auth_id   uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email     text NOT NULL,
  full_name text,
  role      text NOT NULL DEFAULT 'student',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = auth_id);`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Assembling Your Full-Stack App</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          With your file structure defined, you now assemble the app layer by layer — first the frontend, then the backend, then the database. For each layer, you'll use Qwen AI (or ChatGPT / Gemini) to generate the code, then paste it into the correct file in VS Code.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          {[
            { icon: <Monitor className="w-5 h-5" />, label: '1. Frontend', sub: 'React + Tailwind CSS', color: 'bg-violet-500' },
            { icon: <Server className="w-5 h-5" />, label: '2. Backend', sub: 'Express + Node.js', color: 'bg-emerald-500' },
            { icon: <Database className="w-5 h-5" />, label: '3. Database', sub: 'Supabase SQL', color: 'bg-sky-500' },
          ].map(s => (
            <div key={s.label} className={`flex-1 ${s.color} text-white rounded-xl p-4 flex items-center gap-3`}>
              {s.icon}
              <div>
                <div className="font-bold text-sm">{s.label}</div>
                <div className="text-xs opacity-80">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frontend */}
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-100 rounded-xl"><Monitor className="w-5 h-5 text-violet-600" /></div>
          <h3 className="text-xl font-bold text-slate-900">Frontend — React + Tailwind CSS</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          React handles the UI and routing. Tailwind CSS provides utility classes for styling without writing custom CSS. Together they are the most popular frontend stack for modern web apps. Ask Qwen AI to generate each component file — paste the output directly into the correct path in VS Code.
        </p>
        <CodeBlock title="Terminal — set up the frontend" code={frontendInit} />
        <CodeBlock title="tailwind.config.js" code={tailwindConfig} />
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800 space-y-1">
          <p><strong>Qwen prompt for a React page:</strong></p>
          <p className="text-xs text-violet-700 italic">"Generate the complete React component for frontend/src/pages/Dashboard.jsx. It should display a welcome message, a grid of course cards, and a progress bar. Use Tailwind CSS for all styling. Import from react-router-dom for navigation. No placeholder data — accept data via props."</p>
        </div>
      </div>

      {/* Backend */}
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-xl"><Server className="w-5 h-5 text-emerald-600" /></div>
          <h3 className="text-xl font-bold text-slate-900">Backend — Express + Node.js</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          Express.js is a minimal Node.js framework for building REST APIs. Your backend receives requests from the React frontend, validates them, and communicates with Supabase. It runs on port 3001 locally and is deployed to a hosting service like Render in production.
        </p>
        <CodeBlock title="Terminal — set up the backend" code={backendInit} />
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800 space-y-1">
          <p><strong>Qwen prompt for an Express route:</strong></p>
          <p className="text-xs text-emerald-700 italic">"Generate the complete file for backend/src/routes/authRoutes.js. It should define two routes: POST /api/auth/signup and POST /api/auth/login. Each route calls a controller function. Import Router from express and the controller from ../controllers/authController. Export the router as default."</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2">
          <p className="font-bold text-slate-800">How the frontend calls the backend:</p>
          <p>During development, add a Vite proxy in <code className="bg-slate-200 px-1 rounded">vite.config.js</code> so <code className="bg-slate-200 px-1 rounded">/api</code> calls forward to <code className="bg-slate-200 px-1 rounded">localhost:3001</code>. In production, set <code className="bg-slate-200 px-1 rounded">VITE_API_URL=https://your-backend.onrender.com</code> in Cloudflare Pages.</p>
        </div>
      </div>

      {/* Database */}
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-100 rounded-xl"><Database className="w-5 h-5 text-sky-600" /></div>
          <h3 className="text-xl font-bold text-slate-900">Database — Supabase</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          Supabase provides a hosted PostgreSQL database, built-in authentication, and a REST API. You define tables by running SQL in the Supabase dashboard. Ask Qwen AI to generate the SQL, then paste it into the Supabase SQL Editor — no database installation required.
        </p>
        <CodeBlock title="Supabase SQL Editor — users table" code={supabaseSQL} />
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-sky-800 space-y-1">
          <p><strong>Qwen prompt for a Supabase table:</strong></p>
          <p className="text-xs text-sky-700 italic">"Generate the complete SQL to create a 'courses' table in Supabase. Fields: id (bigserial primary key), title (text not null), description (text), instructor (text), duration_weeks (integer), created_at (timestamptz default now). Enable row level security and add a policy allowing anyone to read courses."</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: 'SUPABASE_URL', desc: 'From Project Settings → API', env: 'Backend .env' },
            { title: 'SUPABASE_SERVICE_ROLE_KEY', desc: 'Service role secret (never expose)', env: 'Backend .env' },
            { title: 'VITE_SUPABASE_ANON_KEY', desc: 'Public anon key for frontend client', env: 'Frontend .env' },
          ].map(v => (
            <div key={v.title} className="bg-white border border-slate-200 rounded-xl p-3 text-xs">
              <div className="font-bold text-slate-800 font-mono">{v.title}</div>
              <div className="text-slate-500 mt-0.5">{v.desc}</div>
              <div className="mt-1 bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full inline-block font-semibold">{v.env}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SetupSection() {
  const setupData = [
    {
      tool: '🟠 Qwen AI — Account Setup',
      link: 'https://chat.qwen.ai',
      color: { header: 'bg-amber-500', border: 'border-amber-200', badge: 'bg-amber-500' },
      steps: [
        { title: 'Go to chat.qwen.ai', desc: 'Open your browser and navigate to chat.qwen.ai (Alibaba Cloud)' },
        { title: 'Click "Sign In"', desc: 'Create a free account using your email address or Google account' },
        { title: 'Select Qwen-Max or Qwen-Plus', desc: 'Choose the most capable free model available — Qwen-Max for complex code, Qwen-Plus for speed' },
        { title: 'Start a new chat', desc: 'Click "+ New Chat" — each new project should get its own conversation thread' },
        { title: 'Test with a code prompt', desc: 'Type: "Generate a simple React component that shows a Hello World heading styled with Tailwind CSS"' },
        { title: 'Copy the output', desc: 'Click the copy icon on the code block and paste it into VS Code' },
      ],
    },
    {
      tool: '💻 VS Code — Installation',
      link: 'https://code.visualstudio.com',
      color: { header: 'bg-sky-600', border: 'border-sky-200', badge: 'bg-sky-600' },
      steps: [
        { title: 'Go to code.visualstudio.com', desc: 'Download the installer for your operating system (Windows, macOS, or Linux)' },
        { title: 'Run the installer', desc: 'Accept the default settings. On Windows, tick "Add to PATH" — this is important' },
        { title: 'Open VS Code', desc: 'Launch VS Code. You should see the Welcome tab' },
        { title: 'Install the ESLint extension', desc: 'Press Ctrl+Shift+X, search "ESLint", click Install — it highlights code errors as you type' },
        { title: 'Install the Prettier extension', desc: 'Search "Prettier - Code formatter" and install it — keeps your code consistently formatted' },
        { title: 'Install the Tailwind CSS IntelliSense extension', desc: 'Search "Tailwind CSS IntelliSense" — gives auto-complete for Tailwind class names' },
        { title: 'Open your project folder', desc: 'File → Open Folder → select your project directory. The file tree appears on the left' },
      ],
    },
    {
      tool: '🐙 GitHub — Account & Repository',
      link: 'https://github.com',
      color: { header: 'bg-slate-800', border: 'border-slate-200', badge: 'bg-slate-700' },
      steps: [
        { title: 'Go to github.com', desc: 'Sign up for a free account using your email address' },
        { title: 'Verify your email', desc: 'Check your inbox and click the verification link from GitHub' },
        { title: 'Create a new repository', desc: 'Click the green "New" button → give it a name like "my-vibe-app" → set it to Public → click Create' },
        { title: 'Copy the repository URL', desc: 'On the new repo page, copy the HTTPS URL (e.g. https://github.com/your-username/my-vibe-app.git)' },
        { title: 'Link VS Code to GitHub', desc: 'In VS Code, open Source Control (Ctrl+Shift+G) → click "Publish to GitHub" or use the terminal' },
        { title: 'Push your first commit', desc: 'In the terminal: git add . → git commit -m "Initial commit" → git push origin main' },
      ],
    },
    {
      tool: '🖥️ Git Bash — Installation',
      link: 'https://git-scm.com/downloads',
      color: { header: 'bg-orange-600', border: 'border-orange-200', badge: 'bg-orange-600' },
      steps: [
        { title: 'Go to git-scm.com/downloads', desc: 'Download the Git installer for your operating system' },
        { title: 'Run the installer', desc: 'Accept all default settings. Make sure "Git Bash Here" is checked in the context menu options' },
        { title: 'Verify installation', desc: 'Open Git Bash and type: git --version. You should see a version number like git version 2.45.0' },
        { title: 'Configure your identity', desc: 'Run: git config --global user.name "Your Name" and git config --global user.email "you@example.com"' },
        { title: 'Set VS Code as default editor', desc: 'Run: git config --global core.editor "code --wait" to use VS Code for git messages' },
        { title: 'Use Git Bash in VS Code', desc: 'In VS Code, open a terminal (Ctrl+`) → click the dropdown arrow → select "Git Bash" as your default shell' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-3">
        <h2 className="text-2xl font-black text-slate-900 mb-1">Setup Guide — Requirements</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Set up all four tools before starting the assignment. You only need <strong>one AI tool</strong> (Qwen AI is recommended), but VS Code, GitHub, and Git Bash are all required.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '🟠', label: 'Qwen AI', sub: 'or ChatGPT / Gemini', req: 'Required (1 of 3)' },
            { icon: '💻', label: 'VS Code', sub: 'Code editor', req: 'Required' },
            { icon: '🐙', label: 'GitHub', sub: 'Version control', req: 'Required' },
            { icon: '🖥️', label: 'Git Bash', sub: 'Terminal for Git', req: 'Required' },
          ].map(r => (
            <div key={r.label} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">{r.icon}</div>
              <div className="font-bold text-slate-800 text-sm">{r.label}</div>
              <div className="text-slate-500 text-xs">{r.sub}</div>
              <div className="mt-1.5 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full inline-block font-semibold">{r.req}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {setupData.map(s => <SetupSteps key={s.tool} {...s} />)}
      </div>
    </div>
  );
}

// ── Assignment ────────────────────────────────────────────────────────────────

const AI_TOOLS = ['Qwen AI', 'ChatGPT', 'Gemini'];

function getScore(tool, url, reflection) {
  const validUrl = /^https?:\/\/.{3,}/.test(url.trim());
  const words = reflection.trim().split(/\s+/).filter(Boolean).length;
  let score = 0;
  if (validUrl) score += 5;
  if (tool) score += 2;
  if (reflection.trim().length > 0) score += 1;
  if (words >= 50) score += 2;
  return { score, total: 10, validUrl, words };
}

function getGrade(score) {
  if (score >= 9) return { letter: 'A', label: 'Outstanding!',      color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
  if (score >= 7) return { letter: 'B', label: 'Great Work!',        color: 'text-sky-600',     bg: 'bg-sky-50 border-sky-200' };
  if (score >= 5) return { letter: 'C', label: 'Good Effort!',       color: 'text-violet-600',  bg: 'bg-violet-50 border-violet-200' };
  if (score >= 3) return { letter: 'D', label: 'Needs Improvement',  color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200' };
  return             { letter: 'F', label: 'Review & Retry',      color: 'text-red-600',     bg: 'bg-red-50 border-red-200' };
}

function AssignmentSection({ session, onComplete }) {
  const [tool, setTool] = useState('');
  const [url, setUrl] = useState('');
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [savedToDb, setSavedToDb] = useState(false);
  const [dbError, setDbError] = useState('');

  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = tool && url.trim() && reflection.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const { score, total, validUrl } = getScore(tool, url, reflection);
    const pct = Math.round((score / total) * 100);
    const grade = getGrade(score);
    setResult({ score, total, pct, grade, validUrl });
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
          title: `Vibe Coding — Full-Stack Project (${tool})`,
          course_id: COURSE_ID,
          score,
          total,
          grade: grade.letter,
          answers: { tool, projectUrl: url.trim(), reflection: reflection.trim() },
        }),
      });
      if (res.ok) setSavedToDb(true);
      else { const d = await res.json(); setDbError(d.message || 'Could not save to database.'); }
    } catch { setDbError('Network error — result not saved to database.'); }
    finally { setSubmitting(false); }
  };

  const handleReset = () => {
    setTool(''); setUrl(''); setReflection('');
    setSubmitted(false); setResult(null); setSavedToDb(false); setDbError('');
  };

  if (submitted && result) {
    const { score, total, pct, grade, validUrl } = result;
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
            { label: 'Valid project URL submitted', earned: validUrl ? 5 : 0, max: 5, pass: validUrl },
            { label: 'AI tool selected', earned: tool ? 2 : 0, max: 2, pass: !!tool },
            { label: 'Reflection written', earned: reflection.trim() ? 1 : 0, max: 1, pass: !!reflection.trim() },
            { label: 'Reflection ≥ 50 words', earned: wordCount >= 50 ? 2 : 0, max: 2, pass: wordCount >= 50 },
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
          <p className="text-sm text-slate-600"><span className="font-medium">AI tool used:</span> {tool}</p>
          <p className="text-sm text-slate-600 flex items-center gap-1">
            <span className="font-medium">Project URL:</span>
            <a href={url} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
              {url} <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className="text-sm text-slate-600"><span className="font-medium">Reflection ({wordCount} words):</span> {reflection}</p>
        </div>
        <button onClick={handleReset} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md">
          <RotateCcw className="w-4 h-4" /> Resubmit Assignment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 rounded-xl"><Trophy className="w-6 h-6 text-amber-600" /></div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Full-Stack Project Assignment</h2>
            <p className="text-slate-500 text-sm">Build · Publish · Submit</p>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <h3 className="font-bold text-slate-800">Assignment Brief</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Using <strong>Qwen AI</strong> (or ChatGPT / Gemini), vibe-code a full-stack web application. Your app must have a React + Tailwind frontend and an Express + Node.js backend. Deploy the frontend to Cloudflare Pages (or any host) and submit the live URL below. You do not need a database for the assignment — a frontend with a working backend API is sufficient.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
            {[
              { icon: '🟠', label: 'Step 1', desc: 'Create your file structure' },
              { icon: '💬', label: 'Step 2', desc: 'Prompt AI for each file' },
              { icon: '🔧', label: 'Step 3', desc: 'Assemble in VS Code' },
              { icon: '🌐', label: 'Step 4', desc: 'Push to GitHub & deploy' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-bold text-xs text-slate-700">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h4 className="font-semibold text-amber-800 mb-2 text-sm">Marking Criteria</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: 'Valid live project URL submitted', points: '5 pts' },
              { label: 'AI tool declared', points: '2 pts' },
              { label: 'Reflection submitted', points: '1 pt' },
              { label: 'Reflection is 50+ words', points: '2 pts' },
            ].map(c => (
              <div key={c.label} className="flex justify-between text-xs text-amber-900 bg-white/60 rounded-lg px-3 py-1.5">
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
                tool === t ? 'bg-amber-50 border-amber-400 text-amber-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
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
          <label className="block text-sm font-semibold text-slate-700 mb-2">2. Paste your deployed project URL *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://my-vibe-app.pages.dev"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>
          {url && !/^https?:\/\/.{3,}/.test(url.trim()) && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid URL starting with https://</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            3. Write a reflection (minimum 50 words) *
            <span className={`ml-2 text-xs font-normal ${wordCount >= 50 ? 'text-emerald-600' : 'text-slate-400'}`}>
              {wordCount}/50 words
            </span>
          </label>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            rows={5}
            placeholder="Describe what you built, which AI tool you used and why, how you structured your files, what challenges you faced connecting the frontend to the backend, and what you would improve next time."
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className={`w-full flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
            canSubmit && !submitting
              ? 'bg-amber-500 hover:bg-amber-600 hover:shadow-amber-200'
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

export default function LearningModuleVibe() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const { visitSection, setProgress } = useCourseStore();

  const courseData = useCourseStore(state => state.courses.find(c => c.id === COURSE_ID));
  const liveProgress = courseData?.progress ?? 0;
  const visitedSections = courseData?.visitedSections ?? [];

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
      case 'tools':      return <ToolsSection />;
      case 'structure':  return <StructureSection />;
      case 'assembly':   return <AssemblySection />;
      case 'setup':      return <SetupSection />;
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
            <span className="text-amber-600 font-medium">Vibe Coding</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Vibe Coding</h1>
          <p className="text-slate-500 text-sm mt-0.5">Alex Chen · 2 Weeks · Module 3 of 6</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${liveProgress}%` }} />
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
                isActive ? 'bg-white text-amber-600 shadow-sm'
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
          <button onClick={goNext} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-amber-200">
            Next: {TABS[currentIndex + 1].label} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
