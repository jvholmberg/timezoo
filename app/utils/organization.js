var mongoose = require('mongoose'),
  Organization = mongoose.model('Organization'),
  OrganizationName = mongoose.model('OrganizationName'),
  User = mongoose.model('User');

module.exports = {

  create: (data, cb, ecb) => {

    // Create nameUnique by quering OrganizationName collection
    OrganizationName.findOneAndUpdate(
      { '_id': data.organization.name },
      { '$inc' : { 'count' : 1 } },
      { 'upsert': true, 'new': true },
      (err, organizationName) => {
        if (err) { return ecb('An internal error occurred'); }

        // Create Organization
        Organization.create(
          {
            'name': organizationName._id,
            'nameUnique': organizationName._id + '-'+ organizationName.count
          }, (err, organization) => {
            if (err) { return ecb('An internal error occurred'); }
            organization.admins.push(data.organization.admins[0])
            organization.save();

            // Add Organization to User
            User.findOneAndUpdate(
              { '_id': data.organization.admins[0]},
              { '$push': { 'organizations': organization._id } },
              { 'upsert': true, 'new': true },
              (err, user) => {
                if (err) { return ecb('An internal error occurred'); }
                return cb(organization);
              }
            );
          }
        );
      }
    );
  },
  update: (data, cb, ecb) => {

  },
  delete: (data, cb, ecb) => {

  },
  getOne: (data, cb, ecb) => {
    Organization.findOne({ '_id': { '$in': data.organization._id } }, (err, organization) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(organization);
    });
  },
  getAll: (data, cb, ecb) => {
    Organization.find({ '_id': { '$in': data.user.organizations } }, (err, organizations) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(organizations);
    });
  }
};





































//
//   getForUser: (data, cb, ecb) => {
//     Organization.find({ 'admins': data.user._id }, (err, orgs) => {
//       if (err) { return ecb('An internal error occurred'); }
//       console.log(orgs);
//       return cb(orgs);
//     });
//   },
//   getByInternalId: (data, cb, ecb) => {
//     Organization.findOne({ '_id': data._id }, (err, o) => {
//       if (err) { return ecb('An internal error occurred'); }
//       return cb(o);
//     });
//   },
//   getByNameUnique: (data, cb, ecb) => {
//     // Organization.findOne({ 'nameUnique': data.nameUnique }, (err, o) => {
//     //   if (err) { return ecb('An internal error occurred'); }
//     //   return cb(o);
//     // });
//   },
//
//   projects: {
//     create: (data, cb, ecb) => {
//       Organization.findOneAndUpdate(
//         { '_id': data._id },
//         { '$push': { 'projects': {
//           'accronym': data.projects.accronym,
//           'name': data.projects.name,
//           'description': data.projects.description,
//           'hours': data.projects.hours,
//           'admins': data.projects.admins,
//           'users': data.projects.users
//         } } },
//         { 'upsert': true, 'new': true },
//         (err, o) => {
//           if (err) { return ecb('An internal error occurred'); }
//           return cb (o);
//         }
//       );
//     }
//   },
//
//   unrestrictedProjects: {
//     create: (data, cb, ecb) => {
//       Organization.findOneAndUpdate(
//         { '_id': data._id },
//         { '$push': { 'unrestrictedProjects': {
//           'accronym': data.unrestrictedProjects.accronym,
//           'name': data.unrestrictedProjects.name,
//           'description': data.unrestrictedProjects.description
//         } } },
//         { 'upsert': true, 'new': true },
//         (err, o) => {
//           if (err) { return ecb('An internal error occurred'); }
//           return cb (o);
//         }
//       );
//     },
//     update: (data, cb, ecb) => {
//       Organization.findOneAndUpdate(
//         {
//           '_id': data._id,
//           'unrestrictedProjects._id': data.unrestrictedProjects._id
//         },
//         { '$set': { 'unrestrictedProjects': {
//           'unrestrictedProjects.$.accronym': data.unrestrictedProjects.accronym,
//           'unrestrictedProjects.$.name': data.unrestrictedProjects.name,
//           'unrestrictedProjects.$.description': data.unrestrictedProjects.description
//         } } },
//         { 'upsert': false, 'new': true },
//         (err, o) => {
//           if (err) { return ecb('An internal error occurred'); }
//           return cb (o);
//         }
//       );
//     },
//     delete: (data, cb, ecb) => {
//       Organization.findOneAndUpdate(
//         { '_id': data._id },
//         { '$pull': { 'unrestrictedProjects': {
//           '_id': data.unrestrictedProjects._id
//         } } },
//         { 'upsert': false, 'new': true },
//         (err, o) => {
//           if (err) { return ecb('An internal error occurred'); }
//           return cb (o);
//         }
//       );
//     }
//   },
//   restrictedProjects: {
//     create: (data, cb, ecb) => {
//       Organization.findOneAndUpdate(
//         { '_id': data._id },
//         { '$push': { 'restrictedProjects': {
//           'accronym': data.restrictedProjects.accronym,
//           'name': data.restrictedProjects.name,
//           'description': data.restrictedProjects.description,
//           'hours': data.restrictedProjects.hours,
//           'admins': data.restrictedProjects.admins,
//           'users': data.restrictedProjects.users
//         } } },
//         { 'upsert': true, 'new': true },
//         (err, o) => {
//           if (err) { return ecb('An internal error occurred'); }
//           return cb (o);
//         }
//       );
//     }
//   }
// };
