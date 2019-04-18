const request = require('supertest');
const express = require('express');
const app = express();

// set up the environment-based config
const Config = require('../../common/lib/ConfigFile.js');
const config = (new Config({ env: global.process.env.NODE_ENV })).config;

// configurations
app.locals.config = config;
app.locals.brigade = 'codeforsf';
app.set('port', config.api.port);

// routes
var RouterCfg = require('../express_router');
routerCfg = new RouterCfg({ config: config, expressApp: app })
app.use('/', routerCfg.router);

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

