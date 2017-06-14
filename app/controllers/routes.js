var express = require('express'),
  router = express.Router(),
  OrganizationUtil = require('../utils/organization'),
  ProjectUtil = require('../utils/project'),
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
  OrganizationUtil.getRecordsForUser(req.user._id, (docs, msg) => {
    res.render('dashboard', {
      organizations: docs,
      success: req.flash('success'),
      error: req.flash('error')
    });
  }, (err) => {
    req.flash('error');
    res.redirect('/');
  });
});
router.get('/time/:orgNU', (req, res, next) => {
  if (!req.user) { return res.redirect('/login'); }
  let data = { userId: req.user.id, orgNU: req.params.orgNU };
  TimeUtil.getRecordsInOrgForUser(data, (docs, msg) => {
    res.render('time', {
      times: docs,
      success: req.flash('success'),
      error: req.flash('error')
    });
  }, (err) => {
    req.flash('error');
    res.redirect('/');
  });

});
