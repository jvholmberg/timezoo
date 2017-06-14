var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  organization: mongoose.Schema.Types.ObjectId,
  project: mongoose.Schema.Types.ObjectId
});



mongoose.model('Invitation', InvitationSchema);
