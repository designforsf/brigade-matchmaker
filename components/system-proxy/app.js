var http = require('http'),
    httpProxy = require('http-proxy')
;

/*

  NOTE: possibly should use this module to define proxy rules:
  https://github.com/donasaur/http-proxy-rules

*/

// config
var ConfigFile = require('../common/lib/ConfigFile');
var config = new ConfigFile().config;

// proxy
var proxy = httpProxy.createProxyServer({
});

// web service
var server = http.createServer(function(req, res) {

	switch (true) {

		// selector ui component
		case (/^\/selector/i).test(req.url):
			console.log(config.selector_ui.title + ' ' + req.url);

      // remove selector from URL
      //req.url = req.url.replace(/^\/selector/i, '/');

  		proxy.web(req, res, { 
  			target: 'http://127.0.0.1:' + config.selector_ui.port
  		});
  		break;

		// messaging component
		case (/^\/messaging/i).test(req.url):
			console.log(config.messaging.title + ' ' + req.url);

      // remove messaging from URL
      //req.url = req.url.replace(/^\/messaging/i, '/');

  		proxy.web(req, res, { 
        target: 'http://127.0.0.1:' + config.messaging.port
      });
  		break;

  	// web component
  	default:
  		console.log(config.web.title + ' ' + req.url);
  		proxy.web(req, res, { 
        target: 'http://127.0.0.1:' + config.web.port
      });
  		break;

	}

});

// listen on main web port
console.log(config.main.title + ' listening at http://%s:%s', config.main.host, config.main.port);
server.listen(config.main.port);