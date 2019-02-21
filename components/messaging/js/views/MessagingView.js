
define(['underscore','backbone','handlebars','messagingmodel'],
   function(_, Backbone,handlebars, MessagingModel){

   var MessagingView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML content will be rendered.
      el: '#messaging-container',
      template: Messages.templates.messages,
      // It's the first function called when this view it's instantiated.
      // template: handlebars.compile(projectTemplate),
      events: {
         'submit':'submitHandler'
      },
      submitHandler: function(e){
        var final_obj = this.model.createFinalObj($('form').serializeArray());
        // Fixes a cyclic error that otherwise occurs when final obj is used
        // by JSON.stringify()
        const getCircularReplacer = () => {
          const seen = new WeakSet();
          return (key, value) => {
            if (typeof value === "object" && value !== null) {
              if (seen.has(value)) {
                return;
              }
            seen.add(value);
            }
            return value;
          };
        };

         $.ajax({
            type: "POST",
            //url: 'http://localhost:5475/messaging/api/message',
            //url: 'http://localhost:8080/messaging/api/message',
            url: this.config.protocol + '://' + this.config.host + ':' + this.config.port + '/messaging/api/message',
            success: function(data) {
              console.log('ajax callback response: ', data);
            },
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(final_obj, getCircularReplacer()),
          });
         this.remove();
         this.render();
      },

      /*
         attrs:
            
            config
               messaging
               web

            skills
            interests
            learning
      */

      initialize: function(attr){

         // get the config
         this.config = attr.config;

         //Model gets initialized with all the projects
         this.model = new MessagingModel(attr);
         this.render();

      },
      render: function(){
         this.$el.html(this.template(this.model.toJSON()));
      }

   });

   return MessagingView;

});


//Get both of the data back
