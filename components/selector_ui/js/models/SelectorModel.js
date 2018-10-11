
/*

   Selector Model
   
   Utilizes the "Tree Structure with Parent References" data structure
   This renders the taxonomy in a manner which is easier to render in the UI

   SEE: https://github.com/designforsf/brigade-matchmaker/blob/master/docs/taxonomy.md#tree-structure-with-parent-references

*/


define(['underscore', 'backbone', 'jquery', 'lockr'],
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

      addItem: function(itemID){
         this.get('selectedItems').push(itemID);
         console.log('SelectorModel.addItem: ' + itemID);
         this.updateStorage();
      },

      removeItem: function(itemID) {
         var selectedItems = this.get('selectedItems');
         selectedItems.splice($.inArray(itemID, selectedItems),1);
         this.updateStorage();
      },

      inItemsList: function(itemID) {
         var selectedItems = this.get('selectedItems');
         var inList = false;
         if ($.inArray(itemID,selectedItems) >= 0){
            inList = true;
         }
         return inList;
      },

      /* 
         getItemFromAddr

         two scenarios for addr:
            
            addr = 'all'                        # assigns all
            addr = '<itemName>'                 # for 1-level taxonomy domain
            addr = '<sectionName>/<itemName>'   # for 2-level taxomomy domain

      */

      getItemFromAddr: function (addr) {
         var selModel = this;
         //console.log('getItemFromAddr ',  addr);

         // conditions for returning undefined
         var unknownItem = {name: 'undefined', parent:undefined, title:'Unknown'};
         if (typeof addr === 'undefined') {
            return unknownItem;
         }

         if (addr == 'all') {
            return {name: 'all', parent:undefined, title:'All'};
         }

         var domain = selModel.attributes;
         var assignArr = addr.split('/');
         var item;

         // add the domain to the assignment array for sectionName
         // (this is due to the hierarchical format used for UI rendering)
         if (assignArr.length == 1) {
            assignArr.unshift(domain.name);
         }
         //console.log('continues ', assignArr);
         //console.log(selModel.attributes.itemsBySection[assignArr[0]].items);

         // loop over the items, match for the name of the assigned item
         for (var i=0; i<selModel.attributes.itemsBySection[assignArr[0]].items.length; i++) {
            var thisItem = selModel.attributes.itemsBySection[assignArr[0]].items[i];
            
            //console.log('this item ', thisItem);

            // match of item name, within the section
            if (thisItem['name'] == assignArr[1]) {
               return thisItem;
            }

         }

         return unknownItem;

      }

   });
   return SelectorModel;
});


//get the data passed in from the url
//Give url -> take url to get all info
//populate tabs and items
//view. should be clickable div. That opens another div.