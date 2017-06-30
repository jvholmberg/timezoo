var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
  description: { type: String, default: '' },
  organizations: [mongoose.Schema.Types.ObjectId]
});

mongoose.model('User', UserSchema);
