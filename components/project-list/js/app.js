require.config({
   paths: {
      jquery: 'lib/jquery',
      handlebars: 'lib/handlebars',
      backbone: 'lib/backbone',
      text: 'lib/text',
      underscore: 'lib/underscore',
      localstorage : 'lib/backbone.localStorage',
      lockr: 'lib/lockr',
      boostrap: 'lib/bootstrap.min.js'
   }
});

require(['views/ProjectView'], function(ProjectView){
   new ProjectView({
      skills: ["java", "react"],
      interests: ["webDev"],
      learning: ["node"]
   });
});