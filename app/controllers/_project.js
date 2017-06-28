var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/api/project', router);
};

// router.post('/create', (req, res, next) => {
//   let data = {
//     'name': req.body.name,
//     'description': req.body.description,
//     'hours': req.body.hours,
//     'orgId': req.body.organization,
//     'userId': req.user._id,
//   };
//   ProjectUtil.createRecord(data, (doc, msg) => {
//     res.redirect('/dashboard');
//   }, (err) => {
//     req.flash('error');
//     res.redirect('/dashboard');
//   });
// });
