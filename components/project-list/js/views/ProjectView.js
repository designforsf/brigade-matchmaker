
define(['jquery','underscore','backbone','handlebars','projlistmodel','projlisttemplate'],
   function(jQuery, _, Backbone, handlebars, ProjectModel, ProjectTemplate){

   var ProjectView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML content will be rendered.
      el: '#project-list-container',
      events: {
         "click .changeList":"searchProjects"
      },
      // It's the first function called when this view it's instantiated.
      template: ProjectTemplate, 
         // NOTE: template is compiled, SEE the README.md
      initialize: function(){
         //Pass in object
         //$.param(obj) --> this is the urlEnding that would get passed to
         // projectModel
         //Model gets initialized with all the projects
         this.model = new ProjectModel("/api/projects");
         this.listenTo(this.model, 'sync', this.render);
         this.model.fetch();
         this.render();
      },
      render: function(){
         this.$el.html(this.template(this.model.toJSON()));
         this.colorTags("skills", "skillsMatched", "navy");
         this.colorTags("interests", "interestsMatched", "blue");
         this.colorTags("goals", "skillsMatched", "red");

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
      searchProjects: function(url){
         var taxonomyObj = {
            "skills":["client-dev/javascript","data-sci/python"],
            "interests":["housing"],
            "goals":["developer", "presenter"]
         };
         this.model.searchProjects(taxonomyObj);
         this.listenTo(this.model, 'sync', this.render);
         var _this = this;
         this.model.fetch({ success: function(res){
            //Combines cached data with new list order
            _this.model.combineData(res.attributes);
         }});
         //Renders the view with the new order of data
         this.render();
      }

   });

   return ProjectView;

});


//Get both of the data back