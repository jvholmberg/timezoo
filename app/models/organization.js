var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: { type: String, default: '' },
  nameUnique: { type: String, default: '' },
  users: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  projects: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  timecodes: { type: [mongoose.Schema.Types.ObjectId], default: [] }
});



mongoose.model('Organization', OrganizationSchema);
