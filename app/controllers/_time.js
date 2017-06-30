var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  OrganizationUtil = require('../utils/organization');

module.exports = function (app) {
  app.use('/api/organization', router);
};

router.post('/create', (req, res, next) => {
  let data = {
    name: req.body.name,
    admins: [req.user._id],
    user: []
  };
  OrganizationUtil.create(data, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});
router.post('/unrestrictedproject/create', (req, res, next) => {
  let data = {
    _id: req.body._id,
    unrestrictedProjects: {
      accronym: req.body.accronym,
      name: req.body.name,
      description: req.body.description
    }
  };
  OrganizationUtil.unrestrictedProjects.create(data, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});
router.post('/restrictedproject/create', (req, res, next) => {
  let data = {
    _id: req.body._id,
    restrictedProjects: {
      accronym: req.body.accronym,
      name: req.body.name,
      description: req.body.description,
      hours: req.body.hours,
      admins: [req.user._id],
      users: []
    }
  };
  OrganizationUtil.restrictedProjects.create(data, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});
