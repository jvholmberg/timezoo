var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectHistorySchema = new Schema({
  organization: mongoose.Schema.Types.ObjectId,
  accronym: { type: String, default: '' },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  hours: Number,
  teamleaders: [mongoose.Schema.Types.ObjectId],
  users: [mongoose.Schema.Types.ObjectId],
  restricted: { type: String, default: false }
});

mongoose.model('ProjectHistory', ProjectHistorySchema);
