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
  , mop = require('./MessageObjectParse.js')
  , mongoose = require('mongoose')
  , Message = require('./models/MessageQueue.js')
  , CronJob = require('cron').CronJob;
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
      var slackId =  // enter ID here
      web.chat.postMessage(slackId, 'You have received a message from a new user!', {
        as_user: false,
        username: 'new user bot',
        icon_url: 'https://avatars.slack-edge.com/2018-02-03/309655411173_c89e1a8aae565b88b419_72.png',
        attachments: [
          {
            "color": "#36a64f",
            "text": messageToSend
          }
        ]
      }, function (err, res) {
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
    }
  });

});

var server = app.listen(process.env.NODE_PORT || config.web.port, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Express 4 server listening at http://%s:%s', host, port);
});
