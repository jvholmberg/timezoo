var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
});

mongoose.model('User', UserSchema);
