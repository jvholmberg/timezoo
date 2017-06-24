var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  hours: { type: Number, default: 0 },
  users: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  timecodes: { type: [mongoose.Schema.Types.ObjectId], default: [] }
});

mongoose.model('Project', ProjectSchema);
