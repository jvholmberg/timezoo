var mongoose = require('mongoose'),
  Timecode = mongoose.model('Timecode');

module.exports = {
  createRecord: (data, cb, ecb) => {
    Timecode.create({
      'shortname': data.shortname,
      'fullname': data.fullname,
      'description': data.description
    }, (err, doc) => {
      console.log(err);
      if (err) { return ecb('An internal error occurred'); }
      return cb(doc);
    });
  },
  getRecords: (data, cb, ecb) => {
    Timecode.find({}, (err, docs) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(docs);
    });
  }
};
