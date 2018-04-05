
(function (PM) {

  ProjectMatch.MinMaximizer = {};
  var self = ProjectMatch.MinMaximizer;


  /*
    init

    loads click handlers
    loads minmax floaters into the UI

  */


  self.init = function (attr) {

    /* 
      CREDIT: the minmaximizer component is based on work done in this JQuery A-Z example:
      https://www.jquery-az.com/jquery/demo.php?ex=58.0_1
    */

    jQuery(document).ready(function(){ 

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

    });

  } // END self.init


 }) (( window.ProjectMatch=window.ProjectMatch || {}));
