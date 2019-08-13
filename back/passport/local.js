const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const UseModel = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
  }, async (userId, password, done) => {
    try {
      const user = await UseModel.findOne({
        userId,
      });
      if (!user) {
        return done(null, false, { reason: 'User does not singed up' });
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user);
      }
      return done(null, false, { reason: 'Wrong password' });
    } catch (e) {
      console.error(e);
      return done(e);
    }
  }));
};
