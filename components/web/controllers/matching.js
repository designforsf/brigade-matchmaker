var moment = require('moment');
require('moment-timezone');

exports.index = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/matching', {
    view: 'matching',
    title: 'Matching Hat',
    brigade: res.locals.brigade,
  });
}
