var moment = require('moment');
require('moment-timezone');

exports.index = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/projects', {
    view: 'projects',
    title: 'Projects',
    brigade: res.locals.brigade,
  });
}
