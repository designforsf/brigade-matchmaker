$(document).ready(function () {
  if ($(".alert-info")[0]) {
		location.href = '/projects'
  }
  // Make the "You are checked in" item visible (enables logout)
  $("li.dropdown").removeClass("btn--hidden");

  $("div.dropdown-menu").click(function (e) {
    //
    // e.target === My saved projects:  display localStorage project namespace
    // e.target === Sign out:  set localStorage checkedIn to "false" and
    //    go back to /
    switch( $(e.target).text() ) {
    case "My saved projects":
      console.log("Show save projects now")
      showSavedProjs(e);
      break;
    case "Sign out":
      localStorage.setItem("checkedIn", "false");
      // Make the "You are checked in" item invisible
      $("li.dropdown").addClass("btn--hidden");
      window.location="/";
      break;
    default:
      break;
   }
  })

  $("[role='start_matching']").click(function () {
  	 user_data = "matching";
     console.log("current step: " + user_data);
     initMatchingStep( taxonomies );
  })

  $("[role='see_results']").click(function () {
  	 user_data = "results";
     $("#match_res").removeClass("btn--hidden");
     $("button#backToWizard").removeClass("btn--hidden");
     $("#wizardcards").addClass("btn--hidden");
  })

  $("[id='backToWizard']").click(function () {
  	 user_data = "restartWizard";
     $("#match_res").addClass("btn--hidden");
     $("#backToWizard").addClass("btn--hidden");
     $("#wizardcards").removeClass("btn--hidden");
     $("div#pList").children().remove();
     $("#projects-list").children().remove();
     restartWizard();
  })

  $("[role='home']").click(function(){
    user_data = "home";
    location.href = '/test/api/projects'; //go back to home page
  })


  var taxonomies = registerTaxonomies ();
  //
  // taxonomies now holds all the primary keywords
  // and will track state of chosen/not chosen
  // in selection boxes/ setCount tracks the number
  // of chosen keywords per box
  //
  console.log('Choices are: ', taxonomies);
  console.log( 'selected: ', taxonomies[0].setType );
  //var userSet = registerUserChoices();
  for (var i = 0; i < taxonomies.length; i++ ) {
    taxonomies[i].setCount = 0;
    //
    //set handlers on each box, using the div ids
    //

    $(document).on('change', '#'+taxonomies[i].setType, function(evt, params ) {
      if (params.selected != undefined) {
        for (var q = 0; q < taxonomies.length; q++ ) {
          if ( evt.currentTarget.id === taxonomies[q].setType ) {
            taxonomies[q].setPrimary[params.selected].chosen = true;
            console.log('selected: ', taxonomies[q].setType + ' ' + taxonomies[q].setPrimary[params.selected].name );
            taxonomies[q].setCount += 1; // up to 3 allowed
            }
          }
      // Logic for tracking de-selects must be added below
      }
      if (params.deselected != undefined) {
        console.log('deselected: ' + params.deselected);
        for (var q = 0; q < taxonomies.length; q++ ) {
          if ( evt.currentTarget.id === taxonomies[q].setType ) {
            taxonomies[q].setPrimary[params.deselected].chosen = false;
            console.log('Deselected: ', taxonomies[q].setType + ' ' + taxonomies[q].setPrimary[params.deselected].name );
            taxonomies[q].setCount -= 1; // up to 3 allowed
          }
        }
      }
    })

  };

});

function showSavedProjs () {
  var bookmarks = {};
  bookmarks.savedProjects = [];
  bookmarks.savedProjects =  JSON.parse(localStorage.getItem("savedProjects") );
  $('#savedProjsModal h4').text("Bookmarked projects are: " + bookmarks.savedProjects);
  $('#savedProjsModal').modal('show');

}

function initMatchingStep( taxonomies ) {
  $("li#start_matching").addClass("active").addClass("move_left");
  $("li#start").removeClass("active").addClass("move_right");
  $("[role='home']").addClass("btn--hidden");
  $("[role='in_progress_message']").removeClass("btn--hidden");
  $("[role='start_matching']").addClass("btn--hidden");
  var searchStr = parseSelections( taxonomies );
  $("[role='in_progress_message']").attr("value", searchStr); //pass the users search through this button's value attr
  initMatchingSearch(searchStr);

}
/**
/* from api.js -- test URLs for matching
/* TEST:
     http://localhost:5465/api/user/matches?skills=javascript,python&interests=housing&goals=developer,presenter
     http://localhost:5465/api/user/matches?skills=data-science&interests=homelessness&goals=developer
     http://localhost:5465/api/user/matches?skills=ruby&goals=developer,learner
     http://localhost:5465/api/user/matches?skills=null&goals=leader
     http://localhost:5465/api/user/matches?skills=javascript
*/

function parseSelections(taxonomies) {
  var baseURL = "http://localhost:5465/api/user/matches?"
  var skills = "skills=", interests = "interests=", goals = "goals=";
  var searchSkills, searchInterests, searchGoals = '';

  // taxonomies[0,1,2]:
  // property: setType = skills, interests, goals
  // property: setPrimary = array of {name, chosen(true/false)}
  // populate the property - array srchCriteria
  //
  //iterate over [0,1,2] then within over array setPrimary to get chosen primaries


  buildSrchStr = function( x ) {
    var srchCriteria = [];
    for (var j = 0; j < x.setPrimary.length; j++ ) {
      if ( x.setPrimary[j].chosen ) {
        srchCriteria.push( x.setPrimary[j].name )
      }
    } return srchCriteria.toString() ;
  }

  skills+= buildSrchStr( taxonomies[0] );
  skills = ( skills === "skills=" ) ? "" : skills + "&";
  interests+= buildSrchStr( taxonomies[1] );
  interests = ( interests === "interests=" ) ? "" : interests + "&";
  goals+= buildSrchStr( taxonomies[2] );
  goals = ( goals === "goals=" ) ? "" : goals;
  var searchStr = baseURL+skills+interests+goals;
  //
  // Output the user search criteria for the matching project results header
  //
  $("#searchskills.config").text("Skills: " + buildSrchStr( taxonomies[0] ));
  $("#searchinterests.config").text("Interests: " + buildSrchStr( taxonomies[1] ));
  $("#searchgoals.config").text("Goals: " + buildSrchStr( taxonomies[2] ));

  return searchStr;
}



  // remove unused elements


function registerTaxonomies () {
  var taxonomies = [], taxSet = ['skills', 'interests', 'goals'];
  var primSyns = [];
  //build taxonomies from the selectbox html
  for (i = 0; i < taxSet.length; i++ ) {
    taxonomies[i] = { setType : taxSet[i], setCount: 0, setPrimary : [ ] };
    $("div#"+ taxSet[i] + " option").each( function (index) {
      primSyns = $(this).text().split(',');
      //
      //primSyns array[0] is the "primary" keyword
      //  followed by other elements which are synonymns
      //  that are not used for searching. Only push
      //  the primary onto the taxonomies setPrimary property,
      //  with initial "chosen" property of false
      //
      taxonomies[i].setPrimary.push( { name: primSyns[0], chosen: false } ); //push the primary keyword, no need for the synonymns
    });
  }
  return taxonomies;
}

function restartWizard () {
  $("li#start_matching").addClass("active");
  $("li#matched").removeClass("active");
  $("button#backToWizard").addClass("btn--hidden");

  $("[role='start_matching']").removeClass("btn--hidden");
  $("[role='see_results']").addClass("btn--hidden");

//shortcut, but need to remove all the html
}



$(".chosen-select").chosen()
$(".chosen-container").css("width", "350px")
