const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { submitAssignment, getAssignments } = require('../controllers/assignmentController');

const router = express.Router();

router.get('/', protect, getAssignments);
router.post('/', protect, submitAssignment);

module.exports = router;
