/*

  Deprecated? -PJ 1/2/19

  Add to heroku
  Default Config

  Copy this file and name it after your global.process.dev.NODE_ENV (example: dev.js)

  The services will use this default config file if there is no file found
    (based on global.process.dev.NODE_ENV)

*/

exports.config = {
  web: {
    host: 'localhost',
    port: 5475,
  },
  mongodb: {
    host: 'localhost',
    port: 27017,
    db: 'brigade-matchmaker'
  },
  session: {
    secret: 'sfbrigade-matching-hat-messaging',
    key: 'sfbrigade-matching-hat-messaging'
  },
  imap: {
    user: 'welcome.sfbrigade@gmail.com',
    password: 'Ho2%8h%4QUe^V2#p21',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  },
  emailjs: {
    user:    'welcome.sfbrigade@gmail.com',
    password: 'Ho2%8h%4QUe^V2#p21',
    host:    'smtp.gmail.com',
    ssl:     true
  },
  keychain: {
    keys: [
      { key: 'local', secret: 'secret' }
    ]
  },
  testData: {
    users: {
      newMember01: {
        email: '',
        name: 'Hifriend01 Smiley',
        id: 'nm01'
      },
      newMember02: {
        email: '',
        name: 'Hifriend02 Volunteery',
        id: 'nm02'
      },
      projectLead01: {
        email: '',
        name: 'Leader01 Responsive',
        id: 'pl01'
      },
      projectLead02: {
        email: '',
        name: 'Leader02 Helpful',
        id: 'pl02'
      }
    }
  }
};
