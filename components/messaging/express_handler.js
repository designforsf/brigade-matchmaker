

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

    res.write('<html><body><h1>Brigade Matching Hat: Slack Service</h1></body></html>');
    next();

  },


};
