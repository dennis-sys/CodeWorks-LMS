const express = require('express');
const { getMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', protect, getMe);
router.post('/logout', logout);

module.exports = router;
