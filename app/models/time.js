var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TimeSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  organization: mongoose.Schema.Types.ObjectId,
  project: mongoose.Schema.Types.ObjectId,
  timecode: mongoose.Schema.Types.ObjectId,
  description: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  hours: { type: Number, default: 0 }
});


mongoose.model('Time', TimeSchema);
