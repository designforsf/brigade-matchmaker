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
  , mongoose = require('mongoose')
;

// set up the environment-based config
var Config = require('../common/lib/ConfigFile.js');
var config = (new Config({ env: global.process.env.NODE_ENV })).config;
//console.log(config);

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
app.locals.config = config;
app.locals.brigade = 'codeforsf';
app.set('port', config.api.port);

// allow cross-domain calls for API calls
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
};
app.use(allowCrossDomain);


// mongoose

var mongodb_uri = config.mongodb.uri
var connect_opts = {
  socketTimeoutMS: 5000,
  connectTimeoutMS: 5000
};

mongoose.connect(mongodb_uri, connect_opts,
function (err) {
  if (err) {
    throw new Error(err);
  } else {
    console.log('Moongoose connected');
    console.log(mongodb_uri);
  }    
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
mongoose.connection.on('error', function (err) {
  console.log('There was an error while trying to connect!')
  throw new Error(err)
});
var gracefulShutdown = function(msg, callback ) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// development only
if (app.get('env') == 'development') {
  console.log('Running in developent mode!');
  app.use(errorHandler());
  mongoose.set('debug', true);
}

// static resources for components
app.use("/common", 
  express.static(path.resolve(__dirname, '../common/public')));

// routes
var RouterCfg = require('./express_router');
routerCfg = new RouterCfg({ config: config, expressApp: app })
app.use('/', routerCfg.router);


// server
var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  console.log('Express 4 server listening at http://%s:%s', host, app.get('port'));
})

