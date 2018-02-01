
define(['underscore','backbone','handlebars', 'jquery','models/MessagingModel'],
   function(_, Backbone,handlebars, $, MessagingModel){

   var MessagingView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML content will be rendered.
      el: '#container',
      template: Messages.templates.messages,
      // It's the first function called when this view it's instantiated.
      // template: handlebars.compile(projectTemplate),
      events: {
         'click .tab-name':'tabHandler',
         'click .tag' : 'addTag',
         'click .selected-tag' : 'removeTag',
         'click .selector-btn' : 'showModal',
         'click .close-btn' : 'showModal'
      },
      initialize: function(opts){
         this.model = new MessagingModel(opts);
         this.render();
         //Model gets initialized with all the projects

      },
      tabHandler: function(e){
         var viewName = e.currentTarget.getAttribute("childName");
         var tabView = document.getElementById(viewName);
         var childTags = $(tabView).find('.tag-container').children();
         for(var i=0; i< childTags.length; i++){
            if ( this.model.inItemsList(childTags[i].innerHTML)){
               this.addSelectedStyling(childTags[i]);
            }
            else {
               this.removeSelectedStyling(childTags[i]);
            }
         }
         this.replaceAll('tab-name-active', '');
         this.replaceAll('view-active', 'view-inactive');

         $(e.currentTarget).addClass('tab-name-active');
         $(tabView).removeClass('view-inactive');
         $(tabView).addClass('view-active');
      },
      showModal : function(){
         var popup = $("#"+this.model.get("name") + "_popup");
         var selector_btn = $("#"+this.model.get("name") + "-btn");
         //if it is open
         if (popup.hasClass("show-popup")){
            this.closeOpenPopups();
            this.deselectBtns();
         }
         //if it is closed
         else {
            this.closeOpenPopups();
            this.deselectBtns();
            popup.addClass("show-popup");
            popup.css("border-color", this.model.get('tag-color'));
            selector_btn.css("border-color", this.model.get('tag-color'));
         }
      },
      addSelectedStyling: function(element){
         $(element).addClass('selected-tag').removeClass('tag')
         .css('background-color', this.model.get('tag-color'));
      },

      removeSelectedStyling: function(element) {
         $(element).removeClass('selected-tag').addClass('tag')
         .css('background-color', '')
      },

      replaceAll: function(oldName, newName){
         var activeTabs = $('.' + oldName);
         for (var i = 0; i < activeTabs.length; i++){
            $(activeTabs[i]).removeClass(oldName);
            $(activeTabs[i]).addClass(newName);
         }

      },

      closeOpenPopups: function(){
        var visiblePopups = $('.popup.show-popup');
        for (var i =0; i < visiblePopups.length; i++){
           visiblePopups.removeClass("show-popup");
        }
      },

      deselectBtns: function(){
        var selectorList = $('.selector-btn');
         for (var i =0; i < selectorList.length; i++){
            selectorList.css("border-color", "gray");
         }
      },

      addTag : function(e){
         if (!this.model.inItemsList(e.currentTarget.innerHTML)){

            var selector = '#' + this.model.get("name") + "-btn";
            var newDiv = $(e.currentTarget).clone();
            var selectorDiv = $(selector).find('.selector-tag-container');
            var selectedTag = $(e.currentTarget);

            newDiv.removeClass('tag').addClass('selected-tag')
               .css('background-color', this.model.get('tag-color'));
            selectorDiv.append(newDiv[0]);

            selectedTag.addClass('selected-tag').removeClass('tag')
               .css('background-color', this.model.get('tag-color'));
            this.model.addItem(e.currentTarget.innerHTML);
         }
         else {
            console.log("Error in addTag");
         }
      },

      removeTag: function(e) {

         var selectedTags = $('#' + this.model.get('name') + '-btn')
            .find('.selected-tag');
         var currTabTags = $('.view-active').children().find('.selected-tag');
         var tagName = e.currentTarget.innerHTML;

         //Search for item in selector div
         for (var i =0; i < selectedTags.length; i++){
            //If has correct name remove it
            if ( selectedTags[i].innerHTML === tagName){
               selectedTags[i].remove();
            }
         }

         //Search for tag in tab and remove selected styling
         for (var i =0; i < currTabTags.length; i++){
            if ( currTabTags[i].innerHTML === tagName){
               this.removeSelectedStyling(currTabTags[i]);
            }
         }

         this.model.removeItem(tagName);
      },
      render: function(){
         this.$el.html(this.template(this.model.toJSON()));
      }

   });

   return MessagingView;

});


//Get both of the data back