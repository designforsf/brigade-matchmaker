
$(function() {
//When doc ready set up event handlers
  $( "#checkin" ).submit(function( event ) {
    event.preventDefault;
    if ( localStorage.getItem("checkedIn") === "true" ) {
      console.log("You are already checked in using " + localStorage.getItem("emailAddr") );
      //$("#ahead").attr("href", "/test/api/projects");
      //$("#ahead").removeProp("disabled")
       = "/test/projectlist";
    }
    else {
      postCheckin( event ) ;
       }
  });
  $( "#resetLocalStore" ).on( "click", function( event ) {
    if ( localStorage.getItem("checkedIn") )
      localStorage.setItem("checkedIn", false);
      localStorage.setItem("emailAddr", "");
      localStorage.setItem("firstName", "");
      localStorage.setItem("lastName", "");
    });
})

var checkedIn = false;

function postCheckin( evt ) {
  //var firstNm = $("#first_name").attr("name");
  console.log("checking in now: " + $("#email").val() );
  var checkinData = {
    firstName : $("#first_name").val(),
    lastName : $("#last_name").val(),
    emailAddr : $("#email").val()
  };
  window.location.href = "/test/projectlist";
  $.ajax ( {
    type : "GET",
    url : "/test/projectlist",
    data : checkinData,
    success : saveLocal(checkinData)
  });
}

function saveLocal( checkinData, evt ) {
  console.log("saveLocal event is : ", evt)
  checkedIn = "true";
  //$("a#ahead").attr("href", "/test/api/projects").removeProp("disabled");
  //check for local storage and store the user checkin info
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("checkedIn" , "true"); //stored as string
    localStorage.setItem("emailAddr" , checkinData.emailAddr );
    localStorage.setItem("firstName" , checkinData.firstName);
    localStorage.setItem("lastName" , checkinData.lastName);
} else {
    console.log("Sorry! No Web Storage support..");
  }
}
