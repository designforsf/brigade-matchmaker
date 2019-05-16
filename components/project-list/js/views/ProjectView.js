
define(['jquery','underscore','backbone','handlebars','projlistmodel', 'selectormodel'],
   function(jQuery, _, Backbone, Handlebars, ProjectModel, SelectorModel){

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
      // NOTE: template is compiled, SEE the README.md,

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
         if (!this.config.api.protocol) { console.error('Protocol not found. Please define the protocol in the etc environment-config for "api".'); }
         this.model.urlRoot = this.config.api.exposed_protocol + '://' + this.config.api.host + ':' + this.config.api.exposed_port
         console.log('ProjectModel urlRoot: ' + this.model.urlRoot);

         // load selector model dependencies
         // required for lookups relating to assigned taxonomy items
         var taxes = ["skills","learnSkills","interests"]; 
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

         /* construct a new taxonomy matching config for rendering
            NOTE: uses "Tree Structure with Parent References" format
            SEE: https://github.com/designforsf/brigade-matchmaker/blob/dev/docs/taxonomy.md#tree-structure-with-parent-references
         */

         var taxDomains = [
            {
               type:"skills", 
               legacyType:"skillsNeeded", 
            }, 
            {
               type:"interests", 
               legacyType:"interests", 
            },
            {  
               type:"learnSkills", 
               legacyType:"skillsOffered", 
            }
         ];

         // matching config is an array of strings (addr)
         // new matching config is an array of objects

         if (projView.model.attributes.data) {

            for (var p=0; p<projView.model.attributes.data.length; p++) {
               var proj = projView.model.attributes.data[p];
               //var config = proj.attributes.matchingConfig;
               //console.log(proj.attributes.name);
               //console.log(proj.attributes.matchingConfig);

               // define a new matching config
               proj.attributes.newMatchingConfig = {};

               // loop over the domains to get to the individual taxonomy assignments
               // the end goal here is to associate the corresponding taxonomy item
               for (var td=0; td<taxDomains.length; td++) {
                  var domain = taxDomains[td];
                  var newMatchingConfig = [];

                  var selModel = projView[domain.type + 'Selector'].model;
                  //console.log('domain: ' + domain.type);
                  //console.log(proj.attributes.matchingConfig);
                  
                  // assignments
                  var assigns = proj.attributes.matchingConfig[domain.legacyType];
                  for (var a=0; a<assigns.length; a++) {
                     //console.log('assigns ', assigns[a]);

                     // get the taxonomy item associated with the assignment
                     var item = selModel.getItemFromAddr(assigns[a]);
                     //console.log('item ', item);

                     // push the new matching config in
                     newMatchingConfig.push(item);

                  }

                  // load the new matchining config in
                  // NOTE: this will eventually be moved into the API output
                  //console.log('new config ', newMatchingConfig);
                  proj.attributes.newMatchingConfig[domain.legacyType] = newMatchingConfig;

               }

               //console.log(proj.attributes.newMatchingConfig);

            }

         }


         // prepare the template
         projView.$el.html(projView.template({
            projects: projView.model.toJSON().data,
            skills: projView.skillsSelector.model.toJSON(),
            interests: projView.interestsSelector.model.toJSON(),
            learnSkills: projView.learnSkillsSelector.model.toJSON()
         }));

         projView.colorTags("skills", "skillsMatched", "#AA193A");
         projView.colorTags("interests", "interestsMatched", "#3DA1D2");
         projView.colorTags("learnSkills", "learnSkillsMatched", "#123D51");

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

      colorTags: function(tax, attValue, color){
         var obj = this.model.toJSON();
         if (obj.data){
            var _this = this;
            _.bind(function(){
               $.each(obj.data, function(idx, val){
                  var id = "#" + tax + idx;
                  //console.log('tax ' + tax);

                  if (val.attributes[attValue]){

                     $.each(val.attributes[attValue], function(idx, tagIdBase){
                        
                        // deal with flattened taxonomy
                        if (tax == 'interests') {
                           tagIdBase = tax + '/' + tagIdBase;
                        }

                        //console.log('matched word ' + tagIdBase);
                        //console.log('colorTags seeking id=' + id + ' tagIdBase=' + tagIdBase);
                        
                        //var div = jQuery(( jQuery("#project-list-container").find(id)[0].children[1] )).find(':contains(' + tagIdBase + ')')[0];

                        var escapedTagIdBase = tagIdBase.replace('/', '\\/'); // forward slash must be escaped
                        //console.log(escapedTagIdBase);
                        var div = jQuery('#project-list-' + escapedTagIdBase);

                        if (typeof div !== 'undefined') {
                           //console.log('div found #' + escapedTagIdBase)
                           div.css('background-color', color);
                           div.css('color', '#ffffff');

                           //div.style.backgroundColor = color;
                           //div.style.color = "white";
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
