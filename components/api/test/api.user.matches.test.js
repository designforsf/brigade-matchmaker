
const testHelper = new ( require('../test-helper.js') );

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {

		var url = '/api/user/matches?skills=&interests=&learnSkills=&';

    testHelper.req(testHelper.app)
    	.get(url)
    	.set('port', 5455)
    	.set('Accept', 'application/json')
    	.then((res) => {
    		
    		// 200 status code
    		expect(res.statusCode).toBe(200);
    		
    		// data returned
        var matches = JSON.parse(res.text);
        expect(matches).toBeDefined();
        expect(matches.data).toBeDefined();
        expect(matches.data.length).toBeGreaterThan(0);

        done();
    });
  });
});