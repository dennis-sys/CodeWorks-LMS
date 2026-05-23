const db = require('../config/db');

exports.submitAssignment = async (req, res) => {
  const { title, course_id, score, total, grade, answers } = req.body;
  const userId = req.user?.db_id;

  if (!title || score === undefined || !total || !grade) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    const { rows } = await db.query(
      `INSERT INTO assignments (user_id, title, course_id, score, total, grade, answers, submitted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING *`,
      [userId || null, title, course_id || null, score, total, grade, answers ? JSON.stringify(answers) : null]
    );
    return res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Assignment submit error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to save assignment.' });
  }
};

exports.getAssignments = async (req, res) => {
  const userId = req.user?.db_id;
  try {
    let rows;
    if (userId) {
      const result = await db.query(
        'SELECT * FROM assignments WHERE user_id = $1 ORDER BY submitted_at DESC',
        [userId]
      );
      rows = result.rows;
    } else {
      const result = await db.query('SELECT * FROM assignments ORDER BY submitted_at DESC LIMIT 50');
      rows = result.rows;
    }
    return res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Fetch assignments error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
