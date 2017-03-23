$(document).ready(function () {
  if ($(".alert-info")[0]) {
		location.href = '/projects'
  }
  $("[role='start_matching']").click(function () {
  	 user_data = "matching";
     console.log("current step: " + user_data);
     initMatchingStep();
     setTimeout( setViewMatches, 2200);

  })

  $("[role='see_results']").click(function () {
  	 user_data = "results";
     $("#match_res").removeClass("btn--hidden");
     $("button#backToWizard").removeClass("btn--hidden");
     $("#wizardcards").addClass("btn--hidden");
  })

  $("[id='backToWizard']").click(function () {
  	 user_data = "restartWizard";
     console.log("current step: " + user_data);
     $("#match_res").addClass("btn--hidden");
     $("#backToWizard").addClass("btn--hidden");
     $("#wizardcards").removeClass("btn--hidden");
     $("#matchingConfigs-list").children().remove();
     $("#projects-list").children().remove();

     restartWizard();

  })

  $("[role='home']").click(function(){
    user_data = "home";
    location.href = '/test/api/projects'; //go back to home page
  })
});

function initMatchingStep() {
  $("li#start_matching").addClass("active").addClass("move_left");
  $("li#start").removeClass("active").addClass("move_right");
  $("[role='home']").addClass("btn--hidden");
  $("[role='in_progress_message']").removeClass("btn--hidden");
  $("[role='start_matching']").addClass("btn--hidden");
  var searchStr = parseSelections();
  $("[role='in_progress_message']").attr("value", searchStr); //pass the users search through this button's value attr
  initMatchingSearch(searchStr); //is this function even in scope??
  //initMatchingSearch(searchStr);

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

function setViewMatches () {
  $("li#start_matching").removeClass("active");
  $("li#matched").addClass("active");
  $("[role='home']").removeClass("btn--hidden");
  $("[role='in_progress_message']").addClass("btn--hidden");
  $("[role='start_matching']").addClass("btn--hidden");
  $("[role='see_results']").removeClass("btn--hidden");

}

function restartWizard () {
  $("li#start_matching").addClass("active");
  $("li#matched").removeClass("active");
  $("button#backToWizard").addClass("btn--hidden");
  $("[role='home']").removeClass("btn--hidden");
  $("[role='start_matching']").removeClass("btn--hidden");
  $("[role='see_results']").addClass("btn--hidden");

//shortcut, but need to remove all the html
}



$(".chosen-select").chosen()
$(".chosen-container").css("width", "350px")
