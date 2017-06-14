var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({
      username: username
    }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'User could not be found.' });
      }
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) { return done(null, false, { message: 'Incorrect password.' }); }
          return done(null, user);
        });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
