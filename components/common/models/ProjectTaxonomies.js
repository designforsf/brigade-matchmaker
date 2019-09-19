/* jshint esversion: 6 */

var mongoose = require('mongoose');

var ProjectTaxonomies = require('../../taxonomy/codeforsf/ProjectTaxonomies');
var pt = new ProjectTaxonomies();

var ptSchema = new mongoose.Schema({
  name: {type: String, default: ''},
  title: {type: String, default: ''},
  parent: {type: String, default: ''},
  className: {type: String, default: ''},
  synonyms: {type: Array, default: []}
});

ptSchema.methods.getTaxonomies = pt.getTaxonomies;
ptSchema.methods.getSkills = pt.getSkills;
ptSchema.methods.getInterests = pt.getInterests;

module.exports = mongoose.model('ProjectTaxonomies', ptSchema);
