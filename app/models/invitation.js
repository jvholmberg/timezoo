var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InvitationSchema = new Schema({
  sentTo: mongoose.Schema.Types.ObjectId,
  sentFrom: mongoose.Schema.Types.ObjectId,
  organization: mongoose.Schema.Types.ObjectId,
  project: mongoose.Schema.Types.ObjectId,
  role: String
});
mongoose.model('Invitation', InvitationSchema);
