var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  nameUnique: { type: String, default: '' },
  admins: [mongoose.Schema.Types.ObjectId],
  projects: [{
    accronym: { type: String, default: '' },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    hours: Number,
    teamleaders: [mongoose.Schema.Types.ObjectId],
    users: [mongoose.Schema.Types.ObjectId]
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
  Project Meeting,
  Administration,
  Application Engineering,
  Deployment preparation,
  Troubleshooting
*/

mongoose.model('Organization', OrganizationSchema);
