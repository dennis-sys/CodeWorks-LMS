const { Issuer, Strategy, generators } = require('openid-client');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const memoize = require('memoizee');
const db = require('../config/db');

const getOidcConfig = memoize(
  async () => {
    const issuer = await Issuer.discover(process.env.ISSUER_URL || 'https://replit.com/oidc');
    return issuer;
  },
  { maxAge: 3600 * 1000, promise: true }
);

function getSessionMiddleware() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const sessionStore = new pgSession({
    pool: db,
    createTableIfMissing: true,
    ttl: sessionTtl / 1000,
    tableName: 'sessions',
  });
  return session({
    secret: process.env.SESSION_SECRET || 'codeworks-dev-secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: sessionTtl,
    },
  });
}

async function upsertUser(claims) {
  const fullName = [claims.first_name, claims.last_name].filter(Boolean).join(' ') || claims.name || 'Student';
  const { rows } = await db.query(
    `INSERT INTO users (replit_id, full_name, email, role)
     VALUES ($1, $2, $3, 'student')
     ON CONFLICT (replit_id) DO UPDATE
       SET full_name = EXCLUDED.full_name,
           email = COALESCE(EXCLUDED.email, users.email)
     RETURNING *`,
    [claims.sub, fullName, claims.email || null]
  );
  return rows[0];
}

const registeredStrategies = new Set();

async function setupAuth(app) {
  app.set('trust proxy', 1);
  app.use(getSessionMiddleware());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));

  const ensureStrategy = async (hostname) => {
    if (registeredStrategies.has(hostname)) return;
    registeredStrategies.add(hostname);

    const issuer = await getOidcConfig();
    const callbackURL = `https://${hostname}/api/callback`;

    const oidcClient = new issuer.Client({
      client_id: process.env.REPL_ID,
      client_secret: process.env.REPL_ID,
      redirect_uris: [callbackURL],
      response_types: ['code'],
    });

    const strategy = new Strategy(
      {
        client: oidcClient,
        params: {
          scope: 'openid email profile offline_access',
          prompt: 'login consent',
        },
      },
      async (tokenSet, userinfo, done) => {
        try {
          const claims = tokenSet.claims();
          const dbUser = await upsertUser(claims);
          const user = {
            db_id: dbUser.id,
            replit_id: claims.sub,
            full_name: dbUser.full_name,
            email: dbUser.email,
            role: dbUser.role,
            access_token: tokenSet.access_token,
            refresh_token: tokenSet.refresh_token,
            expires_at: claims.exp,
          };
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    );

    strategy.name = `replitauth:${hostname}`;
    passport.use(strategy);
  };

  app.get('/api/login', async (req, res, next) => {
    try {
      await ensureStrategy(req.hostname);
      passport.authenticate(`replitauth:${req.hostname}`, {
        prompt: 'login consent',
      })(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/callback', async (req, res, next) => {
    try {
      await ensureStrategy(req.hostname);
      passport.authenticate(`replitauth:${req.hostname}`, {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
      })(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/logout', (req, res) => {
    req.logout(() => {
      res.redirect('/login');
    });
  });
}

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

module.exports = { setupAuth, isAuthenticated, upsertUser };
