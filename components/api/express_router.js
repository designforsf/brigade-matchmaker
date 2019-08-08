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

  router.post('/api/project', express_handler.createProject)
  router.delete('/api/project/:project_id', express_handler.deleteProject)
  router.get('/api/projects', express_handler.getProjects)
  router.get('/api/projects/:project_id', express_handler.getProject)


  /**
   * taxonomy-related routes
   * ------------------------------------------------------
    GET /api/project/taxonomy/*
    GET /api/project/taxonomies/*
  */

  router.get('/api/project/taxonomy/skills', express_handler.getTaxonomySkills)
  router.get('/api/project/taxonomy/interests', express_handler.getTaxonomyInterests)
  router.get('/api/project/taxonomy/goals', express_handler.getTaxonomyGoals)

  router.get('/api/project/taxonomies-for-ui', express_handler.getTaxonomiesForUI)
  router.get('/api/project/taxonomy/skills-for-ui', express_handler.getTaxonomySkillsForUI)
  router.get('/api/project/taxonomy/interests-for-ui', express_handler.getTaxonomyInterestsForUI)
  router.get('/api/project/taxonomy/goals-for-ui', express_handler.getTaxonomyGoalsForUI)

  router.get('/api/user/matches', express_handler.getUserMatches);

}