
/* Matching Hat Client */

(function (MH) {

  // namespace: token
  var Checkin = (MH.Checkin = {});

  /*
    checkin click
  */
  //When doc ready set up event handlers
  Checkin.login = function(  ) {
    console.log("checkin click");

    if ( localStorage.getItem("checkedIn") === "true" ) {
      $("li.dropdown").removeClass("btn--hidden");
      // Make the "You are checked in" item visible
      console.log('You are logged in, forwarding to wizard UI');
      //
      // Make the "You are checked in" nav drop down visible
      // Proceed to the MH wizard
      //
      window.location="/test/projectlist";

      //window.location.href = "/test/api/projects";
    } else {
      //Perform basic input validations
      var x = $("#email").val();
      var atpos = x.indexOf("@");
      var dotpos = x.lastIndexOf(".");
      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {

        $('#checkinModal strong').text('The email appears invalid. Try again.');
        $('#checkinModal').modal('show');

      } else {
        if (! $("#first_name").val() ) {
          $('#checkinModal strong').text('Please fill in first and last name.');
          $('#checkinModal').modal('show');
        } else {
          if (! $("#last_name").val() ) {
            $('#checkinModal strong').text('What, are you Cher or Beyonce? Try again.');
            $('#checkinModal').modal('show');
          } else {  // Now all inputs pass basic edits
            postNewCheckin();
          }
        }
      }
    }
  }

  // perform the xhr API call
  postNewCheckin = function() {
    jQuery.ajax({
    type: 'POST',
    url: '/api/user/create_and_login',
    data: {
      email : $("#email").val(),
      password: ''
    },
    }).done(function (results) {
      console.log('success ', results);
      Checkin.postCheckin(results) ;

    }).fail(function (err) {
      console.error(err);

  });



}

  /*
    reset click
  */

  Checkin.reset = function(  ) {

    // perform the xhr API call
    jQuery.ajax({
      type: 'POST',
      url: '/api/user/logoff',
      data: {},
    }).done(function (results) {
      console.log('logoff ', results);

      if ( localStorage.getItem("checkedIn") ) {
        localStorage.setItem("checkedIn", false);
        localStorage.setItem("emailAddr", "");
        localStorage.setItem("firstName", "");
        localStorage.setItem("lastName", "");
        console.log("You are now reset to not checked in ")
      }

    }).fail(function (err) {
      console.error(err);

    });

  }

  var checkedIn = false;

  /*
    post checkin
  */

  Checkin.postCheckin = function postCheckin(  ) {
    //var firstNm = $("#first_name").attr("name");
    console.log("checking in now");

    var checkinData = {
      firstName : $("#first_name").val(),
      lastName : $("#last_name").val(),
      emailAddr : $("#email").val()
    };

    /*
    $.ajax ( {
      type : "GET",
      url : "/test/api/projects",
      data : checkinData,
      success : Checkin.success(checkinData)
    });
    */

    Checkin.success(checkinData);

  }

  /*
    success
  */

  Checkin.success = function success(checkinData) {
    console.log('Checkin.success')
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

    // forward to the wizard interface
    console.log('Test checkin again and then proceed...')
    Checkin.login();

  }

  }) (( window.MH=window.MH || {}));
