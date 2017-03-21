
function initMatchingSearch(searchStr) {
	console.log("Retrieve user matching projects");
	var userMatchProjects = []; //create array of matching project objects
	userMatchProjects = jQuery.ajax({
				url: searchStr
	}).done( function( userMatches ) {
		var i = 0;
		var xProjects = [];
		var project_pix = ["https://avatars1.githubusercontent.com/u/8534106?v=3&s=200", "https://avatars1.githubusercontent.com/u/8534106?v=3&s=200", "http://i.imgur.com/JUmCJ5L.png", "http://i.imgur.com/KOY0XD0.jpg", "https://avatars1.githubusercontent.com/u/8534106?v=3&s=200",
		"https://avatars1.githubusercontent.com/u/8534106?v=3&s=200"];

		userMatches.projects.forEach(function(userProject){
			//iterate through the array of projects
			xProjects[i] = {
				"name" : userProject.id,
				"mission" : "Mission to be announced...Umami kinfolk tousled meditation, vice locavore messenger bag irony pinterest pop-up skateboard bespoke. Ethical readymade master cleanse, austin copper mug vegan butcher umami hammock plaid yuccie scenester ennui. Food truck squid bicycle rights, photo booth XOXO semiotics cronut. Distillery kombucha humblebrag jean shorts, vice franzen mixtape williamsburg. Cronut etsy jianbing bicycle rights yr listicle pop-up cray, kitsch brooklyn. Knausgaard prism next level cold-pressed shabby chic green juice. Scenester helvetica cray forage chia. Lumbersexual brunch activated charcoal, occupy wayfarers letterpress subway tile vice farm-to-table bushwick williamsburg. Plaid literally copper mug helvetica succulents, hashtag disrupt.",
				"image" : project_pix[i],
				"leader" : "Team leader name",
				"email" : "Team email address",
				"skillNeeds" : ["JavaScript","Writing"],
				"goalNeeds" : ["Lead","Manage"],
				"interestNeeds" : ["Housing","Infrastructure"]
			}
			console.log("Proj Name is ", xProjects[i].name );
			i++
			return xProjects;
			})
		console.log("Got the matching results: ", xProjects);
		outputMatchingProjects(xProjects, xProjects.length);
		return xProjects;
		})
//Get all projects now
}

function outputMatchingProjects(xProjects, len) {
	for (var i = 0; i < len; i++) {
		console.log("In oMP with ", xProjects, xProjects[i].image);
		$("#umtemplate img").attr("src", xProjects[i].image);
		$("#pName").text(xProjects[i].name);
		var shortText = $.trim(xProjects[i].mission).substring(0, 300).split(" ").slice(0, -1).join(" ") + "...";; //cut and add ellipses
		//code from http://jsfiddle.net/schadeck/GpCZL/
		$("#pMission").text(shortText);
		$("#pSkills").text("Skills sought: " + xProjects[i].skillNeeds );
		$("#pGoals").text("Goals sought: " + xProjects[i].goalNeeds);
		$("#pInterests").text("Focus topics: " + xProjects[i].interestNeeds);
		$("div#umtemplate").clone( false ).appendTo("div#pList");
		$("div#pList div#umtemplate").removeClass("btn--hidden"); // reveal
		$("div#pList div#umtemplate").removeAttr("id"); // remove id attributes as this div is not a template
		$("div#pList #pName").removeAttr("id");
		$("div#pList #pMission").removeAttr("id");
		$("div#pList #pGoals").removeAttr("id");
		$("div#pList #pInterests").removeAttr("id");
		$("div#pList #pSkills").removeAttr("id");

	}




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
