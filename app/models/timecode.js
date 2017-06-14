var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TimecodeSchema = new Schema({
  shortname: { type: String, default: '' },
  fullname: { type: String, default: '' },
  description: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  organization: mongoose.Schema.Types.ObjectId
});

mongoose.model('Timecode', TimecodeSchema);
