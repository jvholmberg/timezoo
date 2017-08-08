var mongoose = require('mongoose'),
  Time = mongoose.model('Time');

module.exports = {
  create: (data, cb, ecb) => {
    Time.create({
      user: data.user._id,
      organization: data.organization._id,
      project: data.organization.projects._id,
      timecode: data.organization.timecodes._id,
      description: data.time.description,
      timestamp: data.time.timestamp,
      hours: data.time.hours
    }, (err, doc) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(doc);
    });
  },
  getRecordsInOrgForUser: (data, cb, ecb) => {
    Time.find({
      _user: data.userId,
      _organization: data.orgId
    }, (err, docs) => {
      if (err) {
        return ecb('An internal error occurred');
      }
      return cb(docs);
    });
  }
};
