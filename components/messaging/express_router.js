var express = require('express')
  , async = require('async')
;


// this module is an express router
var app = express()
  , router = express.Router();

// handlers
var express_handler = require('./express_handler')
;

// routes

/*
  index
  - renders user interface for header, controls for workspaces, list of workspaces
*/

router.get('/'
  , function (req, res, next) { console.log('ExpressRouter: GET /'); next();}
  , express_handler.render_index
  , express_handler.end
);

// this is a router
module.exports = router;
