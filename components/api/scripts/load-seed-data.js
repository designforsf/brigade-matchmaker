var mongoose = require('mongoose')
  , Brigade =  require('../models/Brigade')
  , UserMatchConfigs =  require('../models/UserMatchConfigs')
  , Projects =          require('../models/Projects')
  , ProjectTaxonomies = require('../models/ProjectTaxonomies')
;

// set up the environment-based config
var Config = require('../../common/lib/ConfigFile.js');
var config = (new Config({ env: global.process.env.NODE_ENV })).config;

// mongoose
var mongodb_uri = 'mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.db;
mongoose.connect(mongodb_uri, function (err) {

  /**
   * Check if project taxonomies exist before starting Express server
   */
  
  ProjectTaxonomies.find({}, function (err, results) {
    if (err) throw err
    if (!results.length) {
      //console.log('No project taxonomies found!');
      
      // load the seed class
      var defaultPTAttributes = require('../seeds/development/ProjectTaxonomies');
      
      // ProjectTaxonomies is different from the other seeds: 
      //    this class exports a function!
      
      defaultPTAttributes(function (err, attributes) {
        
        // insert all attributes of all taxonomies... all at once
        ProjectTaxonomies.collection.insert(attributes, function (err, output) {
          if (err) throw err;
          //console.log(output);
          console.log('Inserted ' + output.insertedCount + ' attributes from the ProjectTaxonomies');
        });
      
      });

    } else {
      console.log(results.length + ' attributes found for ProjectTaxonomies.')

    }
  });


  /**
   * Check if project taxonomies exist before starting Express server
   */

  ProjectTaxonomies.find({}, function (err, results) {
    if (err) throw err
    if (!results.length) {
      //console.log('No project taxonomies found!');

      // load the seed class
      var defaultPTAttributes = require('../seeds/development/ProjectTaxonomies');

      // ProjectTaxonomies is different from the other seeds:
      //    this class exports a function!

      defaultPTAttributes(function (err, attributes) {

        // insert all attributes of all taxonomies... all at once
        ProjectTaxonomies.collection.insert(attributes, function (err, output) {
          if (err) throw err;
          //console.log(output);
          console.log('Inserted ' + output.insertedCount + ' attributes from the ProjectTaxonomies');
        });

      });

    } else {
      console.log(results.length + ' attributes found for ProjectTaxonomies.')

    }
  });


  /**
   * Check if projects exist before starting Express server
   */
  Projects.find({}, function (err, results) {
    if (err) throw err
    if (!results.length) {
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
      console.log(results.length + ' projects found.')

    }
  });
  /*
    TODO: use async module to ensure that projects are loaded
  */

  /**
   * Check if brigade exists before starting Express server.
   */
  Brigade.find({slug: process.env.BRIGADE}, function (err, results) {
    if (err) throw err
    if (!results.length) {
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
      brigadeDetails = results[0]
    }
  });

});