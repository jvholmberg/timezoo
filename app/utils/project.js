var mongoose = require('mongoose'),
  Project = mongoose.model('Project');

module.exports = {
  createRecord: (data, cb, ecb) => {
    var query = {
      'name': data.name,
      'description': data.description,
      'hours': data.hours,
      'organization': mongoose.Types.ObjectId(data.orgId),

      projects: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    };
    Project.create(query, (err, doc) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(doc);
    });
  },
  getRecordsInOrgForUser: (query) => {

  }
};
