var mongoose = require('mongoose')

var ptSchema = new mongoose.Schema({

});

ptSchema.methods.getSkills = function (cb) {
  return cb(null, [
    {name: 'advocacy', synonyms: ['activism']},
    {name: 'writing', synonyms: ['copy']},
    {name: 'uxr', synonyms: ['usability']},
    {name: 'javascript', synonyms: ['js']},
    {name: 'node', synonyms: ['node.js']},
    {name: 'python', synonyms: []},
    {name: 'ruby', synonyms: []},
    {name: 'mongo', synonyms: ['mongodb']},
    {name: 'html', synonyms: []},
    {name: 'css', synonyms: []},
  ]);
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
