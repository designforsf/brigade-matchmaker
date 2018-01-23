require.config({
   paths: {
      jquery: 'lib/jquery',
      handlebars: 'lib/handlebars',
      backbone: 'lib/backbone',
      underscore: 'lib/underscore'
   }
});

require(['views/MessagingView'], function(MessagingView){
   new MessagingView({
      //Use learnedSkills
      skills: ["java", "react"],
      interests: ["webDev"],
      learning: ["node"]
   });
});