var mongoose = require('mongoose')
var _ = require('lodash')
var linkHeaderParser = require('link-header-parser')
var Users = require('./Users')
var defaultHeaders = require('../lib/defaultGithubAPIHeaders')
var slug = require('slug')

var projectsSchema = new mongoose.Schema({
  id: {type: String, default: ''}, // this is the slug - civic.sf.json + civic.dc.json
  brigade: {type: String, default: ''}, // this is the brigade the project currently belongs to - civic.sf.json

  /* Standard BetaNYC civic.json, used by CFAPI */

  status: {type: String, default: ''}, // civic.json + civic.dc.json - proposed, ideation, alpha, beta, production, archival
  thumbnailUrl: {type: String, default: 'http://i.imgur.com/MRgvL1K.png'},
  bannerUrl: {type: String, default: 'http://i.imgur.com/MRgvL1K.png'},
  bornAt: {type: String, default: ''},
  geography: {type: String, default: ''},
  politicalEntity: {type: String, default: ''},
  type: {type: String, default: ''},
  needs: {type: Array, default: []},
  categories: {type: Array, default: []},

  matchingConfig: {
    interests: {type: Array, default: []},
    skillsNeeded: {type: Array, default: []}, // for members to contribute
    skillsOffered: {type: Array, default: []}, // for members to learn
    goalsNeeded: {type: Array, default: []}
  },

  matchingDescr: {
    thumbnailUrl: {type: String, default: ''},
    summary: {type: String, default: ''},
    contactName: {type: String, default: ''},
    contactEmail: {type: String, default: ''},
    contactRole: {type: String, default: ''},
    contactThumbnailUrl: {type: String, default: ''},
    tasks: {type: Array, default: []},
    progress: {type: Array, default: []},
    repository: {type: String, default: ''},
    link: {type: String, default: ''},
  },

  /* Expanded Open DC civic.json */

  // id: {type:String, default:''}, // represented above
  name: {type: String, default: ''}, // Display title
  description: {type: String, default: ''},
  content: {type: String, default: ''},
  license: {type: String, default: ''},
  // status: {type:String, default:''}, // represented above
  homepage: {type: String, default: ''},
  repository: {type: String, default: ''},
  githubSlug: {type: String, default: ''},
  contact: {type: Array, default: []},
  team: {type: Array, default: []},
  partners: {type: Array, default: []}, // name, email, logo?
  data: {type: Array, default: []},
  keywords: {type: Array, default: []}, // simple strings
  links: {type: Array, default: []}, // simple strings
  videos: {type: Array, default: []},
  published: {type: Boolean, default: true}
})

/*
  prepareResultForJsonAPI
  prepareResultsForJsonAPI
*/

projectsSchema.statics.prepareResultForJsonAPI = function(result) {
  var project = result.toObject();

  var project = result.toObject();

  // re-name fields for EmberJS/JSON-API conformance
  project['matching-descr'] = project.matchingDescr;
  if (typeof project['matching-descr'] !== 'undefined') {
    project['matching-descr'] = {};
  }
  delete project.matchingDescr;
  project.id = project['_id'];

  return {
    type: "project",
    id: result._id,
    attributes: project
  };

};

projectsSchema.statics.prepareResultForJsonAPI = function(results, cb) {
  var projects = [];
  results.forEach(function(result) {
    var project = result.toObject();
    projects.push(project);
  });
  cb(projects);
};

module.exports = mongoose.model('Projects', projectsSchema)
