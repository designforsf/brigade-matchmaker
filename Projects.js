var faker = require('faker');

module.exports = [
  {
    'id': 'UXR-Matching-App-DigitalPrototype',
    'brigade': 'codeforexample',
    'status': 'mvp',
    'thumbnailUrl': 'https://cloud.githubusercontent.com/assets/451510/23977184/d371c3ba-09a9-11e7-971c-f8dc705f0f5a.png',
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'UXR Matching App - Digital Prototype',
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

    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
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
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  
  {
    'id': 'Roadmap-to-HTML',
    'brigade': 'codeforexample',
    'status': 'mvp',
    'thumbnailUrl': 'https://cloud.githubusercontent.com/assets/451510/23977184/d371c3ba-09a9-11e7-971c-f8dc705f0f5a.png',
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'Roadmap to HTML',
    'description': 'Publishing an essential reentry resource on the web',
    'license': 'MIT',
    'websiteUrl': 'https://rootandrebound.github.io/roadmap-to-html/',
    'repositoryUrl': 'https://github.com/rootandrebound/roadmap-to-html',
    'slackChannel': 'research',
    'links': [],
    'videos': [],
    'matchingConfig': {
      'interests': ['all'],
      'skillsNeeded': ['frontend-development/css', 'frontend-development/html'],
      'skillsOffered': ['frontend-development/css'],
      'goalsNeeded': ['developer','helper']
    },
    'matchingDescr': {
      'summary':'Publishing an essential reentry resource on the web for governmental use.'
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

    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
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
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'ShelterTech',
    'brigade': 'codeforexample',
    'status': 'alpha',
    'thumbnailUrl': 'https://www.google.com/a/sheltertech.org/images/logo.gif?alpha=1&service=google_default',
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'ShelterTech',
    'description': "We're building a suite of products and services for SF's homeless and underserved communities.",
    'license': 'MIT',
    'repositoryUrl': 'https://github.com/designforsf/brigade-matchmaker',
    'websiteUrl': 'http://old.codeforsanfrancisco.org/research-group/projects/NewMemberEngagement/3-3_Implementation_ProjectMatchingHat/index.html',
    'slackChannel': 'research',
    'links': [],
    'videos': [],
    'matchingConfig': {
      'interests': ['homelessness'],
      'skillsNeeded': ['mobile-development/ios'],
      'skillsOffered': ['frontend-development/javascript'],
      'goalsNeeded': ['developer']
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

    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
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
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }
    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'California-OpenJustice',
    'brigade': 'codeforexample',
    'status': 'beta',
    'thumbnailUrl': 'http://datascience.codeforsanfrancisco.org/wp-content/uploads/2017/03/doj-screenshot.png',
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'California OpenJustice',
    'description': 'Equity & equality in the CA criminal justice system',
    'license': 'MIT',
    'websiteUrl': 'https://getkong.org/install',
    'repositoryUrl': 'https://github.com/codeforexample/forked-project-kong',
    'slackChannel': 'research',
    'links': [],
    'videos': [],
    'matchingConfig': {
      'interests': ['criminal-justice'],
      'skillsNeeded': ['data-science/data-modeling','data-science/predictive-modeling','data-science/data-analysis'],
      'skillsOffered':[],
      'goalsNeeded': ['developer','helper']
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

    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
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
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }

    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'Adopt-a-Drain',
    'brigade': 'codeforexample',
    'status': 'live',
    'thumbnailUrl': 'http://i.imgur.com/JUmCJ5L.png',
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'Adopt-a-Drain',
    'description': 'Claim responsibility for cleaning out a storm drain after it rains.',
    'license': 'MIT',
    'websiteUrl': 'http://adoptadrain.sfwater.org/',
    'repositoryUrl': 'https://github.com/sfbrigade/adopt-a-drain',
    'slackChannel': 'research',
    'links': [],
    'videos': [],
    'matchingConfig': {
      'interests': ['housing'],
      'skillsNeeded': ['backend-development/rails','backend-development/ruby','frontend-development/javascript'],
      'skillsOffered':['frontend-development/css', 'frontend-development/html'],
      'goalsNeeded': ['developer','bug-testing']
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

    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
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
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }

    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  },
  {
    'id': 'Brigadehub',
    'brigade': 'codeforexample',
    'status': 'mvp',
    'thumbnailUrl': 'https://cdn.rawgit.com/brigadehub/brigadehub/cc51c9ad/assets/rasterized/logo-square-white-blue.png',
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'Brigadehub',
    'description': 'Data portal and CMS for brigades',
    'license': 'MIT',
    'websiteUrl': 'https://brigadehub.github.io',
    'repositoryUrl': 'https://github.com/brigadehub/brigadehub',
    'slackChannel': 'research',
    'links': [],
    'videos': [],
    'matchingConfig': {
      'interests': ['community-issues'],
      'skillsNeeded': ['backend-development/node','backend-development/mongodb'],
      'skillsOffered': ['marketing/communications'],
      'goalsNeeded': ['developer']
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

    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
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
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }

    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  }, {
    'id': 'The-data-scienceence-Working-Group',
    'brigade': 'codeforexample',
    'status': 'proposed',
    'thumbnailUrl': 'https://github.com/sfbrigade/data-scienceence-wg/raw/master/datascience-wg_header.jpg  ',
    'bannerUrl': faker.image.people(),
    'bornAt': 'Code for Example',
    'geography': faker.address.city(),
    'politicalEntity': '',
    'name': 'The Data Science Working Group',
    'description': faker.hacker.phrase(),
    'license': 'MIT',
    'websiteUrl': 'http://datascience.codeforsanfrancisco.org/',
    'repositoryUrl': 'https://github.com/codeforexample/mirrored-project-mirror',
    'slackChannel': 'research',
    'links': [],
    'videos': [],
    'matchingConfig': {
      'interests': [],
      'skillsNeeded': ['data-science/python','frontend-development/visualization','data-science/machine-learning'],
      'skillsOffered': ['data-science/python'],
      'goalsNeeded': ['developer','learner']
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

    'keywords': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
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
      },
      {
        avatar: faker.internet.avatar(),
        username: faker.internet.userName()
      }

    ],
    'needs': [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    'content': '# This Project! \n\n This is sub info.\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n' +
      faker.lorem.paragraph() +
      '\n\n| Table | Info | Goes | Here |\n| --- | --- | --- | --- |\n| foo | bar | lorem | ipsum |'
  }
];
