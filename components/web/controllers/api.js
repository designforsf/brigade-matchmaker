var passport = require('passport');
var Users = require('../models/Users');

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
        console.log(foundUser);
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
   * Get /api/user/update_prefs
   */
  updateUserPrefs: function (req, res, next) {
    console.log('updateUserPrefs ', req.body);

    if (typeof req.user !== 'undefined') {

    } else {
      res.json({ success: false });
      return next();
    }

  },

  /**
   * Get /api/user/session
   */
  getUserSession: function (req, res, next) {
    console.log('getUserSession');

    console.log(req.session);

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
