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
   new MessagingView({
      'name':'Interests',
      'tag-color':'#3DA1D2',
      'url' : 'test-url',
      'el' : '#container2'
   });
   new MessagingView({
      'name':'Learnings',
      'tag-color':'#123D51',
      'url' : 'test-url',
      'el' : '#container3'
   });
});