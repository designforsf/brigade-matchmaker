/*
  Project taxonomy data is hard-coded in the ProkectTaxonomies mongoose model.
  
  However, in python this data must be accessed via mongodb queries, therefore
  this seed is used to load the hard-coded data into the database.
  
  TODO: create a formal data loader as these seeds are intended for use
  in application development.
  
*/

var faker = require('faker')
var ProjectTaxonomies = require('../../models/ProjectTaxonomies')
var Async = require('async')

function getAttributes (cb) {

  // start with the top-level taxonomies
  var pt = new ProjectTaxonomies();
  pt.getTaxonomies(function (err, taxonomies) {

      //console.log('add taxonomy ', taxonomy[i].className);
      
      // construct the functions to be called for each taxonomy
      var taxonomyFunctions = [];
      taxonomies.forEach(function (data) {  
        taxonomyFunctions.push(pt['get' + data.className]);
      });
      
      // now move into the lower-levels of each taxonomy
      Async.series(taxonomyFunctions, 
        function(err, attributes) {
          if (err) throw err;
          console.log(attributes);
          
          var taxonomies_and_attrs = [];
          for (t=0; t < taxonomies.length; t++) {
            
            // add the top-level taxonomy
            taxonomies_and_attrs.push(taxonomies[t]);
            
            for (a=0; a < attributes[t].length; a++) {
              console.log(attributes[t][a]);
              
              // add individual attribute
              taxonomies_and_attrs.push(attributes[t][a]);
            }
            
          }
          
          cb(err, taxonomies_and_attrs);
          
        }
      );

  });

}

module.exports = getAttributes;
