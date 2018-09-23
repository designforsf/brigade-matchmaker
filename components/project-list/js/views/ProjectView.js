
define(['jquery','underscore','backbone','handlebars','projlistmodel', 'selectormodel'],
   function(jQuery, _, Backbone, handlebars, ProjectModel, SelectorModel){

   var ProjectView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML content will be rendered.
      el: '#project-list-container',
      events: {
         "click .changeList":"searchProjects",
         "click .contact-btn":"initiateContact"
      },

      initialLoad: function (x) {

      },

      initiateContact: function(e){
         //console.log('target ', e.currentTarget);
         var recordNo = e.currentTarget.id.replace("contact-btn", "");
         //console.log(recordNo);

         var project = this.model.attributes.data[recordNo];
         //console.log('initiateContact projectID=' + project.id);

         this.initiateContactCb({
            event: e,
            project: project,
            recordNo: recordNo,
            skills: [],
            interests: [],
            learnSkills: [],
         });

      },

      template: ProjectList.templates.projects,
      // NOTE: template is compiled, SEE the README.md

      /*

         initialize()

            The first function called when this view is instantiated

         attrs:
            
            appContainer - object enabling components to get data from each other

            initiateContactCb - callback for when the user clicks on the contact button

            config

            NOTE: unsure if these are used any more:
               skills
               interests
               learning
      */

      initialize: function(attr){
         var projView = this;

         // validation
         if (!attr.appContainer) { console.error('ProjectView.initialize ERROR: appContainer instance required.'); }
         if (!attr.config) { console.error('ProjectView.initialize ERROR: config data required.'); }


         // get the config, appContainer
         this.appContainer = attr.appContainer;
         this.config = attr.config;

         if (typeof attr.initiateContactCb !== 'undefined') {
            this.initiateContactCb = attr.initiateContactCb;
         } else {
            console.error('ProjectView: please pass and initiateContactCb function to the constructor.');
         }

         //Pass in object
         //$.param(obj) --> this is the urlEnding that would get passed to
         // projectModel

         // model gets initialized with all the projects
         this.model = new ProjectModel("/api/projects");
         if (!this.config.api.protocol) { console.error('Protocol not found. Please define the protocol in the etc environment-config for "web".'); }
         this.model.urlRoot = this.config.api.protocol + '://' + this.config.api.host + ':' + this.config.api.port
         //console.log('ProjectView urlRoot: ' + this.model.urlRoot);

         // load selector model dependencies
         var taxes = ["skills","interests","learnSkills"]; 
         // WTF TODO: forEach was not working here, verify if backbone might interfere
         for (var t=0; t<taxes.length; t++) {
            tax=taxes[t];
            var selectorInstance;
            if (attr.appContainer[tax + 'Selector']) {
               //console.log(' ' + tax + 'Selector present in the appContainer');
               selectorInstance = attr.appContainer[tax + 'Selector'];
            } else {
               selectorInstance = projView.initializeSelectorModel(tax);
            }
            // in order to be available for expression in the template
            projView[tax + 'Selector'] = selectorInstance;
         }

         //this.model.skills = skills;

         // sync callback
         // on sync: sets data in lockr, renders the template 
         projView.listenTo(projView.model, 'sync', function (model, res, options) {
            console.log('ProjectView.initialize: sync callback');
            //console.log(res.data);

            // store the projects data in the lockr
            Lockr.set('projects', { 
               data: res.data
            });

            // render the template
            projView.render();

         }); 

         projView.model.fetch();
         
         projView.render();
      },

      /*
         initializeSelectorModel()

         in case the embedding container fails to pass selector model instance
      */

      initializeSelectorModel: function (taxonomy) {
         console.log('ProjectView.initializeSelectorModel ' + taxonomy)
      },


      /*
         
         render()

      */

      render: function(){
         console.log('ProjectView render');
         var projView = this;

         // define the template and data
         //projView.$el.html(projView.template(projView.model.toJSON()));

         // prepare the template
         projView.$el.html(projView.template({
            projects: projView.model.toJSON().data,
            skills: projView.skillsSelector.model.toJSON(),
            interests: projView.interestsSelector.model.toJSON(),
            learnSkills: projView.learnSkillsSelector.model.toJSON()
         }));

         projView.colorTags("skills", "skillsMatched", "#AA193A");
         projView.colorTags("interests", "interestsMatched", "#3DA1D2");
         projView.colorTags("goals", "skillsMatched", "#123D51");

         // store the projects data in the lockr
         var projects = Lockr.get('projects').data;
         
         projects.forEach(function(project) {
            //console.log(project.id);

            jQuery( "#details-button-" + project.id).click(function() {

               //console.log('toggle ' + project.id)
               jQuery( "#details-" + project.id).slideToggle(250, function() {

                  // panel hidden
                  if (jQuery("#details-" + project.id).is(":hidden")) {
                     jQuery("#details-button-" + project.id).html('Show project details');

                  // panel visible
                  } else {
                     jQuery("#details-button-" + project.id).html('Hide project details');

                  }
                  

               });
            });

         });

      },

      colorTags: function(idVal, attValue, color){
         var obj = this.model.toJSON();
         if (obj.data){
            var _this = this;
            _.bind(function(){
               $.each(obj.data, function(idx, val){
                  var id = "#" + idVal + idx;
                  if (val.attributes[attValue]){
                     $.each(val.attributes[attValue], function(idx, matchedWord){
                        
                        //console.log('search ' + matchedWord);
                        //console.log($(($("#project-list-container").find(id)[0].children[1])).find(':contains('+matchedWord +')'));
                        
                        var div = $(($("#project-list-container").find(id)[0].children[1])).find(':contains('+matchedWord +')')[0];
                        if (div){
                           div.style.backgroundColor = color;
                           div.style.color = "white";
                        }
                     });
                  }
               })
            },this)();
         }
      },

      //This will take in a url and find new matches
      searchProjects: function(taxonomyObj) {
         console.log('ProjectView.searchProjects', taxonomyObj);

         var taxonomyObj = taxonomyObj || {
            "skills":[],
            "learnSkills":[],
            "interests":[],
         };
         this.model.searchProjects(taxonomyObj);
         this.listenTo(this.model, 'sync', this.render);
         var _this = this;
         this.model.fetch({ success: function(res){

            //console.log('combineData with attributes');
            //console.log('attributes ', res.attributes);
            _this.model.combineData(res.attributes);

         }});

         //Renders the view with the new order of data
         this.render();
      }

   });

   return ProjectView;

});


//Get both of the data back