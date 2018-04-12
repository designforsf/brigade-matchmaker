var Async = require('async')
  , passport = require('passport')
  , Users = require('../models/Users')
  , UserMatchConfigs = require('../models/UserMatchConfigs')
  , Projects = require('../models/Projects')
  , ProjectTaxonomies = require('../models/ProjectTaxonomies')
  , PyShell = require('python-shell')
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
   * userLogoff
   * ------------------------------------------------------
    POST /api/user/logouff
  */
  
  userLogoff: function (req, res, next) {
    req.session.destroy();
    res.json({ success: true });
  },

  /**
   * createUserAndLogin
   * ------------------------------------------------------     
   * Get /api/user/create_and_login
   */
   
  createUserAndLogin: function (req, res, next) {
    console.log('createUserAndLogin ', req.body);
    Users.find({email: req.body.email}, function (err, foundUsers) {
      if (err) { return next(err); }
      if (foundUsers.length == 0) {

        var newUser = new Users();
        newUser.username = req.body.email;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.profile = {
          name: '',
          gender: '',
          position: '',
          location: '',
          website: ''
        }
        newUser.roles = {
          read: 'read',
          blog: 'blog',
        }

        newUser.save((err) => {
          if (err) console.error(err)
        })
        //req.flash('success', {msg: 'Success! You have created a new user.'})
        res.json({ success: true, user: { id: newUser.id } });

      } else {
        //console.log(foundUser);
        res.json({ success: false, error: {message: "User with email " + req.body.email + " already found!"} });
      }
    });

  },

  /**
   * userLogin
   * ------------------------------------------------------
   * Get /api/user/login
   */
   
  userLogin: function (req, res, next) {
    console.log('userLogin ', req.body);

    req.assert('email', 'Email is not valid').isEmail()
    req.assert('password', 'Password cannot be blank').notEmpty()

    var errors = req.validationErrors()

    if (errors) {
      req.flash('errors', errors)
      res.json({ success: false, error: {
        message: "There are validation errors!",
        validationErrors: errors }
      });
      return next(errors);
      //return res.redirect('/login')
    }

    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.json({ success: false, error: { message: err } });
        return next(err)
      }
      if (!user) {
        req.flash('errors', { msg: info.message });
        console.error(info.message);
        res.json({ success: false, error: { message: info.message } });
        return next();
        //return res.redirect('/login')
      }
      req.logIn(user, function (err) {
        if (err) {
          res.json({ success: false, error: { message: err } });
          return next(err)
        }
        req.flash('success', { msg: 'Success! You are logged in.' });
        res.json({ success: true, user: {
          id: user.id,
          email: user.email
          }
        });
        return next();
      })
    })(req, res, next)

  },

  /**
   * updateUserMatchConfig
   * ------------------------------------------------------
   * Post /api/user/match_config
   */

  updateUserMatchConfig: function (req, res, next) {
    console.log('updateUserConfig ', req.body);
    //console.log(req.user);
    if (typeof req.user !== 'undefined') {
      upsert_configs = {
        step: req.body.step,
      };

      // process the attributes
      ['interests', 'skills', 'roles'].forEach(function (attrib) {
        if (req.body[attrib] && req.body[attrib].length > 0) {
          upsert_configs[attrib] = req.body[attrib].split(',');
        }
      });
      
      //console.log('updateUserConfig post-processed: ', upsert_configs);
      UserMatchConfigs.findOneAndUpdate({ 'user_id': req.user.id }, upsert_configs, {upsert:true}, function(err, match_configs) {
        if (err) {
          res.json({ success: false, error: { message: err } });
          return next(err)
        }
        //console.log('match configs ', match_configs);
        res.json({ success: true, match_configs: match_configs });
        return next();
      });
      
    } else {
      res.json({ success: false, error: {message: "User in session required."} });
      return next();
    }
    
  },

  /**
   * getUserSession
   * ------------------------------------------------------
   * Get /api/user/session
   */
   
  getUserSession: function (req, res, next) {
    console.log('getUserSession');

    if (typeof req.user !== 'undefined') {
      res.json({success: true, user: {
        id: req.user.id,
        email: req.user.email
      }});
      return next();
    } else {
      res.json({ success: false });
      return next();
    }

  },

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
    console.log('getUserMatch');
    
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
    //console.log((typeof req.query.interests !== 'undefined'));
    //console.log(req.query.goals);
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
      pythonPath: '/usr/local/bin/python3',
      scriptPath: pyDir,
      args: pyArgs
    }, function (err, pyOutput) {

      if (err) { console.error(err); }

      //console.log('pyOutput is: ', pyOutput);
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
        status: { $in: ['mvp', 'live', 'proposed', 'ideation', 'alpha', 'beta', 'production'] }
      }).
      select({ 
        _id: 1, 
        name: 1, 
        matchingConfig: 1, matchingDescr: 1, 
        description: 1, 
        team: 1, 
        homepage: 1, 
        thumbnailUrl: 1, 
        repository: 1, 
        needs: 1, 
        contact: 1
      }).
      exec(function (err, results) {

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
    * getProject
    * ------------------------------------------------------
   * Get /api/project
   * Returns a json obj of a project
   * Conforms to JSON-API

   * TEST:
        http://localhost:5465/api/project/<MONGO_ID>
   */
   
  getProject: function (req, res, next) {
    console.log('getProject ' + req.params.id);
    
    // for the emberjs client
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
    Projects.
      find({
        _id: req.params.id
      }).
      select({ 
        _id: 1, 
        name: 1, 
        matchingConfig: 1, matchingDescr: 1,
        description: 1, 
        team: 1, 
        homepage: 1, 
        thumbnailUrl: 1, 
        repository: 1, 
        needs: 1, 
        contact: 1
      }).
      exec(function (err, results) {
        
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
            var project = result.toObject();
            
            // re-name fields for EmberJS/JSON-API conformance
            project['matching-descr'] = project.matchingDescr;
            if (typeof project['matching-descr'] === 'undefined') { 
              project['matching-descr'] = {};
            }
            delete project.matchingDescr;
            project.id = project['_id'];
            
            outputData.push({
              type: "project",
              id: result._id,
              attributes: project
            });
            
          });
          
          //output.success = true;
          res.json({ data: outputData[0] });
          return next();
          
        }
        
      }); // END model query
      
  }, // END getProject

  /**
   * createProject
   * ------------------------------------------------------
   * POST /api/projects
   * Creates a project
   * Conforms to JSON-API
   */

    createProject: function (req, res, next) {
      console.log('createProjects');

      // for the emberjs client
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");

      var newProject = {
        name: req.body.name
      };
      
      Projects(newProject).create(function (err) {
        if (err) {
          return next(err);
        } else {
          res.json({ success: true, project: project });
          return next();
        }
      })
    
    },

  /**
   * updateProject
   * ------------------------------------------------------
   * POST /api/projects/<MONGO_ID>
   * Updates a project
   * Conforms to JSON-API
   
   JSON posted:
   
     {
       "data": {
         "type": "photos",
         "id": "550e8400-e29b-41d4-a716-446655440000",
         "attributes": {
           "title": "Ember Hamster",
           "src": "http://example.com/images/productivity.png"
         }
       }
     }
   
   
   */

    updateProject: function (req, res, next) {
      console.log('updateProjects');
      jsonAPIData = req.body.data;
      
      var updatedData = {
        name: jsonAPIData.attributes.name,
        'matchingDescr.summary': jsonAPIData.attributes['matching-descr'].summary
      };
      
      console.log(updatedData);
      
      Projects.findOneAndUpdate({ '_id': req.params.id }, 
        {
          '$set': updatedData,
        }, 
        {upsert: false, new: true}, 
        function(err, project) {
          
          if (err || !project) {
            console.error(err);
            res.json({
              "errors": [
                {
                  "status": "400",
                  "source": { "pointer": "/data/attributes" },
                  "title":  "Data Update Error",
                  "detail": err
                }
              ]
            });
            return next(err)
          }
          
          res.json({ 
            data: {
              type: "projects",
              id: project['_id'],
              attributes: project
            }
          });
          return next();
        
      });
    
    },

    /**
     * testProjects
     * ------------------------------------------------------
     * Get /api/projects
     * Returns a page rendering the JSON list of projects

     * TEST:
          http://localhost:5465/test/api/projects
     */

    testProjects: function (req, res) {
      res.render(res.locals.brigade.theme.slug + '/views/prototypes/projects', {
        title: 'Test Projects API & UI',
        brigade: res.locals.brigade
      })
    }, // END testProjects

    testTaxonomySelector: function (req, res) {
      
      res.render(res.locals.brigade.theme.slug + '/views/prototypes/taxonomySelector', {
        title: 'Test Taxonomy data & UI',
        brigade: res.locals.brigade,
        skills: res.locals.projectTaxonomySkills,
        interests: res.locals.projectTaxonomyInterests,
        goals: res.locals.projectTaxonomyGoals,
      })
    }, // END testTaxonomySelector


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
