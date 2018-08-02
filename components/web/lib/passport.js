var _ = require('lodash')
var passport = require('passport')
var request = require('request')
var LocalStrategy = require('passport-local').Strategy
var GitHubStrategy = require('passport-github').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy
var MeetupStrategy = require('passport-meetup').Strategy
var defaultHeaders = require('../lib/defaultGithubAPIHeaders')

var User = require('../models/Users')

passport.serializeUser(function (user, done) {
  console.log('serializeUser ' + user.id);
  done(null, user.id);
})

passport.deserializeUser(function (id, done) {
  console.log('deserializeUser ' + id);
  User.findById(id, function (err, user) {
    done(err, user);
  })
})

/**
 * Sign in with Google
 * NOTE: use this URL to login: /auth/google
 * NOTE: having issues with passport-google-oauth20 login:
          https://github.com/jaredhanson/passport-google-oauth/issues/82
 * SEE: https://github.com/jaredhanson/passport-google-oauth2
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  var url = 'https://api.github.com/user/emails'
  var headers = _.cloneDeep(defaultHeaders)
  headers['Authorization'] += accessToken
  var options = {
    url: url,
    headers: headers
  }

  //console.log('profile ', profile)

  request(options, function (err, response, body) {

    if (err) console.error(err)
    if (!err && response.statusCode === 200) {
      var tokens = response.headers['x-oauth-scopes']
      profile.emails = JSON.parse(body)

      // user already in session
      if (req.user) {
        User.findOne({ github: profile.id }, function (err, existingUser) {

          if (err) console.error(err)

          User.findById(req.user.id, function (err, user) {
            if (err) console.error(err)
            user.google = profile.id
            user.email = profile.emails[0] ? profile.emails[0].value : ''
            user.username = profile.displayName
            user.profile.name = profile.displayName
            user.profile.picture = user.profile.picture || profile._json.image.url
            user.profile.location = ''
            user.profile.website = ''
            User.count({}, function (err, count) {
              if (err) console.error(err)
              if (!count) {
                user.roles = {
                  read: true,
                  blog: true,
                  project: true,
                  lead: true,
                  core: true,
                  coreLead: true,
                  superAdmin: true
                }
              }
              user.save(function (err) {
                if (err) console.error(err)
                req.flash('info', { msg: 'GitHub authorization provided.' })
                done(err, user)
              })
            })
          })
        })

      // user not in session
      } else {

        User.findOne({ github: profile.id }, function (err, existingUser) {
          if (err) console.error(err)

          if (existingUser) {
            // think about updating?
            console.log('no req.user, and user exists')
            return done(null, existingUser)
          }

          console.log("no req.user, and user doesn't exist")

          // create this new user
          var user = new User()
          user.email = _.find(profile.emails, (email) => {
            return email.primary
          }).email
          user.scopes = tokens
          if (user.scopes[0].indexOf(',') > -1) {
            user.scopes = user.scopes[0].split(', ')
          }
          user.github = profile.id
          user.username = profile.username
          user.tokens.push({ kind: 'github', accessToken: accessToken })
          user.profile.name = profile.displayName
          user.profile.picture = profile._json.avatar_url
          user.profile.location = profile._json.location
          user.profile.website = profile._json.blog
          User.count({}, function (err, count) {
            if (err) console.error(err)
            if (!count) {
              user.roles = {
                read: true,
                blog: true,
                project: true,
                lead: true,
                core: true,
                coreLead: true,
                superAdmin: true
              }
              user.teams.core = ['executive']
              user.teams.projects = ['website']
            }
            user.save(function (err) {
              if (err) console.error(err)
              done(err, user)
            })
          })
        })
      }
    }
  })
}))


/**
 * Sign in with GitHub.
 * NOTE: use this URL to login: /auth/github
 */
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: '/auth/github/callback',
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  var url = 'https://api.github.com/user/emails'
  var headers = _.cloneDeep(defaultHeaders)
  headers['Authorization'] += accessToken
  var options = {
    url: url,
    headers: headers
  }
  request(options, function (err, response, body) {

    if (err) console.error(err)
    if (!err && response.statusCode === 200) {
      var tokens = response.headers['x-oauth-scopes']
      profile.emails = JSON.parse(body)

      // user already in session
      if (req.user) {
        User.findOne({ github: profile.id }, function (err, existingUser) {
          if (err) console.error(err)

          User.findById(req.user.id, function (err, user) {
            if (err) console.error(err)
            user.github = profile.id
            user.email = _.filter(profile.emails, (email) => {
              return email.primary
            }).email
            user.username = profile.username
            user.tokens = _.reject(user.tokens, {kind: 'github'})
            user.tokens.push({ kind: 'github', accessToken: accessToken })
            user.profile.name = user.profile.name || profile.displayName
            user.profile.picture = user.profile.picture || profile._json.avatar_url
            user.profile.location = user.profile.location || profile._json.location
            user.profile.website = user.profile.website || profile._json.blog
            user.scopes = tokens
            if (user.scopes[0].indexOf(',') > -1) {
              user.scopes = user.scopes[0].split(', ')
            }
            User.count({}, function (err, count) {
              if (err) console.error(err)
              if (!count) {
                user.roles = {
                  read: true,
                  blog: true,
                  project: true,
                  lead: true,
                  core: true,
                  coreLead: true,
                  superAdmin: true
                }
              }
              user.save(function (err) {
                if (err) console.error(err)
                req.flash('info', { msg: 'GitHub authorization provided.' })
                done(err, user)
              })
            })
          })
        })

      // user not in session
      } else {

        User.findOne({ github: profile.id }, function (err, existingUser) {
          if (err) console.error(err)

          if (existingUser) {
            // think about updating?
            console.log('no req.user, and user exists')
            return done(null, existingUser)
          }

          console.log("no req.user, and user doesn't exist")

          // create this new user
          var user = new User()
          user.email = _.find(profile.emails, (email) => {
            return email.primary
          }).email
          user.scopes = tokens
          if (user.scopes[0].indexOf(',') > -1) {
            user.scopes = user.scopes[0].split(', ')
          }
          user.github = profile.id
          user.username = profile.username
          user.tokens.push({ kind: 'github', accessToken: accessToken })
          user.profile.name = profile.displayName
          user.profile.picture = profile._json.avatar_url
          user.profile.location = profile._json.location
          user.profile.website = profile._json.blog
          User.count({}, function (err, count) {
            if (err) console.error(err)
            if (!count) {
              user.roles = {
                read: true,
                blog: true,
                project: true,
                lead: true,
                core: true,
                coreLead: true,
                superAdmin: true
              }
              user.teams.core = ['executive']
              user.teams.projects = ['website']
            }
            user.save(function (err) {
              if (err) console.error(err)
              done(err, user)
            })
          })
        })
      }
    }
  })
}))

/**
 * Link Meetup account
 */
passport.use(new MeetupStrategy({
  consumerKey: process.env.MEETUP_KEY,
  consumerSecret: process.env.MEETUP_SECRET,
  callbackURL: '/auth/meetup/callback',
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    User.findById(req.user.id, function (err, user) {
      if (err) console.error(err)
      user.tokens.push({ kind: 'meetup', accessToken: accessToken })
      user.save(function (err) {
        if (err) console.error(err)
        req.flash('info', { msg: 'Meetup account has been linked.' })
        done(err, user)
      })
    })
  } else {
    req.flash('info', { msg: 'You must be logged in to link your Meetup account.' })
    done('ERROR')
  }
}))

/**
 * Sign in using Email and Password.
 NOTE: does not care about password in the POST!!
 */
passport.use(new LocalStrategy({ 
  usernameField: 'email',
  passwordField: 'password',
}, function (email, password, done) {
  console.log('passport ' + email + ' ' + password)
  email = email.toLowerCase();
  
  User.findOne({ email: email }, function (err, user) {
    if (err) console.error(err)
    if (!user) {
      return done(null, false, { message: 'Email ' + email + ' not found' })
    }
    user.comparePassword(password, function (err, isMatch) {
      if (err) console.error(err)
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Invalid email or password.' })
      }
    })
  })
}))

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Login Required middleware.
 */
exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function (req, res, next) {
  var provider = req.path.split('/').slice(-1)[0]

  if (_.find(req.user.tokens, { kind: provider })) {
    next()
  } else {
    res.redirect('/auth/' + provider)
  }
}

/* Check User role against provided roles */
exports.checkRoles = function (roles) {
  return function (req, res, next) {
    var valid = false
    _.forEach(roles, function (role) {
      if (req.user.roles[role]) {
        valid = true
      }
    })
    if (!valid) {
      req.flash('errors', { msg: 'You are not authorized to view this page.' })
      var backURL = req.header('Referer') || '/'
      return res.redirect(backURL)
    }
    next()
  }
}
/* Check Github Scopes against provided scopes */
exports.checkScopes = function (scopes) {
  return function (req, res, next) {
    var valid = true
    _.forEach(scopes, function (scope) {
      if (req.user.scopes.indexOf(scope) < 0) {
        valid = false
      }
    })
    if (!valid) {
      // Needs Additional scopes. Save url, auth more.
      return User.findById(req.user.id, function (err, user) {
        if (err) console.error(err)
        user.postAuthLink = req.url
        user.save(function (err) {
          if (err) console.error(err)
          var scopesString = scopes.join(',')
          res.redirect('/auth/github/elevate?scopes=' + scopesString)
        })
      })
    }
    next()
  }
}

exports.elevateScope = function (req, res, next) {
  var scopes = req.query.scopes.split(',')
  return passport.authenticate('github', { scope: scopes })(req, res, next)
}
