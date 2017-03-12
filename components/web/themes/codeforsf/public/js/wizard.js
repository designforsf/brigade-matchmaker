$(document).ready(function () {
  if ($(".alert-info")[0]) {
		location.href = '/projects'
  }
  $("[role='start_matching']").click(function () {
  	 user_data = "matching";
     console.log("current step: " + user_data);
     initMatchingStep();
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

}

$(".chosen-select").chosen()
$(".chosen-container").css("width", "350px")
