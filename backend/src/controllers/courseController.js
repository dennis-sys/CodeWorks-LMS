const supabase = require('../config/supabase');

exports.getAllCourses = async (req, res) => {
  try {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) throw error;
    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { data, error } = await supabase.from('courses').select('*, enrollments(*)').eq('id', req.params.id).single();
    if (error || !data) return res.status(404).json({ success: false, message: 'Course not found' });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};