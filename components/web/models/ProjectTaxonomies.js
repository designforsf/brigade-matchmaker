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
    FrontEnd: ['html', 'css', 'Javascript', 'Pug', 'Angular', 'React'],
    BackEnd: ['Node.js', 'aaa', 'bbb', 'ccc', 'ddd', 'eee'],
    Database: ['Mongo', 'aaa', 'bbb', 'ccc', 'ddd', 'eee'],
    'User Experience': ['aaaaaa','bbbbbb','cccccc'],
    'Visual Design': ['ssssss', 'ffffff','hhhhhh','jjjjjj'],
    Des3: ['vvvvvv','eeeeee'],
    Analytics: ['datasci1','datasci2','Python'],
    Visualization: ['Graphics','Python']
  }
};

ptSchema.methods.getSkills = function (cb) {
  return cb(null, pSkills);
}

ptSchema.methods.getInterests = function (cb) {
  return cb(null, [
    {name: 'homelessness', synonyms: []},
    {name: 'housing', synonyms: []},
    {name: 'infrastructure', synonyms: []},
    {name: 'fire', synonyms: []},
    {name: 'police', synonyms: []},
    {name: 'police', synonyms: []},
    {name: 'criminal-justice', synonyms: []},
  ]);
}
//Added several synonyms for testing
ptSchema.methods.getGoals = function (cb) {
  return cb(null, [
    {name: 'learn', synonyms: []},
    {name: 'lead', synonyms: ['manage']},
    {name: 'develop', synonyms: ['code']},
    {name: 'help', synonyms: ['coach']},
    {name: 'initiate', synonyms: ['']},
  ]);
}

module.exports = mongoose.model('ProjectTaxonomies', ptSchema)
