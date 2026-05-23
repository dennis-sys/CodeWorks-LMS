const db = require('../config/db');

exports.getAllCourses = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM courses ORDER BY id');
    res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM courses WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ success: false, message: 'Course not found' });
    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
