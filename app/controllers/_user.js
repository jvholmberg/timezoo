var express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  UserUtil = require('../utils/user');

module.exports = function(app) {
  app.use('/api/user', router);
};

router.post('/register', (req, res) => {
  UserUtil.createRecord(req.body, (doc, msg) => {
    res.redirect('/login');
  }, (err) => {
    req.flash('error', err);
    res.redirect('/register');
  });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});
