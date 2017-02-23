var moment = require('moment');
require('moment-timezone');

exports.index = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/home', {
    view: 'home',
    title: 'Home',
    brigade: res.locals.brigade,
  });
}

exports.projectList = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/home', {
    view: 'home',
    title: 'Home',
    brigade: res.locals.brigade,
    skills: res.locals.projectTaxonomySkills,
    interests: res.locals.projectTaxonomyInterests,
    goals: res.locals.projectTaxonomyGoals
  });
}
