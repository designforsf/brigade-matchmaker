var moment = require('moment');
require('moment-timezone');

exports.index = function (req, res) {
/**
/* changed index view to the checkin form
/* which requests email address and name rather
/* than directing use to login with Github
*/
  res.render(res.locals.brigade.theme.slug + '/views/account/login', {
    view: 'checkin',
    title: 'Checkin',
    brigade: res.locals.brigade,
  });
}

/**
/*
/* Changed the taxonomies entry to use MHwizard.jade
/* start_wizard has been renamed to MHwizard as the feature set
/* now encompasses more than just the "start" of matching
/* and on the same page the user also reviews the results and
/* can revise their search and try again.
/*
/* This is where the user will select interests, skills and goals to match.
/*
/*  res.render(res.locals.brigade.theme.slug + '/views/home', {
*/

exports.projectList = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/project-match', {
    title: 'Project Match',
    brigade: res.locals.brigade
  });
}
