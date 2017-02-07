/**
 * Check Node Version FIRST
 */
require('node-version-checker')

/**
 * Module dependencies.
 */
var express = require('express')
var _ = require('lodash')
var cookieParser = require('cookie-parser')
var compress = require('compression')
var favicon = require('serve-favicon')
var session = require('express-session')
var bodyParser = require('body-parser')
var logger = require('morgan')
var errorHandler = require('errorhandler')
var lusca = require('lusca')
var methodOverride = require('method-override')
var MongoStore = require('connect-mongo/es5')(session)
var flash = require('express-flash')
var mongoose = require('mongoose')
var passport = require('passport')
var expressValidator = require('express-validator')
var sass = require('node-sass-middleware')
var path = require('path')
var requireDir = require('require-dir')
var pkg = require('./package.json')
require('colors')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env
 */
require('./dotenv.js')()
/**
 * Controllers (route handlers).
 */
var apiCtrl = require('./controllers/api')
var homeCtrl = require('./controllers/home')
var usersCtrl = require('./controllers/user')

/*
 * Helpers
 */
var helpers = requireDir('./helpers')

var brigadeDetails

/**
 * API keys and Passport configuration.
 */
var passportConf = require('./config/passport')

/**
 * Create Express server.
 */
var app = express()

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI, function (err) {
  if (err) throw new Error(err)
})
mongoose.connection.on('error', function (err) {
  console.log('There was an error while trying to connect!')
  throw new Error(err)
})

/**
 * Check Model Settings in db
 */
var Brigade = require('./models/Brigade')
var Projects = require('./models/Projects')
var User = require('./models/Users')
var UserMatchConfig = require('./models/UserMatchConfigs')

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 5465)
app.set('views', path.join(__dirname, 'themes'))
app.locals.capitalize = function (value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
app.locals.plural = function (value) {
  if (value[value.length - 1] === 's') {
    return value + 'es'
  }
  return value + 's'
}
app.set('view engine', 'jade')
app.use(compress())

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(methodOverride())
app.use(cookieParser())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}))
/* Check if db is connected */
app.use(checkDB)
function checkDB (req, res, next) {
  if (!DB_INSTANTIATED) {
    return setTimeout(function () {
      checkDB(req, res, next)
    }, 500)
  }
  next()
}
/* Attach brigade info to req */
app.use(function (req, res, next) {
  Brigade.find({}, function (err, results) {
    if (err) throw err
    if (!results.length) throw new Error('BRIGADE NOT IN DATABASE')
    res.locals = res.locals || {}
    res.locals.brigade = results[0]
    res.locals.brigade.buildVersion = pkg.version
    helpers.tokenLoader(passport, res.locals.brigade.auth)
    next()
  })
})
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(lusca({
  csrf: false,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}))
app.use(function (req, res, next) {
  // check postAuthLink and see if going to auth callback
  if (req.user && req.user.postAuthLink && req.user.postAuthLink.length) {
    console.log('req.user.postAuthLink present!', req.user.postAuthLink)
    if (
      !(/auth\/github\/callback/i.test(req.path)) &&
      !(/auth\/github\/elevate/i.test(req.path))

    ) {
      console.log('path not callback or elevate!', req.path)
      return User.findById(req.user.id, function (err, user) {
        if (err) console.error(err)
        user.postAuthLink = req.user.postAuthLink = ''
        user.save(function (err) {
          if (err) console.error(err)
          res.locals.user = req.user
          next()
        })
      })
    }
  }
  res.locals.user = req.user
  next()
})
app.use(function (req, res, next) {
  req.previousURL = req.header('Referer') || '/'
  next()
})
app.use(function (req, res, next) {
  if (/api/i.test(req.path)) {
    req.session.returnTo = req.path
  }
  next()
})

/**
 * Primary app routes.
 */

app.get('/', homeCtrl.index)

app.get('/login', usersCtrl.getLogin)
app.post('/login', usersCtrl.postLogin)
app.get('/login/edit',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  usersCtrl.getLoginEdit)
app.post('/login/edit',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  usersCtrl.postLoginEdit)
app.get('/logout', usersCtrl.getLogout)


/**
 * API routes
 */

 app.post('/api/user/create_and_login', apiCtrl.createUserAndLogin)
 app.post('/api/user/login', apiCtrl.userLogin)
 app.get('/api/user/session', apiCtrl.getUserSession)
 //app.get('/api/user/match_config', apiCtrl.getUserMatchConfig)
 app.post('/api/user/match_config', apiCtrl.updateUserMatchConfig)
 app.get('/api/user/matches', apiCtrl.getUserMatches)
 app.get('/api/projects', apiCtrl.getProjects)
 app.get('/test/api/projects', apiCtrl.testProjects)

/**
 * Meta Routes
 */

app.get('/account', passportConf.isAuthenticated, usersCtrl.getAccount)
app.post('/account/profile', passportConf.isAuthenticated, usersCtrl.postUpdateProfile)
app.post('/account/delete', passportConf.isAuthenticated, usersCtrl.postDeleteAccount)

/**
 * Users routes.
 */
app.get('/users', usersCtrl.getUsers)
app.get('/users/manage',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  passportConf.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']),
  usersCtrl.getUsersManage)
app.post('/users/manage',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  passportConf.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']),
  usersCtrl.postUsersManage)
app.post('/users/sync',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  passportConf.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']),
  usersCtrl.postUsersSync)
app.get('/users/new',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  passportConf.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']),
  usersCtrl.getUsersNew)
app.post('/users/new',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  passportConf.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']),
  usersCtrl.postUsersNew)
app.get('/users/:userId', usersCtrl.getUsersID)
app.post('/users/:userId',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  passportConf.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']),
  usersCtrl.postUsersIDSettings)
app.get('/users/:userId/settings',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  passportConf.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']),
  usersCtrl.getUsersIDSettings)
app.post('/users/:userId/sync',
  passportConf.isAuthenticated,
  passportConf.checkRoles(['core', 'superAdmin']),
  passportConf.checkScopes(['user', 'repo', 'admin:org', 'admin:repo_hook', 'admin:org_hook']),
  usersCtrl.postUsersIDSync)

/**
 * OAuth authentication routes. (Sign in)
 */

 // local logins

 // google logins
app.get('/auth/google', passport.authenticate('google', {
  scope: [
    'profile'
  ]
}))
app.get('/auth/google/elevate', passportConf.elevateScope)
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
  console.log('new google callback!', req.user.postAuthLink)
  req.user.postAuthLink = req.user.postAuthLink || ''
  res.redirect(req.user.postAuthLink.length ? req.user.postAuthLink : '/')
})

 // github logins
app.get('/auth/github', passport.authenticate('github', {
  scope: [
    'user',
    'public_repo'
  ]
}))
app.get('/auth/github/elevate', passportConf.elevateScope)
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function (req, res) {
  console.log('new github callback!', req.user.postAuthLink)
  req.user.postAuthLink = req.user.postAuthLink || ''
  res.redirect(req.user.postAuthLink.length ? req.user.postAuthLink : '/')
})

// meetup logins
app.get('/auth/meetup', passport.authenticate('meetup', { scope: ['basic', 'rsvp'] }))
app.get('/auth/meetup/callback', passport.authenticate('meetup', { failureRedirect: '/account' }), function (req, res) {
  res.redirect(req.session.returnTo || '/account')
})

app.get('/auth/disconnect/:service', passportConf.isAuthenticated, usersCtrl.disconnectService)
/**
 * Error Handler.
 */
app.use(errorHandler())

/**
 * Check if projects exist before starting Express server
 */
Projects.find({}, function (err, results) {
  if (err) throw err
  if (!results.length) {
    console.log('No projects found!');

    // load projects from seed
    var defaultProjects = require('./seeds/development/Projects')
    defaultProjects.forEach(function(project) {
      console.log('load project id=' + project.id);
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
    var defaultBrigadeData = require('./seeds/development/Brigade')()[0]
    defaultBrigadeData.slug = process.env.BRIGADE
    brigadeDetails = defaultBrigadeData
    var defaultBrigade = new Brigade(defaultBrigadeData)
    defaultBrigade.save(function (err) {
      if (err) throw err
      DB_INSTANTIATED = true
      startServer()
    })
  } else {
    DB_INSTANTIATED = true
    brigadeDetails = results[0]
    startServer()
  }
})

/**
  * Start the Express server.
  */
function startServer () {
  app.use(sass({
    src: path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public'),
    dest: path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public'),
    debug: true,
    sourceMap: true,
    outputStyle: 'expanded'
  }))
  app.use(function (req, res, next) {
    if (_.filter(res.locals.brigade.redirects, {endpoint: req.path}).length) {
      var redirect = _.filter(res.locals.brigade.redirects, {endpoint: req.path})[0]
      if (redirect.type === 'permanent') {
        return res.redirect(301, redirect.destination)
      }
      return res.redirect(redirect.destination)
    }
    next()
  })
  app.use(favicon(path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public', 'favicon.png')))
  app.use(express.static(path.join(__dirname, 'themes/' + brigadeDetails.theme.slug + '/public'), { maxAge: 31557600000 }))
  app.listen(app.get('port'), function () {
    console.log('[BrigadeMatchmaker]'.yellow + ' Server listening on port', app.get('port'))
  })
}

module.exports = app
