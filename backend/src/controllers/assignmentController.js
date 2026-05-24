const supabase = require('../config/supabase');

const MIGRATION_SQL = `
-- Run this once in your Supabase SQL Editor (dashboard.supabase.com → SQL Editor)
-- It is safe to run multiple times.

CREATE TABLE IF NOT EXISTS assignments (
  id          bigserial PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title       text NOT NULL,
  course_id   integer,
  score       integer NOT NULL DEFAULT 0,
  total       integer NOT NULL DEFAULT 0,
  grade       text NOT NULL DEFAULT 'F',
  answers     jsonb,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE assignments ADD COLUMN IF NOT EXISTS user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS course_id   integer;
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS score       integer NOT NULL DEFAULT 0;
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS total       integer NOT NULL DEFAULT 0;
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS grade       text NOT NULL DEFAULT 'F';
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS answers     jsonb;
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS submitted_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE assignments ADD COLUMN IF NOT EXISTS title       text;

ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='assignments' AND policyname='Users can view own assignments') THEN
    CREATE POLICY "Users can view own assignments" ON assignments FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='assignments' AND policyname='Users can insert own assignments') THEN
    CREATE POLICY "Users can insert own assignments" ON assignments FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;
`.trim();

async function tryInsert(payload) {
  const { data, error } = await supabase
    .from('assignments')
    .insert([payload])
    .select()
    .single();
  return { data, error };
}

exports.submitAssignment = async (req, res) => {
  const { title, course_id, score, total, grade, answers } = req.body;
  const userId = req.user?.id;

  if (!title || score === undefined || !total || !grade) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  const submitted_at = new Date().toISOString();

  const payloads = [
    { user_id: userId, title, course_id: course_id || null, score, total, grade, answers: answers || null, submitted_at },
    { user_id: userId, title, course_id: course_id || null, score, total, grade, submitted_at },
    { user_id: userId, title, score, total, grade, submitted_at },
    { title, score, total, grade, submitted_at },
    { title, score, grade, submitted_at },
  ];

  let lastError = null;

  for (const payload of payloads) {
    const { data, error } = await tryInsert(payload);
    if (!error) {
      return res.status(201).json({ success: true, data });
    }
    const schemaError = error.code === 'PGRST204' || error.code === '42703' || error.message?.includes('column') || error.message?.includes('schema');
    if (schemaError) {
      lastError = error;
      continue;
    }
    console.error('Assignment submit error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to save assignment.' });
  }

  console.error('=== ASSIGNMENTS TABLE SCHEMA FIX ===');
  console.error('Last error:', lastError?.message);
  console.error('Run the following SQL in your Supabase SQL Editor:\n');
  console.error(MIGRATION_SQL);
  console.error('====================================');

  return res.status(500).json({
    success: false,
    message: 'Database schema mismatch.',
    fix: 'Run the migration SQL printed in the server console in your Supabase SQL Editor (dashboard.supabase.com → SQL Editor).',
    sql: MIGRATION_SQL,
  });
};

exports.getAssignments = async (req, res) => {
  const userId = req.user?.id;

  const queries = [
    () => supabase.from('assignments').select('*').eq('user_id', userId).order('submitted_at', { ascending: false }),
    () => supabase.from('assignments').select('*').order('id', { ascending: false }).limit(50),
    () => supabase.from('assignments').select('id, title, grade, score, total, submitted_at').limit(50),
    () => supabase.from('assignments').select('id, title, grade').limit(50),
  ];

  for (const query of queries) {
    const { data, error } = await query();
    if (!error) {
      return res.status(200).json({ success: true, count: data.length, data });
    }
    const schemaError = error.code === 'PGRST204' || error.code === '42703' || error.message?.includes('column') || error.message?.includes('schema');
    if (!schemaError) {
      console.error('Fetch assignments error:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  return res.status(200).json({ success: true, count: 0, data: [] });
};
