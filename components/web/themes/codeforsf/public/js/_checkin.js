
$(function() {
//When doc ready set up event handlers
  $( "#checkin" ).submit(function( event ) {

    if ( localStorage.getItem("checkedIn") === "true" ) {
      window.alert("You are already checked in using " + localStorage.getItem("emailAddr") );
    }
    else {
      postCheckin( event ) ;
      event.preventDefault(); }
  });
  $( "#resetLocalStore" ).on( "click", function( event ) {
    if ( localStorage.getItem("checkedIn") )
      localStorage.setItem("checkedIn", false);
    window.alert("You are now reset to not checked in ")
    });
})

var checkedIn = false;

function postCheckin( evt ) {
  //var firstNm = $("#first_name").attr("name");
  var checkinData = {
    firstName : $("#first_name").val(),
    lastName : $("#last_name").val(),
    emailAddr : $("#email").val()
  };
  $.ajax ( {
    type : "POST",
    url : "/login",
    data : checkinData,
    success : success(checkinData)
  });
}

function success( checkinData, evt ) {
  checkedIn = "true";
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
