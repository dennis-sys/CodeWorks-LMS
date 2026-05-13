const supabase = require('../config/supabase');

exports.submitAssignment = async (req, res) => {
  const { title, course_id, score, total, grade, answers } = req.body;
  const userId = req.user?.id;

  if (!title || score === undefined || !total || !grade) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    const { data, error } = await supabase
      .from('assignments')
      .insert([{
        user_id: userId,
        title,
        course_id: course_id || null,
        score,
        total,
        grade,
        answers: answers || null,
        submitted_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, data });
  } catch (err) {
    console.error('Assignment submit error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to save assignment.' });
  }
};

exports.getAssignments = async (req, res) => {
  const userId = req.user?.id;

  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    console.error('Fetch assignments error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch assignments.' });
  }
};
