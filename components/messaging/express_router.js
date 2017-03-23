var Router = require('express').Router
  , Async = require('async')
;


/*
  constructor

  attrs
    context
    expressApp

*/

module.exports = ExpressRouterCfg;

function ExpressRouterCfg (attr) {
  var self = this;

  // set the context
  self.context = attr.context;
  
  // set the express app
  self.expressApp = attr.expressApp;
  
  // this module is an express router
  var router = Router();
  self.router = router;
  
  // handlers
  var express_handler = require('./express_handler');

  
  // middleware functions
  
  var setContext = function (req, res, next) { 
    res.locals.msgServiceContext = attr.context;
    console.log('ExpressRouter: Set msgServiceContext in response locals.'); 
    next();
  }


  // routes

  /*
    index
    - renders user interface for header, controls for workspaces, list of workspaces
  */

  router.get('/'
    , function (req, res, next) { console.log('ExpressRouter: GET /'); next();}
    , setContext
    , express_handler.render_index
    , express_handler.end
  );
  

  /*
    send api
  */

  router.post('/api/send'
    , function (req, res, next) { console.log('ExpressRouter: POST /api/send'); next();}
    , setContext
    , express_handler.send
    , express_handler.end
  );

}
