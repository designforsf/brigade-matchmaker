var moment = require('moment');
require('moment-timezone');


/**
/* This is API returns the hierarchy of skills to
/* be use in selection with the matching wizard.
/*
*/
exports.index = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/projects', {
    view: 'projects',
    title: 'Projects',
    brigade: res.locals.brigade,
  });
}



exports.projectList = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/MHwizard', {
    view: 'start_wizard',
    title: 'Interests, Skills, Goals',
    brigade: res.locals.brigade,
    skills: res.locals.projectTaxonomySkills,
    interests: res.locals.projectTaxonomyInterests,
    goals: res.locals.projectTaxonomyGoals
  });
}
