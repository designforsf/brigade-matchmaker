//Control for the contact Team email form
$(document).ready( function() {

  $("#teamEmail").text(" ");
  $("#teamLeader").text(" ");

  $("#mailModal").on("click", function() {
    $("#teamEmail").text("teamEmailHere@.com");
    $("#teamLeader").text("teamLeaderName");
    $("textarea#userMsg").val;("");

  })

  $("#sendMsg").on("click", function() {
    $("textarea#userMsg").val(""); //clear it out
    $("#teamEmail").text(" ");
    $("#teamLeader").text(" ");
  
  })
})
