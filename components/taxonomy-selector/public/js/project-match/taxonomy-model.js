(function (projectMatch) {


	projectMatch.TaxonomyModel = {};
  var self = ProjectMatch.TaxonomyModel;
  self.config = undefined;

  /*
    init
  */

  ProjectMatch.TaxonomyModel.init = function (attr) {
    console.log('ProjectMatch.TaxonomyModel.init()');
    //console.log(attr);

    self.config = attr.config;
    return self;
  }

  /*
    get skills taxonomy

  */

  ProjectMatch.TaxonomyModel.getSkills = function (cb) {
    jQuery.ajax({
        url: 'http://' + self.config.web.host + ':' + self.config.web.port 
          + '/api/project/taxonomy/skills',
        success: cb
    })
  }

  /*
    get interests taxonomy

  */

  ProjectMatch.TaxonomyModel.getInterests = function (cb) {
    jQuery.ajax({
        url: 'http://' + self.config.web.host + ':' + self.config.web.port 
          + '/api/project/taxonomy/interests',
        success: cb
    })
  }

  /*
    get roles taxonomy

  */

  ProjectMatch.TaxonomyModel.getRoles = function (cb) {
    jQuery.ajax({
        url: 'http://' + self.config.web.host + ':' + self.config.web.port 
          + '/api/project/taxonomy/roles',
        success: cb
    })
  }


}) (( window.ProjectMatch=window.ProjectMatch || {}));