
define(['underscore', 'backbone'],
 function(_, Backbone){
   var MessagingModel = Backbone.Model.extend({
      initialize: function(skills) {
         this.set("skills", skills);
      },

      createFinalObj: function(formData){
         var formattedData = {};
         var matchingInfo = {"matchingInfo": this.get("skills")};
         for (var i = 0; i < formData.length; i++) {
            var field = formData[i];
            formattedData[field.name] = field.value;
         }
         const formSummary = {...formattedData, ...matchingInfo};
         return formSummary;
      }
   });
   return MessagingModel;
});
