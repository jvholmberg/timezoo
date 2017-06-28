var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: { type: String, default: '' },
  nameUnique: { type: String, default: '' },
  admins: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  users: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  unrestrictedProjects: [{
    name: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  restrictedProjects: [{
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    hours: { type: Number, default: 0 },
    admins: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    users: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  }],
  timecodes: [{
    accronym: { type: String, default: '' },
    name: { type: String, default: '' },
    description: { type: String, default: '' }
  }]
});

/*

  @unrestrictedProjects: This is the projects that has no timeframe, all users
  in the organization can report on them. For example "Internal Training",
  this is something that has no timeframe and all employees should be able to
  report to at any given time.

  @restrictedProjects: This is the active projects being worked on during a
  timeframe. These projects also have a designated team which are allowed to
  report on them.

  @timecodes: Timecodes are global for organization. In the scenario
  of organization being in the tech sector examples of timecodes would be
  as follows below. These should be well thought of and generic enough to be
  be applied in every department of the Organization.

  Requirement analysis,
  Internal meeting,
  External Meeting,
  Administration,
  Application Engineering,
  Deployment preparation,
  Troubleshooting
*/

mongoose.model('Organization', OrganizationSchema);
