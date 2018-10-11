
define(['underscore', 'backbone', 'lockr'],
 function(_, Backbone, Lockr){
   var ProjectModel = Backbone.Model.extend({
      
      url: function(){
         var url = this.urlRoot + this.urlEnding;
         return url;
      },
      
      initialize: function(urlEnding) {
         this.urlEnding = urlEnding;
      },

      searchProjects: function(taxonomyObj) {
         var projModel = this;

         //console.log('ProjectModel.searchProjects ', taxonomyObj);
         this.searchTaxonomyObj = taxonomyObj;
         
         var url = "/api/user/matches?";
         $.each( taxonomyObj, function( key, value ) {
            url += key + "=";
            $.each(value, function(tagIndex, tagInfo){
               url += tagInfo;
               if (tagIndex !== value.length - 1){
                  url += ",";
               }
            });
            url += '&';
         });
         this.urlEnding = url;
         
         //console.log('Using url: ' + url);
         //console.log('projModel ', projModel.toJSON());


      },

      /*
         combineData

         Combines cached project data with sorted projects from the API

         SEE: https://github.com/designforsf/brigade-matchmaker/blob/master/docs/json-api.md#get-apiusermatches
      
      */

      combineData: function(res) {
         var projModel = this;

         //console.log('ProjectModel.combineData');
         var arr = [];
         $.each(res.data, function(idx, val){
            var result = $.grep(Lockr.get('projects').data, function(e){
               return e.id === val.id;
            });
            val.attributes = $.extend(val.attributes, result[0].attributes);
            
            //console.log('attrib ', val.attributes);
            
            arr.push(val);
         });
         
         // alter the model attributes
         projModel.attributes = {data: arr};
      }

   });
   return ProjectModel;
});
