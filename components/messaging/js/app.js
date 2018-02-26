require.config({
   paths: {
      jquery: 'lib/jquery',
      handlebars: 'lib/handlebars',
      backbone: 'lib/backbone',
      underscore: 'lib/underscore',
      messagingview: 'views/MessagingView',
      messagingmodel:  'models/MessagingModel',
   }
});

require(['views/MessagingView'], function(MessagingView){
   jQuery.ajax({
      url: 'http://localhost:5465/api/system/config'  
   }).done(function( configData ) {
      new MessagingView({
         config: configData,
         skills: ["javascript", "react"],
         interests: ["homelessness"],
         learning: ["nodejs"]
      });
   });
});