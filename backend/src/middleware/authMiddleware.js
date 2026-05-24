const supabase = require('../config/supabase');

const isUUID = (s) => typeof s === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);

function extractSubFromJwt(token) {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return isUUID(payload.sub) ? payload.sub : null;
  } catch {
    return null;
  }
}

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error('Invalid token');

    if (!isUUID(user.id)) {
      const sub = extractSubFromJwt(token);
      if (sub) user.id = sub;
      else {
        console.warn('Auth: user.id is not a UUID and JWT sub is missing:', user.id);
      }
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

exports.roleCheck = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ success: false, message: 'Forbidden' });
  next();
};
