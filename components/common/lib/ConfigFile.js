/*
  constructor
  
  object attributes:
    config
  
*/

module.exports = ConfigFile;

function ConfigFile (attr) {
  var self = this;
  
  var env = global.process.env.NODE_ENV ? global.process.env.NODE_ENV : 'development';

  try {
    console.log('ConfigFile: require.resolve ' + 'etc/' + env)
    require.resolve('/app/etc/' + env);
    self.config = require('/app/etc/' + env).config;

  } catch (err) {
    if (err) { console.error(err); }
    console.log('ConfigFile: service will use the default config: etc/env.js.default');

    // fall back to the default config
    try {
      require.resolve('/app/etc/env.js.default');
      self.config = require('/app/etc/env.js.default').config;

    } catch (defaulterr) {
      if (defaulterr) { console.error(defaulterr); }
      console.error('ConfigFile: cannot load etc/env.js.default');
      process.exit(defaulterr.code);
    }

  }
  
}
