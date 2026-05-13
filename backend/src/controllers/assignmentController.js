const supabase = require('../config/supabase');

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

  // Try full payload first, then progressively strip columns that may not exist
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

  console.error('Assignment submit — all payloads failed. Last error:', lastError?.message);
  console.error('Run this SQL in Supabase to fix the schema:\n' +
    'CREATE TABLE IF NOT EXISTS assignments (\n' +
    '  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,\n' +
    '  user_id uuid, title text NOT NULL, course_id int,\n' +
    '  score int NOT NULL, total int NOT NULL, grade text NOT NULL,\n' +
    '  answers jsonb, submitted_at timestamptz DEFAULT now()\n' +
    ');');
  return res.status(500).json({ success: false, message: 'Database schema mismatch. Please set up the assignments table — see server logs for the SQL.' });
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
