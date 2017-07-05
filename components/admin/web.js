var keystone = require('keystone');
keystone.init({
  
  'name': 'Matching Hat Admin',
  
  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public'],
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': 'mongodb://localhost/matching-admin',
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'uejhr5rpty59wyoksri87wh'
  
});
 
require('./models');
 
keystone.set('routes', require('./routes'));
 
keystone.start();
