//define(['jquery', 'handlebars' ],
//  function(jQuery, Handlebars){


/* 
  CREDIT: the minmaximizer component is based on work done in this JQuery A-Z example:
  https://www.jquery-az.com/jquery/demo.php?ex=58.0_1
*/


(function (PM) {

  ProjectMatch.MinMaximizer = {};
  var self = ProjectMatch.MinMaximizer;


  /*
    init

    loads click handlers
    loads minmax floaters into the UI

  */


  self.init = function (attr) {

    jQuery(document).ready(function(){

      self.isEventListenersLoaded = false;

    });

  }; // END self.init


  /*
    displayModal

    displays the minmaximizer modal
    
      event: (click event) 

      renderCb: (callback after the page renders)

      title:
      body:

  */

  self.displayModal = function (attr) {
    
    require(['minmaxtemplate', 'handlebars', 'jquery', 'bootstrap'],
      function(MinMaxTemplate, Handlebars, jQuery, Bootstrap){

        var context = {
          title: attr.title,
          body: attr.body
        };
        var renderedHtml = MinMaxTemplate.templates.modal(context);
        
        jQuery('#minmaximizer-container').html(renderedHtml);

        // post-render callback, usually to load content in a new div
        if (typeof attr.renderCb !== 'undefined') {
          attr.renderCb();
        }

        jQuery('#minmaximizer-modal').modal({backdrop: false, keyboard: false});


        // load the event listeners
        self.loadEventListeners(); // NOTE: needs to be re-loaded each time
        

      }
    );

  }; // END displayModal


  /*
    load event listeners
  */

  self.loadEventListeners = function (attr) {


    // NOTE: testing a convention of using $variables for jQuery-referenced dom objects
    var $content, $modal, $apnData, $modalCon; 

    $content = jQuery(".min");   


    jQuery(".modalMinimize").on("click", function(){

      $modalCon = jQuery(this).closest(".mymodal").attr("id");  
      $apnData = jQuery(this).closest(".mymodal");
      $modal = "#" + $modalCon;

      jQuery(".modal-backdrop").addClass("display-none");   

      jQuery($modal).toggleClass("min");  

        if ( jQuery($modal).hasClass("min") ){ 

          jQuery(".minmaxCon").append($apnData);  

          jQuery(this).find("i")
            .toggleClass( 'glyphicon-minus')
            .toggleClass( 'glyphicon-new-window');

        } else { 

          jQuery("#minmaximizer-container").append($apnData); 

          jQuery(this).find("i")
            .toggleClass( 'glyphicon-new-window')
            .toggleClass( 'glyphicon-minus');

        };

    });

    jQuery("button[data-dismiss='modal']").click(function(){   

        jQuery(this).closest(".mymodal").removeClass("min");
        
        jQuery("#minmaximizer-container").removeClass($apnData);   

        jQuery(this).next('.modalMinimize').find("i")
          .removeClass('glyphicon glyphicon-new-window')
          .addClass( 'glyphicon glyphicon-minus');

    }); 

  } // END loadEventListeners


}) (( window.ProjectMatch=window.ProjectMatch || {}));

// return the object to requirejs
//return window.ProjectMatch;

//}); // END define
