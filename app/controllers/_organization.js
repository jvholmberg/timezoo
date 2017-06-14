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
    userId: req.user._id
  };
  OrganizationUtil.createRecord(data, (doc, msg) => {
    res.redirect('/dashboard');
  }, (err) => {
    req.flash('error');
    res.redirect('/dashboard');
  });
});
