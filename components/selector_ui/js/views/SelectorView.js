
define(['underscore','backbone','handlebars', 'jquery','selectormodel'],
   function(_, Backbone,handlebars, $, SelectorModel){

   var SelectorView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML content will be rendered.
      el: '#container',
      template: Selector.templates.selector,
      // It's the first function called when this view it's instantiated.
      // template: handlebars.compile(projectTemplate),
      events: {
         'click .tab-name':'tabHandler',
         'click .tag' : 'tagHandler',
         'click .add-btn' : 'modalHandler',
         'click .close-btn' : 'closeModal'
      },

      /*

         initialize()

            The first function called when this view is instantiated

         attrs:
            
            appContainer - object enabling components to get data from each other

            config

            id             - e.g. 'interests-selector-view'
            component_name - e.g. 'Interests'
            display-title  - e.g. 'Civic Interests'
            tag-color'     - e.g. '#3DA1D2'
            url            - e.g. baseUrl + '/api/project/taxonomy/interests-for-ui',
            el             - e.g. '#container2'


            NOTE: unsure if these are used any more:
               skills
               interests
               learning
      */

      initialize: function(attr){
         console.log('initialize SelectorView id=' + attr.id);
         var _this = this;
         $('body').on("click", function(e){
            _this.closeModal(e);
         });
         this.model = new SelectorModel(attr);
         var that = this;
         this.model.fetch({ success: function () {
            that.render();
            }
         });
      },

      tabHandler: function(e){
         e.stopPropagation();

         var tab = e.currentTarget;
         var tabName = e.currentTarget.getAttribute("tabName");
         var tabContent = document.getElementById(tabName);

         console.log(tabName)

         //Remove all active views
         this.replaceAllClasses('tab-view-active', 'tab-view-inactive');
         //Remove bold from all other tabs
         this.replaceAllClasses('tab-name-active', '');

         //Make the view visible
         $(tabContent).removeClass('tab-view-inactive');
         $(tabContent).addClass('tab-view-active');

         //Bold the clicked on tab
         $(tab).addClass('tab-name-active');

         //Color all tags selected in different view
         this.colorSelectedTags(tabContent);
      },

      colorSelectedTags: function(tabContent){
         var tags = $(tabContent).find(".tag");
         var selectedTags = this.model.get("selectedItems");
         for ( var i=0; i < tags.length; i++){
            if (selectedTags.indexOf(tags[i].innerHTML) >= 0){
               this.addSelectedStyling(tags[i]);
            }
         }
      },

      modalHandler: function(e){
         e.stopPropagation();
         var modal = $(this.getElementId("_modals"));
         var body = $("body");

         //Deselect all tabs from old view
         this.deselectTabs();

         //if the modal is already opened
         if (modal.hasClass("show-modals")) {
            //close modal
            this.closeModal();
         }
         //if not then open a modal
         else {
            //open modal
            this.openModal();
         }
      },

      openModal: function(){
         var modal = $(this.getElementId("_modals"));
         var tabContent = modal.find(this.getElementId("-allCategories"));
         var selectorBtn = $(this.getElementId("-btn"));
         var allCategoryTab = modal.find(".tab-name")[0];

         //Make the tab content visible
         tabContent.removeClass("tab-view-inactive");
         tabContent.addClass("tab-view-active");

         //Set first selected tab to all category tab
         $(allCategoryTab).addClass("tab-name-active");

         //Remove any old modals
         this.closeOpenModals();
         //Make all other unselected buttons gray
         this.deselectBtns();

         //Make modal visible
         modal.addClass("show-modals");

         //Add selected styling
         this.addComponentColor(modal, "border-color");
         this.addComponentColor(selectorBtn, "border-color");

         //Handles making background gray
         selectorBtn.css("background", "white");
         $("body").addClass("gray-background");

      },
      closeModal: function(){
         this.closeOpenModals();
         this.deselectBtns();
         this.deselectTabs();
         this.inactivateTabContent();
         $("body").removeClass("gray-background");

      },
      addSelectedStyling: function(element){
         $(element).addClass('selected-tag').removeClass('tag')
         .css('background-color', this.model.get('tag-color'));
      },

      removeSelectedStyling: function(element) {
         $(element).removeClass('selected-tag').addClass('tag')
         .css('background-color', '')
      },

      replaceAllClasses: function(oldName, newName){
         var activeTabs = $('.' + oldName);
         for (var i = 0; i < activeTabs.length; i++){
            $(activeTabs[i]).removeClass(oldName);
            $(activeTabs[i]).addClass(newName);
         }
      },

      deselectTabs: function(){
         var active_tabs = $('.tab-name-active');
         for (var i =0; i < active_tabs.length; i++){
            active_tabs.removeClass("tab-name-active");
         }
      },

      inactivateTabContent: function(){
         var active_tabs = $('.tab-view-active');
         for (var i =0; i < active_tabs.length; i++){
            active_tabs.removeClass("tab-view-active");
            active_tabs.addClass("tab-view-inactive");
         }
      },
      closeOpenModals: function(){
        var visibleModals = $('.modals.show-modals');
        for (var i =0; i < visibleModals.length; i++){
           visibleModals.removeClass("show-modals");
        }
      },

      deselectBtns: function(){
        var selectorList = $('.selector-btn');
         for (var i =0; i < selectorList.length; i++){
            selectorList.css("border-color", "gray");
            selectorList.css("background", "");
         }
      },

      tagHandler : function(e){
         e.stopPropagation();

         //If the tag has not been selected
         if (e.currentTarget.className === "tag") {
            this.addTag(e.currentTarget);
         }
         //if the tag has already been selected
         else {
            this.removeTag(e.currentTarget);
         }
      },

      addTag: function(tagElement) {

         /* 
            NOTE: the + and x are defined in the CSS 
              search for .tag::after and .selected-tag::after
         */

         console.log('SelectorView.addTag ' + tagElement.id);

         var newTagElement = $(tagElement).clone();
         var tagContainerId = this.getElementId("-btn");
         var tagContainerDiv = $(tagContainerId).find('.selector-tag-container');

         //Add color to original tag element
         this.addComponentColor($(tagElement).addClass('selected-tag'), "background-color");

         //Add color to the new tag element that is added to the container
         this.addComponentColor($(newTagElement).addClass('selected-tag'), "background-color");

         //Add html name to list of chosen tags
         //this.model.addItem(tagElement.innerHTML);
         this.model.addItem(tagElement.id);

         //Change tag id so it is unique
         newTagElement[0].id += "-selector";

         //Add html of new tag to container
         tagContainerDiv.append(newTagElement[0]); 
      },

      removeTag: function(tagElement){
         var tagIdBase = "#" + tagElement.id.replace("-selector", "");
         escapedTagIdBase = tagIdBase.replace('/', '\\/'); // forward slash must be escaped
         var selectorTag =  this.findElementById(escapedTagIdBase + "-selector");
         var originalTag = this.findElementById(escapedTagIdBase);

         //Remove tag from selector div
         selectorTag.remove();

         //remove styling from tag in tab view
         this.removeComponentColor($(originalTag).removeClass('selected-tag'), "background-color");

         //remove item from list of selected tags
         this.model.removeItem(originalTag);
      },

      findElementById: function(id){
         return $(this.el).find(id);
      },

      getElementId: function(suffix){
         return "#" + this.model.get("component_name") + suffix;
      },

      addComponentColor: function(element, attribute){
         element.css(attribute, this.model.get('tag-color'));
      },

      removeComponentColor: function(element, attribute){
         element.css(attribute, "");
      },

      /*

         render()
         
         NOTE: to understand how the model is used, please see the 
         documentation in models/SelectorModel.js

      */

      render: function(){
         this.$el.html(this.template(this.model.toJSON()));
      }

   });

   return SelectorView;

});


//Get both of the data back
