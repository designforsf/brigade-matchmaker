var mongoose = require('mongoose')

var ptSchema = new mongoose.Schema({
  name: {type: String, default: ''},
  title: {type: String, default: ''},
  parent: {type: String, default: ''},
  className: {type: String, default: ''},
  synonyms: {type: Array, default: []}
});


/*
  top-level taxonomies
*/

ptSchema.methods.getTaxonomies = function (cb) {
  return cb(null, [
    {name: 'skills', synonyms: [], parent: undefined,
      title: 'Skills', className: 'Skills'},
    {name: 'interests', synonyms: [], parent: undefined,
      title: 'Civic Interests', className: 'Interests'},
    {name: 'goals', synonyms: [], parent: undefined,
      title: 'Volunteering Goals', className: 'Goals'},
  ]);
}


/*
  skills taxonomy
*/

ptSchema.methods.getSkills = function (cb) {
  return cb(null, [
    
    {name: 'skills', synonyms: [], parent: undefined,
      title: 'Skills'},
    
    {name: 'non-technical', synonyms: ['general'], parent: 'skills',
      title: 'Non-Technical Skills'},

    {name: 'advocacy', synonyms: ['activism'], parent: 'non-technical'},
    {name: 'writing', synonyms: ['copy'], parent: 'non-technical'},

    {name: 'office', synonyms: ['general'], parent: 'skills',
      title: 'Office'},

    {name: 'cms', synonyms: ['content-management'], parent: 'office'},
    {name: 'ms-word', synonyms: ['word'], parent: 'office'},
    {name: 'ms-excel', synonyms: ['excel'], parent: 'office'},

    {name: 'client-dev', synonyms: ['client'], parent: 'skills',
      title: 'Client-Side Development'},

    {name: 'android', synonyms: [], parent: 'client-dev'},
    {name: 'html-css', synonyms: ['css','html'], parent: 'client-dev'},
    {name: 'ios', synonyms: ['iphone'], parent: 'client-dev'},
    {name: 'javascript', synonyms: ['js'], parent: 'client-dev'},
    {name: 'uxr', synonyms: ['usability'], parent: 'client-dev'},

    {name: 'server-dev', synonyms: ['server','back-end'], parent: 'skills',
      title: 'Server-Side Dev'},

    {name: 'mongodb', synonyms: ['mongo'], parent: 'server-dev'},
    {name: 'mysql', synonyms: ['mysql-server'], parent: 'server-dev'},
    {name: 'nodejs', synonyms: ['node'], parent: 'server-dev'},
    {name: 'python', synonyms: ['py'], parent: 'server-dev'},
    {name: 'rails', synonyms: ['ruby-on-rails'], parent: 'server-dev'},
    {name: 'ruby', synonyms: [], parent: 'server-dev'},

    {name: 'data-sci', synonyms: ['data-science'], parent: 'skills',
      title: 'Data Sciences'},

    {name: 'machine-learning', synonyms: [], parent: 'data-sci'},
    {name: 'optimization-modeling', synonyms: [], parent: 'data-sci'},
    {name: 'predictive-modeling', synonyms: [], parent: 'data-sci'},
    {name: 'python', synonyms: ['py'], parent: 'data-sci'},
    {name: 'statistics', synonyms: ['stats'], parent: 'data-sci'},
    {name: 'vizualization', synonyms: ['visualization'], parent: 'data-sci'},

  ]);
}


/*
  skills taxonomy
*/

ptSchema.methods.getInterests = function (cb) {
  return cb(null, [
    
    {name: 'interests', synonyms: [], parent: undefined,
      title: 'Interests'},
    
    {name: 'homelessness', synonyms: [], parent: 'interests'},
    {name: 'housing', synonyms: [], parent: 'interests'},
    {name: 'infrastructure', synonyms: [], parent: 'interests'},
    {name: 'fire', synonyms: [], parent: 'interests'},
    {name: 'police', synonyms: [], parent: 'interests'},
  ]);
}


/*
  skills taxonomy
*/

ptSchema.methods.getGoals = function (cb) {
  return cb(null, [
    
    {name: 'goals', synonyms: [], parent: undefined,
      title: 'Goals'},
    
    {name: 'learn', synonyms: [], parent: 'goals'},
    {name: 'lead', synonyms: ['manage'], parent: 'goals'},
    {name: 'develop', synonyms: ['code'], parent: 'goals'},
    {name: 'help', synonyms: ['assist'], parent: 'goals'},
    {name: 'initiate', synonyms: ['pitch'], parent: 'goals'},
    {name: 'network', synonyms: [''], parent: 'goals'},
  ]);
}

module.exports = mongoose.model('ProjectTaxonomies', ptSchema)
