var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  message : String,
  messageReceived : Date,
  messageSent : Date, 
});

module.exports = mongoose.model('Message', messageSchema);
