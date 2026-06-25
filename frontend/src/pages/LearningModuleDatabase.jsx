import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import { API_BASE } from '../services/api';
import {
  BookOpen, Database, Code2, Globe, Layers, Trophy,
  CheckCircle2, ArrowLeft, ArrowRight, ChevronRight,
  ExternalLink, RotateCcw, Send
} from 'lucide-react';

const COURSE_ID = 6;

const TABS = [
  { id: 'overview',   label: 'Overview',        icon: BookOpen  },
  { id: 'setup',      label: 'Supabase Setup',  icon: Database  },
  { id: 'crud',       label: 'CRUD Operations', icon: Code2     },
  { id: 'others',     label: 'Other Databases', icon: Globe     },
  { id: 'vibecoding', label: 'Vibe Coding',     icon: Layers    },
  { id: 'assignment', label: 'Assignment',      icon: Trophy    },
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
  const flowSteps = [
    { icon: '📝', label: 'Create',  sub: 'INSERT new records',    color: 'bg-indigo-500'  },
    { icon: '🔍', label: 'Read',    sub: 'SELECT & query data',   color: 'bg-sky-500'     },
    { icon: '✏️', label: 'Update',  sub: 'UPDATE existing rows',  color: 'bg-amber-500'   },
    { icon: '🗑️', label: 'Delete',  sub: 'DELETE rows safely',    color: 'bg-rose-500'    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Databases — Storing Data That Persists</h2>
        <p className="text-slate-600 leading-relaxed">
          A database is where your application's data lives permanently. Without one, every page reload loses everything — no users, no posts, no orders. A database stores, organises, and retrieves data efficiently, whether your app has 10 users or 10 million.
        </p>
        <p className="text-slate-600 leading-relaxed">
          This module builds directly on the Supabase section of the Backend module. You will master all four <strong>CRUD</strong> operations (Create, Read, Update, Delete) with real examples using <strong>Supabase</strong> (PostgreSQL), understand when to use other database services like <strong>MongoDB</strong> and <strong>Firebase</strong>, and vibe-code a complete CRUD application using Qwen AI.
        </p>

        <div className="my-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <h4 className="text-center font-bold text-slate-700 mb-6 text-sm uppercase tracking-wider">The Four Database Operations — CRUD</h4>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            {flowSteps.map((s, i) => (
              <div key={s.label} className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className={`${s.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md`}>{s.icon}</div>
                  <div className="font-bold text-slate-800 text-sm mt-2 text-center">{s.label}</div>
                  <div className="text-slate-500 text-xs text-center max-w-[90px] mt-0.5">{s.sub}</div>
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
            { icon: '🗃️', title: 'Relational (SQL)',  desc: 'Data stored in tables with rows and columns. Tables link to each other with foreign keys. Examples: PostgreSQL (Supabase), MySQL, SQLite. Best for structured data with clear relationships.' },
            { icon: '📦', title: 'NoSQL / Document',  desc: 'Data stored as flexible JSON-like documents. No fixed schema — each record can have different fields. Examples: MongoDB, Firebase Firestore. Best for fast iteration and variable data shapes.' },
            { icon: '⚡', title: 'Realtime Databases', desc: 'Push updates to connected clients instantly — no polling. Examples: Firebase Realtime DB, Supabase Realtime. Best for chat apps, live dashboards, and collaborative tools.' },
            { icon: '☁️', title: 'Cloud Managed',     desc: 'The provider handles backups, scaling, and maintenance. You just connect and query. All modern database services (Supabase, MongoDB Atlas, Firebase) are cloud-managed.' },
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
            { step: '01', title: 'Master CRUD',         desc: 'Deep-dive into Create, Read, Update, and Delete with practical Supabase examples and SQL fundamentals.' },
            { step: '02', title: 'Explore the Landscape', desc: 'Understand MongoDB, Firebase, Neon, and PlanetScale — when to use each and how they compare to Supabase.' },
            { step: '03', title: 'Vibe Code a CRUD App', desc: 'Use Qwen AI to generate a full CRUD application backed by a Supabase database and deploy it live.' },
          ].map(s => (
            <div key={s.step} className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <div className="text-3xl font-black text-indigo-200 mb-2">{s.step}</div>
              <h4 className="font-bold text-indigo-800 mb-1 text-sm">{s.title}</h4>
              <p className="text-xs text-indigo-700 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-sky-800">
          <strong>Module Stack:</strong> Supabase (PostgreSQL) · SQL · Supabase JS SDK · MongoDB Atlas · Firebase Firestore · Qwen AI · Render / Netlify
        </div>
      </div>
    </div>
  );
}

function SetupSection() {
  const createTableSQL = `-- ── Step 3: Create tables in the SQL Editor ─────────────

-- A simple "tasks" table for a to-do app
CREATE TABLE tasks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  completed   BOOLEAN DEFAULT FALSE,
  priority    TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  due_date    DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- A "categories" table (linked to tasks)
CREATE TABLE categories (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL UNIQUE,
  colour     TEXT DEFAULT '#6366f1'
);

-- Link tasks to categories (many-to-many)
CREATE TABLE task_categories (
  task_id     UUID REFERENCES tasks(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, category_id)
);`;

  const rlsSQL = `-- ── Step 4: Enable Row Level Security (RLS) ──────────────
-- RLS ensures users can only access their OWN rows

-- Enable RLS on the tasks table
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy: users can SELECT only their own tasks
CREATE POLICY "Users can view their own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: users can INSERT only for themselves
CREATE POLICY "Users can insert their own tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: users can UPDATE only their own tasks
CREATE POLICY "Users can update their own tasks"
  ON tasks FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: users can DELETE only their own tasks
CREATE POLICY "Users can delete their own tasks"
  ON tasks FOR DELETE
  USING (auth.uid() = user_id);

-- NOTE: When using the SERVICE_ROLE_KEY on your backend,
-- RLS is bypassed — you have full admin access.
-- RLS only applies to requests using the ANON key.`;

  const clientSetup = `// ── Frontend Supabase client (anon key) ─────────────────
// frontend/src/lib/supabase.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── Backend Supabase client (service role key) ───────────
// backend/src/lib/supabase.js

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY   // bypasses RLS
);`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Supabase Setup — Complete Guide</h2>
        <p className="text-slate-600 leading-relaxed">
          Supabase gives you a full <strong>PostgreSQL database</strong>, auto-generated REST and GraphQL APIs, Auth, Storage, and Realtime — all from a single project. Setup takes about 5 minutes. Follow these steps in order.
        </p>

        {/* Step-by-step visual guide */}
        <div className="space-y-4">
          {[
            {
              n: '01', title: 'Create a Supabase account & project',
              color: { badge: 'bg-indigo-500', border: 'border-indigo-200', bg: 'bg-indigo-50' },
              steps: [
                'Go to supabase.com and sign up with GitHub (recommended) or email.',
                'Click "New Project" and give it a name (e.g. my-crud-app).',
                'Choose a region closest to your users (e.g. East US, Europe West).',
                'Set a strong database password — save it somewhere safe, you will need it occasionally.',
                'Click "Create new project". Supabase provisions your database in ~1 minute.',
              ],
            },
            {
              n: '02', title: 'Copy your API keys',
              color: { badge: 'bg-sky-500', border: 'border-sky-200', bg: 'bg-sky-50' },
              steps: [
                'In your Supabase project, go to Settings (gear icon) → API.',
                'Copy "Project URL" → this is your SUPABASE_URL.',
                'Copy "anon public" key → this is your VITE_SUPABASE_ANON_KEY (frontend).',
                'Copy "service_role" key → this is your SUPABASE_SERVICE_ROLE_KEY (backend only — never expose to browser).',
                'Add these to your .env file (frontend) and backend .env file.',
              ],
            },
            {
              n: '03', title: 'Create tables in the SQL Editor',
              color: { badge: 'bg-emerald-500', border: 'border-emerald-200', bg: 'bg-emerald-50' },
              steps: [
                'In Supabase, click "SQL Editor" in the left sidebar.',
                'Click "New query" and paste your CREATE TABLE statements.',
                'Click "Run" (Ctrl+Enter) to execute.',
                'Check Table Editor to confirm your tables appeared.',
                'You can also create tables visually using the Table Editor UI — click "New table".',
              ],
            },
            {
              n: '04', title: 'Set up Row Level Security (RLS)',
              color: { badge: 'bg-amber-500', border: 'border-amber-200', bg: 'bg-amber-50' },
              steps: [
                'RLS ensures users can only read and write their own data.',
                'In Table Editor, click your table → "RLS" tab → Enable RLS.',
                'Create policies for SELECT, INSERT, UPDATE, DELETE using auth.uid() = user_id.',
                'Test by logging in as different users and confirming data is isolated.',
                'Skip RLS if using only the service_role key on your backend (it bypasses RLS anyway).',
              ],
            },
            {
              n: '05', title: 'Install the Supabase SDK',
              color: { badge: 'bg-violet-500', border: 'border-violet-200', bg: 'bg-violet-50' },
              steps: [
                'In your project terminal: npm install @supabase/supabase-js',
                'Create src/lib/supabase.js and initialise the client (see code below).',
                'Import { supabase } wherever you need to query the database.',
              ],
            },
          ].map(section => (
            <div key={section.n} className={`rounded-2xl border p-5 ${section.color.border} ${section.color.bg}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full ${section.color.badge} text-white text-sm font-black flex items-center justify-center flex-shrink-0`}>{section.n}</div>
                <h3 className="font-bold text-slate-800">{section.title}</h3>
              </div>
              <ul className="space-y-1.5">
                {section.steps.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <CodeBlock title="SQL — create tables with relationships" code={createTableSQL} />
        <CodeBlock title="SQL — Row Level Security policies" code={rlsSQL} />
        <CodeBlock title="supabase.js — frontend & backend client setup" code={clientSetup} />

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-800">
          <strong>Dashboard shortcuts:</strong> Use <strong>Table Editor</strong> for a visual spreadsheet view of your data. Use <strong>SQL Editor</strong> for complex queries and schema changes. Use <strong>Auth</strong> to see registered users. Use <strong>Logs</strong> to debug slow or failing queries.
        </div>
      </div>
    </div>
  );
}

function CrudSection() {
  const practicalSchema = `-- Practical example: a "products" table for a store app
CREATE TABLE products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  price       NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  stock       INTEGER DEFAULT 0,
  category    TEXT,
  image_url   TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed some sample data
INSERT INTO products (name, description, price, stock, category) VALUES
  ('React Hoodie',   'Comfortable developer hoodie', 39.99, 50, 'Apparel'),
  ('Mechanical Keyboard', 'Tactile switches, RGB',   89.99, 20, 'Hardware'),
  ('TypeScript Course',   'Advanced TypeScript',     29.99, 999, 'Digital');`;

  const createExamples = `// ── CREATE — INSERT a new row ────────────────────────────
import { supabase } from '../lib/supabase.js';

// Insert a single product
async function createProduct(productData) {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name:        productData.name,
      description: productData.description,
      price:       productData.price,
      stock:       productData.stock,
      category:    productData.category,
    }])
    .select()    // return the newly created row
    .single();   // unwrap from array (we inserted one row)

  if (error) throw new Error(error.message);
  return data;   // { id: 'uuid...', name: 'React Hoodie', ... }
}

// Insert multiple products at once (bulk insert)
async function createManyProducts(products) {
  const { data, error } = await supabase
    .from('products')
    .insert(products)   // pass an array of objects
    .select();

  if (error) throw new Error(error.message);
  return data;          // array of created rows
}

// UPSERT — insert or update if a unique constraint is violated
async function upsertProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .upsert([product], { onConflict: 'name' })  // if name already exists, update it
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}`;

  const readExamples = `// ── READ — SELECT rows from the database ─────────────────

// Fetch ALL products
async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// Fetch ONE product by id
async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)     // WHERE id = ?
    .single();        // expect exactly one row

  if (error) throw new Error(error.message);
  return data;
}

// Fetch with FILTERS
async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, stock')   // select only specific columns
    .eq('category', category)           // WHERE category = ?
    .eq('is_active', true)              // AND is_active = true
    .gte('stock', 1)                    // AND stock >= 1
    .order('price', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// SEARCH — case-insensitive text search
async function searchProducts(query) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', \`%\${query}%\`);  // WHERE name ILIKE '%hoodie%'

  if (error) throw new Error(error.message);
  return data;
}

// PAGINATE — fetch page 2 of results (10 per page)
async function getProductsPage(page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to   = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })   // also return total count
    .range(from, to);

  if (error) throw new Error(error.message);
  return { data, count, totalPages: Math.ceil(count / pageSize) };
}

// JOIN — fetch products with their reviews (if reviews table exists)
async function getProductsWithReviews() {
  const { data, error } = await supabase
    .from('products')
    .select(\`
      *,
      reviews ( id, rating, comment, created_at )
    \`);

  if (error) throw new Error(error.message);
  return data;
}`;

  const updateExamples = `// ── UPDATE — modify existing rows ───────────────────────

// Update specific fields of one product
async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),  // always update timestamp
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Usage
await updateProduct('uuid-123', { price: 34.99, stock: 45 });

// Toggle a boolean field
async function toggleProductActive(id, currentValue) {
  const { data, error } = await supabase
    .from('products')
    .update({ is_active: !currentValue })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Bulk update — mark all out-of-stock products as inactive
async function deactivateOutOfStock() {
  const { data, error } = await supabase
    .from('products')
    .update({ is_active: false })
    .eq('stock', 0)   // WHERE stock = 0
    .select();

  if (error) throw new Error(error.message);
  return data;         // array of updated rows
}

// Increment a number field (e.g. decrease stock by 1 after purchase)
async function decrementStock(id) {
  // Supabase doesn't have a built-in increment — use rpc or read-then-write:
  const product = await getProductById(id);
  if (product.stock <= 0) throw new Error('Out of stock');

  return updateProduct(id, { stock: product.stock - 1 });
}`;

  const deleteExamples = `// ── DELETE — remove rows from the database ──────────────

// Delete one product by id
async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return { success: true };
}

// Soft delete — instead of removing the row, mark it inactive
// (preferred in production — data can be recovered)
async function softDeleteProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Delete multiple rows matching a filter
async function deleteInactiveProducts() {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('is_active', false);

  if (error) throw new Error(error.message);
}

// ── IMPORTANT: Always add a WHERE condition to DELETE ─────
// Supabase WILL reject a DELETE with no filter by default,
// but always double-check — you don't want to wipe a table.`;

  const reactCrudHook = `// ── React hook that wires all CRUD operations to state ──
// frontend/src/hooks/useProducts.js

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useProducts() {
  const [products, setProducts]   = useState([]);
  const [loading,  setLoading]    = useState(false);
  const [error,    setError]      = useState(null);

  // READ — load all products on mount
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // CREATE
  const addProduct = async (productData) => {
    const { data, error } = await supabase
      .from('products').insert([productData]).select().single();
    if (error) throw error;
    setProducts(prev => [data, ...prev]);  // optimistic UI update
    return data;
  };

  // UPDATE
  const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
      .from('products').update(updates).eq('id', id).select().single();
    if (error) throw error;
    setProducts(prev => prev.map(p => p.id === id ? data : p));
    return data;
  };

  // DELETE
  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return { products, loading, error, addProduct, updateProduct, deleteProduct, refetch: fetchProducts };
}`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">CRUD Operations — Deep Dive</h2>
        <p className="text-slate-600 leading-relaxed">
          Every database-driven application performs four fundamental operations: <strong>Create</strong> (insert), <strong>Read</strong> (select), <strong>Update</strong> (modify), and <strong>Delete</strong> (remove). Master these four and you can build any data-driven feature. All examples below use a <strong>products</strong> table — a real-world pattern you will use in your own apps.
        </p>

        <CodeBlock title="SQL — products table (practical example)" code={practicalSchema} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { op: 'CREATE', sql: 'INSERT', sdk: '.insert()', icon: '📝', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
            { op: 'READ',   sql: 'SELECT', sdk: '.select()', icon: '🔍', color: 'bg-sky-100 text-sky-700 border-sky-200' },
            { op: 'UPDATE', sql: 'UPDATE', sdk: '.update()', icon: '✏️', color: 'bg-amber-100 text-amber-700 border-amber-200' },
            { op: 'DELETE', sql: 'DELETE', sdk: '.delete()', icon: '🗑️', color: 'bg-rose-100 text-rose-700 border-rose-200' },
          ].map(o => (
            <div key={o.op} className={`rounded-xl border p-3 text-center ${o.color}`}>
              <div className="text-2xl mb-1">{o.icon}</div>
              <div className="font-black text-sm">{o.op}</div>
              <div className="font-mono text-xs mt-1 opacity-70">{o.sql}</div>
              <div className="font-mono text-xs opacity-70">{o.sdk}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-8 rounded-full bg-indigo-500" />
          <h3 className="text-xl font-bold text-slate-900">📝 CREATE — Inserting Data</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">Use <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.insert()</code> to add new rows. Always pass an array of objects (even for one row). Use <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.select().single()</code> to get the created record back immediately.</p>
        <CodeBlock title="Supabase — CREATE operations" code={createExamples} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-8 rounded-full bg-sky-500" />
          <h3 className="text-xl font-bold text-slate-900">🔍 READ — Querying Data</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">Use <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.select()</code> to fetch rows. Chain filter methods like <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.eq()</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.gte()</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.ilike()</code> and <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.order()</code> to build precise queries. Read is the most complex operation — invest time here.</p>
        <CodeBlock title="Supabase — READ operations (filter, search, paginate, join)" code={readExamples} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { method: '.eq(col, val)',     desc: 'WHERE col = val — exact match' },
            { method: '.neq(col, val)',    desc: 'WHERE col != val' },
            { method: '.gt(col, val)',     desc: 'WHERE col > val (greater than)' },
            { method: '.gte(col, val)',    desc: 'WHERE col >= val (greater or equal)' },
            { method: '.lt(col, val)',     desc: 'WHERE col < val (less than)' },
            { method: '.lte(col, val)',    desc: 'WHERE col <= val (less or equal)' },
            { method: '.ilike(col, pat)', desc: 'Case-insensitive LIKE — use % as wildcard' },
            { method: '.in(col, [vals])', desc: 'WHERE col IN (val1, val2, ...)' },
            { method: '.is(col, null)',    desc: 'WHERE col IS NULL' },
            { method: '.order(col)',       desc: 'ORDER BY col ASC (add { ascending: false } for DESC)' },
            { method: '.range(from, to)', desc: 'LIMIT + OFFSET for pagination' },
            { method: '.single()',         desc: 'Expect exactly 1 row — throws if 0 or 2+' },
          ].map(m => (
            <div key={m.method} className="flex gap-2 text-xs bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
              <code className="text-indigo-700 font-mono font-bold flex-shrink-0">{m.method}</code>
              <span className="text-slate-500">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-8 rounded-full bg-amber-500" />
          <h3 className="text-xl font-bold text-slate-900">✏️ UPDATE — Modifying Data</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">Use <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.update()</code> followed by a filter. <strong>Always include a WHERE condition</strong> — updating without a filter modifies every row in the table. Prefer soft delete (marking inactive) over hard delete for recoverable data.</p>
        <CodeBlock title="Supabase — UPDATE operations" code={updateExamples} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-8 rounded-full bg-rose-500" />
          <h3 className="text-xl font-bold text-slate-900">🗑️ DELETE — Removing Data</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">Use <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.delete()</code> with a filter. In production apps, prefer <strong>soft delete</strong> (set <code className="bg-slate-100 px-1 rounded font-mono text-xs">is_active = false</code>) so data can be recovered. Hard deletes with CASCADE foreign keys will also delete all related child rows.</p>
        <CodeBlock title="Supabase — DELETE operations (hard & soft)" code={deleteExamples} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-2">
        <h3 className="text-xl font-bold text-slate-900">Putting It Together — React CRUD Hook</h3>
        <p className="text-slate-600 text-sm leading-relaxed">A custom React hook is the cleanest way to wire all four CRUD operations to your component state. Import this hook into any page that manages products — it handles loading, error, and optimistic UI updates.</p>
        <CodeBlock title="useProducts.js — complete CRUD React hook" code={reactCrudHook} />
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-800">
          <strong>Optimistic UI:</strong> When a user deletes a product, remove it from the <code className="bg-indigo-100 px-1 rounded font-mono text-xs">products</code> state immediately (before the server confirms). If the server fails, refetch to restore. This makes the app feel instant — the UI responds in 0ms instead of waiting for the network.
        </div>
      </div>
    </div>
  );
}

function OtherDatabasesSection() {
  const mongoExample = `// MongoDB — document database (Node.js with Mongoose)
// npm install mongoose

import mongoose from 'mongoose';

// Connect to MongoDB Atlas
await mongoose.connect(process.env.MONGODB_URI);

// Define a schema (shape of the document)
const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true, min: 0 },
  category:    String,
  is_active:   { type: Boolean, default: true },
  tags:        [String],            // arrays are built-in
  metadata:    mongoose.Schema.Types.Mixed,  // any shape
  created_at:  { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

// ── CRUD with Mongoose ────────────────────────────────────
// CREATE
const product = await Product.create({ name: 'Hoodie', price: 39.99 });

// READ
const all      = await Product.find({ is_active: true }).sort('-created_at');
const one      = await Product.findById('64a7f...');
const filtered = await Product.find({ category: 'Apparel', price: { $lte: 50 } });

// UPDATE
await Product.findByIdAndUpdate('64a7f...', { price: 34.99 }, { new: true });

// DELETE
await Product.findByIdAndDelete('64a7f...');`;

  const firebaseExample = `// Firebase Firestore — realtime document database
// npm install firebase

import { initializeApp }     from 'firebase/app';
import {
  getFirestore, collection, doc,
  addDoc, getDocs, getDoc,
  updateDoc, deleteDoc,
  query, where, orderBy
} from 'firebase/firestore';

const app = initializeApp({ /* your firebase config */ });
const db  = getFirestore(app);

// ── CRUD with Firestore ───────────────────────────────────
// CREATE — auto-generated id
const docRef = await addDoc(collection(db, 'products'), {
  name: 'Hoodie', price: 39.99, created_at: new Date()
});

// READ — all documents in a collection
const snapshot  = await getDocs(collection(db, 'products'));
const products  = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

// READ — with filters
const q = query(
  collection(db, 'products'),
  where('category', '==', 'Apparel'),
  orderBy('price', 'asc')
);
const filtered = await getDocs(q);

// READ — single document by id
const docSnap = await getDoc(doc(db, 'products', 'docId'));
const product = { id: docSnap.id, ...docSnap.data() };

// UPDATE — partial update (only specified fields change)
await updateDoc(doc(db, 'products', 'docId'), { price: 34.99 });

// DELETE
await deleteDoc(doc(db, 'products', 'docId'));

// REALTIME — listen for changes
import { onSnapshot } from 'firebase/firestore';
const unsubscribe = onSnapshot(collection(db, 'products'), (snap) => {
  const live = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  setProducts(live);   // updates React state automatically
});`;

  const databases = [
    {
      name: 'Supabase',
      type: 'PostgreSQL (Relational)',
      emoji: '⚡',
      colour: { header: 'bg-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50', badge: 'text-emerald-700' },
      free: '500 MB / 50k rows',
      best: 'Full-stack apps, REST APIs, apps with complex relationships, Auth included',
      pros: ['Full SQL support', 'Auto-generated REST API', 'Built-in Auth + RLS', 'Realtime subscriptions', 'Storage included', 'Open source'],
      cons: ['Paused projects after 1 week inactivity (free)', 'Less flexible schema than NoSQL'],
      link: 'https://supabase.com',
    },
    {
      name: 'MongoDB Atlas',
      type: 'NoSQL (Document)',
      emoji: '🍃',
      colour: { header: 'bg-green-700', border: 'border-green-200', bg: 'bg-green-50', badge: 'text-green-700' },
      free: '512 MB shared cluster',
      best: 'Apps with variable or nested data, rapid prototyping, content platforms',
      pros: ['Flexible schema (JSON documents)', 'Easy to start (no migrations)', 'Excellent JS SDK', 'Atlas Search built-in', 'Aggregation pipeline for analytics'],
      cons: ['No joins (must denormalise)', 'Consistency harder to guarantee', 'No built-in auth'],
      link: 'https://mongodb.com/atlas',
    },
    {
      name: 'Firebase Firestore',
      type: 'NoSQL + Realtime',
      emoji: '🔥',
      colour: { header: 'bg-amber-500', border: 'border-amber-200', bg: 'bg-amber-50', badge: 'text-amber-700' },
      free: '1 GB storage, 50k reads/day',
      best: 'Mobile apps, realtime features (chat, collaborative tools), Google ecosystem',
      pros: ['Push realtime updates to clients', 'Offline support built-in', 'Google Auth included', 'SDKs for web, iOS, Android', 'Scales automatically'],
      cons: ['Expensive at scale', 'Complex querying (no SQL)', 'Vendor lock-in (Google)'],
      link: 'https://firebase.google.com',
    },
    {
      name: 'Neon',
      type: 'Serverless PostgreSQL',
      emoji: '🌿',
      colour: { header: 'bg-teal-600', border: 'border-teal-200', bg: 'bg-teal-50', badge: 'text-teal-700' },
      free: '0.5 GB, auto-suspend',
      best: 'Serverless/edge deployments, Vercel apps, branching for dev/staging',
      pros: ['Serverless — scales to zero', 'Branch your database like Git', 'Full PostgreSQL', 'Great Vercel integration'],
      cons: ['Cold start latency when idle', 'Newer — smaller community than Supabase'],
      link: 'https://neon.tech',
    },
    {
      name: 'PlanetScale',
      type: 'Serverless MySQL',
      emoji: '🪐',
      colour: { header: 'bg-purple-600', border: 'border-purple-200', bg: 'bg-purple-50', badge: 'text-purple-700' },
      free: 'Hobby plan (limited)',
      best: 'Large-scale MySQL apps, teams needing safe schema migrations',
      pros: ['Non-blocking schema changes', 'Branching (safe migrations)', 'Excellent performance', 'Vitess under the hood (used by YouTube)'],
      cons: ['MySQL only (no PostgreSQL)', 'Prisma required for best DX', 'Free tier discontinued — paid only'],
      link: 'https://planetscale.com',
    },
    {
      name: 'Firebase Realtime DB',
      type: 'Realtime JSON Tree',
      emoji: '⚡',
      colour: { header: 'bg-orange-500', border: 'border-orange-200', bg: 'bg-orange-50', badge: 'text-orange-700' },
      free: '1 GB storage, 10 GB/month transfer',
      best: 'Chat, presence indicators, live scoreboards, IoT data streams',
      pros: ['Sub-100ms latency', 'Offline support', 'Simple JSON tree structure', 'Works without a backend'],
      cons: ['Not a relational database', 'Very limited querying', 'Hard to model complex data', 'Superseded by Firestore for most use cases'],
      link: 'https://firebase.google.com/docs/database',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Database Services — The Landscape</h2>
        <p className="text-slate-600 leading-relaxed">
          Supabase is the default choice for CodeWorks Academy apps, but knowing the alternatives makes you a more effective developer. Different projects have different needs — a chat app needs realtime, a product catalogue needs full SQL, a mobile app might benefit from Firebase's offline support.
        </p>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-800">
          <strong>Choosing a database:</strong> Start with <strong>Supabase</strong> if you are unsure — it handles 95% of use cases. Move to MongoDB if your data has no fixed structure. Choose Firebase if you need push-realtime with mobile SDK support and you are already in the Google ecosystem.
        </div>
      </div>

      {/* Comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {databases.map(db => (
          <div key={db.name} className={`rounded-2xl border overflow-hidden shadow-sm ${db.colour.border}`}>
            <div className={`${db.colour.header} px-5 py-3 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{db.emoji}</span>
                <div>
                  <div className="font-bold text-white">{db.name}</div>
                  <div className="text-xs text-white/70">{db.type}</div>
                </div>
              </div>
              <a href={db.link} target="_blank" rel="noreferrer"
                 className="text-xs text-white/80 hover:text-white flex items-center gap-1 transition-colors">
                Visit <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className={`p-4 space-y-3 ${db.colour.bg}`}>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wide ${db.colour.badge}`}>Free tier: </span>
                <span className="text-xs text-slate-600">{db.free}</span>
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wide ${db.colour.badge}`}>Best for: </span>
                <span className="text-xs text-slate-600">{db.best}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs font-bold text-emerald-600 mb-1">✅ Pros</div>
                  {db.pros.map(p => <div key={p} className="text-xs text-slate-600 leading-relaxed">• {p}</div>)}
                </div>
                <div>
                  <div className="text-xs font-bold text-red-500 mb-1">❌ Cons</div>
                  {db.cons.map(c => <div key={c} className="text-xs text-slate-600 leading-relaxed">• {c}</div>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Code examples */}
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">MongoDB — CRUD with Mongoose</h3>
        <p className="text-slate-600 text-sm leading-relaxed">MongoDB stores data as BSON documents (like JSON objects). Mongoose adds schemas and validation on top, making it behave more like a structured database while keeping the flexibility of NoSQL.</p>
        <CodeBlock title="MongoDB + Mongoose — CRUD operations" code={mongoExample} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Firebase Firestore — CRUD with Realtime</h3>
        <p className="text-slate-600 text-sm leading-relaxed">Firestore organises data into <em>collections</em> (like tables) containing <em>documents</em> (like rows). Its killer feature is <code className="bg-slate-100 px-1 rounded font-mono text-xs">onSnapshot()</code> — push updates to the browser the instant data changes, with no polling.</p>
        <CodeBlock title="Firebase Firestore — CRUD + realtime listener" code={firebaseExample} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Comparison Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-slate-500 font-semibold">Feature</th>
                {['Supabase', 'MongoDB', 'Firebase', 'Neon'].map(h => (
                  <th key={h} className="text-center py-2 text-slate-600 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {[
                ['SQL support',        '✅ Full SQL', '❌ NoSQL', '❌ NoSQL', '✅ Full SQL'],
                ['Realtime',           '✅ Built-in', '⚠️ Change streams', '✅ Built-in', '❌ Manual'],
                ['Built-in Auth',      '✅',          '❌',       '✅',       '❌'],
                ['Free tier',          '✅ Generous', '✅',       '✅',       '✅'],
                ['Offline support',    '❌',          '⚠️ Realm', '✅',       '❌'],
                ['Best for',           'Full-stack', 'Flexible data', 'Mobile + realtime', 'Serverless'],
                ['Learning curve',     'Low',        'Low',      'Medium',   'Low'],
              ].map(([feat, ...vals]) => (
                <tr key={feat} className="border-b border-slate-100">
                  <td className="py-1.5 font-medium text-slate-700">{feat}</td>
                  {vals.map((v, i) => <td key={i} className="py-1.5 text-center">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function VibeCodingSection() {
  const dbStructure = `backend/
├── src/
│   ├── lib/
│   │   └── supabase.js         ← Admin client (service role key)
│   │
│   ├── controllers/
│   │   └── productController.js  ← All CRUD handlers
│   │
│   └── routes/
│       └── productRoutes.js      ← GET/POST/PUT/DELETE route map
│
frontend/
├── src/
│   ├── lib/
│   │   └── supabase.js         ← Anon client (VITE_ key)
│   │
│   ├── hooks/
│   │   └── useProducts.js      ← React hook wrapping all CRUD calls
│   │
│   └── pages/
│       └── Products.jsx        ← Full CRUD UI page`;

  const qwenSchemaPrompt = `You are a senior PostgreSQL database designer.

Generate the COMPLETE SQL for: A "notes" table for a note-taking app.

Requirements:
- id: UUID, primary key, default gen_random_uuid()
- user_id: UUID, references auth.users(id), ON DELETE CASCADE
- title: TEXT, NOT NULL
- content: TEXT
- is_pinned: BOOLEAN, DEFAULT FALSE
- colour: TEXT, DEFAULT '#ffffff' (hex colour for card background)
- tags: TEXT ARRAY (e.g. ARRAY['work', 'urgent'])
- created_at: TIMESTAMPTZ, DEFAULT NOW()
- updated_at: TIMESTAMPTZ, DEFAULT NOW()
- Include RLS policies: users can SELECT/INSERT/UPDATE/DELETE only their own rows (auth.uid() = user_id)
- Include a trigger that updates updated_at automatically on UPDATE
- Output clean, runnable SQL only — no markdown, no explanation`;

  const qwenControllerPrompt = `You are a senior Node.js backend developer using Express.js and Supabase.

Generate the COMPLETE file for: backend/src/controllers/productController.js

Requirements:
- Import supabase from '../lib/supabase.js'
- Export these named async functions:
    getAllProducts    — SELECT * ORDER BY created_at DESC
    getProductById   — SELECT by req.params.id, 404 if not found
    createProduct    — INSERT { name, description, price, stock, category } from req.body, validate name and price required, return 201
    updateProduct    — UPDATE by req.params.id using req.body fields (partial update), also set updated_at = NOW()
    deleteProduct    — DELETE by req.params.id, return 204
    searchProducts   — SELECT WHERE name ILIKE '%req.query.q%'
- Every function: try/catch, return 500 + error.message on failure
- Use async/await, ES module syntax (export function ...)
- No placeholder comments — complete, working code only`;

  const qwenPagePrompt = `You are a senior React developer using React 18, Tailwind CSS, and Supabase.

Generate the COMPLETE file for: frontend/src/pages/Products.jsx

Requirements:
- Import and use the useProducts hook from '../hooks/useProducts'
- Display products in a responsive grid (1 col mobile, 3 cols desktop)
- Each card shows: name, price (formatted as $XX.XX), category badge, stock count
- "Add Product" button opens an inline form with inputs for name, price, stock, category
- Each card has Edit and Delete buttons
- Edit opens an inline edit form pre-filled with current values
- Delete shows a confirmation (window.confirm) before deleting
- Show a loading spinner while fetching
- Show an error message if fetch fails
- Use only Tailwind CSS utility classes
- Colour theme: indigo primary (#4f46e5)
- Export as default function Products()`;

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Vibe Coding — Database App</h2>
        <p className="text-slate-600 leading-relaxed">
          This section walks you through using <strong>Qwen AI</strong> to generate a complete CRUD application — from the SQL schema to the React UI — following the exact assembly order that prevents broken imports.
        </p>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-800">
          <strong>What you will build:</strong> A <strong>Products CRUD app</strong> — Express + Supabase backend with GET/POST/PUT/DELETE endpoints, and a React frontend with a live list, add form, edit form, and delete confirmation. All generated file by file with Qwen AI prompts.
        </div>
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">File Structure for a CRUD App</h3>
        <CodeBlock title="Project structure — backend + frontend" code={dbStructure} />
      </div>

      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Qwen AI Prompts — Generate Every File</h3>
        <p className="text-slate-600 text-sm leading-relaxed">Use these prompts in order. Each prompt produces one complete, working file — no editing needed if the prompt is precise enough.</p>

        <h4 className="font-bold text-slate-800">Step 1 — Generate the SQL schema</h4>
        <CodeBlock title="Qwen AI prompt — SQL schema + RLS + trigger" code={qwenSchemaPrompt} />

        <h4 className="font-bold text-slate-800">Step 2 — Generate the Express controller</h4>
        <CodeBlock title="Qwen AI prompt — productController.js" code={qwenControllerPrompt} />

        <h4 className="font-bold text-slate-800">Step 3 — Generate the React CRUD page</h4>
        <CodeBlock title="Qwen AI prompt — Products.jsx" code={qwenPagePrompt} />

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <h4 className="font-bold text-slate-800 text-sm">Complete Assembly Order</h4>
          {[
            { n: 1, file: 'SQL schema (run in Supabase SQL Editor)', why: 'Tables must exist before the backend queries them' },
            { n: 2, file: 'backend/src/lib/supabase.js',             why: 'Shared DB client — all controllers depend on it' },
            { n: 3, file: 'backend/src/controllers/productController.js', why: 'Business logic — imported by routes' },
            { n: 4, file: 'backend/src/routes/productRoutes.js',     why: 'Route map — imports the controller' },
            { n: 5, file: 'backend/src/server.js',                   why: 'Entry point — mounts all routes' },
            { n: 6, file: 'frontend/src/lib/supabase.js',            why: 'Frontend anon client — used by the hook' },
            { n: 7, file: 'frontend/src/hooks/useProducts.js',       why: 'CRUD hook — used by the page' },
            { n: 8, file: 'frontend/src/pages/Products.jsx',         why: 'UI — imports and calls the hook' },
          ].map(f => (
            <div key={f.n} className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{f.n}</div>
              <div>
                <code className="text-indigo-700 font-mono text-xs font-bold">{f.file}</code>
                <p className="text-xs text-slate-500 mt-0.5">{f.why}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Testing CRUD locally:</strong> After running <code className="bg-amber-100 px-1 rounded font-mono text-xs">npm run dev</code> in both <code className="bg-amber-100 px-1 rounded font-mono text-xs">backend/</code> and <code className="bg-amber-100 px-1 rounded font-mono text-xs">frontend/</code>, open <code className="bg-amber-100 px-1 rounded font-mono text-xs">http://localhost:5000/products</code> to see the UI. Test Create, Read, Update, and Delete through the browser. Then check the Supabase Table Editor to confirm rows are being written correctly.
        </div>
      </div>
    </div>
  );
}

// ── Assignment ────────────────────────────────────────────────────────────────

const AI_TOOLS  = ['Qwen AI', 'ChatGPT', 'Gemini'];
const DB_SERVICES = ['Supabase', 'Firebase Firestore', 'MongoDB Atlas', 'Neon'];

function getScore(tool, dbService, apiUrl, ops, reflection) {
  const validUrl   = /^https?:\/\/.{3,}/.test(apiUrl.trim());
  const opCount    = ops.length;
  const words      = reflection.trim().split(/\s+/).filter(Boolean).length;
  let score = 0;
  if (validUrl)      score += 3;
  if (opCount >= 4)  score += 3;
  else if (opCount >= 2) score += 1;
  if (tool)          score += 2;
  if (dbService)     score += 1;
  if (words >= 50)   score += 1;
  return { score, total: 10, validUrl, opCount, words };
}

function getGrade(score) {
  if (score >= 9) return { letter: 'A', label: 'Outstanding!',     color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
  if (score >= 7) return { letter: 'B', label: 'Great Work!',       color: 'text-sky-600',     bg: 'bg-sky-50 border-sky-200' };
  if (score >= 5) return { letter: 'C', label: 'Good Effort!',      color: 'text-indigo-600',  bg: 'bg-indigo-50 border-indigo-200' };
  if (score >= 3) return { letter: 'D', label: 'Needs Improvement', color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-200' };
  return             { letter: 'F', label: 'Review & Retry',     color: 'text-red-600',     bg: 'bg-red-50 border-red-200' };
}

const CRUD_OPS = [
  { id: 'create', label: '📝 Create (INSERT)' },
  { id: 'read',   label: '🔍 Read (SELECT)' },
  { id: 'update', label: '✏️ Update (UPDATE)' },
  { id: 'delete', label: '🗑️ Delete (DELETE)' },
];

function AssignmentSection({ session, onComplete }) {
  const [tool,       setTool]       = useState('');
  const [dbService,  setDbService]  = useState('');
  const [apiUrl,     setApiUrl]     = useState('');
  const [ops,        setOps]        = useState([]);
  const [reflection, setReflection] = useState('');
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result,     setResult]     = useState(null);
  const [savedToDb,  setSavedToDb]  = useState(false);
  const [dbError,    setDbError]    = useState('');

  const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length;
  const canSubmit = tool && dbService && apiUrl.trim() && ops.length > 0 && reflection.trim();

  const toggleOp = (id) => setOps(prev => prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const { score, total, validUrl, opCount } = getScore(tool, dbService, apiUrl, ops, reflection);
    const pct   = Math.round((score / total) * 100);
    const grade = getGrade(score);
    setResult({ score, total, pct, grade, validUrl, opCount });
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
          title: `Database Module — CRUD App (${tool} · ${dbService})`,
          course_id: COURSE_ID,
          score,
          total,
          grade: grade.letter,
          answers: { tool, dbService, siteUrl: apiUrl.trim(), crudOps: ops, reflection: reflection.trim() },
        }),
      });
      if (res.ok) setSavedToDb(true);
      else { const d = await res.json(); setDbError(d.message || 'Could not save to database.'); }
    } catch { setDbError('Network error — result not saved.'); }
    finally { setSubmitting(false); }
  };

  const handleReset = () => {
    setTool(''); setDbService(''); setApiUrl(''); setOps([]); setReflection('');
    setSubmitted(false); setResult(null); setSavedToDb(false); setDbError('');
  };

  if (submitted && result) {
    const { score, total, pct, grade, validUrl, opCount } = result;
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
            { label: 'Valid live URL submitted',   earned: validUrl ? 3 : 0,                            max: 3, pass: validUrl },
            { label: 'All 4 CRUD operations built', earned: opCount >= 4 ? 3 : opCount >= 2 ? 1 : 0,  max: 3, pass: opCount >= 4 },
            { label: 'AI tool declared',            earned: tool ? 2 : 0,       max: 2, pass: !!tool },
            { label: 'Database service declared',   earned: dbService ? 1 : 0,  max: 1, pass: !!dbService },
            { label: 'Reflection is 50+ words',     earned: wordCount >= 50 ? 1 : 0, max: 1, pass: wordCount >= 50 },
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

        <button onClick={handleReset} className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md">
          <RotateCcw className="w-4 h-4" /> Resubmit Assignment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 rounded-xl"><Trophy className="w-6 h-6 text-indigo-600" /></div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Database CRUD Assignment</h2>
            <p className="text-slate-500 text-sm">Design · Build · Deploy · Submit</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <h3 className="font-bold text-slate-800">Assignment Brief</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Use <strong>Qwen AI</strong> (or ChatGPT / Gemini) to vibe-code a full CRUD application using <strong>Supabase</strong> (or another database service). Your app must implement all four CRUD operations — Create, Read, Update, and Delete — connected to a real database. Deploy the app live and submit the URL.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { icon: '🗄️', label: 'Step 1', desc: 'Create Supabase table' },
              { icon: '🤖', label: 'Step 2', desc: 'Generate files with AI' },
              { icon: '🖥️', label: 'Step 3', desc: 'Test CRUD locally' },
              { icon: '🌐', label: 'Step 4', desc: 'Deploy & submit URL' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-3 border border-slate-200 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-bold text-xs text-slate-700">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <h4 className="font-semibold text-indigo-800 mb-2 text-sm">Marking Criteria</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: 'Valid live URL submitted',    points: '3 pts' },
              { label: 'All 4 CRUD operations built', points: '3 pts' },
              { label: 'AI tool declared',            points: '2 pts' },
              { label: 'Database service declared',   points: '1 pt'  },
              { label: 'Reflection is 50+ words',     points: '1 pt'  },
            ].map(c => (
              <div key={c.label} className="flex justify-between text-xs text-indigo-900 bg-white/60 rounded-lg px-3 py-1.5">
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
                tool === t ? 'bg-indigo-50 border-indigo-400 text-indigo-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
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
          <label className="block text-sm font-semibold text-slate-700 mb-2">2. Which database did you use? *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {DB_SERVICES.map(d => (
              <label key={d} className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                dbService === d ? 'bg-indigo-50 border-indigo-400 text-indigo-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}>
                <input type="radio" name="db" value={d} checked={dbService === d} onChange={() => setDbService(d)} className="sr-only" />
                <span className="text-lg">{d === 'Supabase' ? '⚡' : d === 'Firebase Firestore' ? '🔥' : d === 'MongoDB Atlas' ? '🍃' : '🌿'}</span>
                <span className="text-center text-xs">{d}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">3. Paste your live app URL *</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="url"
              value={apiUrl}
              onChange={e => setApiUrl(e.target.value)}
              placeholder="https://my-crud-app.netlify.app"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            />
          </div>
          {apiUrl && !/^https?:\/\/.{3,}/.test(apiUrl.trim()) && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid URL starting with https://</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">4. Which CRUD operations did you implement? *</label>
          <div className="grid grid-cols-2 gap-2">
            {CRUD_OPS.map(op => (
              <label key={op.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                ops.includes(op.id) ? 'bg-indigo-50 border-indigo-400 text-indigo-800 shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}>
                <input type="checkbox" checked={ops.includes(op.id)} onChange={() => toggleOp(op.id)} className="sr-only" />
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${ops.includes(op.id) ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300'}`}>
                  {ops.includes(op.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
                {op.label}
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
            placeholder="Describe what your app does, which table(s) you created, how you implemented each CRUD operation, how you used AI to generate the code, what challenges you faced, and what you learned about working with databases."
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className={`w-full flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-md ${
            canSubmit && !submitting
              ? 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-indigo-200'
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

export default function LearningModuleDatabase() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate  = useNavigate();
  const { session } = useAuthStore();
  const { visitSection, setProgress } = useCourseStore();

  const courseData       = useCourseStore(state => state.courses.find(c => c.id === COURSE_ID));
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
      case 'setup':      return <SetupSection />;
      case 'crud':       return <CrudSection />;
      case 'others':     return <OtherDatabasesSection />;
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
            <span className="text-indigo-600 font-medium">Databases</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Databases</h1>
          <p className="text-slate-500 text-sm mt-0.5">Jordan Patel · 6 Weeks · Module 6 of 6</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${liveProgress}%` }} />
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
                isActive  ? 'bg-white text-indigo-600 shadow-sm'
                : visited ? 'text-indigo-600 hover:bg-white/60'
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
          <button onClick={goNext} className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-indigo-200">
            Next: {TABS[currentIndex + 1].label} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
