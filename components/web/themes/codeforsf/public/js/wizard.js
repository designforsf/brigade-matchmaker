$(document).ready(function () {
  if ($(".alert-info")[0]) {
		location.href = '/projects'
  }
  $("[role='start_matching']").click(function () {
  	 user_data = "matching";
     console.log("current step: " + user_data);
     initMatchingStep();
     //setTimeout( setViewMatches, 2200);

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
  console.log('Choices are: ', taxonomies);
  console.log( 'selected: ', taxonomies[0].setType );
  //var userSet = registerUserChoices();
  for (var i = 0; i < taxonomies.length; i++ ) {
    taxonomies[i].setCount = 0;
    $(document).on('change', '#'+taxonomies[i].setType, function(evt, params ) {
      if (params.selected != undefined) {
        for (var q = 0; q < taxonomies.length; q++ ) {
          if ( evt.currentTarget.id === taxonomies[q].setType ) {
            taxonomies[q].setPrimary[params.selected].chosen = true;
            console.log('selected: ', taxonomies[q].setType + ' ' + taxonomies[q].setPrimary[params.selected].name );
            taxonomies[q].setCount += 1; // up to 3 allowed
            if ( taxonomies[q].setCount >= 3 ) {
              for (var j = 0; j < taxonomies[q].setPrimary.length; j++ ) {
                if (taxonomies[q].setPrimary[j].chosen) {
                  console.log('Selected: ', taxonomies[q].setPrimary[j].name); console.log('The select list should now be disabled');
                }
              }
            }
          }
        }  // Logic for tracking de-selects must be added below
      }
      if (params.deselected != undefined) {
        console.log('deselected: ' + params.deselected);
      }
    })
  };

});




function initMatchingStep() {
  $("li#start_matching").addClass("active").addClass("move_left");
  $("li#start").removeClass("active").addClass("move_right");
  $("[role='home']").addClass("btn--hidden");
  $("[role='in_progress_message']").removeClass("btn--hidden");
  $("[role='start_matching']").addClass("btn--hidden");
  var searchStr = parseSelections();
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

function parseSelections() {
  var baseURL = "http://localhost:5465/api/user/matches?"
  var skills = "skills=", interests = "interests=", goals = "goals=";
  searchSkills = $("div#skills li.search-choice span").each( function (index) {
    if ( !index) // first item needs no comma
      skills+= $(this).text();
    else
      skills+= ","+$(this).text();
  });
  $("#searchskills").text(skills); // output search string for the user

  searchInterests = $("div#interests li.search-choice span").each( function (index) {
    if ( !index) // first item needs no comma
      interests+= $(this).text();
    else
      interests+= ","+$(this).text();
  });
  $("#searchinterests").text(interests); // output search string for the user

  searchGoals = $("div#goals li.search-choice span").each( function (index) {
    if ( !index) // first item needs no comma
      goals+= $(this).text();
    else
      goals+= ","+$(this).text();
  });
  $("#searchgoals").text(goals); // output search string for the user


  // remove unused elements
  if (skills.length === 7) {
    skills = ""; }
  if (interests.length === 10) {
    interests = ""; } else if
      ( skills ) { skills += "&" };

  if (goals.length === 6) {
    goals = ""; } else
      if ( interests ) { interests += "&" } else
        if ( skills ) { skills += "&"};

  var searchStr = baseURL + skills + interests + goals;
  console.log("Created search URL :" + searchStr);
  return searchStr;
}


function registerTaxonomies () {
  var taxonomies = [], taxSet = ['skills', 'interests', 'goals'];
  var primSyns = [];
  //build taxonomies from the selectbox html
  for (i = 0; i < taxSet.length; i++ ) {
    taxonomies[i] = { setType : taxSet[i], setCount: 0, setPrimary : [ ] };
    $("div#"+ taxSet[i] + " option").each( function (index) {
      primSyns = $(this).text().split(',');
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
