var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TimecodeSchema = new Schema({
  shortname: { type: String, default: '' },
  fullname: { type: String, default: '' },
  description: { type: String, default: '' }
});

mongoose.model('Timecode', TimecodeSchema);
