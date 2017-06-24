var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  organization: mongoose.Schema.Types.ObjectId,
  project: mongoose.Schema.Types.ObjectId,
  total: { type: Number, default: 0 },
  debitable: { type: Boolean, default: false }
});



mongoose.model('Expense', ExpenseSchema);
