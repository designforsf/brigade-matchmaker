var mongoose = require('mongoose')

var ptSchema = new mongoose.Schema({

});

ptSchema.methods.getSkills = function (cb) {
  return cb(null, [
    {name: 'non-technical', synonyms: ['general'], parent: undefined,
      title: 'Non-Technical Skills'},
    
    {name: 'advocacy', synonyms: ['activism'], parent: 'non-technical'},
    {name: 'writing', synonyms: ['copy'], parent: 'non-technical'},
    
    {name: 'office', synonyms: ['general'], parent: undefined,
      title: 'Office'},
    
    {name: 'cms', synonyms: ['content-management'], parent: 'office'},
    {name: 'ms-word', synonyms: ['word'], parent: 'office'},
    {name: 'ms-excel', synonyms: ['excel'], parent: 'office'},
    
    {name: 'client-dev', synonyms: ['client'], parent: undefined,
      title: 'Client-Side Development'},
    
    {name: 'android', synonyms: [], parent: 'client-dev'},
    {name: 'html-css', synonyms: ['css','html'], parent: 'client-dev'},
    {name: 'ios', synonyms: ['iphone'], parent: 'client-dev'},
    {name: 'javascript', synonyms: ['js'], parent: 'client-dev'},
    {name: 'uxr', synonyms: ['usability'], parent: 'client-dev'},
  
    {name: 'server-dev', synonyms: ['server','back-end'], parent: undefined,
      title: 'Server-Side Dev'},
  
    {name: 'mongodb', synonyms: ['mongo'], parent: 'server-dev'},
    {name: 'mysql', synonyms: ['mysql-server'], parent: 'server-dev'},
    {name: 'nodejs', synonyms: ['node'], parent: 'server-dev'},
    {name: 'python', synonyms: ['py'], parent: 'server-dev'},
    {name: 'rails', synonyms: ['ruby-on-rails'], parent: 'server-dev'},
    {name: 'ruby', synonyms: [], parent: 'server-dev'},

    {name: 'data-sci', synonyms: ['data-science'], parent: undefined,
      title: 'Data Sciences'},

    {name: 'machine-learning', synonyms: [], parent: 'data-sci'},
    {name: 'optimization-modeling', synonyms: [], parent: 'data-sci'},
    {name: 'predictive-modeling', synonyms: [], parent: 'data-sci'},
    {name: 'python', synonyms: ['py'], parent: 'data-sci'},
    {name: 'statistics', synonyms: ['stats'], parent: 'data-sci'},
    {name: 'vizualization', synonyms: ['visualization'], parent: 'data-sci'},

  ]);
}

ptSchema.methods.getInterests = function (cb) {
  return cb(null, [
    {name: 'homelessness', synonyms: []},
    {name: 'housing', synonyms: []},
    {name: 'infrastructure', synonyms: []},
    {name: 'fire', synonyms: []},
    {name: 'police', synonyms: []},
  ]);
}

ptSchema.methods.getGoals = function (cb) {
  return cb(null, [
    {name: 'learn', synonyms: []},
    {name: 'lead', synonyms: ['manage']},
    {name: 'develop', synonyms: ['code']},
    {name: 'help', synonyms: ['assist']},
    {name: 'initiate', synonyms: ['pitch']},
    {name: 'network', synonyms: ['']},
  ]);
}

module.exports = mongoose.model('ProjectTaxonomies', ptSchema)
