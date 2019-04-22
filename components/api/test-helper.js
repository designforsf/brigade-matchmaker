/*
  test helper - constructor
  
  object attributes:
    config - common config instance
    app - Express application instance
    req - supertest request reference
  
*/

const SupertestRequest = require('supertest');
const Express = require('express');

const Config = require('../common/lib/ConfigFile.js');
const RouterCfg = require('./express_router');

module.exports = TestHelper;

function TestHelper (attr) {
  var self = this;
	
	self.app = Express();
	self.req = SupertestRequest;

	// set up the environment-based config
	self.config = (new Config({ env: global.process.env.NODE_ENV })).config;

	// configurations
	self.app.locals.config = self.config;
	self.app.locals.brigade = 'codeforsf';
	self.app.set('port', self.config.api.port);

	// routes
	self.routerCfg = new RouterCfg({ 
		config: self.config,
		expressApp: self.app 
	})

	self.app.use('/', self.routerCfg.router);

}