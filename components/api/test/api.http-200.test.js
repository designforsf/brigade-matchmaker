
const testHelper = new ( require('../test-helper.js') );
const SupertestRequest = require('supertest');

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        SupertestRequest(testHelper.app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

