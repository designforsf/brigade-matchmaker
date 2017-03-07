/*
  Messaging Component: Context configuration object
  
  Initializes critical resources for the system
  
  Attributes of context:
    
    config - configuration for development, staging, production
    
    imap - interface to retrieve emails 
      SEE: https://github.com/mscdex/node-imap
    
    mailparser - interface to parse emails
      SEE: https://github.com/nodemailer/mailparser
    
    emailjs -  interface to send emails
      SEE: https://github.com/eleith/emailjs
      
*/


/*
  node module dependencies
*/

var Imap = require('imap')
    MailParser = require('mailparser').MailParser
    EmailJs = require('emailjs/email')
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
  
  
  // set up imap retriever
  // ------------------------------------------------------
  self.imap = new Imap(self.config.imap);
  
  self.imap.once('ready', function() {
    console.log('imap ready');
    self.testProcessEmails();
  });
  
  self.imap.once('error', function(err) {
    console.log('imap error ', err);
  });

  self.imap.once('end', function() {
    console.log('imap Connection ended');
  });
  
  self.imap.connect();
  
  
  // set up email parser 
  // ------------------------------------------------------
  self.parser = new MailParser();
  
  
  // set up email sender
  // ------------------------------------------------------
  self.emailServer = EmailJs.server.connect(self.config.emailjs);
  self.testSendEmail();
  

  
  
}


/*
  testProcessEmails
*/

Context.prototype.testProcessEmails = function () {
  var self = this;
  
  // test out the fetching of 3 recent emails
  console.log('testProcessEmails: read some emails from gmail');
  
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
}

/* 
  testSendEmail
*/

Context.prototype.testSendEmail = function () {
  var self = this;
  console.log('Test: send an email to gmail');
  
  self.emailServer.send({
     text:    "Sending test message", 
     from:    "Hifriend Volunteery <welcome.sfbrigade#+01-01@gmail.com>", 
     to:      "Project Lead <welcome.sfbrigade+02-02@gmail.com>",
     subject: "New Member Intro: Hifriend Volunteery"
  }, function(err, message) { 
    if (err) {
      console.error(err);
    }
    console.log('Sent message ', message); 
  });

}
