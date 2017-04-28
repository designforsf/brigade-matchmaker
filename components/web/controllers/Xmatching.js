var moment = require('moment');
require('moment-timezone');

exports.index = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/matching', {
    view: 'matching',
    title: 'Matching Hat',
/**
/* send the matching output object back to matching.jade
   using "projects"                                     */
    projects: res.locals.output,
  });
}
