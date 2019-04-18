/*
  constructor
  
  object attributes:
    config
  
*/

module.exports = ConfigFile;

function ConfigFile (attr) {
  var self = this;
  
  var env = global.process.env.NODE_ENV ? global.process.env.NODE_ENV : 'development';

  var projDir = process.cwd();
  projDirArr = projDir.split('/');
  projDirArr.splice(-2,2);
  projDir = projDirArr.join('/');

  //projDir.replace('components','');
  //console.log(projDir);

  try {
    console.log('ConfigFile: require.resolve ' + projDir + '/etc/' + env)
    require.resolve(projDir + '/etc/' + env);
    self.config = require(projDir + '/etc/' + env).config;

  } catch (err) {
    if (err) { console.error(err); }
    console.log('ConfigFile: service will use the default config: etc/env.js.default');

    // fall back to the default config
    try {
      require.resolve(projDir + '/etc/env.js.default');
      self.config = require(projDir + '/etc/env.js.default').config;

    } catch (defaulterr) {
      if (defaulterr) { console.error(defaulterr); }
      console.error('ConfigFile: cannot load etc/env.js.default');
      process.exit(defaulterr.code);
    }

  }
  
}
