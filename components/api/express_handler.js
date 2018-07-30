var pug = require('pug')
  , Users = 						require('./models/Users')
  , UserMatchConfigs = 	require('./models/UserMatchConfigs')
  , Projects = 					require('./models/Projects')
  , ProjectTaxonomies = require('./models/ProjectTaxonomies')
;


/*
   format taxonomy for UI

   function to convert "Tree Structure with Parent References"
   to "Tree Structure for UI Rendering"

   SEE: https://github.com/designforsf/brigade-matchmaker/blob/master/docs/taxonomy.md#tree-structure-for-ui-rendering

   TODO: approach this with a recursive function
   Also: work this into the ProjectTaxonomies model

*/

var formatTaxonomyForUI = function (taxonomy, taxonomyName, hierarchyLevels) {

  // default levels = 2
  if (typeof hierarchyLevels === 'undefined') hierarchyLevels = 2 ;

  //console.log('formatTaxonomyForUI'
  //  + ' taxonomy=' + taxonomyName
  //  + ' levels=' + hierarchyLevels);

  // render the taxonomy into something more easily used by handlebars
  itemsBySection = {};
  var taxonomySet, currSection;
  taxonomy.forEach(function (item) {
    
    // the root item
    if (!item.parent) {
      taxonomySet = item.name
    } 

    // item section
    if (

      // 1 level hierarchy, 1 section containing all items
      (hierarchyLevels == 1 && !item.parent) 
        ||
      // 2+ level hierarchy, multiple sections
      (hierarchyLevels > 1 && item.parent == taxonomySet)
      ) {
      
      //console.log(taxonomySet + ' section ' + item.name + ' - ' + item.title);
      
      currSection = item.name;

      itemsBySection[currSection] = {
        name: item.name,
        title: item.title,
        parent: item.parent,
        items: []
      };
      //console.log(itemsBySection[item.name]);
    }

    // item (has parent, parent is current section)
    if (item.parent && item.parent == currSection) {
      //console.log('item parent=' + item.parent);
      //console.log(' > ' + item.name);

      itemsBySection[item.parent].items.push(item);

    }

  }); // END taxonomy.forEach

  return itemsBySection;
}

// END formatTaxonomyForUI function


module.exports = {

  /*
    end
  */

  end: function (req, res, next) {
    res.end();
  },


  /*
    getIndex
  */

  getIndex: function (req, res, next) {

    var jadeOutput = pug.renderFile(
      './views/index.jade',
      {
        layout: false, pretty: true,
      }
    );

    res.write(jadeOutput);
    next();

  },

  
  /**
   * getProjects
   * ------------------------------------------------------
   * Get /api/projects
   * Returns a json list of available projects
   * Conforms to JSON-API

   * TEST:
        http://localhost:5465/api/projects
   */
   
  getProjects: function (req, res, next) {
    console.log('getProjects');
    
    // for the emberjs client
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    // final output
    var output = {
      success: undefined,
      projects: [] // sorted projects
    };

    Projects.
      find({
      }).
      select({ 
        _id: 1, 
        name: 1, 
        matchingConfig: 1, 
        matchingDescr: 1, 
        description: 1, 
        team: 1, 
        homepage: 1, 
        thumbnailUrl: 1, 
        repository: 1, 
        needs: 1, 
        contact: 1
      }).
      exec(function (err, results) {
      	console.log('results ', results.length);

        // script returned error
        if (err) {
          output.success = false;
          output.error = {message: err};
          output.data = {};
          res.json(output);
          return next();

        } else {
          
          var outputData = [];
          results.forEach(function(result) {
            result.id = result['_id'];
            
            outputData.push({
              type: "project",
              id: result._id,
              attributes: result
            });
            
          });
          
          //output.success = true;
          res.json({ data: outputData });
          return next();
          
        }

      });

    }, // END getProjects



  /**
   * system config
   * ------------------------------------------------------
    POST /api/system/config
  */
  
  systemConfig: function (req, res, next) {
    var config = res.locals.config;

    // remove certain sensitive entries
    delete config.mongodb;
    delete config.imap;
    delete config.emailjs;

    res.json(config);
  },


  /**
   * getTaxonomySkills
   * getTaxonomyInterests
   * getTaxonomyGoals
   * ------------------------------------------------------
   * Get /api/project/taxonomy/skills | interests | goals
   * Returns a json list of available skills, interests, or goals

   * TEST:
        http://localhost:5465/api/project/taxonomy/skills
        http://localhost:5465/api/project/taxonomy/interests
        http://localhost:5465/api/project/taxonomy/goals
   */

  getTaxonomySkills: function (req, res, next) {
    var pt = new ProjectTaxonomies();
    pt.getSkills(function (err, results) {
      res.json(results);
      return next();
    })
  },

  getTaxonomyInterests: function (req, res, next) {
    var pt = new ProjectTaxonomies();
    pt.getInterests(function (err, results) {
      res.json(results);
      return next();
    })
  },

  getTaxonomyGoals: function (req, res, next) {
    var pt = new ProjectTaxonomies();
    pt.getGoals(function (err, results) {
      res.json(results);
      return next();
    })
  },


  /**
   * getTaxonomiesForUI
   * ------------------------------------------------------
   * Get /api/project/taxonomies-for-ui
   * Returns a json structure of categorized skills, interests, or goals

   * TEST:
        http://localhost:5465/api/project/taxonomies-for-ui
   */

  getTaxonomiesForUI: function (req, res, next) {
    var pt = new ProjectTaxonomies();

    /* 
      
      convert each of the taxonomies
      then serve that as JSON

    */
    
    Async.parallel({

        // get taxonomy arrays

        "skills": function(cb) {
          pt.getSkills(function (err, results) {
            var itemsBySection = formatTaxonomyForUI(results, 'skills', 2);
            
            // TODO: fix this ugliness 
            //  (SEE the TODO above in formatTaxonomyForUI)
            cb(err, {
                name: 'skills',
                title: 'Skills',
                itemsBySection: itemsBySection
            });
          });
        },

        "interests": function(cb) {
          pt.getInterests(function (err, results) {
            var itemsBySection = formatTaxonomyForUI(results, 'interests', 1);
            cb(err, itemsBySection['interests']);
          });
        },

        /* NOTE: this taxonomy is currently not used
        "goals": function(cb) {
          pt.getGoals(function (err, results) {
            var itemsBySection = formatTaxonomyForUI(results, 'goals', 1);
            cb(err, itemsBySection['goals']);
          });
        },
        */

    }, // END defining the parallel functions

    // assemble the results
    function(err, allItemsBySection) {
      res.json(allItemsBySection);
      return next();
    });


  },


  getTaxonomySkillsForUI: function (req, res, next) {
    var pt = new ProjectTaxonomies();
    pt.getSkills(function (err, results) {
      var itemsBySection = formatTaxonomyForUI(results, 'skills', 2);

      // TODO: fix this ugliness 
      //  (SEE the TODO above in formatTaxonomyForUI)

      res.json({
          name: 'skills',
          title: 'Skills',
          itemsBySection: itemsBySection
      });
      return next();

    });
  },

  getTaxonomyInterestsForUI: function (req, res, next) {
    var pt = new ProjectTaxonomies();

    pt.getInterests(function (err, results) {

      var itemsBySection = formatTaxonomyForUI(results, 'interests', 1);
      //console.log(itemsBySection);
      //res.json(itemsBySection['civic-interests']);

      res.json({
          name: 'interests',
          title: 'Civic Interests',
          itemsBySection: itemsBySection
      });

      return next();
    });

  },

  getTaxonomyGoalsForUI: function (req, res, next) {
    var pt = new ProjectTaxonomies();
    pt.getGoals(function (err, results) {
      var itemsBySection = formatTaxonomyForUI(results, 'goals', 1);
      res.json(itemsBySection['goals']);
      return next();
    });
  },

};

