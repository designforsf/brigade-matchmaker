var passport = require('passport');
var Users = require('../models/Users');

module.exports = {

  /**
   * Get /api/user/create_and_login
   * Disconnect a passport service
   */
  createUserAndLogin: function (req, res, next) {
    console.log('createAndLogin ', req.body);
    Users.find({email: req.body.email}, function (err, foundUser) {
      if (err) { return next(err); }
      if (!foundUser) {
        res.json({ success: true });
      } else {
        res.json({ success: false, error: {message: "User with email " + req.body.email + " already found!"} });
      }
    });

  }

};
