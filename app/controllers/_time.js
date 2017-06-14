var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TimeUtil = require('../utils/time');

module.exports = function (app) {
  app.use('/api/time', router);
};

router.post('/create', (req, res, next) => {
  if (!req.user) { return; }

  TimeUtil.createRecord(req.body, (doc, msg) => {
    res.redirect('/login');
  }, (err) => {
    req.flash('error', err);
    res.redirect('/register');
  });
  res.json(req.body);
});
