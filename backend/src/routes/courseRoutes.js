const express = require('express');
const { getAllCourses, getCourseById } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getAllCourses);
router.route('/:id').get(protect, getCourseById);

module.exports = router;