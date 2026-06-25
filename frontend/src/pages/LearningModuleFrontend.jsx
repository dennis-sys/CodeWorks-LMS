import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import { API_BASE } from '../services/api';
import {
  BookOpen, Code2, Cpu, Layers, Settings, Trophy,
  CheckCircle2, ArrowLeft, ArrowRight, ChevronRight,
  ExternalLink, Globe, RotateCcw, Send, FolderOpen, Monitor
} from 'lucide-react';

const COURSE_ID = 4;

const TABS = [
  { id: 'overview',     label: 'Overview',         icon: BookOpen },
  { id: 'fundamentals', label: 'HTML & CSS',        icon: Code2 },
  { id: 'javascript',   label: 'JavaScript & React',icon: Cpu },
  { id: 'vibecoding',   label: 'Vibe Coding',       icon: Layers },
  { id: 'localdev',     label: 'Local Dev & Deploy',icon: Settings },
  { id: 'assignment',   label: 'Assignment',        icon: Trophy },
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
            <div>
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
    { icon: '🏗️', label: 'HTML',        sub: 'Structure & content',   color: 'bg-orange-500' },
    { icon: '🎨', label: 'CSS',         sub: 'Style & layout',        color: 'bg-violet-500' },
    { icon: '⚙️', label: 'JavaScript',  sub: 'Logic & interactivity', color: 'bg-amber-500' },
    { icon: '⚛️', label: 'React',       sub: 'Components & state',    color: 'bg-sky-500' },
    { icon: '🚀', label: 'Deploy',      sub: 'Netlify or Vercel',     color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Frontend Development</h2>
        <p className="text-slate-600 leading-relaxed">
          Frontend development is everything the user sees and interacts with in a web application — the buttons, layouts, forms, animations, and navigation. This module takes you from the raw building blocks of the web (HTML, CSS, JavaScript) all the way to building production-ready React applications, accelerated by <strong>Qwen AI</strong> for code generation.
        </p>
        <p className="text-slate-600 leading-relaxed">
          This module directly expands the <strong>Vibe Coding</strong> module by zooming into the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">frontend/</code> directory — you'll build every file yourself using AI-generated code, test it locally with Git Bash, and deploy it to production with Netlify or Vercel.
        </p>

        <div className="my-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">The Frontend Technology Stack</h4>
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
            { icon: '🏗️', title: 'HTML — The Skeleton',   desc: 'HTML defines what exists on the page — headings, paragraphs, buttons, forms, images, links. Every website starts here.' },
            { icon: '🎨', title: 'CSS — The Appearance',  desc: 'CSS controls how everything looks — colours, fonts, spacing, layout. Tailwind CSS gives you utility classes so you style directly in your HTML.' },
            { icon: '⚙️', title: 'JavaScript — The Brain', desc: 'JavaScript makes the page respond to user actions — clicking a button, submitting a form, fetching data from an API, animating elements.' },
            { icon: '⚛️', title: 'React — The Framework', desc: 'React lets you split the UI into reusable components, manage state (what the user sees changes based on data), and build complex apps cleanly.' },
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
        <h3 className="text-xl font-bold text-slate-800">What You Will Build in This Module</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '01', title: 'Learn the Fundamentals', desc: 'HTML structure, CSS layout & Tailwind, JavaScript logic, and React component patterns.' },
            { step: '02', title: 'Vibe Code a Frontend App', desc: 'Use Qwen AI to generate every frontend file — components, pages, routing, and styling.' },
            { step: '03', title: 'Test, Deploy & Ship', desc: 'Run npm install & npm run dev locally via Git Bash, then deploy to Netlify or Vercel.' },
          ].map(s => (
            <div key={s.step} className="bg-violet-50 border border-violet-200 rounded-xl p-4">
              <div className="text-3xl font-black text-violet-200 mb-2">{s.step}</div>
              <h4 className="font-bold text-violet-800 mb-1 text-sm">{s.title}</h4>
              <p className="text-xs text-violet-700 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-sky-800">
          <strong>Module Stack:</strong> HTML5 · CSS3 · Tailwind CSS · JavaScript (ES6+) · React 18 · Vite · Git Bash · Netlify · Vercel
        </div>
      </div>
    </div>
  );
}

function FundamentalsSection() {
  const htmlExample = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Portfolio</title>
  </head>
  <body>

    <!-- Navigation -->
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>

    <!-- Hero Section -->
    <section id="hero">
      <h1>Hi, I'm Alex Chen</h1>
      <p>Frontend Developer & Creative Coder</p>
      <a href="#projects">View My Work</a>
    </section>

    <!-- About Section -->
    <section id="about">
      <h2>About Me</h2>
      <p>I build fast, accessible web experiences using React and Tailwind CSS.</p>
    </section>

  </body>
</html>`;

  const tailwindExample = `<!-- Tailwind CSS — utility classes directly in HTML/JSX -->

<!-- Layout: Flexbox -->
<div class="flex items-center justify-between gap-4">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Layout: Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="bg-white rounded-xl p-4 shadow">Card 1</div>
  <div class="bg-white rounded-xl p-4 shadow">Card 2</div>
  <div class="bg-white rounded-xl p-4 shadow">Card 3</div>
</div>

<!-- Typography -->
<h1 class="text-4xl font-black text-slate-900">Big Bold Heading</h1>
<p class="text-slate-600 text-sm leading-relaxed">Body text.</p>

<!-- Colours & Backgrounds -->
<div class="bg-violet-500 text-white px-6 py-3 rounded-xl">
  Violet button
</div>

<!-- Responsive: mobile-first -->
<div class="text-sm md:text-base lg:text-lg">
  Smaller on mobile, larger on desktop
</div>

<!-- Hover & Focus States -->
<button class="bg-violet-500 hover:bg-violet-600 
               focus:ring-2 focus:ring-violet-400 
               text-white px-4 py-2 rounded-lg transition-all">
  Hover me
</button>`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">HTML — Structure of the Web</h2>
        <p className="text-slate-600 leading-relaxed">
          HTML (HyperText Markup Language) is the skeleton of every web page. It defines <strong>what</strong> exists on the page using <em>elements</em> — tags that wrap content and give it meaning. A browser reads your HTML and renders it visually. Before writing any CSS or JavaScript, HTML must be in place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { tag: '<h1> – <h6>', desc: 'Headings — h1 is most important, h6 least. Used for titles and section headers.' },
            { tag: '<p>',         desc: 'Paragraph — wraps a block of text. The most common text element.' },
            { tag: '<div>',       desc: 'Division — a generic container. Used to group elements for layout or styling.' },
            { tag: '<a href="">',  desc: 'Anchor — creates a hyperlink to another page or section on the same page.' },
            { tag: '<img src="">',desc: 'Image — embeds a photo. src is the file path or URL. alt describes the image.' },
            { tag: '<button>',    desc: 'Button — a clickable element. Used for form submissions or triggering JS functions.' },
            { tag: '<input>',     desc: 'Input — a form field. type="text", type="email", type="password", type="checkbox".' },
            { tag: '<section>',   desc: 'Section — a thematic group of content. Gives meaning to major parts of the page.' },
            { tag: '<nav>',       desc: 'Navigation — wraps navigation links. Tells screen readers this is a menu.' },
            { tag: '<ul> / <li>', desc: 'Unordered list / list item — creates a bulleted list of items.' },
          ].map(item => (
            <div key={item.tag} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-3">
              <code className="text-violet-700 font-mono text-xs font-bold bg-violet-50 px-2 py-1 rounded flex-shrink-0 self-start">{item.tag}</code>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <CodeBlock title="index.html — basic page structure" code={htmlExample} />

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
          <strong>Rule of thumb:</strong> HTML is for <em>meaning</em>, not appearance. Never use HTML to control font size or colour — that's CSS's job. Write semantic HTML first, style it second.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">CSS & Tailwind CSS — Style & Layout</h2>
        <p className="text-slate-600 leading-relaxed">
          CSS (Cascading Style Sheets) controls how your HTML looks — colours, fonts, spacing, and layout. <strong>Tailwind CSS</strong> is a utility-first CSS framework that lets you style elements directly using class names, without writing a separate stylesheet. It's the fastest way to build beautiful UIs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Spacing', classes: ['p-4 (padding)', 'm-2 (margin)', 'px-6 (horizontal padding)', 'py-3 (vertical padding)', 'gap-4 (flex/grid gap)', 'space-y-2 (vertical stack gap)'] },
            { title: 'Layout',  classes: ['flex (flexbox)', 'grid (CSS grid)', 'items-center', 'justify-between', 'grid-cols-3', 'col-span-2'] },
            { title: 'Style',   classes: ['bg-violet-500 (background)', 'text-white (colour)', 'rounded-xl (border radius)', 'shadow-md (box shadow)', 'border border-slate-200', 'opacity-80'] },
          ].map(g => (
            <div key={g.title} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-bold text-slate-800 mb-2 text-sm">{g.title}</h4>
              <div className="space-y-1">
                {g.classes.map(c => (
                  <div key={c} className="text-xs font-mono text-violet-700 bg-violet-50 px-2 py-1 rounded">{c}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock title="Tailwind CSS — common patterns" code={tailwindExample} />

        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800">
          <strong>Responsive design:</strong> Tailwind uses a mobile-first approach. Add <code className="bg-violet-100 px-1 rounded">md:</code> before any class to apply it only on medium screens and up. <code className="bg-violet-100 px-1 rounded">lg:</code> for large screens. e.g. <code className="bg-violet-100 px-1 rounded">text-sm md:text-lg</code>
        </div>
      </div>
    </div>
  );
}

function JavaScriptSection() {
  const jsExample = `// ── Variables & Data Types ───────────────────────────────
const name = 'Alex';           // string — text value
const age = 25;                // number
const isStudent = true;        // boolean — true or false
const skills = ['React', 'CSS', 'Node.js'];   // array
const user = { name: 'Alex', age: 25 };       // object

// ── Functions ────────────────────────────────────────────
// Traditional function
function greet(name) {
  return 'Hello, ' + name + '!';
}

// Arrow function (modern — used in React)
const greet = (name) => \`Hello, \${name}!\`;

// ── Array Methods ────────────────────────────────────────
const scores = [85, 92, 67, 95, 78];

// map() — transform every item, returns new array
const doubled = scores.map(s => s * 2);

// filter() — keep items that match a condition
const passing = scores.filter(s => s >= 70);

// find() — get the first matching item
const first90 = scores.find(s => s >= 90);    // 92

// ── Async / Fetch ────────────────────────────────────────
// Fetch data from an API
async function loadCourses() {
  const response = await fetch('/api/courses');
  const data = await response.json();
  return data;
}`;

  const reactExample = `// ── React Component Anatomy ──────────────────────────────
import { useState, useEffect } from 'react';

// A component is just a JavaScript function that returns JSX
function CourseCard({ title, instructor, progress }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 text-sm">by {instructor}</p>
      <div className="mt-3 h-2 bg-slate-100 rounded-full">
        <div
          className="h-full bg-violet-500 rounded-full"
          style={{ width: \`\${progress}%\` }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-1">{progress}% complete</p>
    </div>
  );
}

// ── useState — local component state ─────────────────────
function Counter() {
  const [count, setCount] = useState(0);  // initial value = 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

// ── useEffect — run code when component mounts ────────────
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => setUsers(data));
  }, []);   // [] means run once on mount

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`;

  const routerExample = `// ── React Router v6 — Client-side routing ───────────────
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

// App.jsx — define all routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

// Navigate between pages without a full reload
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <button onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>
    </nav>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">JavaScript — Making Pages Interactive</h2>
        <p className="text-slate-600 leading-relaxed">
          JavaScript is the only programming language that runs natively in the browser. It lets you respond to user actions (clicks, form inputs), manipulate the page, and fetch data from servers. Modern JavaScript (ES6+) uses clean, concise syntax — and React is built entirely on top of it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Variables',       icon: '📦', desc: 'const (never changes) and let (can change) replace the old var. Use const by default.' },
            { title: 'Arrow Functions', icon: '➡️', desc: 'const add = (a, b) => a + b — concise function syntax used everywhere in React.' },
            { title: 'Template Strings',icon: '🔤', desc: '`Hello ${name}!` — embed variables inside strings using backticks and ${}.' },
            { title: 'Destructuring',   icon: '📦', desc: 'const { name, age } = user — extract values from objects or arrays in one line.' },
            { title: 'Spread Operator', icon: '✨', desc: '...arr — copy or merge arrays and objects: [...items, newItem] or {...obj, key: val}.' },
            { title: 'Async/Await',     icon: '⏳', desc: 'Makes async code readable. await pauses execution until a Promise resolves.' },
          ].map(c => (
            <div key={c.title} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-3">
              <span className="text-xl flex-shrink-0">{c.icon}</span>
              <div>
                <div className="font-bold text-slate-800 text-sm">{c.title}</div>
                <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock title="JavaScript — ES6+ fundamentals" code={jsExample} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">React — Components, State & Hooks</h2>
        <p className="text-slate-600 leading-relaxed">
          React is a JavaScript library for building user interfaces using reusable <strong>components</strong>. Each component is a function that returns JSX (HTML-like syntax in JavaScript). Components can hold their own data (<strong>state</strong>) and update the UI automatically when that data changes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { hook: 'useState()',   color: 'bg-violet-100 text-violet-700', desc: 'Store and update local component data. Changing state re-renders the component.' },
            { hook: 'useEffect()',  color: 'bg-sky-100 text-sky-700',       desc: 'Run code when the component mounts or when specific values change. Used for API calls.' },
            { hook: 'useContext()', color: 'bg-emerald-100 text-emerald-700', desc: 'Read shared global state (e.g. logged-in user) without passing props through every level.' },
          ].map(h => (
            <div key={h.hook} className="rounded-xl border border-slate-200 p-4">
              <div className={`inline-block px-2 py-1 rounded-lg text-xs font-bold font-mono mb-2 ${h.color}`}>{h.hook}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        <CodeBlock title="React — components, useState, useEffect" code={reactExample} />
        <CodeBlock title="React Router v6 — navigation" code={routerExample} />

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Key rule:</strong> Data flows <em>down</em> through props (parent → child). Events flow <em>up</em> through callback functions (child calls a function passed by parent). Keep state as high as it needs to be, but no higher.
        </div>
      </div>
    </div>
  );
}

function VibeCodingSection() {
  const frontendStructure = `frontend/
├── public/
│   └── index.html           ← Single HTML file (Vite injects your React app here)
│
├── src/
│   ├── components/          ← Small, reusable UI pieces
│   │   ├── Navbar.jsx       ← Top navigation bar
│   │   ├── Footer.jsx       ← Page footer
│   │   ├── Button.jsx       ← Reusable button component
│   │   └── Card.jsx         ← Generic card wrapper
│   │
│   ├── pages/               ← Full page views (one per route)
│   │   ├── Home.jsx         ← Landing page  (route: /)
│   │   ├── About.jsx        ← About page    (route: /about)
│   │   ├── Dashboard.jsx    ← Dashboard     (route: /dashboard)
│   │   └── Login.jsx        ← Login page    (route: /login)
│   │
│   ├── store/               ← Global state (Zustand)
│   │   └── authStore.js     ← Logged-in user state
│   │
│   ├── services/            ← API calls & external clients
│   │   ├── api.js           ← API_BASE URL + fetch helpers
│   │   └── supabase.js      ← Supabase client (anon key)
│   │
│   ├── layouts/             ← Shared page wrappers
│   │   └── DashboardLayout.jsx  ← Sidebar + content area
│   │
│   ├── App.jsx              ← Root component — all routes defined here
│   ├── main.jsx             ← Entry point — mounts App into index.html
│   └── index.css            ← Global CSS (Tailwind @tailwind directives)
│
├── .env                     ← VITE_API_URL, VITE_SUPABASE_ANON_KEY (local)
├── .env.example             ← Safe-to-commit example of .env
├── index.html               ← Vite root HTML
├── tailwind.config.js       ← Tailwind configuration
├── vite.config.js           ← Vite config (proxy, port, aliases)
└── package.json             ← Dependencies & npm scripts`;

  const qwenNavbarPrompt = `You are a senior frontend developer using React 18 and Tailwind CSS.

Generate the COMPLETE file for: frontend/src/components/Navbar.jsx

Requirements:
- A sticky top navigation bar
- Logo text on the left ("MyApp")
- Navigation links on the right: Home, About, Dashboard
- Use React Router's <Link> component for navigation
- Active link should be highlighted in violet (check using useLocation)
- Mobile hamburger menu that toggles open/closed using useState
- Tailwind CSS only — no custom CSS
- Export the component as default

Import from: react-router-dom (Link, useLocation), lucide-react (Menu, X icons), react (useState)`;

  const qwenPagePrompt = `You are a senior frontend developer using React 18 and Tailwind CSS.

Generate the COMPLETE file for: frontend/src/pages/Home.jsx

Requirements:
- A hero section with: large heading, subtitle, two CTA buttons ("Get Started" links to /dashboard, "Learn More" links to /about)
- A features section with 4 feature cards in a grid (choose relevant feature names)
- A call-to-action banner at the bottom
- Fully responsive (mobile-first)
- Use only Tailwind CSS utility classes
- Colour scheme: violet primary (#7c3aed), slate for neutral text
- No placeholder comments — complete, working JSX
- Export as default function Home()`;

  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    // Proxy /api calls to your Express backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Vibe Coding — Frontend Deep Dive</h2>
        <p className="text-slate-600 leading-relaxed">
          This section expands the <strong>Vibe Coding module</strong> by focusing entirely on the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">frontend/</code> directory. You will use <strong>Qwen AI</strong> to generate each file, then assemble them in VS Code — file by file — following the structure below.
        </p>
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800">
          <strong>The approach:</strong> Define the file you need → write a precise Qwen AI prompt that names the file path, imports, and requirements → copy the output → paste into VS Code → repeat for the next file. Each prompt should generate one complete, working file.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Frontend File Structure — Annotated</h3>
        <p className="text-slate-600 text-sm">Every folder has a single responsibility. When you ask Qwen AI to generate a file, always specify its exact path so the imports are correct.</p>
        <CodeBlock title="frontend/ — complete directory structure" code={frontendStructure} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { folder: 'components/', color: 'border-violet-200 bg-violet-50', text: 'text-violet-700', rule: 'Small, reusable pieces. A component in components/ should NOT contain page-specific logic — it just receives props and renders UI.' },
            { folder: 'pages/',      color: 'border-sky-200 bg-sky-50',       text: 'text-sky-700',     rule: 'One file per route. Pages import components and assemble them into a full view. Pages may contain state and data-fetching logic.' },
            { folder: 'store/',      color: 'border-emerald-200 bg-emerald-50', text: 'text-emerald-700', rule: 'Global state shared across multiple pages (logged-in user, cart, theme). Use Zustand — simpler than Redux.' },
            { folder: 'services/',   color: 'border-amber-200 bg-amber-50',   text: 'text-amber-700',   rule: 'All API calls live here, not in components. Import API functions into pages. This keeps your components clean.' },
          ].map(f => (
            <div key={f.folder} className={`rounded-xl border p-4 ${f.color}`}>
              <code className={`font-mono font-bold text-sm ${f.text}`}>{f.folder}</code>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">{f.rule}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Generating Files with Qwen AI</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          A great Qwen AI prompt has four parts: <strong>(1)</strong> your role, <strong>(2)</strong> the exact file path, <strong>(3)</strong> specific requirements, and <strong>(4)</strong> what to import/export. The more specific you are, the less you need to edit.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 space-y-1">
          <p className="font-bold">Prompt Formula:</p>
          <p className="text-xs font-mono bg-amber-100 rounded p-2">You are a [role]. Generate the COMPLETE file for: [exact/file/path.jsx]. Requirements: [bullet list]. Export as: [export statement].</p>
        </div>

        <h4 className="font-bold text-slate-800">Example: Generating a Navbar Component</h4>
        <CodeBlock title="Qwen AI prompt — Navbar.jsx" code={qwenNavbarPrompt} />

        <h4 className="font-bold text-slate-800">Example: Generating a Full Page</h4>
        <CodeBlock title="Qwen AI prompt — Home.jsx" code={qwenPagePrompt} />

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-slate-800 text-sm">File Assembly Order</h4>
          <p className="text-xs text-slate-600">Generate files in this order to avoid broken imports:</p>
          {[
            { n: 1, file: 'package.json + vite.config.js', why: 'Foundation — defines dependencies and dev server config' },
            { n: 2, file: 'tailwind.config.js + index.css', why: 'Styling setup — must exist before Tailwind classes work' },
            { n: 3, file: 'src/main.jsx',                  why: 'Entry point — mounts App into the DOM' },
            { n: 4, file: 'src/App.jsx',                   why: 'Root component — defines all routes' },
            { n: 5, file: 'src/components/*.jsx',          why: 'Reusable pieces used by pages' },
            { n: 6, file: 'src/pages/*.jsx',               why: 'Full views that import components' },
            { n: 7, file: 'src/store/*.js',                why: 'Global state used across pages' },
            { n: 8, file: 'src/services/*.js',             why: 'API helpers imported by pages' },
          ].map(f => (
            <div key={f.n} className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-violet-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{f.n}</div>
              <div>
                <code className="text-violet-700 font-mono text-xs font-bold">{f.file}</code>
                <p className="text-xs text-slate-500 mt-0.5">{f.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Vite Config — Dev Server & Proxy</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">vite.config.js</code> configures your development server. The most important setting for a full-stack app is the <strong>proxy</strong> — it forwards <code className="bg-slate-100 px-1 rounded text-xs">/api</code> requests to your backend so you don't get CORS errors during local development.
        </p>
        <CodeBlock title="vite.config.js" code={viteConfig} />
      </div>
    </div>
  );
}

function LocalDevSection() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Local Development & Deployment</h2>
        <p className="text-slate-600 leading-relaxed">
          Once your files are assembled in VS Code, you test the app <em>locally</em> before deploying. Local development uses Git Bash and npm to install dependencies and run the Vite dev server. Deployment takes your finished app to the internet via <strong>Netlify</strong> or <strong>Vercel</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {[
            { icon: '🖥️', label: 'Local Testing', sub: 'Git Bash + npm', color: 'bg-slate-700' },
            { icon: '🌐', label: 'Netlify',        sub: 'Drag & drop deploy', color: 'bg-teal-500' },
            { icon: '▲',  label: 'Vercel',         sub: 'GitHub integration', color: 'bg-slate-900' },
          ].map(s => (
            <div key={s.label} className={`flex-1 ${s.color} text-white rounded-xl p-4 flex items-center gap-3`}>
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="font-bold text-sm">{s.label}</div>
                <div className="text-xs opacity-80">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local Testing */}
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-xl"><Monitor className="w-5 h-5 text-slate-700" /></div>
          <h3 className="text-xl font-bold text-slate-900">Testing Locally with Git Bash</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          Before deploying, always run the app on your machine. This catches errors before anyone else sees them. Open <strong>Git Bash</strong> inside your <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">frontend/</code> folder and run these commands in order.
        </p>

        <SetupSteps
          tool="🖥️ Local Dev — Step by Step"
          color={{ header: 'bg-slate-700', border: 'border-slate-200', badge: 'bg-slate-600' }}
          steps={[
            {
              title: 'Open Git Bash in your project folder',
              desc: 'Right-click inside your frontend/ folder in Windows Explorer → "Git Bash Here". Or in VS Code: open a terminal (Ctrl+`) and switch to Git Bash.',
            },
            {
              title: 'Navigate into the frontend folder',
              desc: 'If you opened Git Bash at the root of your project:',
              code: 'cd frontend',
              codeTitle: 'terminal',
            },
            {
              title: 'Install all dependencies',
              desc: 'This reads package.json and downloads every library into node_modules/. Run this once when you first set up the project, and again whenever package.json changes.',
              code: 'npm install',
              codeTitle: 'terminal',
            },
            {
              title: 'Start the development server',
              desc: 'This starts Vite and serves your app at localhost:5000 (or the port in vite.config.js). Changes to your files reload the browser automatically.',
              code: 'npm run dev',
              codeTitle: 'terminal',
            },
            {
              title: 'Open the app in your browser',
              desc: 'Vite will print the local URL — click it or navigate to http://localhost:5000 in your browser.',
            },
            {
              title: 'Fix errors before deploying',
              desc: 'Check the browser console (F12 → Console) and the terminal for errors. Fix import paths, missing files, and Tailwind class typos. Only deploy when the local version works perfectly.',
            },
            {
              title: 'Build for production',
              desc: 'When ready to deploy, create an optimised build. This generates a dist/ folder with minified HTML, CSS, and JS — what Netlify/Vercel will serve.',
              code: 'npm run build',
              codeTitle: 'terminal',
            },
            {
              title: 'Preview the production build locally (optional)',
              desc: 'Serve the dist/ folder locally to check the production build before uploading:',
              code: 'npm run preview',
              codeTitle: 'terminal',
            },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="font-bold text-red-700 text-sm mb-2">Common Errors & Fixes</h4>
            <div className="space-y-2 text-xs text-slate-700">
              {[
                { err: "Cannot find module 'react'",       fix: 'Run npm install — node_modules is missing' },
                { err: 'Port 5000 already in use',         fix: 'Change port in vite.config.js or kill the other process' },
                { err: "Failed to resolve import './Foo'", fix: 'Check the file path — capitalisation matters on Linux' },
                { err: 'Tailwind classes not applying',    fix: 'Check tailwind.config.js content paths include src/**/*.jsx' },
              ].map(e => (
                <div key={e.err} className="space-y-0.5">
                  <code className="text-red-700 font-mono">{e.err}</code>
                  <p className="text-slate-500">→ {e.fix}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <h4 className="font-bold text-emerald-700 text-sm mb-2">Useful npm Commands</h4>
            <div className="space-y-1.5 text-xs font-mono">
              {[
                { cmd: 'npm install',             desc: 'Install all dependencies from package.json' },
                { cmd: 'npm install react-router-dom', desc: 'Add a new package' },
                { cmd: 'npm run dev',             desc: 'Start dev server with hot reload' },
                { cmd: 'npm run build',           desc: 'Build for production → dist/' },
                { cmd: 'npm run preview',         desc: 'Preview the production build' },
                { cmd: 'npm list',                desc: 'See all installed packages' },
              ].map(c => (
                <div key={c.cmd} className="flex gap-2">
                  <code className="text-emerald-700 flex-shrink-0">{c.cmd}</code>
                  <span className="text-slate-500 font-sans">— {c.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deployment */}
      <div className="glass rounded-2xl p-6 shadow-soft space-y-5">
        <h3 className="text-xl font-bold text-slate-900">Deploying to Production</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Both Netlify and Vercel are free hosting platforms built for frontend apps. They detect your framework automatically, run your build command, and publish the <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">dist/</code> folder to a global CDN. Your app is live at a public URL in under 2 minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SetupSteps
            tool="🌐 Netlify — Deploy via GitHub"
            link="https://netlify.com"
            color={{ header: 'bg-teal-500', border: 'border-teal-200', badge: 'bg-teal-500' }}
            steps={[
              { title: 'Push your code to GitHub', desc: 'git add . → git commit -m "Initial frontend" → git push origin main' },
              { title: 'Go to app.netlify.com', desc: 'Sign up for free using your GitHub account' },
              { title: 'Click "Add new site" → "Import an existing project"', desc: 'Connect to GitHub and select your repository' },
              { title: 'Configure build settings', desc: 'Base directory: frontend · Build command: npm run build · Publish directory: frontend/dist' },
              { title: 'Add environment variables', desc: 'Site Settings → Environment Variables → Add VITE_API_URL=https://your-backend.onrender.com and any other VITE_ vars' },
              { title: 'Click "Deploy site"', desc: 'Netlify builds and deploys automatically. Future pushes to main auto-deploy.' },
              { title: 'Custom domain (optional)', desc: 'Domain Management → Add a custom domain and follow the DNS setup steps' },
            ]}
          />

          <SetupSteps
            tool="▲ Vercel — Deploy via GitHub"
            link="https://vercel.com"
            color={{ header: 'bg-slate-800', border: 'border-slate-300', badge: 'bg-slate-700' }}
            steps={[
              { title: 'Push your code to GitHub', desc: 'git add . → git commit -m "Initial frontend" → git push origin main' },
              { title: 'Go to vercel.com', desc: 'Sign up for free using your GitHub account' },
              { title: 'Click "Add New" → "Project"', desc: 'Import your GitHub repository' },
              { title: 'Configure the project', desc: 'Framework Preset: Vite · Root Directory: frontend · Build Command: npm run build · Output Directory: dist' },
              { title: 'Add environment variables', desc: 'Expand "Environment Variables" before deploying — add VITE_API_URL and other VITE_ variables' },
              { title: 'Click "Deploy"', desc: 'Vercel builds and gives you a .vercel.app URL. Every git push to main triggers a new deployment.' },
              { title: 'Custom domain (optional)', desc: 'Project Settings → Domains → Add your domain and update DNS records' },
            ]}
          />
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h4 className="font-bold text-slate-800 text-sm mb-3">Netlify vs. Vercel — Which to Choose?</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[400px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-slate-500 font-semibold">Feature</th>
                  <th className="text-center py-2 text-teal-600 font-semibold">Netlify</th>
                  <th className="text-center py-2 text-slate-700 font-semibold">Vercel</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {[
                  ['Free tier', '✅ Generous', '✅ Generous'],
                  ['React / Vite', '✅ Excellent', '✅ Excellent'],
                  ['Auto-deploy from GitHub', '✅', '✅'],
                  ['Form handling (no backend)', '✅ Built-in', '❌ Manual'],
                  ['Edge functions', '✅', '✅'],
                  ['Best for', 'Static sites + forms', 'React / Next.js apps'],
                ].map(([feat, n, v]) => (
                  <tr key={feat} className="border-b border-slate-100">
                    <td className="py-1.5 font-medium">{feat}</td>
                    <td className="py-1.5 text-center">{n}</td>
                    <td className="py-1.5 text-center">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">For a React + Vite frontend, both are equally excellent. Choose whichever you find easier to navigate.</p>
        </div>
      </div>
    </div>
  );
}

// ── Assignment ────────────────────────────────────────────────────────────────

const AI_TOOLS = ['Qwen AI', 'ChatGPT', 'Gemini'];
const DEPLOY_PLATFORMS = ['Netlify', 'Vercel', 'Cloudflare Pages', 'GitHub Pages'];

function getScore(tool, platform, url, reflection) {
  const validUrl = /^https?:\/\/.{3,}/.test(url.trim());
  const words = reflection.trim().split(/\s+/).filter(Boolean).length;
  let score = 0;
  if (validUrl) score += 4;
  if (tool) score += 2;
  if (platform) score += 1;
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
  const [platform, setPlatform] = useState('');
  const [url, setUrl] = useState('');
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [savedToDb, setSavedToDb] = useState(false);
  const [dbError, setDbError] = useState('');

  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = tool && platform && url.trim() && reflection.trim();

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const { score, total, validUrl } = getScore(tool, platform, url, reflection);
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
          title: `Frontend Development — React App (${tool} · ${platform})`,
          course_id: COURSE_ID,
          score,
          total,
          grade: grade.letter,
          answers: { tool, platform, siteUrl: url.trim(), reflection: reflection.trim() },
        }),
      });
      if (res.ok) setSavedToDb(true);
      else { const d = await res.json(); setDbError(d.message || 'Could not save to database.'); }
    } catch { setDbError('Network error — result not saved to database.'); }
    finally { setSubmitting(false); }
  };

  const handleReset = () => {
    setTool(''); setPlatform(''); setUrl(''); setReflection('');
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
            { label: 'Valid live URL submitted', earned: validUrl ? 4 : 0, max: 4, pass: validUrl },
            { label: 'AI tool declared', earned: tool ? 2 : 0, max: 2, pass: !!tool },
            { label: 'Deploy platform declared', earned: platform ? 1 : 0, max: 1, pass: !!platform },
            { label: 'Reflection submitted', earned: reflection.trim() ? 1 : 0, max: 1, pass: !!reflection.trim() },
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
          <p className="text-sm text-slate-600"><span className="font-medium">AI tool:</span> {tool}</p>
          <p className="text-sm text-slate-600"><span className="font-medium">Platform:</span> {platform}</p>
          <p className="text-sm text-slate-600 flex items-center gap-1">
            <span className="font-medium">Live URL:</span>
            <a href={url} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
              {url} <ExternalLink className="w-3 h-3" />
            </a>
          </p>
          <p className="text-sm text-slate-600"><span className="font-medium">Reflection ({wordCount} words):</span> {reflection}</p>
        </div>

        <button onClick={handleReset} className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md">
          <RotateCcw className="w-4 h-4" /> Resubmit Assignment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-violet-100 rounded-xl"><Trophy className="w-6 h-6 text-violet-600" /></div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Frontend Project Assignment</h2>
            <p className="text-slate-500 text-sm">Build · Test Locally · Deploy · Submit</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <h3 className="font-bold text-slate-800">Assignment Brief</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Use <strong>Qwen AI</strong> (or ChatGPT / Gemini) to vibe-code a <strong>React + Tailwind CSS</strong> frontend app. Test it locally using Git Bash (<code className="bg-slate-100 px-1 rounded">npm install</code> then <code className="bg-slate-100 px-1 rounded">npm run dev</code>). Deploy the app to <strong>Netlify</strong> or <strong>Vercel</strong> and submit the live URL. Your app must have at minimum: a Navbar, a Home page, and one additional page.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { icon: '🤖', label: 'Step 1', desc: 'Use AI to generate each file' },
              { icon: '🔧', label: 'Step 2', desc: 'Assemble in VS Code' },
              { icon: '🖥️', label: 'Step 3', desc: 'Test locally (npm run dev)' },
              { icon: '🌐', label: 'Step 4', desc: 'Deploy to Netlify or Vercel' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-bold text-xs text-slate-700">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
          <h4 className="font-semibold text-violet-800 mb-2 text-sm">Marking Criteria</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: 'Valid live URL submitted', points: '4 pts' },
              { label: 'AI tool declared', points: '2 pts' },
              { label: 'Deploy platform declared', points: '1 pt' },
              { label: 'Reflection submitted', points: '1 pt' },
              { label: 'Reflection is 50+ words', points: '2 pts' },
            ].map(c => (
              <div key={c.label} className="flex justify-between text-xs text-violet-900 bg-white/60 rounded-lg px-3 py-1.5">
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
                tool === t ? 'bg-violet-50 border-violet-400 text-violet-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
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
                platform === p ? 'bg-violet-50 border-violet-400 text-violet-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}>
                <input type="radio" name="platform" value={p} checked={platform === p} onChange={() => setPlatform(p)} className="sr-only" />
                <span className="text-lg">{p === 'Netlify' ? '🌐' : p === 'Vercel' ? '▲' : p === 'Cloudflare Pages' ? '☁️' : '🐙'}</span>
                <span className="text-center">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">3. Paste your live site URL *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://my-react-app.netlify.app"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all"
            />
          </div>
          {url && !/^https?:\/\/.{3,}/.test(url.trim()) && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid URL starting with https://</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            4. Write a reflection (minimum 50 words) *
            <span className={`ml-2 text-xs font-normal ${wordCount >= 50 ? 'text-emerald-600' : 'text-slate-400'}`}>
              {wordCount}/50 words
            </span>
          </label>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            rows={5}
            placeholder="Describe what you built, which pages and components you created, how you used AI to generate code, how you tested it locally, and what you learned about the deployment process."
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className={`w-full flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
            canSubmit && !submitting
              ? 'bg-violet-500 hover:bg-violet-600 hover:shadow-violet-200'
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

export default function LearningModuleFrontend() {
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
      case 'overview':     return <OverviewSection />;
      case 'fundamentals': return <FundamentalsSection />;
      case 'javascript':   return <JavaScriptSection />;
      case 'vibecoding':   return <VibeCodingSection />;
      case 'localdev':     return <LocalDevSection />;
      case 'assignment':   return <AssignmentSection session={session} onComplete={handleAssignmentComplete} />;
      default:             return null;
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
            <span className="text-violet-600 font-medium">Frontend Development</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Frontend Development</h1>
          <p className="text-slate-500 text-sm mt-0.5">Sarah Lee · 6 Weeks · Module 4 of 6</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-violet-500 rounded-full transition-all duration-500" style={{ width: `${liveProgress}%` }} />
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
                isActive ? 'bg-white text-violet-600 shadow-sm'
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
          <button onClick={goNext} className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-violet-200">
            Next: {TABS[currentIndex + 1].label} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
