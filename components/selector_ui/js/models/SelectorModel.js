
define(['underscore', 'backbone', 'jquery', 'Lockr'],
 function(_, Backbone, $, Lockr){
   var SelectorModel = Backbone.Model.extend({
      initialize: function(opts) {
         this.url = opts.url;
         this.set("component_name", opts.component_name);
         this.set("selectedItems", []);
         this.set("activeView", opts.component_name + "-allCategories");
      },

      updateStorage: function(){
         var selectedItems = this.get('selectedItems');
         var componentName = this.get('component_name');

         var taxonomy_info = Lockr.get('taxonomy-info');
         if (!taxonomy_info){
            taxonomy_info = {};
         }
         taxonomy_info[componentName] = selectedItems;

         Lockr.set("taxonomy-info", taxonomy_info);
      },

      addItem: function(itemName){
         this.get('selectedItems').push(itemName);
         this.updateStorage();
      },

      removeItem: function(itemName) {
         var selectedItems = this.get('selectedItems');
         selectedItems.splice($.inArray(itemName, selectedItems),1);
         this.updateStorage();
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
   return SelectorModel;
});


//get the data passed in from the url
//Give url -> take url to get all info
//populate tabs and items
//view. should be clickable div. That opens another div.