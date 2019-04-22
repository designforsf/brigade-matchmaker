
const testHelper = new ( require('../test-helper.js') );

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        testHelper.req(testHelper.app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

