const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { setupAuth, isAuthenticated } = require('./auth/replitAuth');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

async function start() {
  const app = express();

  app.set('trust proxy', 1);
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  app.use(cors({ origin: true, credentials: true }));

  // Setup Replit Auth (registers /api/login, /api/callback, /api/logout + session middleware)
  await setupAuth(app);

  // Identity endpoint — used by frontend to check auth state
  app.get('/api/auth/identity', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated() && req.user) {
      return res.json({ user: req.user });
    }
    return res.json({ user: null });
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', env: process.env.NODE_ENV || 'development', ts: new Date().toISOString() });
  });

  // API routes (protected by auth middleware)
  app.use('/api/courses', require('./routes/courseRoutes'));
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/assignments', require('./routes/assignmentRoutes'));

  // Global Error Handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
