
/*
   localdev app.js
   
   Used for local development, included an index.html static file
*/

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
   jQuery.ajax({
      url: 'http://localhost:5465/api/system/config'
   }).done(function( configData ) {
      new ProjectView({
         config: configData,
         skills: ["java", "react"],
         interests: ["webDev"],
         learning: ["node"],
         initiateContactCb: function (attr) {
            console.log('temporary initiateContactCb defined in app.js');
            var win = window.open('/components/messaging', '_new');
            win.focus();
         }
      });
   });
});