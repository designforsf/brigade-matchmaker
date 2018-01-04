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
  , multer = require('multer')
  , errorHandler = require('errorhandler')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , handlebars = require('express-handlebars')
  , WebClient = require('@slack/client').WebClient
  , credentials = require('./credentials.js')
;

// access Slack API token

var token = process.env.SLACK_API_TOKEN || credentials.token;
var webClient = new WebClient(token);

// express app
var app = express();

/*
  application config file
*/


// set up the environment-based config
var Config = require('./lib/Config.js');
var config = (new Config({ env: global.process.env.NODE_ENV })).config;

// init the context
var Context = require('./lib/Context.js');
msgService = new Context({ config: config });


// http configurations
app.set('port', config.web.port);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// session and auth config
app.use(cookieParser(config.web.COOKIE_SECRET));

// development only
if (app.get('env') == 'development') {
  console.log('Running in developent mode!');

  app.use(errorHandler());
}

// static files
app.use(express.static(path.join(__dirname, '/public')));

// handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// slackbot Messaging class
class NewUser {
  constructor(name, project, skills, learn, civic) {
    this.name = name;
    this.project = project;
    this.skills = skills;
    this.learn = learn;
    this.civic = civic;
  }
}

//routes
app.get('/', function (req, res) {
  res.render('home');
});

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
    }
  });
  */
  // redirect back to home route
  res.redirect(303, '/');
});

// start it up
var server = app.listen(process.env.NODE_PORT || config.web.port, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('Express 4 server listening at http://%s:%s', host, port);
});
