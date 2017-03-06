/*
  SoFi
  
  Context configuration object
  
  Initializes critical resources for the system
  
  Attributes of context:
    config - configuration for development, staging, production
*/


/*
  node module dependencies
*/

var Imap = require('imap')
    inspect = require('util').inspect
;


/*
  constructor
*/

module.exports = Context;

function Context (attr) {
  var self = this;
  
  /*
    config
      web
      mongodb

  */
  
  self.config = attr.config;
  
  // set up imap
  self.imap = new Imap(self.config.imap);
  
  // test out the fetching of 3 recent emails
  console.log('Test: read some emails from gmail');
  self.imap.once('ready', function() {
    self.imap.openBox('INBOX', true, function(err, box) {
      if (err) throw err;
      var fetch = self.imap.seq.fetch('1:3', {
        bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
        struct: true
      });
      fetch.on('message', function(msg, seqno) {
        console.log(' Message #%d', seqno);
        
        var prefix = ' (#' + seqno + ') ';
        msg.on('body', function(stream, info) {
          var buffer = '';
          stream.on('data', function(chunk) {
            buffer += chunk.toString('utf8');
          });
          stream.once('end', function() {
            console.log(' '  + prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
          });
        });
        msg.once('attributes', function(attrs) {
          //console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        msg.once('end', function() {
          console.log(' ' + prefix + 'Finished');
        });
        
      });
      fetch.once('error', function(err) {
        console.log(' Fetch error: ' + err);
      });
      fetch.once('end', function() {
        console.log(' Done fetching all messages!');
        self.imap.end();
      });
        
    });
  });
  
  self.imap.once('error', function(err) {
    console.log('imap error ', err);
  });

  self.imap.once('end', function() {
    console.log('Connection ended');
  });

  self.imap.connect();
  
  
}
