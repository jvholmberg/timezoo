var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  TimeUtil = require('../utils/time');

module.exports = function (app) {
  app.use('/api/time', router);
};

router.post('/create', (req, res, next) => {
  let isValid = true;
  if (!req.user) { isValid = false; }
  if (!req.body.organization) { isValid = false; }
  if (!req.body.project) { isValid = false; }
  if (!req.body.timecode) { isValid = false; }
  if (!req.body.timestamp) { isValid = false; }
  if (!req.body.description) { isValid = false; }
  if (!req.body.hours) { isValid = false; }
  if (!isValid) {
    req.flash('error');
    res.redirect('/dashboard');
  }

  let data = {
    user: {
      _id: req.user._id
    },
    organization: {
      _id: req.body.organization,
      projects: {
        accronym: req.body.project
      },
      timecodes: {
        accronym: req.body.timecode
      }
    },
    time: {
      timestamp: req.body.timestamp,
      description: req.body.description,
      hours: req.body.hours
    }
  };


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
