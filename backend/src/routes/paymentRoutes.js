const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { verifyPayment, getPaymentStatus } = require('../controllers/paymentController');

const router = express.Router();

router.post('/verify', protect, verifyPayment);
router.get('/status', protect, getPaymentStatus);

module.exports = router;
