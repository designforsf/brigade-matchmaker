var mongoose = require('mongoose')
  , Brigade =  require('../models/Brigade')
  , UserMatchConfigs =  require('../models/UserMatchConfigs')
  , Projects =          require('../models/Projects')
  , ProjectTaxonomies = require('../models/ProjectTaxonomies')
  , Async = require('async')
;

console.log('Loading seed data script running.');

// set up the environment-based config
var Config = require('../../common/lib/ConfigFile.js');
var config = (new Config()).config;


/**
 * Check if project taxonomies exist; if not, create them.
 */
function loadDefaultTaxonomies(err, existingTaxonomies) {
  if (err) throw err
  if (!existingTaxonomies.length) {
    console.log('No project taxonomies found!');

    // load the seed class
    var defaultPTAttributes = require('../seeds/development/ProjectTaxonomies');

    // ProjectTaxonomies is different from the other seeds:
    // this class exports a function!

    defaultPTAttributes(function (err, attributes) {
      // insert all attributes of all taxonomies... all at once
      ProjectTaxonomies.collection.insert(attributes, function (err, output) {
        if (err) throw err;
        //console.log(output);
        console.log('Inserted ' + output.insertedCount + ' attributes from the ProjectTaxonomies');
      });
    });
  } else {
    console.log(existingTaxonomies.length + ' attributes found for ProjectTaxonomies.')
  }
}


/**
 * Check if projects exist; if not, create them.
 */
function loadDefaultProjects(err, existingProjects) {
  if (err) throw err
  if (!existingProjects.length) {
    console.log('No projects found!');

    // load projects from seed
    var defaultProjects = require('../seeds/development/Projects')
    defaultProjects.forEach(function(project) {
      console.log('load project id=' + project.id);
      console.log('load matching config ', project.matchingConfig);
      newProj = new Projects(project);
      
      // save project
      newProj.save(function (err) {
        if (err) throw err;
      });
    });
  } else {
    console.log(existingProjects.length + ' projects found.')
  }
}


/**
 * Check if brigade exists; if not, create it.
 */
function loadDefaultBrigade(err, existingBrigade) {
  if (err) throw err
  console.log("Inside loadDefaultBrigade");
  if (!existingBrigade.length) {
    var defaultBrigadeData = require('../seeds/development/Brigade')()[0]
    defaultBrigadeData.slug = process.env.BRIGADE
    brigadeDetails = defaultBrigadeData
    var defaultBrigade = new Brigade(defaultBrigadeData)
    defaultBrigade.save(function (err) {
      if (err) throw err
      DB_INSTANTIATED = true
    })
  } else {
    DB_INSTANTIATED = true
    brigadeDetails = existingBrigade[0]
  }
}

var loadEverythingAndExit = function (err) {
  if (err) throw err
  console.log("Inside loadEverythingAndExit");
  var tasks = [
    cb => ProjectTaxonomies.find({}, loadDefaultTaxonomies).exec(cb),
    cb => Projects.find({}, loadDefaultProjects).exec(cb),
    cb => Brigade.find({slug: process.env.BRIGADE}, loadDefaultBrigade).exec(cb),
    cb => process.exit(0),
  ];
  Async.series(tasks);
  console.log("Done loadEverythingAndExit");
}

// mongoose
var mongodb_uri = config.mongodb.uri
mongoose.connect(mongodb_uri, loadEverythingAndExit);
