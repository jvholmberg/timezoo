var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'timezoo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/timezoo-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'timezoo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/timezoo-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'timezoo'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/timezoo-production'
  }
};

module.exports = config[env];
