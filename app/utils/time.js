var mongoose = require('mongoose'),
  Time = mongoose.model('Time');

module.exports = {
  createRecord: (data, cb, ecb) => {
    Time.create({
      name: data.name
    }, (err, doc) => {
      if (err) {
        return ecb('An internal error occurred');
      }
      if (doc._users.push(data.userId) == 1) {
        doc.save();
        return cb(doc, 'Time created successfully');
      }
      return ecb('An internal error occurred');
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
