var mongoose = require('mongoose'),
  Organization = mongoose.model('Organization'),
  OrganizationName = mongoose.model('OrganizationName');

// {
//   name: { type: String, default: '' },
//   nameUnique: { type: String, default: '' },
//   admins: { type: [mongoose.Schema.Types.ObjectId], default: [] },
//   users: { type: [mongoose.Schema.Types.ObjectId], default: [] },
//   unrestrictedProjects: [{
//     name: { type: String, default: '' },
//     description: { type: String, default: '' }
//   }],
//   restrictedProjects: [{
//     name: { type: String, default: '' },
//     description: { type: String, default: '' },
//     hours: { type: Number, default: 0 },
//     admins: { type: [mongoose.Schema.Types.ObjectId], default: [] },
//     users: { type: [mongoose.Schema.Types.ObjectId], default: [] },
//   }],
//   timecodes: [{
//     accronym: { type: String, default: '' },
//     name: { type: String, default: '' },
//     description: { type: String, default: '' }
//   }]
// }
module.exports = {
  create: (data, cb, ecb) => {

    // Get nameUnique by quering OrganizationName collection
    OrganizationName.findOneAndUpdate(
      { '_id': data.name },
      { '$inc' : {'count' : 1} },
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
            o.admins.push(data.userId)
            o.users.push(data.userId)
            o.save();
            return cb(o);
          }
        );
      }
    );
  },
  unrestrictedProjects: {
    create: (data, cb, ecb) => {
      Organization.findOneAndUpdate
    }
  }
};
