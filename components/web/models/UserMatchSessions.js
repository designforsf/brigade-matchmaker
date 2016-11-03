var mongoose = require('mongoose');
var User = mongoose.model('User')

var schema = new mongoose.Schema({
  step: {type: String, default: null},
  startedAt: {type: Date, default: null},
  updatedAt: {type: Date, default: null},
  endedAt: {type: Date, default: null},
  isComplete: {type: Boolean, default: false},
  interests: {type: Array, default: []},
  skills: {type: Array, default: []},
  roles: {type: Array, default: []},
  initiatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('UserMatchSessions', schema);
