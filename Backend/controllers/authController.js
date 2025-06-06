const passport = require("../auth/auth.js");

function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

function checkAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.admin) {
    return next();
  }
  res.status(403).json({ message: "Forbidden: Admin access required" });
}

async function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        message: "Login successful",
        id: user.id,
        username: user.username,
        admin: user.admin,
      });
    });
  })(req, res, next);
}

function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Logout successful" });
  });
}

module.exports = {
  login,
  logout,
  requireAuth,
  checkAdmin,
};
