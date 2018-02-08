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
      skills: ["javascript", "react"],
      interests: ["homelessness"],
      learning: ["nodejs"]
   });
});