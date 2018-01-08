(function (projectMatch) {


	projectMatch.TaxonomyModel = {};

  /*
    get skills taxonomy

  */

  ProjectMatch.TaxonomyModel.getSkills = function (cb) {
    jQuery.ajax({
        url: 'http://localhost:5465/api/project/taxonomy/skills',
        success: cb
    })
  }

  /*
    get interests taxonomy

  */

  ProjectMatch.TaxonomyModel.getInterests = function (cb) {
    jQuery.ajax({
        url: 'http://localhost:5465/api/project/taxonomy/interests',
        success: cb
    })
  }

  /*
    get roles taxonomy

  */

  ProjectMatch.TaxonomyModel.getRoles = function (cb) {
    jQuery.ajax({
        url: 'http://localhost:5465/api/project/taxonomy/roles',
        success: cb
    })
  }


}) (( window.ProjectMatch=window.ProjectMatch || {}));