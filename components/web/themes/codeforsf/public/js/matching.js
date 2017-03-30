
function initMatchingSearch(searchStr) {
	//console.log("Retrieve user matching projects");
	var userMatchProjects = []; //create array of matching project objects
	userMatchProjects = jQuery.ajax({
				url: searchStr,
				success: [getAllProjs, function() {  //Use array of fn()s
				$("#match_res").removeClass("btn--hidden"); //reveal matchng projs
	      $("button#backToWizard").removeClass("btn--hidden"); //show "Back to Wizard" option
	      $("#wizardcards").addClass("btn--hidden"); // Hide Wizard progress bar
				$("[role='in_progress_message']").addClass("btn--hidden");
				}]
	}) //function gets passed the data
}

function getAllProjs(userMatches) {
	outputUserSearchCriteria( userMatches );
	$.ajax({
		url: '/api/projects',
		success: function(data) {processMatches(data, userMatches)}
		}).fail(function (err) {
		console.error(err); return; })
}

function processMatches( allProjs, userMatches ) {
	//console.log("User matches are ", userMatches + " allProjs are ", allProjs );

	var j = 0;
	var xProjects = [];
	var project_pix = ["https://avatars1.githubusercontent.com/u/8534106?v=3&s=200", "https://avatars1.githubusercontent.com/u/8534106?v=3&s=200", "http://i.imgur.com/JUmCJ5L.png", "http://i.imgur.com/KOY0XD0.jpg", "https://avatars1.githubusercontent.com/u/8534106?v=3&s=200",
	"https://avatars1.githubusercontent.com/u/8534106?v=3&s=200"];
	var project_email = ["teamA@brigadehub.com", "teamB@brigadehub.com", "teamC@brigadehub.com", "teamD@brigadehub.com", "teamEpix@brigadehub.com", "teamF@brigadehub.com"]

	// Get reference projects.
	// Not needed in next version -- api for matches should send back relevant
	// project data

	//console.log("Re-logging allProjs.projects[0] ", allProjs.projects[0]);
	var allPs = allProjs
	userMatches.projects.forEach(function(userProject){
		//iterate through the array of projects
		for (i = 0; i < allPs.projects.length; i++ ) {
			if ( allPs.projects[i].name === userProject.id ) {
				//console.log("True that match! ", userProject.id);
				userProject.skills = allPs.projects[i].matchingConfig.skillsNeeded;
				userProject.interests = allPs.projects[i].matchingConfig.interestsNeeded;
				userProject.goals = allPs.projects[i].matchingConfig.rolesNeeded;
				break;
			}
		}

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
	//return xProjects;
}
//Get all projects now


function outputMatchingProjects(xProjects, len, userMatches) {
	//console.log("User matching criteria obj: ", userMatches);
	for (var i = 0; i < len; i++) {
		//console.log("In oMP with ", xProjects, xProjects[i].image);
		$("#umtemplate img").attr("src", xProjects[i].image);
		var c =	$("#teamAddr").attr("info", xProjects[i].email);
		//console.log("Contact email obj is: ", c);
		$("#pName").text(xProjects[i].name);
		var shortText = $.trim(xProjects[i].mission).substring(0, 300).split(" ").slice(0, -1).join(" ") + "...";; //cut and add ellipses
		//code from http://jsfiddle.net/schadeck/GpCZL/
		$("#pMission").text(shortText);
		if (xProjects[i].skillNeeds) { // test on skills for user match
			$.each(xProjects[i].skillNeeds, function( index, value ) {
				if ( $.inArray( value, userMatches.skills) > -1 ) {
					//console.log("User skills are: ", userMatches.skills);
					//console.log("This project skill is a user match: ", value);
				}
			});
			$("#pSkills").text("Skills sought: " + xProjects[i].skillNeeds )};
		if (xProjects[i].goalNeeds) {
				$("#pGoals").text("Goals sought: " + xProjects[i].goalNeeds)};
		if (xProjects[i].interestNeeds) {
				$("#pInterests").text("Focus topics: " + xProjects[i].interestNeeds)};
		$("div#umtemplate").clone( false ).appendTo("div#pList");
		$("div#pList div#umtemplate").removeClass("btn--hidden"); // reveal
		$("div#pList div#umtemplate").removeAttr("id"); // remove id attributes as this div is not a template
		$("div#pList button").attr("id", xProjects[i].name + i).on('click', function (e) {
			$('#mailModal').modal('show');
		}); //give it unique id now & attach listener


		$("div#pList #pName").removeAttr("id");
		$("div#pList #pMission").removeAttr("id");
		$("div#pList #pGoals").removeAttr("id");
		$("div#pList #pInterests").removeAttr("id");
		$("div#pList #pSkills").removeAttr("id");
		//Team contact button addded, now attach listener


	}
}

function prepMatchCfgs( allProjs ) {
	//console.log("allProjs is ", allProjs);
	return allProjs
}

function outputUserSearchCriteria(userMatches) {

		//console.log("In oUSC with ", userMatches.skills, userMatches.goals, userMatches.interests);

}
		//Handle email form submit event. For now,  we just clear any user-entered text from form and display a confirming message.
		//

/*
Object
email
goalNeeds :Array[2]
image
interestNeeds Array[2]
leader
mission
name
skillNeeds Array[2]
		*/
