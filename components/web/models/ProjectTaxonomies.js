var mongoose = require('mongoose')

var ptSchema = new mongoose.Schema({

});

var pSkills = {
  mainCat: ['SW'], // only a placeholde in v02 draft taxonomy, which is only two levels
  subCat: {
    'SW': ['Frontend dev', 'Backend dev', 'Full-stack dev', 'QA', 'DevOps', 'Mobile dev']
  },
  details: {
    'Frontend dev': ['html', 'css', 'JavaScript', 'D3', 'React', 'Data visualization', 'Other'],
    'Backend dev': ['Express', 'node', 'mongo','SQL'],
    'Data Science': ['Analytics', 'Visualization'],
    'Full-stack dev': ['Distributed systems'],
    'QA': ['Automated testing','Manual testing'],
    'DevOps': ['Amazon web services', 'Azure', 'Google Cloud', 'Cloud services'],
    'Mobile dev': ['ios', 'Objective-C', 'Swift', 'Android']
  }
};

ptSchema.methods.getSkills = function (cb) {
  return cb(null, pSkills);
};

var pInterests = {
  mainCat: [' '],
  subCat: {
    ' ': ['Economic development', 'Environment', 'Health']
  },
  details: {
    'Economic development': ['Economic development', 'housing', 'infrastructure'],
    'Environment': ['Climate change', 'Energy'],
    'Health': ['Mental health', 'Health care system', 'Public health']
  }
};

ptSchema.methods.getInterests = function (cb) {
  return cb(null, pInterests);
}

var pGoals = {
  mainCat: ['Create housing', 'Protect the environment'],
  subCat: {
    'Create housing': ['End homelessness'],
    'Protect the environment': ['Create renewables', 'Plant trees']
  },
  details: {
    'End homelessness': ['infrastructure', 'housing','low-income financing', 'City approvals'],
    'Create renewables': ['Float bonds','State funding','cccccc'],
    'Plant trees': ['Identify best types', 'ffffff','hhhhhh','jjjjjj']
  }
};

//Added several synonyms for testing
ptSchema.methods.getGoals = function (cb) {
  return cb(null, pGoals);
}

module.exports = mongoose.model('ProjectTaxonomies', ptSchema)
