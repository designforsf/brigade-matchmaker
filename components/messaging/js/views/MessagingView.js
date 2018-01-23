
define(['underscore','backbone','handlebars','models/MessagingModel'],
   function(_, Backbone,handlebars, MessagingModel){

   var MessagingView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML content will be rendered.
      el: '#container',
      template: Messages.templates.messages,
      // It's the first function called when this view it's instantiated.
      // template: handlebars.compile(projectTemplate),
      events: {
         'submit':'submitHandler'
      },
      submitHandler: function(e){
         var final_obj = this.model.createFinalObj($('form').serializeArray());
         $.ajax({
            type: "POST",
            url: 'http://localhost:5475/',
            success: function() {
              console.log('ajax callback response: ' + data);
            },
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(final_obj)
          });
         this.remove();
         this.render();
      },
      initialize: function(skills){
         //Model gets initialized with all the projects
         this.model = new MessagingModel(skills);
         this.render();
      },
      render: function(){
         this.$el.html(this.template(this.model.toJSON()));
      }

   });

   return MessagingView;

});


//Get both of the data back
