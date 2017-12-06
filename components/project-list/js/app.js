require.config({
   paths: {
      jquery: 'lib/jquery',
      handlebars: 'lib/handlebars',
      'handlebars.runtime':  'lib/handlebars.runtime',
      backbone: 'lib/backbone',
      text: 'lib/text',
      underscore: 'lib/underscore',
      localstorage : 'lib/backbone.localStorage',
      lockr: 'lib/lockr',
      boostrap: 'lib/bootstrap.min.js',
      projlistview: 'views/ProjectView',
      projlistmodel:  'models/ProjectModel',
      projlisttemplate: 'templates/projects'
   }  
});

require(['projlistview'], function(ProjectView){
   new ProjectView({
      skills: ["java", "react"],
      interests: ["webDev"],
      learning: ["node"]
   });
});