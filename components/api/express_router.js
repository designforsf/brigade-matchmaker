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

  self.config = attr.config;
  self.expressApp = attr.expressApp;
  
  // this module is an express router
  var router = Router();
  self.router = router;

  // handlers
  var express_handler = require('./express_handler');


  // routes

  /*
    index
    - renders user interface for header, controls for workspaces, list of workspaces
  */

  router.get('/'
    , function (req, res, next) { console.log('ExpressRouter: GET /'); next();}
    , express_handler.getIndex
    , express_handler.end
  );


  /**
   * system config
   * ------------------------------------------------------
    GET /api/system/config
  */

  router.get('/api/system/config', 
    function (req, res, next) {
      res.locals = res.locals || {};
      res.locals.config = res.app.locals.config;
      next();
    },
    express_handler.systemConfig
  );


  /**
   * projects
   * ------------------------------------------------------
    GET /api/projects
  */

  router.get('/api/projects', express_handler.getProjects)


}