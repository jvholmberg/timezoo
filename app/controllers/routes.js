var express = require('express'),
  router = express.Router(),
  OrganizationUtil = require('../utils/organization'),
  TimeUtil = require('../utils/time');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.render('index', {});
});

/*
* @note: Only accessible when not signed in
*/
router.get('/register', (req, res, next) => {
  if (req.user) { return res.redirect('/dashboard'); }
  res.render('register', {
    success: req.flash('success'),
    error: req.flash('error')
  });
});
router.get('/login', (req, res, next) => {
  if (req.user) { return res.redirect('/dashboard'); }
  res.render('login', {
    success: req.flash('success'),
    error: req.flash('error')
  });
});

/*
* @note: Only accessible when signed in
*/
router.get('/dashboard', (req, res, next) => {
  if (!req.user) { return res.redirect('/login'); }
  let data = { user: { organizations: req.user.organizations } };
  OrganizationUtil.getAll(data, (orgs, msg) => {
    res.render('dashboard', {
      organizations: orgs,
      success: req.flash('success'),
      error: req.flash('error')
    });
  }, (err) => {
    req.flash('error');
    res.redirect('/');
  });
});
router.get('/:orgNameUnique/time', (req, res, next) => {
  if (!req.user) { return res.redirect('/login'); }
  let data = { 'organization': { nameUnique: req.params.orgNameUnique } };

  OrganizationUtil.getByNameUnique(data, (org, msg) => {
    res.render('time', {
      nameUnique: org.nameUnique,
      projects: org.projects,
      timecodes: org.timecodes,
      success: req.flash('success'),
      error: req.flash('error')
    });
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});
