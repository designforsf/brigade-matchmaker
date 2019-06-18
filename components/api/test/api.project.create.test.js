const faker = require('faker');
const testHelper = new ( require('../test-helper.js') );
const SupertestRequest = require('supertest');

const testRecords = [];

describe('Test create project', () => {
  test('It should response the POST method', (done) => {

    var newProject = {
        'id': 'UXR-Test-' + Math.floor(Math.random() * 10000),
        'brigade': 'codeforexample',
        'status': 'mvp',
        'thumbnailUrl': 'https://cloud.githubusercontent.com/assets/451510/23977184/d371c3ba-09a9-11e7-971c-f8dc705f0f5a.png',
        'bannerUrl': faker.image.people(),
        'bornAt': 'Code for Example',
        'geography': faker.address.city(),
        'politicalEntity': '',
        'name': 'UXR Test ' + Math.floor(Math.random() * 10000),
        'description': 'Developing a working prototype of a Matching App for new C4SF members.',
        'license': 'MIT',
        'websiteUrl': 'http://old.codeforsanfrancisco.org/research-group/projects/NewMemberEngagement/3-3_Implementation_ProjectMatchingHat/index.html',
        'repositoryUrl': 'https://github.com/designforsf/brigade-matchmaker',
        'slackChannel': 'research',
        'links': [],
        'videos': [],
        'matchingConfig': {
          'interests': ['all'],
          'skillsNeeded': ['backend-development/node', 'frontend-development/css', 'frontend-development/html', 'frontend-development/javascript'],
          'skillsOffered': ['backend-development/mongodb'],
          'goalsNeeded': ['developer','helper']
        },
        'matchingDescr': {
          'summary':'Developing a working prototype of a Matching App for new C4SF members.',
          'contactName': 'Jamie Pitts',
          'contactEmail': 'designforsf@gmail.com',
          'contactRole': 'Dev Lead',
          'contactThumbnailUrl': 'https://avatars3.githubusercontent.com/u/509756',
        },

        'todoItems': [
          'Admin tool in python django',
          'TOML importer and exporter',
          'Dockerize the component services',
          'Create API and UX tests'
        ],
        'progressItems': [
          'UX spec finalized',
          'Web prototype completed',
          'Deployed prototype to staging server'
        ],

        'keywords': [],
        'partners': [],
        'team': [
          {
            avatar: faker.internet.avatar(),
            username: faker.internet.userName()
          },
          {
            avatar: faker.internet.avatar(),
            username: faker.internet.userName()
          },
          {
            avatar: faker.internet.avatar(),
            username: faker.internet.userName()
          }
        ],
        'needs': [],
        'content': ''  
    };

    var jsonAPIObj = {
        data: {
            type: "project",
            attributes: newProject
        }
    }

    var path = '/api/project';
    var base_url = 'http://localhost:' + testHelper.app.get('port');

    //SupertestRequest(testHelper.app)
    SupertestRequest(base_url)
      .post(path)
      .send(jsonAPIObj)
      .type('application/json') //.set('Content-Type', 'application/json')
      .accept('application/json') //.set('Accept', 'application/json')//.expect(200)
      .set('port', testHelper.app.get('port')) //.set('Accept', 'application/json') //.expect('Content-Type', /json/) //.expect(200)
      .end( (err, res) => {
        if (err) {
          return done(err);
        }

    		// 200 status code
    		expect(res.statusCode).toBe(200);
    		
    		// data returned
        var output = JSON.parse(res.text);
        expect(output).toBeDefined();
        expect(output.data).toBeDefined();

        testRecords.push(output.data);

        done();
    }); // END .end of SupertestRequest

  }); // END test('It should response the POST method'


  afterAll( () => {
    console.log('afterAll');

    testRecords.forEach(function (rec) {
      console.log('Call the API to delete project id=' + rec._id);

      var path = '/api/project/' + rec._id;
      var base_url = 'http://localhost:' + testHelper.app.get('port');

      console.log('Delete with path=' + path);

      SupertestRequest(base_url)
        .delete(path)
        .set('port', testHelper.app.get('port')) 
        .end( (err, res) => {
          if (err) {
            //return done(err);
            console.error(err);
          }

          //console.log(res);
          //console.log('successfully deleted id=' + rec._id);

      }); // END .end of SupertestRequest


    });

    done();
  });

}); // END describe('Test create project'