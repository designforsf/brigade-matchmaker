var mongoose = require('mongoose')

var ptSchema = new mongoose.Schema({

});

var pSkills = {
  mainCat: ['Software Engineering', 'Design', 'Data Science'],
  subCat: {
    'Software Engineering': ['FrontEnd', 'BackEnd', 'Database'],
    Design: ['User Experience', 'Visual Design', 'Des3'],
    'Data Science': ['Analytics', 'Visualization']
  },
  details: {
    FrontEnd: ['html', 'css', 'javascript', 'Pug', 'Angular', 'React'],
    BackEnd: ['node', 'aaa', 'bbb', 'ccc', 'ddd', 'eee'],
    Database: ['mongo', 'aaa', 'bbb', 'ccc', 'ddd', 'eee'],
    'User Experience': ['aaaaaa','bbbbbb','cccccc'],
    'Visual Design': ['ssssss', 'ffffff','hhhhhh','jjjjjj'],
    Des3: ['vvvvvv','eeeeee'],
    Analytics: ['datasci1','datasci2','Python'],
    Visualization: ['Graphics','Python', "visualization"]
  }
};

ptSchema.methods.getSkills = function (cb) {
  return cb(null, pSkills);
}

var pInterests = {
  mainCat: ['Finance and economics', 'Environment', 'Health'],
  subCat: {
    'Finance and economics': ['economic development', 'Housing'],
    Environment: ['Climate change', 'Energy'],
    'Health': ['Mental health', 'Health care system', 'Public health']
  },
  details: {
    'Housing': ['housing', 'infrastructure'],
    'economic development': ['econ1', 'econ2'],
    'Climate change': ['climate1', 'climate2'],
    Energy: ['energy1', 'energy2'],
    'Mental health': ['aaaaaa','bbbbbb','cccccc'],
    'Visual Design': ['ssssss', 'ffffff','hhhhhh','jjjjjj'],
    'Health care system': ['vvvvvv','eeeeee'],
    'Public health': ['datasci1','datasci2','Python']
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
