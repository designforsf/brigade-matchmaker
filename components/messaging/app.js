/*
  Messaging Component: Web App

  key environment variables:
    NODE_ENV
*/

// node module dependencies
var express = require('express')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler')
  , WebClient = require('@slack/client').WebClient
  , credentials = require('./credentials.js')
<<<<<<< HEAD
  , mop = require('./MessageObjectParse.js')
  , mongoose = require('mongoose')
  , Message = require('./models/MessageQueue.js')
  , CronJob = require('cron').CronJob;
=======
  , mongoose = require('mongoose');
>>>>>>> c9dbb3f755837671927e87f54e6541671772c12c
;

// access Slack API token
var token = process.env.SLACK_API_TOKEN || credentials.token;
var web = new WebClient(token);

// express app
var app = express();

// set up the environment-based config
var Config = require('./lib/Config.js');
var config = (new Config({ env: global.process.env.NODE_ENV })).config;

// http configurations
app.set('port', config.web.port);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// development only
if (app.get('env') == 'development') {
  console.log('Running in developent mode!');

  app.use(errorHandler());
}

app.use(express.static(path.join(__dirname)));

// Mongoose connection
var mongoDB = 'mongodb://localhost/test';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Mongoose connection to database successful');
});

// CronJob parameter is 1. seconds, 2. minutes, 3. hours, 4. days, 5. month, 6. day of the week
var sendMessage = new CronJob('0 * * * * *', function() { // runs every minute when the second marker is at 0
  Message.findOne({ 'messageSent': null }, 'message messageReceived messageSent', function (err, message) {
    if (err) return handleError(err);
    if(message !== null) {
      var messageToSend = message.message;
      /* during testing phase the Slack ID needs to be filled out.
      In production we will retrieve this with an API call */
      var slackId = ''; // enter ID here
      web.chat.postMessage(slackId, messageToSend, function (err, res) {
        if (err) {
          console.log('Error: ', err);
        } else {
          console.log('Message sent to Slack: ', res);
          message.messageSent = new Date();
          message.save(function (err, data) {
            if (err) console.log(err);
            else {
              console.log('Message sent, and entry updated: ', data );
            }
          });
        }
      });
    }
  });
});

sendMessage.start();

var clearQueue = new CronJob('0 0 0 * * Sun', function() {
  Message.find({}).exec(function(err, message) {
    if (message !== null) {
      if (!err) {
        for (var i=0; i < message.length; i++) {
          if (message[i].messageSent !== null) {
            message[i].remove();
          }
        }
      } else {
        console.log(err);
      }
    }
  });
});


// routes
app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});
<<<<<<< HEAD

app.post('/', function (req, res) {
  var messageString = mop.parseObject(req.body);
  var message = new Message({
    message: messageString,
    messageReceived: new Date(),
    messageSent: ''
  });

  message.save(function (err, data) {
    if (err) console.log(err);
    else {
      console.log('Saved: ', data );
      res.send(data);
=======
// MESSAGING COMPONENT
app.post('/process-slackbot', function (req, res) {
  // collect user data
  var email = req.body.email;
  // test data
  var newUserName = 'John Doe';
  var project = 'User Research Project';
  var skills =  ['UX Design', 'Javascript-Front End', 'Python', 'Django'];
  var learn = ['Front-end dev', 'User research', 'HTML', 'UX Design'];
  var civic = ['Criminal justice', 'Homelessness', 'General help', 'Housing'];
  var teamLead = 'Jane Doe';

  var tester = new NewUser(newUserName, project, skills.toString(), learn.toString(), civic.toString());
// old message. see home.handlebars for what the current default message looks like.
  var message = `Hi ${teamLead},\n
                I'm a new member and I'm interested in working on your ${tester.project}\n
                My profile is appended below, and I can be reached at ${email}.\n
                - - -\n
                ${tester.name}\n
                Skills to contribute:\n
                ${tester.skills}\n
                Skills I hope to learn:\n
                ${tester.learn}\n
                Civic interests:\n
                ${tester.civic}`;
  // console.log what the bot message looks like
  console.log("slackbot message:\n", message);
  // what the API call looks like
  /*
  var dmId = '';
  webClient.chat.postMessage(dmId, message, function (err, res) {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('Message sent: ', res);
>>>>>>> c9dbb3f755837671927e87f54e6541671772c12c
    }
  });

});

var server = app.listen(process.env.NODE_PORT || config.web.port, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Express 4 server listening at http://%s:%s', host, port);
});
