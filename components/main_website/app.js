/*
  Minimizer/Maximizer Component

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
;

// set up the environment-based config
var Config = require('../common/lib/ConfigFile.js');
var config = (new Config({ env: global.process.env.NODE_ENV })).config;

// express app
var app = express();
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public'), { }));

// template engine
app.set('view engine', 'pug');

// configurations
app.set('config',config);
app.set('brigade', 'codeforsf');
app.set('port', config.main_website.port);

// development only
if (app.get('env') == 'development') {
  console.log('Running in developent mode!');
  app.use(errorHandler());
}

// static resources for components
app.use("/common", 
  express.static(path.resolve(__dirname, '../common/public')));
app.use("/components/project-list", 
  express.static(path.resolve(__dirname, '../project-list')));
app.use("/components/slackbot", 
  express.static(path.resolve(__dirname, '../slackbot')));
app.use("/components/minmaximizer", 
  express.static(path.resolve(__dirname, '../minmaximizer/public')));
app.use("/components/selector", 
  express.static(path.resolve(__dirname, '../selector_ui/public')));
app.use("/components/messaging", 
  express.static(path.resolve(__dirname, '../messaging/public/messaging')));

// for development
app.locals.pretty = true; // sets jade/pug HTML to render pretty

// serve the index jade
app.get('/', function (req, res, next) {
    res.render('project-match', {
      title: 'Project Match',
      brigade: req.app.get('brigade'),
      config: req.app.get('config'),
      messages: {}
    });
  }
);

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  console.log('Express 4 server listening at http://%s:%s', host, app.get('port'));
})

