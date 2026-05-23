exports.protect = (req, res, next) => {
  if (!req.session?.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  req.user = req.session.user;
  next();
};

exports.roleCheck = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  next();
};
