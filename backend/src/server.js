const app = require('./app');
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`💳 Paystack: ${process.env.PAYSTACK_SECRET_KEY ? 'configured' : 'missing PAYSTACK_SECRET_KEY'}`);
});
