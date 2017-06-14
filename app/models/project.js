var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  hours: { type: Number, default: 0 },
  organization: mongoose.Schema.Types.ObjectId,
  timecodes: { type: [mongoose.Schema.Types.ObjectId], default: [] }
});

mongoose.model('Project', ProjectSchema);
