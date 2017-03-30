

module.exports = {

  /*
    end
  */

  end: function (req, res, next) {
    res.end();
  },


  /*
    render index
  */

  render_index: function (req, res, next) {
    console.log('render_index');
    res.write('<html><body><h1>Brigade Matching Hat: Messaging Service</h1></body></html>');
    next();

  },
  
  /*
    send
  */
  
  send: function (req, res, next) {
    console.log('send');
    
    var context = res.locals.msgServiceContext;
    
    // send the email
    context.sendEmail({
      email: {
        from: req.body.email.from,
        to: req.body.email.to,
        subject: req.body.email.subject,
        text: req.body.email.text
      }
    }, function (err, output) {
      //res.json(output);
      next();
    })
    
    
  }


};
