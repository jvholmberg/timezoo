var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  OrganizationUtil = require('../utils/organization');

module.exports = function (app) {
  app.use('/api/organization', router);
};

router.post('/create', (req, res, next) => {
  let data = { 'organization': {
    'name': req.body.name,
    'admins': [req.user._id]
  }};
  OrganizationUtil.create(data, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});

router.post('/admins/add', (req, res, next) => {
  let data = { organization: {
    admins: [req.body.admins]
  }};
  OrganizationUtil.create(data, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});

router.post('/project/create', (req, res, next) => {
  let data = { 'organization': {
    '_id': req.body._id,
    'projects': {
      'accronym': req.body.accronym,
      'name': req.body.name,
      'description': req.body.description
    }
  }};
  if (req.body.restricted) {
    data.projects['teamleaders'] = [req.user._id];
    data.projects['users'] = [];
  }
  if (req.body.hours) { data.projects['hours'] = req.body.hours; }

  OrganizationUtil.projects.create(data, (o, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});

router.post('/timecode/create', (req, res, next) => {
  let data = { 'organization': {
    '_id': req.body._id,
    'timecodes': {
      'accronym': req.body.accronym,
      'name': req.body.name,
      'description': req.body.description
    }
  }};
  console.log(data);
  OrganizationUtil.timecodes.create(data, (o, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});
