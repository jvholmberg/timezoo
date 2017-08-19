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
    users: [mongoose.Schema.Types.ObjectId],
    restricted: { type: String, default: false }
  }],
  timecodes: [{
    accronym: { type: String, default: '' },
    name: { type: String, default: '' },
    description: { type: String, default: '' }
  }],
  subscription: {
    active: { type: Boolean, default: false },
    startDate: Date,
    endDate: Date,
  }
});

/*

  TODO: Update this section

  @unrestrictedProjects: This is the projects that everyone can report to
  in an organization they usually have no timeframe for example
  "Internal Training" but in a smaller organization where the entire organization
  works as a single unit this may be used for customer work aswell.

  @restrictedProjects: This is the projects being worked on by a designated team.
  It's only the members of the team which are allowed to report on the project.
  This will often be used for customer work in a larger organization and most
  certainly never used in a smaller organization since there isnt enough employees.

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
