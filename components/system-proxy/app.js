var http = require('http'),
    httpProxy = require('http-proxy')
;

// config
var ConfigFile = require('../common/lib/ConfigFile');
var config = new ConfigFile().config;

// proxy
var proxy = httpProxy.createProxyServer({
});

// web service
var server = http.createServer(function(req, res) {

	console.log(req.url);

	switch (true) {

		// selector ui component
		case (/^\/selector/).test(req.url):
			console.log(config.selector_ui.title);
  		proxy.web(req, res, { 
  			target: 'http://127.0.0.1:' + config.selector_ui.port 
  		});
  		break;

		// messaging component
		case (/^\/messaging/).test(req.url):
			//console.log(config.messaging.title);
  		proxy.web(req, res, { target: 'http://127.0.0.1:' + config.messaging.port });
  		break;

  	// web component
  	default:
  		//console.log(config.web.title);
  		proxy.web(req, res, { target: 'http://127.0.0.1:' + config.selector_ui.port  });
  		break;

	}

});

// listen on main web port
console.log(config.main.title + ' listening at http://%s:%s', config.main.host, config.main.port);
server.listen(config.main.port);