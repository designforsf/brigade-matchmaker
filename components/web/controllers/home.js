var moment = require('moment');
require('moment-timezone');

exports.index = function (req, res) {
  res.render(res.locals.brigade.theme.slug + '/views/home', {
    view: 'home',
    title: 'Home',
    brigade: res.locals.brigade,
    projectcount: foundProjects.length,
    postcount: posts,
    projects: foundProjects.splice(0, NUM_PROJECTS_SHOWN),
    events: foundEvents.slice(0, 3),
    posts: foundPosts
  });
}
