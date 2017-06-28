var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/api/timecode', router);
};

// router.post('/create', (req, res, next) => {
//   if (!req.user) { return; }
//
//   TimecodeUtil.createRecord(req.body, (doc, msg) => {
//     res.redirect('/login');
//   }, (err) => {
//     req.flash('error', err);
//     res.redirect('/register');
//   });
// });
