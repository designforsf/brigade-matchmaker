
define(['underscore', 'backbone', 'lockr'],
 function(_, Backbone, Lockr){
   var ProjectModel = Backbone.Model.extend({
      urlRoot: "http://localhost:5465",
      url: function(){
         var url = this.urlRoot + this.urlEnding;
         return url;
      },
      initialize: function(urlEnding) {
         this.urlEnding = urlEnding;
      },
      searchProjects: function(urlEnding) {
         this.urlEnding = urlEnding;
      },
      combineData: function(res) {
         var arr = [];
         $.each(res.data, function(idx, val){
            var result = $.grep(Lockr.get('projects').data, function(e){
               return e.id === val.id;
            });
            var finalObj = $.extend(val, result[0]);
            arr.push(finalObj);
         });
         this.attributes = {"data": arr}
      }
   });
   return ProjectModel;
});
