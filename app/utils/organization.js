var mongoose = require('mongoose'),
  Organization = mongoose.model('Organization'),
  OrganizationName = mongoose.model('OrganizationName');

module.exports = {
  createRecord: (data, cb, ecb) => {
    var query = { '_id': data.name },
      update = { '$inc' : {'count' : 1}},
      options = { 'upsert': true, 'new': true };

    OrganizationName.findOneAndUpdate(query, update, options, (err, doc1) => {
      if (err) { return ecb('An internal error occurred'); }
      query = { 'name': doc1._id, 'nameUnique': doc1._id + '-'+ doc1.count };

      Organization.create(query, (err, doc2) => {
        if (err) { return ecb('An internal error occurred'); }
        if (doc2.users.push(data.userId) == 1) {
          doc2.save();
          return cb(doc2);
        }
        return ecb('An internal error occurred');
      });
    });
  },
  getRecordsForUser: (userId, cb, ecb) => {
    Organization.find({
      users: userId
    }, (err, docs) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(docs);
    });
  }
};
