var pug = require('pug')
  , mongoose =          require('mongoose')
  , Users = 						require('./models/Users')
  , UserMatchConfigs = 	require('./models/UserMatchConfigs')
  , Projects = 					require('./models/Projects')
  , ProjectTaxonomies = require('./models/ProjectTaxonomies')
  , PyShell =           require('python-shell')
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
   * createProjects
   * ------------------------------------------------------
   * POST /api/project
   * Returns a json list of available projects
   * Conforms to JSON-API

   * RESPONSE:
        https://jsonapi.org/format/#crud-creating-responses

   * TEST:
        http://localhost:5465/api/projects
   */

  createProject: function (req, res, next) {
    console.log('createProject');
    //console.log(req.body.data);

    var jsonAPIObj = req.body;

    if (typeof jsonAPIObj === 'undefined') {
      console.error('No data in request body');
      return next();
    }

    // form the object
    var newProject = new Projects(jsonAPIObj.data.attributes);  
    
    // save the new project
    newProject.save(function (err, savedProject) {
      if (err) { 
        console.error('Could not save project'); 
      };

      res.json({ data: {
        _id: savedProject._id
      } });
      
      return next();

    });

    
  }, // END createProject


  deleteProject: function (req, res, next) {

    var id = req.params.project_id;
    console.log('deleteProject id=' + id);

    // for the emberjs client
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    Projects.findOne({_id: mongoose.Types.ObjectId(id)}, function (err, project) {

      if (err) {
        res.send(err);
        return next();
      }

      console.log('Found project id=' + project._id + ' to delete.');


      Projects.deleteOne({_id: mongoose.Types.ObjectId(id)}, function (err) {

        console.log('Deleted project id=' + project._id);

        if (err) {
          res.send(err);
          return next();
        }

        res.status(202);
        return next();

      }); // END deleteOne



    }); // findOne

  }, // END deleteProject

  

  /**
   * getProject
   * ------------------------------------------------------
   * Get /api/projects
   * Returns a json list of available projects
   * Conforms to JSON-API

   * TEST:
        http://localhost:5465/api/project/<MONGO_ID>
   */
   
  getProject: function (req, res, next) {
    var id = req.params.project_id;
    console.log('getProject id=' + id);
    
    // for the emberjs client
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    // final output
    var outputData;

    Projects.
      findOne({
        _id: mongoose.Types.ObjectId(id)
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
        repositoryUrl: 1, 
        websiteUrl: 1,
        slackChannel: 1,
        todoItems: 1,
        progressItems: 1,
        needs: 1, 
        contact: 1
      }).
      exec(function (err, result) {
        //console.log('results ', results.length);

        // script returned error
        if (err) {
          res.json({
            success: false,
            error: {message: err},
            data: {}
          });
          return next();
          
        } else {
          
          outputData = {
            type: "project",
            id: result._id,
            attributes: result
          };
          
          //output.success = true;
          res.json({ 
            success: true,
            data: outputData 
          });

          return next();
          
        }

      });

    }, // END getProjects


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
        repositoryUrl: 1, 
        websiteUrl: 1,
        slackChannel: 1,
        todoItems: 1,
        progressItems: 1,
        needs: 1, 
        contact: 1
      }).
      exec(function (err, results) {
      	//console.log('results ', results.length);

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
   * getUserMatches
   * ------------------------------------------------------
   * Get /api/user/match
   * Interacts with python algorithm to produce json list of sorted projects

   * SEE: https://github.com/extrabacon/python-shell

   * TEST:
        http://localhost:5465/api/user/matches?skills=data-sci/python&learnSkills=data-science/machine-learning&role=developer
        http://localhost:5465/api/user/matches?skills=client-dev/javascript,data-sci/python&interests=housing&goals=developer,presenter
        http://localhost:5465/api/user/matches?skills=data-sci&interests=homelessness&goals=developer
        http://localhost:5465/api/user/matches?skills=server-dev/ruby&goals=developer,learner
        http://localhost:5465/api/user/matches?skills=null&goals=leader
        http://localhost:5465/api/user/matches?skills=server-dev/nodejs
        http://localhost:5465/api/user/matches?learnSkills=client-dev/javascript
   */
   
  getUserMatches: function (req, res, next) {
    console.log('getUserMatches');
    
    // final output in JSON-API
    // SEE: http://jsonapi.org/examples/
    var output = {
      data: [] // sorted projects
    };

    // the structure of the python script output
    matchFields = [
      "_id",    // mongo id
      "id",     // BrigadeHub id
      "score",  // total match score

      // skills
      "name0",    // user attr 0 field name
      "score0",   // user attr 0 score
      "attrs0",   // user attr 0 matching attrs

      // learnSkills
      "name1",    // user attr 1 field name
      "score1",   // user attr 1 score
      "attrs1",   // user attr 1 matching attrs

      // interests
      "name2",    // user attr 2 field name
      "score2",   // user attr 2 score
      "attrs2",   // user attr 2 matching attrs

      // goals
      "name3",    // user attr 3 field name
      "score3",   // user attr 3 score
      "attrs3",   // user attr 3 matching attrs

    ];
    matchUserAttrs = ["skills", "learnSkills", "interests", "goals"];

    // user input, translated from web params to the python script arguments
    var pyArgs = [];
    matchUserAttrs.forEach(function(arg) {

      // clean up the web input
      var argArr = (typeof req.query[arg] !== 'undefined' ? req.query[arg].split(',') : []);

      // convert back to comma delimited list
      var argValue = argArr.join(',');
      if (argValue.length == 0) argValue = 'null'; // TODO: possibly improve this
      pyArgs.push(argValue);

    });

    //console.log('req.options: ', req.options);
    //console.log(req.query);
    //console.log(pyArgs);

    // where is the python script?
    var pyDirArr = process.cwd().split('/');
    pyDirArr.pop();
    pyDirArr.push('matching');
    //
    // heroku environemnt only
    //var pyDir = pyDirArr.join('/');
    var pyDir = '../matching'
    var pyFile = '/db-match-algo.py';
    //
    //console.log('req.MongoStore is ', req);
    //console.log('run python: ' + pyFile + ' with args=', pyArgs);
    //console.log('pyDir: ', pyDir);

    PyShell.run(pyFile, {
      pythonPath: 'python3',
      scriptPath: pyDir,
      args: pyArgs
    }, function (err, pyOutput) {

      if (err) { console.error(err); }

      //console.log('pyOutput is: ', pyOutput);
      pyOutput = pyOutput || [];
      pyOutput.forEach(function (line, idx){
        var lineArr = line.split(',');

        //console.log(lineArr);

        // JSON-API resource object
        // SEE: http://jsonapi.org/format/#document-resource-objects
        var resourceObj = {
          type: "projectMatch",
          id: lineArr[0],
          attributes: {} // where the project match data goes
        };
        
        resourceObj.attributes['name'] = lineArr[1];
        resourceObj.attributes['score'] = parseInt(lineArr[2]);

        // process individual user attributes
        // NOTE: after general fields, py script outputs
        //  alternating name + score + matched attrs for each user attribute
        matchUserAttrs.forEach(function(arg, aidx) {
          resourceObj.attributes[arg + 'Score'] = parseInt(lineArr[2 + 2 + (aidx*3)]);

          // set up the matched args array
          var matchedArgs = lineArr[2 + 3 + (aidx*3)];
          matchedArgs = matchedArgs.replace(/[()]/g, '');
          if (matchedArgs.length > 0) {
            resourceObj.attributes[arg + 'Matched'] = matchedArgs.split(' ');
          }  else {
            resourceObj.attributes[arg + 'Matched'] = [];
          }


          //console.log(lineArr);

        });

        // push the resurce object into the output data
        output.data.push(resourceObj);

      })

      // script returned error
      if (err) {
        output.success = false;
        output.error = {message: err};
        res.json({ success: false });
        return next();

      } else {
        output.success = true;
        res.json(output);
        return next();

      }

    });

  }, // END getUserMatches



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

