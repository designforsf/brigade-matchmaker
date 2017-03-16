
$(function() {
//When doc ready set up event handlers
  $( "#checkin" ).submit(function( event ) {
    event.preventDefault;
    if ( localStorage.getItem("checkedIn") === "true" ) {
      window.alert("You are already checked in using " + localStorage.getItem("emailAddr") );
      $("#ahead").attr("href", "/test/api/projects");
      $("#ahead").removeProp("disabled")
      //window.location.href = "/test/api/projects";
    }
    else {
      postCheckin( event ) ;
       }
  });
  $( "#resetLocalStore" ).on( "click", function( event ) {
    window.alert("reset local");
    if ( localStorage.getItem("checkedIn") )
      localStorage.setItem("checkedIn", false);
      localStorage.setItem("emailAddr", "");
      localStorage.setItem("firstName", "");
      localStorage.setItem("lastName", "");
    window.alert("You are now reset to not checked in ")
    });
})

var checkedIn = false;

function postCheckin( evt ) {
  //var firstNm = $("#first_name").attr("name");
  window.alert("checking in now");
  var checkinData = {
    firstName : $("#first_name").val(),
    lastName : $("#last_name").val(),
    emailAddr : $("#email").val()
  };
  $.ajax ( {
    type : "GET",
    url : "/test/api/projects",
    data : checkinData,
    success : success(checkinData)
  });
}

function success( checkinData, evt ) {
  checkedIn = "true";
  $("a#ahead").attr("href", "/test/api/projects").removeProp("disabled");
  //check for local storage and store the user checkin info
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("checkedIn" , "true"); //stored as string
    localStorage.setItem("emailAddr" , checkinData.emailAddr );
    localStorage.setItem("firstName" , checkinData.firstName);
    localStorage.setItem("lastName" , checkinData.lastName);
} else {
    window.alert("Sorry! No Web Storage support..");
  }
}
