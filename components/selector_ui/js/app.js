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
      'name':'Skills',
      'tag-color':'#AA193A',
      'url' : 'test-url'
   });
});