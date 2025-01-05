const authorize = (roles = []) => {
  if (!Array.isArray(roles)) {
    throw new Error("roles must be an array");
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: Unauthorized role" });
    }
    next();
  };
};

module.exports = authorize;

