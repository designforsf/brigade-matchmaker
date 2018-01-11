/*
  constructor
  
  object attributes:
    config
  
*/

module.exports = ConfigFile;

function ConfigFile (attr) {
  var self = this;
  
  try {
    console.log('Attempting to require.resolve ' + 'etc/' + global.process.env.NODE_ENV)
    require.resolve('../../etc/' + global.process.env.NODE_ENV);
    self.config = require('../../etc/' + global.process.env.NODE_ENV).config;

  } catch (err) {
    if (err) { console.error(err); }
    console.log('Service will use the default config: etc/env.js.default');

    // fall back to the default config
    try {
      require.resolve('../../../etc/env.js.default');
      self.config = require('../../../etc/env.js.default').config;

    } catch (defaulterr) {
      if (defaulterr) { console.error(defaulterr); }
      console.error('Cannot load etc/env.js.default');
      process.exit(defaulterr.code);
    }

  }
  
}
