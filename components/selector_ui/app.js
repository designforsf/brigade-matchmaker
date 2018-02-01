
/*
  Taxonomy Selector Component: Web App

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

// express app
var app = express();
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public'), { }));

// config
var ConfigFile = require('../common/lib/ConfigFile');
var config = new ConfigFile().config;

// development only
if (app.get('env') == 'development') {
  console.log('Running in developent mode!');
  app.use(errorHandler());
}

var server = app.listen(config.selector_ui.port, function () {
  var host = config.selector_ui.port;
  console.log('Express 4 server listening at http://%s:%s', config.selector_ui.host, config.selector_ui.port);
})

