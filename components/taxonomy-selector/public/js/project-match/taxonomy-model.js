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


}) (( window.ProjectMatch=window.ProjectMatch || {}));