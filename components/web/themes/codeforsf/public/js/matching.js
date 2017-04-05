
function initMatchingSearch(searchStr) {
	console.log(searchStr);

	var userMatchProjects = []; //create array of matching project objects
	userMatchProjects = jQuery.ajax({
				url: searchStr,
				success: [getAllProjs, function() {  //Use array of fn()s
				$("#match_res").removeClass("btn--hidden"); //Reveals the matching project section
	      $("button#backToWizard").removeClass("btn--hidden"); //show "Back to Wizard" option
	      $("#wizardcards").addClass("btn--hidden"); // Hide Wizard progress bar
				$("[role='in_progress_message']").addClass("btn--hidden");
				}]
	}) //function getAllProjs gets passed the user matching projects
}

function getAllProjs(userMatches) {  //Because userMatches needs more project details
	//
	// Now get all project data --> this should not be necessary in next iteration
	// Instead the object returned by user selections should contain the short
	// summary information for the projects; and include direct links to more detailed
	// view of a single project
	//

	$.ajax({
		url: '/api/projects',
		success: function(data) {processMatches(data, userMatches)}
		}).fail(function (err) {
		console.error(err); return; })
}

function outputUserSearchCriteria(userMatches) {

		console.log("In oUSC with ", userMatches.skills, userMatches.goals, userMatches.interests);

}

function processMatches( allProjs, userMatches ) {

	//For iteration one, use improvised project pix and email addresses, etc.
	//Subsequent iterations should be able to use better, actual, project information
	//Once the UX team has settled what should be available for users
	//
	var j = 0;
	var xProjects = [];
	var project_pix = ["https://avatars1.githubusercontent.com/u/8534106?v=3&s=200", "https://avatars1.githubusercontent.com/u/8534106?v=3&s=200", "http://i.imgur.com/JUmCJ5L.png", "http://i.imgur.com/KOY0XD0.jpg", "https://avatars1.githubusercontent.com/u/8534106?v=3&s=200",
	"https://avatars1.githubusercontent.com/u/8534106?v=3&s=200"];
	var project_email = ["teamA@brigadehub.com", "teamB@brigadehub.com", "teamC@brigadehub.com", "teamD@brigadehub.com", "teamEpix@brigadehub.com", "teamF@brigadehub.com"]

	// Get reference projects.
	// Not needed in next version -- api for matches should send back relevant
	// project data

	var allPs = allProjs  // allProjs is the object of all project info pased into this function from the Ajax call to /api/projects

	//Iterate over the projects returned in the user match object userMatches
	// to complete the project info object allPs
	userMatches.projects.forEach(function(userProject){
		//iterate through the array of projects
		for (i = 0; i < allPs.projects.length; i++ ) {
			if ( allPs.projects[i].name === userProject.id ) {

				//projects match, we can fill in some missing info -- what
				// skills / interests / goals are sought by this project
				// That info is in the matching Config property, which is an array

				userProject.skills = allPs.projects[i].matchingConfig.skillsNeeded;
				userProject.interests = allPs.projects[i].matchingConfig.interestsNeeded;
				userProject.goals = allPs.projects[i].matchingConfig.rolesNeeded;
				break; // shortcut out of looping as soon as the project match is found
			}
		}  // Loop ended for finding the skills / interests // goals

		// Now start back at j=0 and iterate through the user projects
		// to fill in other information:
		// project name, mission, email address, leader
		//
		// In iteration 2 these will be based on UX decisions
		//
		// improvised project data for iteration 1:
		//
		xProjects[j] = {
			"name" : userProject.id,
			"mission" : "Mission to be announced...Umami kinfolk tousled meditation, vice locavore messenger bag irony pinterest pop-up skateboard bespoke. Ethical readymade master cleanse, austin copper mug vegan butcher umami hammock plaid yuccie scenester ennui. Food truck squid bicycle rights, photo booth XOXO semiotics cronut. Distillery kombucha humblebrag jean shorts, vice franzen mixtape williamsburg. Cronut etsy jianbing bicycle rights yr listicle pop-up cray, kitsch brooklyn. ",
			"image" : project_pix[j],
			"leader" : "Team leader name",
			"email" : project_email[j],
			"skillNeeds" : userProject.skills, //array of strings
			"goalNeeds" : userProject.goals,
			"interestNeeds" : userProject.interests
		}

		j++

	})

	outputMatchingProjects(xProjects, xProjects.length, userMatches);

}

// outputMatchingProjects iterates over the extended user matching projects object
// xProjects, an array of Objects
//
// It updates a (hidden) template (div#umtemplate) (um = user matching) by
// filling in id'd template elements with user data.
// Once filled in, the entire template section is cloned and appended
// Then the id info is removed (because the template must be the only
//  html with those id's) and the dev is "unhidden"
//  This method keeps the html formatting control all in Jade/HTML/CSS
//  and the code only has to provide the data
//
//  For the Contact Team buttons, a new unique ID is added, and a listener is
//   attached, after the section is cloned.

function outputMatchingProjects(xProjects, len, userMatches) {
	for (var i = 0; i < len; i++) {
		$("#umtemplate img").attr("src", xProjects[i].image);
		$("#teamAddr").attr("info", xProjects[i].email).attr("data-leader", xProjects[i].leader + i);


		$("#pName").text(xProjects[i].name);
		var shortText = $.trim(xProjects[i].mission).substring(0, 300).split(" ").slice(0, -1).join(" ") + "...";; //cut and add ellipses
		//code from http://jsfiddle.net/schadeck/GpCZL/
		$("#pMission").text(shortText);
		if (xProjects[i].skillNeeds) { // test on skills for user match
			$.each(xProjects[i].skillNeeds, function( index, value ) {
				if ( $.inArray( value, userMatches.skills) > -1 ) {
				}
			});
			$("#pSkills").text("Skills sought: " + xProjects[i].skillNeeds )};

		if (xProjects[i].goalNeeds) {
				$("#pGoals").text("Goals sought: " + xProjects[i].goalNeeds)};
		if (xProjects[i].interestNeeds) {
				$("#pInterests").text("Focus topics: " + xProjects[i].interestNeeds)};
		$("div#umtemplate").clone( false ).appendTo("div#pList");
		$("div#pList div#umtemplate").removeClass("btn--hidden"); // reveal
		$("div#pList div#umtemplate").removeAttr("id"); // remove id attributes as this div under #pList is *not* a template
		//
		//Now, the id for the newly added (last) Team Contact button is added
		// The id must be unique so is appended an integer
		// An event handler is added at the same time, to call
		// the function that handles the contact form
		//
		$("div#pList button#teamAddr").attr("id", "email" + i ).on('click', msgFormToTeam );
		$("div#pList button#saveIt:last").attr("data-name", xProjects[i].name ).on('click', getBookmarkedProjects );

		$("div#pList #pName").removeAttr("id");
		$("div#pList #pMission").removeAttr("id");
		$("div#pList #pGoals").removeAttr("id");
		$("div#pList #pInterests").removeAttr("id");
		$("div#pList #pSkills").removeAttr("id");
		//Team contact button addded, now attach listener


	}
}

function msgFormToTeam ( e ) {
	$('#mailModal').modal('show');
	$("#sendMsg").on("click", function() {
      var msgText = $("#userMsg").val(); //retrieve textarea
      sendMsg(msgText, contactForm)
      $("#userMsg").val("");
    });

	//
	//establish the contactForm object holding essential message information
	//
	if (!contactForm) {
		var contactForm = {};
		contactForm.userEmail = localStorage.getItem("emailAddr");
		contactForm.userFName = localStorage.getItem("firstName");
		contactForm.userLName = localStorage.getItem("lastName");
	}

	//
	// Always add specific team information
	//

	var c = $(e.target).attr("id");
	// ID value of this team's contact button
	// the "info" attribute stores team email.
	// Next iteration keep the team info in the global object of matching projects
	contactForm.teamEmail = $("#" + c).attr("info"); // the team email address
	$("#teamEmail").text(contactForm.teamEmail); //and show it on the form

	//
	//Team leaders stored in button attr data-leader
	//Next iteration will be in the global object of matching project info
	//
	contactForm.teamLeader = $("#" + c).attr("data-leader");
	$("#teamLeader").text(contactForm.teamLeader);  //display on form


	function sendMsg(msgText, contactForm) {
	  var myURL="http://localhost:5465/messaging/api/send"
	  var userMsg = {"email":{"to":[{"name": contactForm.teamLeader ,"email": contactForm.teamEmail}],"from":[{"name": contactForm.userFName +' ' + contactForm.userLName,"email":"welcome.sfbrigade+2938@gmail.com"}], "subject": "RE: World", "text":"Hello, from the Team Contact form!"}}

		var JSONstr = JSON.stringify(userMsg);
		console.log(JSONstr);

		setTimeout(
		  $.ajax({
		    url : myURL,
		    data : userMsg,
		    type: "POST",
		    error: function(a,b,c) {
		      console.log("Error thrown: ", c )
		    }
		  }), 2000);

	}

}

function getBookmarkedProjects( e ) {
	e.stopPropagation();
	if (typeof(Storage) === "undefined") {
		console.log("No local storage support")
	} else {
		// retrieve full array of bookmarks and check if this one is saved
		// already. Note that in log, or add it and save the new array.
		//
		var pName = $(e.target).attr("data-name"); // project name to be saved
		var bookmarks = {};
    bookmarks.savedProjects = [];
		if ( localStorage.getItem("savedProjects") ) {
			bookmarks.savedProjects =  JSON.parse(localStorage.getItem("savedProjects") )};

		if ( bookmarks.savedProjects.indexOf(pName) === -1 ) {
			console.log("The project needs to be stored: ", pName );
			bookmarks.savedProjects.push( pName ); // push the new proj to the bookmarks
			localStorage.setItem("savedProjects", JSON.stringify(bookmarks.savedProjects));
			showSavedProjs();
		}
		else {
			showSavedProjs();
		}

	}
}

function showSavedProjs () {
	//
	// initialize the list in the html

  var bookmarks = {};
  bookmarks.savedProjects = [];
	$.each( $('#savedProjsModal span'), function( index, value ) {
		$(this).text( "  ");
	});
	if ( localStorage.getItem("savedProjects") ) {
		bookmarks.savedProjects =  JSON.parse(localStorage.getItem("savedProjects") );
		$.each( $('#savedProjsModal span'), function( index, value ) {
			var x = bookmarks.savedProjects[index];
			if (x) {
				$(this).text( " " + x + " ");
			}
		})
	}
	$('#savedProjsModal').modal('show');
}
