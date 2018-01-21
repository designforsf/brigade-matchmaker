require.config({
   paths: {
      jquery: 'lib/jquery',
      handlebars: 'lib/handlebars',
      backbone: 'lib/backbone',
      underscore: 'lib/underscore',
      messagingview: 'views/MessagingView',
   }
});

/*
require(['messagingview'], function(MessagingView){
   new MessagingView({
      //Use learnedSkills
      skills: ["java", "react"],
      interests: ["webDev"],
      learning: ["node"]
   });
});
*/