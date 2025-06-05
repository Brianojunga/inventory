const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUsers, getUserById } = require("../db/loginQueries");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUsers(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
