var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  bcrypt = require('bcryptjs');

module.exports = {
  create: (body, cb, ecb) => {
    if (body.password !== body.password2) {
      return ecb('Passwords does not match');
    }
    User.findOne({ username: body.username }, (err, user) => {
      if (err) {
        return ecb('An internal error occurred');
      }
      if (user) {
        return ecb('Username is already taken');
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.password, salt, (err, hash) => {
          if (err) {
            return ecb('An internal error occurred');
          }
          User.create({
            username: body.username,
            password: hash
          }, (err, newUser) => {
            if (err) {
              return ecb('An internal error occurred when creating user');
            }
            return cb(newUser);
          });
        });
      });
    });
  },
  addToOrganization: (data, cb, ecb) => {
    User.findOneAndUpdate(
      { '_id': data.user._id },
      { '$push': { 'organizations': data.organization._id } },
      { 'upsert': true, 'new': true },
      (err, user) => {
        if (err) { return ecb('An internal error occurred'); }
        return cb(user);
      }
    );
  }
};
