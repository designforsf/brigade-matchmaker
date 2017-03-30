//Control for the contact Team email form
$(document).ready( function() {
  $('#teamAddr').on('click', function (e) {
    $('#mailModal').modal({keyboard: true, focus: true, backdrop: true, show: true});
    $( '#mailModal').on('shown.bs.modal', function ( e ) {
      console.log("Context this is", $(this) );

    })
  })
/*      console.log("Context this is", $(this) );
      $("#teamEmail").text("thisNewText ");
      $("#teamLeader").text(" ");

      $("#teamAddr").on("click", function() {
        $("#teamEmail").text("teamEmailHere@.com");
        $("#teamLeader").text("teamLeaderName");
        $("textarea#userMsg").val;("");

      })

      $("#sendMsg").on("click", function() {
        $("textarea#userMsg").val(""); //clear it out
        $("#teamEmail").text(" ");
        $("#teamLeader").text(" ");

      })

  })*/
})
