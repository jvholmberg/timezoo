var mongoose = require('mongoose'),
  Organization = mongoose.model('Organization'),
  OrganizationName = mongoose.model('OrganizationName');

module.exports = {

  /*
    @Working:
    create
    unrestrictedProjects.create
    restrictedProjects.create
  */

  create: (data, cb, ecb) => {

    // Get nameUnique by quering OrganizationName collection
    OrganizationName.findOneAndUpdate(
      { '_id': data.name },
      { '$inc' : { 'count' : 1 } },
      { 'upsert': true, 'new': true },
      (err, on) => {
        if (err) { return ecb('An internal error occurred'); }

        // Create Organization
        Organization.create(
          {
            'name': on._id,
            'nameUnique': on._id + '-'+ on.count
          }, (err, o) => {
            if (err) { return ecb('An internal error occurred'); }
            o.admins.push(data.admins[0])
            o.save();
            return cb(o);
          }
        );
      }
    );
  },
  getByUserId: (data, cb, ecb) => {
    Organization.find({ '$or': [
      { 'admins': data._id },
      { 'users': data._id },
    ] }, (err, orgs) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(orgs);
    });
  },
  unrestrictedProjects: {
    create: (data, cb, ecb) => {
      Organization.findOneAndUpdate(
        { '_id': data._id },
        { '$push': { 'unrestrictedProjects': {
          'accronym': data.unrestrictedProjects.accronym,
          'name': data.unrestrictedProjects.name,
          'description': data.unrestrictedProjects.description
        } } },
        { 'upsert': true, 'new': true },
        (err, o) => {
          if (err) { return ecb('An internal error occurred'); }
          return cb (o);
        }
      );
    },
    update: (data, cb, ecb) => {
      Organization.findOneAndUpdate(
        {
          '_id': data._id,
          'unrestrictedProjects._id': data.unrestrictedProjects._id
        },
        { '$set': { 'unrestrictedProjects': {
          'unrestrictedProjects.$.accronym': data.unrestrictedProjects.accronym,
          'unrestrictedProjects.$.name': data.unrestrictedProjects.name,
          'unrestrictedProjects.$.description': data.unrestrictedProjects.description
        } } },
        { 'upsert': false, 'new': true },
        (err, o) => {
          if (err) { return ecb('An internal error occurred'); }
          return cb (o);
        }
      );
    },
    delete: (data, cb, ecb) => {
      Organization.findOneAndUpdate(
        { '_id': data._id },
        { '$pull': { 'unrestrictedProjects': {
          '_id': data.unrestrictedProjects._id
        } } },
        { 'upsert': false, 'new': true },
        (err, o) => {
          if (err) { return ecb('An internal error occurred'); }
          return cb (o);
        }
      );
    }
  },
  restrictedProjects: {
    create: (data, cb, ecb) => {
      Organization.findOneAndUpdate(
        { '_id': data._id },
        { '$push': { 'restrictedProjects': {
          'accronym': data.restrictedProjects.accronym,
          'name': data.restrictedProjects.name,
          'description': data.restrictedProjects.description,
          'hours': data.restrictedProjects.hours,
          'admins': data.restrictedProjects.admins,
          'users': data.restrictedProjects.users
        } } },
        { 'upsert': true, 'new': true },
        (err, o) => {
          if (err) { return ecb('An internal error occurred'); }
          return cb (o);
        }
      );
    }
  }
};
