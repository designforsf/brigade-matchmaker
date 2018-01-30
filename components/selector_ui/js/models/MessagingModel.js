
define(['underscore', 'backbone', 'jquery'],
 function(_, Backbone, $){
   var MessagingModel = Backbone.Model.extend({
      initialize: function(opts) {
         var obj = {
            "skills": {
               "itemsBySection": {

                  "non-technical": {
                     "title": "Non Technical",
                     "items": [
                        {"name": "writing", "title": "Writing"}
                     ]
                  },

                  "server-dev": {
                     "title": "Server Development",
                     "items": [
                        {"name": "nodejs", "title": "Node.js"},
                        {"name": "python", "title": "Python"}
                     ]
                  },

                  "client-dev": {
                     "title": "Client Development",
                     "items": [
                        {"name": "jquery", "title": "JQuery"},
                        {"name": "emberjs", "title": "EmberJS"},
                        {"name": "bootstrap", "title": "Bootstrap"}
                     ]
                  }
               }
            }
         };
         this.set("data", obj);
         this.set("name", opts.name);
         this.set("selectedItems", []);
      },

      addItem: function(itemName){
         this.get('selectedItems').push(itemName);
      },

      removeItem: function(itemName) {
         var selectedItems = this.get('selectedItems');
         selectedItems.splice($.inArray(itemName, selectedItems),1);
      },

      inItemsList: function(itemName) {
         var selectedItems = this.get('selectedItems');
         var inList = false;
         if ($.inArray(itemName,selectedItems) >= 0){
            inList = true;
         }
         return inList;
      }

   });
   return MessagingModel;
});


//get the data passed in from the url
//Give url -> take url to get all info
//populate tabs and items
//view. should be clickable div. That opens another div.