var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
  interests: {type: Array, default: []}, // array of objects
  skills: {type: Array, default: []}, // array of objects
  roles: {type: Array, default: []}, // array of objects
});

module.exports = mongoose.model('ProjectMatchConfigs', schema);
