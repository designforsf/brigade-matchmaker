// configure the messaging bridge

module.exports = function (attr) {

  /* attrs:
      expressApp
  */

  // set up the environment-based config
  var Config = require('../../messaging/lib/Config');
  var config = (new Config({ env: global.process.env.NODE_ENV })).config;

  // init the context
  var Context = require('../../messaging/lib/Context');
  msgService = new Context({ config: config });

  //routes
  var RouterCfg = require('../../messaging/express_router');
  routerCfg = new RouterCfg({ context: msgService, expressApp: attr.expressApp })
  attr.expressApp.use('/messaging', routerCfg.router);

}
