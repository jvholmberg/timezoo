var express = require('express'),
  router = express.Router(),
  OrganizationUtil = require('../utils/organization'),
  TimeUtil = require('../utils/time');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.render('index', {

  });
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
  // res.render('dashboard', {
  //   success: req.flash('success'),
  //   error: req.flash('error')
  // });
  let data = { _id: req.user._id };
  OrganizationUtil.getByUserId(data, (orgs, msg) => {
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
router.get('/time/:orgNameUnique', (req, res, next) => {
  // if (!req.user) { return res.redirect('/login'); }
  // let data = { userId: req.user.id, orgNameUnique: req.params.orgNameUnique };
  //
  // // Get Projects in Organization for User
  // ProjectUtil.getRecordsInOrgForUser(data, (projects, msg) => {
  //
  //   // Get Times in Organization for User
  //   TimeUtil.getRecordsInOrgForUser(data, (times, msg) => {
  //     res.render('time', {
  //       projects: projects,
  //       times: times,
  //       success: req.flash('success'),
  //       error: req.flash('error')
  //     });
  //   }, (err) => {
  //     req.flash('error');
  //     res.redirect('/');
  //   });
  // }, (err) => {
  //   req.flash('error');
  //   res.redirect('/');
  // });
});
