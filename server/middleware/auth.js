export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export const isProvider = (req, res, next) => {
  if (req.user && req.user.role === "provider") {
    return next();
  }
  res.status(403).json({ message: "Forbidden - Provider access only" });
};