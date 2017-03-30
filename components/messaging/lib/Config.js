/*
  constructor
  
  object attributes:
    config
  
*/

module.exports = Config;

function Config (attr) {
  var self = this;
  
  try {
    console.log('Attempting to require.resolve ' + 'config/' + global.process.env.NODE_ENV)
    require.resolve('../config/' + global.process.env.NODE_ENV);
    self.config = require('../config/' + global.process.env.NODE_ENV).config;

  } catch (err) {
    if (err) { console.error(err); }
    console.log('Service will use the default config: config/env.js.default');

    // fall back to the default config
    try {
      require.resolve('../config/env.js.default');
      self.config = require('../config/env.js.default').config;

    } catch (e) {
      if (err) { console.error(err); }
      console.error('Cannot load config/env.js.default');
      process.exit(e.code);
    }

  }
  
}
