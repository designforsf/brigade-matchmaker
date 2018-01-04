require.config({
   paths: {
      jquery: 'lib/jquery',
      handlebars: 'lib/handlebars',
      'handlebars.runtime':  'lib/handlebars.runtime',
      backbone: 'lib/backbone',
      underscore: 'lib/underscore',
      localstorage : 'lib/backbone.localStorage',
      lockr: 'lib/lockr',
      boostrap: 'lib/bootstrap.min.js',
      projlistview: 'views/ProjectView',
      projlistmodel:  'models/ProjectModel',
      MessageView: '../../slackbot/js/app'
   }
});

require(['projlistview'], function(ProjectView){
   new ProjectView({
      skills: ["java", "react"],
      interests: ["webDev"],
      learning: ["node"]
   });
});