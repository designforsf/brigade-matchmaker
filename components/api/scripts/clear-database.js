var mongoose = require('mongoose');

// set up the environment-based config
var Config = require('../../common/lib/ConfigFile.js');
var config = (new Config({ env: global.process.env.NODE_ENV })).config;

// mongoose
var mongodb_uri = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.db;
mongoose.connect(mongodb_uri, function (err) {

  if (err) {
    throw new Error(err);
  } else {
    console.log('Moongoose connected');
    console.log(mongodb_uri);

		// drop
  	mongoose.connection.db.dropDatabase();

    // end
    //process.exit();

  }
});
