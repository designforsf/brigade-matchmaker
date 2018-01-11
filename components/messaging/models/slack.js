var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection to database successful');
});

var slackSchema = mongoose.Schema({
  id: String,
  slackName: String,
  slackId: String,
  slackDm: String,
  project: String
});

var Slack = mongoose.model('Slack', slackSchema);
