/*
  Messaging Component: Web App
  key environment variables:
    NODE_ENV
*/

// node module dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const { WebClient } = require('@slack/client');
const credentials = require('./credentials.js');
const mop = require('./MessageObjectParse.js');
const mongoose = require('mongoose');
const Message = require('./models/MessageQueue.js');
const CronJob = require('cron').CronJob;

// access Slack API token
const token = process.env.SLACK_API_TOKEN || credentials.token;
const web = new WebClient(token);

// express app
const app = express();

// set up the environment-based config
const Config = require('./lib/Config.js');
const config = (new Config({ env: global.process.env.NODE_ENV })).config;

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

app.use(express.static(path.join(__dirname, 'public'), { }));

// Mongoose connection
const mongoDB = 'mongodb://localhost/test';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Mongoose connection to database successful');
});

/*

CronJob parameters:
1. seconds, 2. minutes, 3. hours, 4. days, 5. month, 6. day of the week

*/

var sendMessage = new CronJob('0 * * * * *', function() {
  Message.findOne({ 'messageSent': null }, 'message messageReceived messageSent', function (err, message) {
    if (err) return handleError(err);
    if (message !== null) {
      var messageToSend = message.message;
      var slackId =  message.slack; // testing channel is '#uxr-projectmatch-test';

      // color function cycles through colors array
      var colors = ['#36a64f', '#cf1b41', '#399fd3', '#6D6E71'];
      function color_cycle(arr) {
        var color = arr[0];
        arr.push(color);
        arr.shift();
      }
      color_cycle(colors);

      // API call to Slack
      web.chat.postMessage({
        channel: slackId,
        text: 'You have received a message from a new user!',
        as_user: false,
        username: 'new user bot',
        icon_url: 'https://avatars.slack-edge.com/2018-02-03/309655411173_c89e1a8aae565b88b419_72.png',
        attachments: [
          {
            "color": colors[0],
            "text": messageToSend
          }
        ]
      }).then((res) => {
        console.log('Message sent to Slack: ', res);
        message.messageSent = new Date();
        message.save(function (err, data) {
          if (err) console.log(err);
          else {
            console.log('Message sent, and entry updated: ', data );
          }
        });
      }).catch(console.error);
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

app.get('/messaging', function (req, res) {
  res.sendFile('index.html', { root: __dirname });
});

app.post('/messaging/api/message', function (req, res) {
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
