var mongoose = require('mongoose'),
  Organization = mongoose.model('Organization'),
  OrganizationName = mongoose.model('OrganizationName'),
  Invitation = mongoose.model('Invitation'),
  User = mongoose.model('User');

module.exports = {
  create: createOrganization,
  update: updateOrganization,
  delete: deleteOrganization,
  getById: getOrganizationById,
  getByNameUnique: getOrganizationByNameUnique,
  getAll: getOrganizationsForUser,
  projects: {
    create: createProject,
    getOne: getProject
  },
  timecodes: {
    create: createTimecode
  }
};

/*

  @fn: createOrganization()
  @modified: 170809
  @inParams:
  - data[organization][name]
  - data[organization][admins]
*/
function createOrganization(data, cb, ecb) {

  // Create nameUnique by quering OrganizationName collection
  OrganizationName.findOneAndUpdate(
    { '_id': data.organization.name },
    { '$inc' : { 'count' : 1 } },
    { 'upsert': true, 'new': true },
    (err, orgName) => {
      if (err) { return ecb('An internal error occurred'); }

      // Create Organization
      Organization.create(
        {
          'name': orgName._id,
          'nameUnique': orgName._id + '-'+ orgName.count,
          'admins': data.organization.admins
        }, (err, org) => {
          if (err) { return ecb('An internal error occurred'); }

          // Add Organization to User
          User.findOneAndUpdate(
            { '_id': data.organization.admins[0]},
            { '$push': { 'organizations': org._id } },
            { 'upsert': true, 'new': true },
            (err, user) => {
              if (err) { return ecb('An internal error occurred'); }
              return cb(org);
            }
          );
        }
      );
    }
  );
}
function updateOrganization(data, cb, ecb) {
  Organization.findOneAndUpdate(
    { '_id': data._id },
    { 'description': data.description },
    { 'upsert': false, 'new': true },
    (err, org) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb (org);
    }
  );
}
function deleteOrganization(data, cb, ecb) {
  console.log(data);
}
function getOrganizationById(data, cb, ecb) {
  Organization.findOne(
    { '_id': { '$in': data.organization._id } },
    (err, org) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(org);
    }
  );
}
function getOrganizationByNameUnique(data, cb, ecb) {
  Organization.findOne(
    { 'nameUnique': data.organization.nameUnique },
    (err, org) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(org);
    }
  );
}
function getOrganizationsForUser(data, cb, ecb) {
  Organization.find(
    { '_id': { '$in': data.user.organizations } },
    (err, orgs) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(orgs);
    }
  );
}

/*
  @fn: createProject()
  @modified: 170809
  @inParams:
  - data[organization][_id]
  - data[organization][projects][accronym]
  - data[organization][projects][name]
  - data[organization][projects][description]
  ? data[organization][projects][hours]
  ? data[organization][projects][teamleaders]
  ? data[organization][projects][users]
  ? data[organization][projects][restricted]
*/
function createProject(data, cb, ecb) {
  Organization.findOneAndUpdate(
    { '_id': data.organization._id },
    { '$push': { 'projects': data.organization.projects } },
    { 'upsert': true, 'new': true },
    (err, org) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb (org);
    }
  );
}
function getProject(data, cb, ecb) {
  Organization.findOne(
    { '_id': data._id },
    (err, org) => {
      if (err) { return ecb('An internal error occurred'); }
      for (let i = 0; i < org.projects.length; i++) {
        if (org.projects[i]._id === data.projects._id) {
          return cb(org.projects[i]);
        }
      }
      return ecb('Project not found');
    }
  );
}

function createTimecode(data, cb, ecb) {
  Organization.findOneAndUpdate(
    { '_id': data._id },
    { '$push': { 'timecodes': data.timecodes } },
    { 'upsert': true, 'new': true },
    (err, org) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb (org);
    }
  );
}






























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
