var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TimeUtil = require('../utils/time');

module.exports = function (app) {
  app.use('/api/time', router);
};

router.post('/create', (req, res, next) => {
  TimeUtil.create(data, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});


// router.post('/unrestrictedproject/create', (req, res, next) => {
//   let data = {
//     _id: req.body._id,
//     unrestrictedProjects: {
//       accronym: req.body.accronym,
//       name: req.body.name,
//       description: req.body.description
//     }
//   };
//   OrganizationUtil.unrestrictedProjects.create(data, (doc, msg) => {
//     res.redirect('/dashboard');
//   }, (err) => {
//     req.flash('error');
//     res.redirect('/dashboard');
//   });
// });
// router.post('/restrictedproject/create', (req, res, next) => {
//   let data = {
//     _id: req.body._id,
//     restrictedProjects: {
//       accronym: req.body.accronym,
//       name: req.body.name,
//       description: req.body.description,
//       hours: req.body.hours,
//       admins: [req.user._id],
//       users: []
//     }
//   };
//   OrganizationUtil.restrictedProjects.create(data, (doc, msg) => {
//     res.redirect('/dashboard');
//   }, (err) => {
//     req.flash('error');
//     res.redirect('/dashboard');
//   });
// });
