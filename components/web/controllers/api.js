var passport = require('passport');
var Users = require('../models/Users');
var UserMatchConfigs = require('../models/UserMatchConfigs')

module.exports = {

  /**
   * Get /api/user/create_and_login
   */
  createUserAndLogin: function (req, res, next) {
    console.log('createUserAndLogin ', req.body);
    Users.find({email: req.body.email}, function (err, foundUsers) {
      if (err) { return next(err); }
      if (foundUsers.length == 0) {

        var newUser = new Users();
        newUser.username = req.body.username;
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
        req.flash('success', {msg: 'Success! You have created a new user.'})
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

};
