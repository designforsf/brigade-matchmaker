
$(function() {

  $( "#checkin" ).submit(function( event ) {
    postCheckin( event ) ;
    event.preventDefault();
  });
})

var checkinData = {}; // global
function postCheckin( evt ) {
  //var firstNm = $("#first_name").attr("name");
  console.log($("#first_name").val() );
  checkinData = {
    firstName : $("#first_name").val(),
    lastName : $("#last_name").val(),
    emailAddr : $("#email").val()
  };
  console.log("Not yet posted with data " + checkinData.emailAddr );
  $.ajax ( {
    type : "POST",
    url : "/login",
    data : checkinData,
    success : success
  });
}
function success( evt ) {
  console.log("The post succeeded with data " + checkinData.emailAddr );
}
