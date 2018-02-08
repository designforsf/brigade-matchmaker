
define(['jquery','underscore','backbone','handlebars','projlistmodel'],
   function(jQuery, _, Backbone, handlebars, ProjectModel){

   var ProjectView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML content will be rendered.
      el: '#project-list-container',
      events: {
         "click .changeList":"searchProjects",
         "click .contact-btn":"popUpMessage"
      },
      popUpMessage: function(e){
         console.log(e.currentTarget.id);
         var arr_num = e.currentTarget.id.replace("contact-btn", "");
         //Need to pass the email of the project contact lead
         console.log(this.model.attributes.data[arr_num]);
         console.log(this.model.skills);
         new MessagingView({
            //Use learnedSkills
            skills: ["java", "react"],
            interests: ["webDev"],
            learning: ["node"]
         });
      },
      // It's the first function called when this view it's instantiated.
      template: ProjectList.templates.projects,
         // NOTE: template is compiled, SEE the README.md
      initialize: function(skills){
         var projView = this;

         //Pass in object
         //$.param(obj) --> this is the urlEnding that would get passed to
         // projectModel

         // model gets initialized with all the projects
         this.model = new ProjectModel("/api/projects");
         this.model.skills = skills;
         // sync callback
         // on sync: sets data in lockr, renders the template 
         projView.listenTo(projView.model, 'sync', function (model, res, options) {
            //console.log('ProjectView.initialize: sync callback');
            //console.log(res.data);

            // store the projects data in the lockr
            Lockr.set('projects', { data: res.data });

            // render the template
            projView.render();

         });

         projView.model.fetch();
         
         projView.render();
      },
      render: function(){
         this.$el.html(this.template(this.model.toJSON()));
         this.colorTags("skills", "skillsMatched", "#AA193A");
         this.colorTags("interests", "interestsMatched", "#3DA1D2");
         this.colorTags("goals", "skillsMatched", "#123D51");

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

            //Combines cached data with new list order
            console.log('combineData with attributes');
            console.log(res.attributes);
            _this.model.combineData(res.attributes);

         }});
         //Renders the view with the new order of data
         this.render();
      }

   });

   return ProjectView;

});


//Get both of the data back