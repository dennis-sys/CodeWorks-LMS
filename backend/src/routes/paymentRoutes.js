const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  verifyPayment,
  getPaymentStatus,
  getCardPaymentQuote,
  requestMpesaPayment,
  getMpesaPaymentStatus,
} = require('../controllers/paymentController');

const router = express.Router();

router.post('/verify', protect, verifyPayment);
router.get('/status', protect, getPaymentStatus);
router.post('/card/quote', protect, getCardPaymentQuote);
router.post('/mpesa/request', protect, requestMpesaPayment);
router.get('/mpesa/status/:reference', protect, getMpesaPaymentStatus);

module.exports = router;
