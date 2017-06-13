var passport = require('passport')
var Users = require('../models/Users')
var UserMatchConfigs = require('../models/UserMatchConfigs')
var Projects = require('../models/Projects')
var ProjectTaxonomies = require('../models/ProjectTaxonomies')
var PyShell = require('python-shell')

module.exports = {

  /**
    POST /api/user/logouff
  */

  userLogoff: function (req, res, next) {
    req.session.destroy();
    res.json({ success: true });
  },

  /**
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
   * Get /api/user/match
   * Interacts with python algorithm to produce json list of sorted projects

   * SEE: https://github.com/extrabacon/python-shell

   * TEST:
        http://localhost:5465/api/user/matches?skills=client-dev/javascript,data-sci/python&interests=housing&goals=developer,presenter
        http://localhost:5465/api/user/matches?skills=data-sci&interests=homelessness&goals=developer
        http://localhost:5465/api/user/matches?skills=server-dev/ruby&goals=developer,learner
        http://localhost:5465/api/user/matches?skills=null&goals=leader
        http://localhost:5465/api/user/matches?skills=server-dev/nodejs
        http://localhost:5465/api/user/matches?learnSkills=client-dev/javascript
   */
  getUserMatches: function (req, res, next) {
    console.log('getUserMatch');

    // final output
    var output = {
      success: undefined,
      projects: [] // sorted projects
    };

    // the structure of the python script output
    matchFields = [
      "_id",    // mongo id
      "id",     // BrigadeHub id
      "score",  // total match score

      "name0",    // user attr 0 field name
      "score0",   // user attr 0 score
      "attrs0",   // user attr 0 matching attrs

      "name1",    // user attr 1 field name
      "score1",   // user attr 1 score
      "attrs1",   // user attr 1 matching attrs

      "name2",    // user attr 2 field name
      "score2",   // user attr 2 score
      "attrs2",   // user attr 2 matching attrs

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

      // add to the output array the user's entry for that argument
      output[arg] = argArr;

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
      scriptPath: pyDir,
      args: pyArgs
    }, function (err, pyOutput) {

      if (err) { console.error(err); }

      //console.log('pyOutput is: ', pyOutput);
      pyOutput.forEach(function (line, idx){
        var project = {};
        var lineArr = line.split(',');

        //project['_id'] = lineArr[0]; // mongoid not to show in output
        project['id'] = lineArr[1];
        project['score'] = parseInt(lineArr[2]);

        // process individual user attributes
        // NOTE: after general fields, py script outputs
        //  alternating name + score + matched attrs for each user attribute
        matchUserAttrs.forEach(function(arg, aidx) {
          project[arg + 'Score'] = parseInt(lineArr[2 + 2 + (aidx*3)]);

          // set up the matched args array
          var matchedArgs = lineArr[2 + 3 + (aidx*3)];
          matchedArgs = matchedArgs.replace(/[()]/g, '');
          if (matchedArgs.length > 0) {
            project[arg + 'Matched'] = matchedArgs.split(' ');
          }  else {
            project[arg + 'Matched'] = [];
          }


          //console.log(project['id'] + ' for ' + arg + ' matched-attrs: ', lineArr[2 + 3 + (aidx*3)]);
          //console.log(lineArr);
        });

        //console.log(project);

        // push the project into the projects array
        output.projects.push(project);

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
   * Get /api/projects
   * Returns a json list of available projects

   * TEST:
        http://localhost:5465/api/projects
   */
  getProjects: function (req, res, next) {
    console.log('getProjects');

    // final output
    var output = {
      success: undefined,
      projects: [] // sorted projects
    };

//
// Added mvp and live to the query
    Projects.
      find({
        status: { $in: ['mvp', 'live', 'proposed', 'ideation', 'alpha', 'beta', 'production'] }
      }).
      sort({ occupation: -1 }).

      //
      // Try adding additional data fields to this set: after matchingConfig
      select({ _id: 1, name: 1, matchingConfig: 1, description: 1, team: 1, homepage: 1, thumbnailUrl: 1, repository: 1, needs: 1, contact: 1}).
      exec(function (err, results) {

        // script returned error
        if (err) {
          output.success = false;
          output.error = {message: err};
          res.json({ success: false });
          return next();

        } else {
          output.success = true;
          output.projects = results;
          res.json(output);
          return next();

        }

      });

    }, // END getProjects

    /**
     * Get /api/projects
     * Returns a page rendering the JSON list of projects

     * TEST:
          http://localhost:5465/test/api/projects
     */

    testProjects: function (req, res) {
      res.render(res.locals.brigade.theme.slug + '/views/all_projects', {
        title: 'Test the Projects API',
        brigade: res.locals.brigade
      })
    }, // END testProjects


    /**
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
    }


};
