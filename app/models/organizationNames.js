var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OrganizationNameSchema = new Schema({
  _id: {type: String, default: ''},
  count: { type: Number, default: 0 }
});

mongoose.model('OrganizationName', OrganizationNameSchema);
