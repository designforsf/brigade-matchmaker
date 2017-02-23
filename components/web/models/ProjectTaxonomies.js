var mongoose = require('mongoose')

var ptSchema = new mongoose.Schema({
  
});

ptSchema.methods.getSkills = function () {
  return [
    {name: 'advocacy', synonyms: ['activism']},
    {name: 'writing', synonyms: ['copy']},
    {name: 'uxr', synonyms: ['usability']},
    {name: 'javascript', synonyms: ['js']},
    {name: 'node', synonyms: ['node.js']},
    {name: 'python', synonyms: ['py']},
  ];
}

ptSchema.methods.getInterests = function () {
  return [
    {name: 'homelessness', synonyms: []},
    {name: 'housing', synonyms: []},
    {name: 'infrastructure', synonyms: []},
    {name: 'fire', synonyms: []},
    {name: 'police', synonyms: []},
  ];
}

ptSchema.methods.getGoals = function () {
  return [
    {name: 'learn', synonyms: []},
    {name: 'lead', synonyms: []},
    {name: 'manage', synonyms: []},
    {name: 'develop', synonyms: []},
    {name: 'help', synonyms: []},
    {name: 'initiate', synonyms: []},
  ];
}

module.exports = mongoose.model('ProjectTaxonomies', ptSchema)
