import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import { API_BASE } from '../services/api';
import {
  BookOpen, Layers, Cpu, Settings, MessageSquare, Trophy,
  CheckCircle2, ArrowLeft, ArrowRight, ChevronRight,
  ExternalLink, Star, Zap, Globe, Code2, Users, RotateCcw,
  MonitorSmartphone, Send
} from 'lucide-react';

const COURSE_ID = 2;

const TABS = [
  { id: 'overview',   label: 'Overview',   icon: BookOpen },
  { id: 'landscape',  label: 'AI Landscape', icon: Layers },
  { id: 'tools',      label: '4 AI Tools', icon: Cpu },
  { id: 'setup',      label: 'Setup Guide', icon: Settings },
  { id: 'prompts',    label: 'Prompts',    icon: MessageSquare },
  { id: 'assignment', label: 'Assignment', icon: Trophy },
];

// ── Infographic Components ──────────────────────────────────────────────────

function AILandscapeOrganigram() {
  const categories = [
    {
      label: 'Cloud AI IDEs',
      subtitle: 'Build & deploy in the browser',
      color: 'bg-sky-500',
      border: 'border-sky-200',
      bg: 'bg-sky-50',
      tools: [
        { name: 'Replit', desc: 'Full-stack agent + cloud IDE', icon: '🔵' },
        { name: 'Bolt.new', desc: 'Instant full-stack from a prompt', icon: '⚡' },
      ],
    },
    {
      label: 'Natural Language Generators',
      subtitle: 'Describe → deployed app',
      color: 'bg-violet-500',
      border: 'border-violet-200',
      bg: 'bg-violet-50',
      tools: [
        { name: 'Lovable', desc: 'Prompt → React + Supabase app', icon: '💜' },
        { name: 'v0 by Vercel', desc: 'Prompt → React UI components', icon: '▲' },
      ],
    },
    {
      label: 'AI Code Assistants',
      subtitle: 'Augments your existing workflow',
      color: 'bg-emerald-500',
      border: 'border-emerald-200',
      bg: 'bg-emerald-50',
      tools: [
        { name: 'GitHub Copilot', desc: 'AI autocomplete in VS Code', icon: '🐙' },
        { name: 'Cursor', desc: 'AI-first code editor', icon: '🖱️' },
      ],
    },
  ];

  return (
    <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
      <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">
        Generative AI Tool Landscape
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(cat => (
          <div key={cat.label} className={`${cat.bg} ${cat.border} border rounded-xl overflow-hidden`}>
            <div className={`${cat.color} text-white px-4 py-2 text-center`}>
              <div className="font-bold text-sm">{cat.label}</div>
              <div className="text-xs opacity-80 mt-0.5">{cat.subtitle}</div>
            </div>
            <div className="p-3 space-y-2">
              {cat.tools.map(t => (
                <div key={t.name} className="bg-white rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm">
                  <span className="text-lg">{t.icon}</span>
                  <div>
                    <div className="font-bold text-slate-800 text-xs">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 text-center">
        <strong>This module focuses on:</strong> Replit · Lovable · GitHub Copilot · Bolt.new — the 4 most accessible tools for students
      </div>
    </div>
  );
}

function ToolComparisonTable() {
  const tools = [
    { name: 'Replit', icon: '🔵', bestFor: 'Full-stack web & learning', cost: 'Free + Pro $20/mo', setup: '⭐⭐⭐⭐⭐', aiPower: '⭐⭐⭐⭐⭐', collab: '✅', deploy: '✅' },
    { name: 'Lovable', icon: '💜', bestFor: 'React apps with database', cost: 'Free + Pro $25/mo', setup: '⭐⭐⭐⭐⭐', aiPower: '⭐⭐⭐⭐', collab: '✅', deploy: '✅' },
    { name: 'Copilot', icon: '🐙', bestFor: 'Coding in your own editor', cost: 'Free for students', setup: '⭐⭐⭐⭐', aiPower: '⭐⭐⭐⭐', collab: '❌', deploy: '❌' },
    { name: 'Bolt.new', icon: '⚡', bestFor: 'Rapid prototyping', cost: 'Free + Pro $20/mo', setup: '⭐⭐⭐⭐⭐', aiPower: '⭐⭐⭐⭐', collab: '❌', deploy: '✅' },
  ];

  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="px-4 py-3 text-left font-semibold">Tool</th>
            <th className="px-4 py-3 text-left font-semibold">Best For</th>
            <th className="px-4 py-3 text-left font-semibold">Cost</th>
            <th className="px-4 py-3 text-center font-semibold">Ease of Setup</th>
            <th className="px-4 py-3 text-center font-semibold">AI Power</th>
            <th className="px-4 py-3 text-center font-semibold">Collab</th>
            <th className="px-4 py-3 text-center font-semibold">Deploy</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((t, i) => (
            <tr key={t.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-4 py-3 font-bold text-slate-800">{t.icon} {t.name}</td>
              <td className="px-4 py-3 text-slate-600">{t.bestFor}</td>
              <td className="px-4 py-3 text-slate-600">{t.cost}</td>
              <td className="px-4 py-3 text-center">{t.setup}</td>
              <td className="px-4 py-3 text-center">{t.aiPower}</td>
              <td className="px-4 py-3 text-center">{t.collab}</td>
              <td className="px-4 py-3 text-center">{t.deploy}</td>
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

// ── Sections ─────────────────────────────────────────────────────────────────

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">AI Tools for Software Development</h2>
        <p className="text-slate-600 leading-relaxed">
          Generative AI has fundamentally changed how software is built. Tools like Replit, Lovable, GitHub Copilot, and Bolt let you describe what you want to build in plain English and receive working code instantly. This is often called <strong>"vibe coding"</strong> — you focus on the idea, and AI handles the implementation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {[
            { icon: '⚡', title: 'Speed', desc: 'Launch a full-stack web app in minutes instead of days. AI writes boilerplate, sets up routing, styling, and database connections instantly.' },
            { icon: '🌍', title: 'Accessibility', desc: 'You no longer need 5 years of coding experience to build and deploy real software. AI handles syntax so you can focus on ideas.' },
            { icon: '🔄', title: 'Rapid Prototyping', desc: 'Test 10 ideas in the time it used to take to build 1. AI tools make it cheap to experiment and iterate quickly.' },
            { icon: '📚', title: 'Learning Accelerator', desc: 'AI-generated code is a great study tool. Read the output, understand the patterns, and learn by doing rather than watching tutorials.' },
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
        <h3 className="text-xl font-bold text-slate-800">Traditional Coding vs. AI-Assisted Development</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="font-bold text-red-700 mb-3">Traditional Approach</h4>
            <ul className="space-y-2">
              {[
                'Write every line of code manually',
                'Learn a framework for weeks before building',
                'Set up environment, packages, configs separately',
                'Debug syntax errors character by character',
                'Deploy requires DevOps knowledge',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-red-400 mt-0.5">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <h4 className="font-bold text-emerald-700 mb-3">AI-Assisted Approach</h4>
            <ul className="space-y-2">
              {[
                'Describe what you want in plain English',
                'Working app scaffold generated in seconds',
                'Packages, configs, routing set up automatically',
                'AI explains and fixes errors on request',
                'One-click deployment built in',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-emerald-500 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-sky-800">
          <strong>Important:</strong> AI tools don't replace understanding — they accelerate it. The best developers use AI as a superpower, not a shortcut. You still need to read, understand, and iterate on the code the AI produces.
        </div>
      </div>
    </div>
  );
}

function LandscapeSection() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">The AI Development Tool Landscape</h2>
        <p className="text-slate-600 leading-relaxed">
          There are hundreds of AI coding tools, but they fall into three main categories based on how you interact with them and what they produce. Understanding where each tool fits helps you choose the right one for any given task.
        </p>
        <AILandscapeOrganigram />

        <h3 className="font-bold text-slate-800 text-lg">Side-by-Side Comparison</h3>
        <ToolComparisonTable />

        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800">
          <strong>Choosing the right tool:</strong> For beginners and students, <strong>Replit</strong> and <strong>Bolt.new</strong> are the fastest to get started — no installation needed. GitHub Copilot is best once you're comfortable writing some code yourself. Lovable shines for building React + database apps without touching a terminal.
        </div>
      </div>
    </div>
  );
}

function ToolsSection() {
  const tools = [
    {
      name: 'Replit', icon: '🔵', color: 'border-sky-300 bg-sky-50',
      headerColor: 'bg-sky-500', tagline: 'Build, run, and deploy full-stack apps in the cloud',
      what: 'Replit is a cloud-based IDE (Integrated Development Environment) with a built-in AI agent called Replit Agent. You describe what you want to build, and the agent writes code, installs packages, sets up the database, and deploys — all in your browser.',
      features: ['Full Linux environment in the browser', 'Replit Agent understands multi-step prompts', 'Built-in PostgreSQL, key-value store, and object storage', 'One-click deployment to replit.app domain', 'Real-time collaboration with teammates', 'Supports 50+ programming languages'],
      useCase: 'Perfect for: Building full-stack web apps, learning to code, hosting projects, collaborating in real time.',
    },
    {
      name: 'Lovable', icon: '💜', color: 'border-violet-300 bg-violet-50',
      headerColor: 'bg-violet-500', tagline: 'Turn your ideas into production-ready React apps',
      what: 'Lovable (lovable.dev) generates complete React + TypeScript applications from natural language descriptions. It auto-connects to Supabase for your database and authentication, and deploys your app with a single click. No code editor required — everything runs in the browser.',
      features: ['Generates React + TypeScript + Tailwind CSS automatically', 'Auto-provisions Supabase database and auth', 'Real-time preview as you chat with the AI', 'GitHub sync — exports clean code you can take anywhere', 'Custom domain support', 'Design-aware: understands Figma-style visual descriptions'],
      useCase: 'Perfect for: SaaS apps, dashboards, landing pages, portfolio sites, any app needing auth + database.',
    },
    {
      name: 'GitHub Copilot', icon: '🐙', color: 'border-emerald-300 bg-emerald-50',
      headerColor: 'bg-emerald-600', tagline: 'AI pair programmer that lives inside VS Code',
      what: 'GitHub Copilot is an AI extension for VS Code (and other editors) that autocompletes code as you type, generates functions from comments, explains code, and fixes bugs. Unlike Replit or Lovable, Copilot works inside your existing development environment rather than replacing it.',
      features: ['Inline code suggestions as you type', 'GitHub Copilot Chat: ask questions about your code', 'Generates unit tests automatically', 'Explains unfamiliar code in plain English', 'Free for students via GitHub Education', 'Works with any language: Python, JS, Java, C++, and more'],
      useCase: 'Perfect for: Students already learning to code who want AI assistance inside their workflow.',
    },
    {
      name: 'Bolt.new', icon: '⚡', color: 'border-amber-300 bg-amber-50',
      headerColor: 'bg-amber-500', tagline: 'Full-stack apps from a single prompt, instantly',
      what: 'Bolt.new (by StackBlitz) runs a complete Node.js environment directly in your browser using WebContainers technology. Type a prompt, and Bolt generates a full-stack application you can see running in seconds. It supports React, Vue, Svelte, Next.js, and more.',
      features: ['Full Node.js in the browser — no downloads needed', 'Installs npm packages automatically', 'Supports React, Vue, Next.js, SvelteKit, Remix', 'Integrated terminal and file explorer', 'Export to GitHub or download as ZIP', 'Deploy to Netlify or Cloudflare in one click'],
      useCase: 'Perfect for: Rapid prototyping, UI mockups, exploring new frameworks, no-setup demos.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft">
        <h2 className="text-2xl font-black text-slate-900 mb-2">The 4 AI Tools — Deep Dive</h2>
        <p className="text-slate-600 text-sm">Understand what each tool does, its strengths, and when to use it.</p>
      </div>
      {tools.map(tool => (
        <div key={tool.name} className={`glass rounded-2xl overflow-hidden shadow-soft border ${tool.color}`}>
          <div className={`${tool.headerColor} text-white px-6 py-4`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{tool.icon}</span>
              <div>
                <h3 className="text-xl font-black">{tool.name}</h3>
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
            <div className="bg-white/60 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-600">
              <strong className="text-slate-800">📌 Use Case:</strong> {tool.useCase}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SetupSection() {
  const setupData = [
    {
      tool: '🔵 Replit — Setup Guide',
      link: 'https://replit.com',
      color: { header: 'bg-sky-500', border: 'border-sky-200', badge: 'bg-sky-500' },
      steps: [
        { title: 'Go to replit.com', desc: 'Open your browser and navigate to replit.com' },
        { title: 'Click "Sign Up"', desc: 'Use your Google, GitHub, or email address to create a free account' },
        { title: 'Verify your email', desc: 'Check your inbox and click the verification link' },
        { title: 'Click "+ Create Repl"', desc: 'On your dashboard, click the blue Create button in the top left' },
        { title: 'Choose "Use Agent"', desc: 'Instead of selecting a template, click "Use Agent" to start with AI' },
        { title: 'Type your prompt', desc: 'Describe your app: "Build me a personal portfolio website with React and Tailwind CSS"' },
        { title: 'Wait for Agent to build', desc: 'Replit Agent will install packages, write code, and run your app automatically (~2–3 minutes)' },
        { title: 'Click "Deploy"', desc: 'When satisfied, click Deploy → Autoscale to publish your app at a .replit.app URL' },
      ],
    },
    {
      tool: '💜 Lovable — Setup Guide',
      link: 'https://lovable.dev',
      color: { header: 'bg-violet-500', border: 'border-violet-200', badge: 'bg-violet-500' },
      steps: [
        { title: 'Go to lovable.dev', desc: 'Navigate to lovable.dev in your browser' },
        { title: 'Click "Start Building for Free"', desc: 'Lovable offers a free tier with limited generations per month' },
        { title: 'Sign in with GitHub', desc: 'Connect your GitHub account — Lovable will sync your project code automatically' },
        { title: 'Click "+ New Project"', desc: 'On the dashboard, start a new project from a blank canvas' },
        { title: 'Enter your first prompt', desc: 'Type: "Create a personal portfolio website with a hero section, about me, skills, and project cards"' },
        { title: 'Review the live preview', desc: 'See your app appear on the right side as Lovable builds it in real time' },
        { title: 'Iterate with more prompts', desc: 'Refine by typing: "Change the hero section color to navy blue" or "Add a contact form"' },
        { title: 'Publish', desc: 'Click Share → Publish to get a lovable.app public URL for your portfolio' },
      ],
    },
    {
      tool: '🐙 GitHub Copilot — Setup Guide',
      link: 'https://github.com/features/copilot',
      color: { header: 'bg-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-600' },
      steps: [
        { title: 'Create a GitHub account', desc: 'Go to github.com and sign up for free if you don\'t have an account' },
        { title: 'Apply for GitHub Education (Students)', desc: 'Visit education.github.com/students — verify with your student email to get Copilot free' },
        { title: 'Install VS Code', desc: 'Download Visual Studio Code from code.visualstudio.com — it\'s free and available on all platforms' },
        { title: 'Install the GitHub Copilot extension', desc: 'In VS Code, go to Extensions (Ctrl+Shift+X), search "GitHub Copilot", click Install' },
        { title: 'Sign in to GitHub in VS Code', desc: 'Click the GitHub icon in the bottom left, click Sign In, and authorise with your GitHub account' },
        { title: 'Enable Copilot Chat', desc: 'Also install the "GitHub Copilot Chat" extension for conversational AI help' },
        { title: 'Start a new project', desc: 'Open a folder in VS Code (File → Open Folder) and create an index.html file' },
        { title: 'Use Copilot to build', desc: 'Type a comment like "// Create a personal portfolio page with header, about, and projects section" and press Tab to accept suggestions' },
      ],
    },
    {
      tool: '⚡ Bolt.new — Setup Guide',
      link: 'https://bolt.new',
      color: { header: 'bg-amber-500', border: 'border-amber-200', badge: 'bg-amber-500' },
      steps: [
        { title: 'Go to bolt.new', desc: 'Navigate to bolt.new in your browser — no download or installation needed' },
        { title: 'Sign in', desc: 'Click Sign In and use your GitHub account or email address to create a free account' },
        { title: 'Choose a starter (optional)', desc: 'Select a template like "React + Vite" or just start from blank' },
        { title: 'Type your prompt in the chat box', desc: '"Build a personal portfolio website with React, Tailwind CSS, a hero section, skills list, and project showcase"' },
        { title: 'Watch Bolt build instantly', desc: 'Bolt installs dependencies and shows a live preview of your running app in under 30 seconds' },
        { title: 'Iterate in the chat', desc: 'Type "Add a dark mode toggle" or "Make the navigation sticky" to refine your portfolio' },
        { title: 'Connect to GitHub', desc: 'Click the GitHub button to push your code to a repository for version control' },
        { title: 'Deploy to Netlify', desc: 'Click Deploy → Netlify to publish your portfolio live with a public URL' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Step-by-Step Setup Guide</h2>
        <p className="text-slate-600 text-sm">Follow these steps exactly to set up an account and start building with each tool. You only need to set up <strong>one</strong> tool for the assignment.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {setupData.map(s => <SetupSteps key={s.tool} {...s} />)}
      </div>
    </div>
  );
}

function PromptsSection() {
  const prompts = [
    {
      tool: 'Replit Agent',
      icon: '🔵',
      color: 'border-sky-200 bg-sky-50',
      prompt: `Build me a personal portfolio website using React and Tailwind CSS. 

Include:
- A sticky navigation bar with my name and links to sections
- A hero section with my name, role ("Full Stack Developer"), a short bio, and two buttons: "View My Work" and "Contact Me"
- An "About Me" section with a photo placeholder and 3-4 sentences about me
- A "Skills" section showing tech icons in a grid: HTML, CSS, JavaScript, React, Node.js, Git
- A "Projects" section with 3 project cards, each with a title, description, tech stack tags, and a "View Project" link
- A "Contact" section with a working email form
- A footer with social media links (GitHub, LinkedIn, Twitter)

Make it look professional with a dark navy blue colour scheme and clean typography.`,
    },
    {
      tool: 'Lovable',
      icon: '💜',
      color: 'border-violet-200 bg-violet-50',
      prompt: `Create a modern personal portfolio website for a software development student.

Design requirements:
- Clean, minimalist design with a white background and sky blue accent colour
- Smooth scroll animations between sections
- Mobile-responsive layout

Pages/Sections:
1. Hero: Large heading "Hi, I'm [Name]", subtitle "Aspiring Full Stack Developer", animated typing effect, CTA button
2. About: Short bio paragraph, a stats row showing years learning, projects built, courses completed
3. Tech Stack: Grid of skill badges for JavaScript, React, Python, Git, VS Code, Tailwind
4. Projects: 3 cards with image placeholder, title, description, GitHub link button, and live demo button
5. Contact: Simple form (name, email, message) with submit button

Colour palette: White, Sky Blue (#0ea5e9), Slate (#1e293b)`,
    },
    {
      tool: 'GitHub Copilot',
      icon: '🐙',
      color: 'border-emerald-200 bg-emerald-50',
      prompt: `/* 
  Personal Portfolio Website
  
  Requirements:
  - Single page application using HTML, CSS, and vanilla JavaScript
  - Sections: Header/Nav, Hero, About, Skills, Projects, Contact, Footer
  - Responsive design using CSS Grid and Flexbox
  - Smooth scrolling navigation
  - Mobile hamburger menu
  - Skills displayed as animated progress bars
  - Project cards with hover effects
  - Contact form with basic validation
  - Social media links in footer
  
  Colour scheme:
  - Primary: #0f172a (slate-900)
  - Accent: #0ea5e9 (sky-500)
  - Background: #f8fafc (slate-50)
  
  Create the complete HTML structure first, then the CSS, then JavaScript.
*/`,
    },
    {
      tool: 'Bolt.new',
      icon: '⚡',
      color: 'border-amber-200 bg-amber-50',
      prompt: `Build a personal portfolio website using React, Vite, and Tailwind CSS.

Features I need:
- Responsive single-page design
- Dark/light mode toggle
- Animated hero section with gradient text
- About section with a profile image placeholder and bio
- Skills section with category filters (Frontend, Backend, Tools)
- Projects section with a search/filter bar and project cards showing: title, description, tags, GitHub link, live demo link
- Timeline component showing my education/experience
- Contact form integrated with EmailJS (show placeholder for API key)
- Smooth page transitions using Framer Motion

Tech stack: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React icons

Make it portfolio-worthy — something I'd actually be proud to show employers.`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-3">
        <h2 className="text-2xl font-black text-slate-900">Portfolio Prompts — Copy & Use</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          These are <strong>verified prompts</strong> you can copy directly into each AI tool to generate a personal portfolio. They are deliberately detailed — the more specific your prompt, the better the output. Modify the name, colour scheme, and project descriptions to make it yours.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Prompt Writing Tips:</strong> Be specific about colours, layout, and features. Include examples ("like Stripe's homepage"). Iterate — don't expect perfection in one prompt. Ask the AI to fix specific things: "Make the hero section taller" or "The nav isn't sticky on mobile".
        </div>
      </div>

      {prompts.map(p => (
        <div key={p.tool} className={`rounded-2xl border p-5 shadow-soft ${p.color}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{p.icon}</span>
            <h3 className="font-bold text-slate-800">{p.tool} — Portfolio Prompt</h3>
          </div>
          <CodeBlock title={`Prompt for ${p.tool}`} code={p.prompt} />
        </div>
      ))}
    </div>
  );
}

// ── Assignment Submission ────────────────────────────────────────────────────

const TOOLS = ['Replit', 'Lovable', 'GitHub Copilot', 'Bolt.new'];

function getScore(tool, url, reflection) {
  let score = 0;
  const trimmedUrl = url.trim();
  const trimmedReflection = reflection.trim();
  const validUrl = /^https?:\/\/.{3,}/.test(trimmedUrl);

  if (validUrl) score += 5;
  if (tool) score += 2;
  if (trimmedReflection.length > 0) score += 1;
  if (trimmedReflection.split(/\s+/).filter(Boolean).length >= 50) score += 2;

  return { score, total: 10, validUrl };
}

function getGrade(score) {
  if (score >= 9) return { letter: 'A', label: 'Outstanding!', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
  if (score >= 7) return { letter: 'B', label: 'Great Work!', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' };
  if (score >= 5) return { letter: 'C', label: 'Good Effort!', color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200' };
  if (score >= 3) return { letter: 'D', label: 'Needs Improvement', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' };
  return { letter: 'F', label: 'Please Resubmit', color: 'text-red-600', bg: 'bg-red-50 border-red-200' };
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
          title: `AI Tools — Personal Portfolio Project (${tool})`,
          course_id: COURSE_ID,
          score,
          total,
          grade: grade.letter,
          answers: { tool, portfolioUrl: url.trim(), reflection: reflection.trim() },
        }),
      });
      if (res.ok) setSavedToDb(true);
      else {
        const d = await res.json();
        setDbError(d.message || 'Could not save to database.');
      }
    } catch {
      setDbError('Network error — result not saved to database.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setTool(''); setUrl(''); setReflection('');
    setSubmitted(false); setResult(null);
    setSavedToDb(false); setDbError('');
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
            { label: 'Valid URL submitted', earned: validUrl ? 5 : 0, max: 5, pass: validUrl },
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
              <span className={`font-bold text-sm ${row.pass ? 'text-emerald-600' : 'text-slate-400'}`}>
                {row.earned}/{row.max}
              </span>
            </div>
          ))}
          <div className="border-t border-slate-200 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className={grade.color}>{score}/10</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 shadow-soft space-y-2">
          <h4 className="font-bold text-slate-800">Your Submission</h4>
          <p className="text-sm text-slate-600"><span className="font-medium">Tool used:</span> {tool}</p>
          <p className="text-sm text-slate-600 flex items-center gap-1">
            <span className="font-medium">Portfolio URL:</span>
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
          <div className="p-3 bg-sky-100 rounded-xl"><Trophy className="w-6 h-6 text-sky-600" /></div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Portfolio Project Assignment</h2>
            <p className="text-slate-500 text-sm">Build · Publish · Submit</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <h3 className="font-bold text-slate-800">Assignment Brief</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Use <strong>one of the four AI tools</strong> from this module to build and publish a personal portfolio website. Your portfolio should include at minimum: a hero section with your name, an about section, a skills section, and a projects section. Publish it to a public URL and submit the link below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { icon: '🛠️', label: 'Step 1', desc: 'Pick a tool (Replit, Lovable, Copilot, or Bolt)' },
              { icon: '🚀', label: 'Step 2', desc: 'Build your portfolio using the example prompt' },
              { icon: '🌐', label: 'Step 3', desc: 'Publish it and copy the live URL' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-bold text-xs text-slate-700">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
          <h4 className="font-semibold text-sky-800 mb-2 text-sm">Marking Criteria</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: 'Valid portfolio URL submitted', points: '5 pts' },
              { label: 'AI tool selected', points: '2 pts' },
              { label: 'Reflection submitted', points: '1 pt' },
              { label: 'Reflection is 50+ words', points: '2 pts' },
            ].map(c => (
              <div key={c.label} className="flex justify-between text-xs text-sky-900 bg-white/60 rounded-lg px-3 py-1.5">
                <span>{c.label}</span><span className="font-bold">{c.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="glass rounded-2xl p-6 shadow-soft space-y-5">
        <h3 className="font-bold text-slate-800 text-lg">Submit Your Work</h3>

        {/* Tool selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">1. Which AI tool did you use? *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {TOOLS.map(t => (
              <label key={t} className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                tool === t ? 'bg-sky-50 border-sky-400 text-sky-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}>
                <input type="radio" name="tool" value={t} checked={tool === t}
                  onChange={() => setTool(t)} className="sr-only" />
                <span className="text-xl">{t === 'Replit' ? '🔵' : t === 'Lovable' ? '💜' : t === 'GitHub Copilot' ? '🐙' : '⚡'}</span>
                {t}
              </label>
            ))}
          </div>
        </div>

        {/* URL input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            2. Paste your published portfolio URL *
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://your-portfolio.replit.app"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
            />
          </div>
          {url && !/^https?:\/\/.{3,}/.test(url.trim()) && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid URL starting with https://</p>
          )}
        </div>

        {/* Reflection */}
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
            placeholder="Describe what you built, which tool you chose and why, what challenges you faced, and what you learned during this assignment. What would you do differently next time?"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className={`w-full flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
            canSubmit && !submitting
              ? 'bg-sky-500 hover:bg-sky-600 hover:shadow-sky-200'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          {submitting ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Assignment</>}
        </button>

        {!canSubmit && (
          <p className="text-xs text-center text-slate-400">
            Complete all fields above to enable submission
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function LearningModuleAI() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const { visitSection, setProgress } = useCourseStore();

  const courseData = useCourseStore(state => state.courses.find(c => c.id === COURSE_ID));
  const liveProgress = courseData?.progress ?? 40;
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
      case 'overview':    return <OverviewSection />;
      case 'landscape':   return <LandscapeSection />;
      case 'tools':       return <ToolsSection />;
      case 'setup':       return <SetupSection />;
      case 'prompts':     return <PromptsSection />;
      case 'assignment':  return <AssignmentSection session={session} onComplete={handleAssignmentComplete} />;
      default:            return null;
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
            <span className="text-sky-600 font-medium">AI Tools for Software Development</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">AI Tools for Software Development</h1>
          <p className="text-slate-500 text-sm mt-0.5">Jane Doe · 3 Weeks · Module 2 of 6</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-sky-500 rounded-full transition-all duration-500" style={{ width: `${liveProgress}%` }} />
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
                isActive ? 'bg-white text-sky-600 shadow-sm'
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
          <button onClick={goNext} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-sky-200">
            Next: {TABS[currentIndex + 1].label} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
