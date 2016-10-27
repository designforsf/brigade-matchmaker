var moment = require('moment');
require('moment-timezone');

exports.index = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/home', {
    view: 'home',
    title: 'Home',
    brigade: res.locals.brigade,
  });
}
