
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

function processMatches( allPs, userMatches ) {

	//For iteration one, use improvised project pix and email addresses, etc.
	//Subsequent iterations should be able to use better, actual, project information
	//Once the UX team has settled what should be available for users
	//
	// select({ _id, name, matchingConfig (rolesNeeded, skillsNeeded, interestsNeeded)
	//        description, team (username, avatar), homepage, repository, needs,
	//				thumbnailUrl, contact (name, email) })
	//
	//

	var j = 0;
	var xProjects = [];
	//var project_email = ["teamA@brigadehub.com", "teamB@brigadehub.com", "teamC@brigadehub.com", "teamD@brigadehub.com", "teamEpix@brigadehub.com", "teamF@brigadehub.com"]

	// Get reference projects.
	// Not needed in next version -- api for matches should send back relevant
	// project data

	// var allPs is the object of all project info passed into this function from the Ajax call to /api/projects

	//Iterate over the projects returned in the user match object userMatches
	// to complete the project info object allPs
	userMatches.projects.forEach(function(userProject) {
		//filter the allPs.projects array for a project name matching the userProject
		var fullProjInfo = allPs.projects.filter ( function( thisProject, index ) {
			return ( userProject.id ===  thisProject.name );
		});

		if ( !fullProjInfo ) {
			userProject.found = false;
			outputProject( userProject );
		}

		if ( fullProjInfo ) {
			userProject.found = true;

				//projects match, we can fill in some missing info -- what
				// skills / interests / goals are sought by this project
				// That info is in the matching Config property, which is an array

				userProject.skills = fullProjInfo[0].matchingConfig.skillsNeeded;
				userProject.interests = fullProjInfo[0].matchingConfig.interestsNeeded;
				userProject.goals = fullProjInfo[0].matchingConfig.rolesNeeded;

				// fullProjInfo[0] is the additional information retrieved for
				//  the user's matching project
				outputProject( userProject, fullProjInfo[0] );

		}
	})
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

function outputProject(userProject, fullProjInfo ) {

		$("#umtemplate img:first").attr("src", fullProjInfo.thumbnailUrl );

		// Next image is for an avatar of the team leader:
		$("#umtemplate img:last").attr("src", fullProjInfo.team[0].avatar );
		$('#umtemplate h4.leader').text( fullProjInfo.team[0].username );

		// Now add info for the Contact Team button.
		// On the data model -- we need to understand the use of contact[]
		// vs team[]
		if ( fullProjInfo.contact.length ) {
			$("#teamAddr").attr("info", fullProjInfo.contact[0].email).attr("data-leader", fullProjInfo.contact[0].name);
		} else {
			$("#teamAddr").attr("info", "").attr("data-leader", "");
		};

		$("#pName").text( fullProjInfo.name );
		//
		// New data model -- description is short enough without truncation.
		// leave short text for now in case a longer mission stmnt is available later
		//var shortText = $.trim(fullProjInfo.description).substring(0, 300).split(" ").slice(0, -1).join(" ") + "...";; //cut and add ellipses
		//code from http://jsfiddle.net/schadeck/GpCZL/
		$("#pMission").text(fullProjInfo.description );
		$('button#Repo').attr('onclick','location.href = "' + fullProjInfo.repository +  '";' );

		//
		// This section outputs skill/goal/interests that each
		// project team is seeking (userProject.skills).  Ones that match user selections
		// (userProject.skillsMatched) are highlighted using Bootstrap class btn-success
		//
		// Preserve the initial empty content for the skill/interest/goal sections
		//
		// This should be reduced to one function with three inputs...

		var btnSkills = $('div#umtemplate').find('section#pS').html();
		var btnGoals = $('div#umtemplate').find('section#pG').html();
		var btnInterests = $('div#umtemplate').find('section#pI').html();
		var btnSuccess;
		if (userProject.skills !== undefined ) {
			userProject.skills.forEach( function (item, index ) {
				$('section#pS button').filter(':first').clone( 'false' ).appendTo( $('section#pS').filter(':first') );
				btnSuccess = "";
				for ( var x = 0; x < userProject.skillsMatched.length; x++ ) {
					if ( item === userProject.skillsMatched[x] ) {
						btnSuccess = "btn-success";
					};
				};
				$('div#umtemplate').find('section#pS button').filter(':last').text( item ).removeClass('btn--hidden').addClass( btnSuccess );
			});
		}
		console.log('out of skills: ', userProject.skills);


		if (userProject.goals !== undefined ) {
			userProject.goals.forEach( function (item ) {
				$('section#pG button').filter(':first').clone( 'false' ).appendTo( $('section#pG').filter(':first') );
				btnSuccess = "";
				for ( var x = 0; x < userProject.goalsMatched.length; x++ ) {
					if ( item === userProject.skillsMatched[x] ) {
						btnSuccess = "btn-success";
					};
				};
				$('div#umtemplate').find('section#pG button').filter(':last').text( item ).removeClass('btn--hidden').addClass( btnSuccess );
			});
		}
		console.log('out of goals: ', userProject.Goals);

		if (userProject.interests !== undefined ) {
			userProject.interests.forEach( function (item ) {
				$('section#pI button').filter(':first').clone( 'false' ).appendTo( $('section#pI').filter(':first') );
				btnSuccess = "";
				for ( var x = 0; x < userProject.interestsMatched.length; x++ ) {
					if ( item === userProject.interestsMatched[x] ) {
						btnSuccess = "btn-success";
					};
				};
				$('div#umtemplate').find('section#pI button').filter(':last').text( item ).removeClass('btn--hidden').addClass( btnSuccess );
			});
		}
		console.log('out of interests: ', userProject.interests);

		$("div#umtemplate").clone( false ).appendTo("div#pList");
		$("div#pList div#umtemplate").removeClass("btn--hidden"); // reveal
		$("div#pList div#umtemplate").removeAttr("id"); // remove id attributes as this div under #pList is *not* a template
		//
		//Now, the id for the newly added (last) Team Contact button,
		// as well as the More.. and Save It buttons are assigned ids.
		// The id must be unique so is appended an integer
		// An event handler is added at the same time, to call
		// the function that handles the various events
		//
		$("div#pList button#teamAddr").attr("id", getUniqueId() ).on('click', msgFormToTeam );
		$("div#pList button#saveIt").attr("id", getUniqueId() ).attr('data-name', fullProjInfo.name).on('click', setBookmarkedProjects );
		$("div#pList button#seeMore").attr("id", getUniqueId() ).on('click', toggleProjView);

		$("div#pList #pName").removeAttr("id");
		$("div#pList #pMission").removeAttr("id");
		//
		// Empty out and reset the skill/interest/goal sections
		$('div#umtemplate').find('section#pS button').remove()
		$('div#umtemplate').find('section#pG button').remove()
		$('div#umtemplate').find('section#pI button').remove()
		$('div#umtemplate').find('section#pS').append( btnSkills );
		$('div#umtemplate').find('section#pG').append( btnGoals );
		$('div#umtemplate').find('section#pI').append( btnInterests );


}

// create a function to create unique element IDs using an IIFE and closure
// to hide state

var getUniqueId = ( function() {
	var id = 0;
	var root = "gen-";
	return (function () {
			return root + id++;
	})
})();

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

}
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


var bookmarkProjs = {

	// Test for localStorage support
	canSave : !(typeof(Storage) === 'undefined'),

	saved : [],

	// Test for existence of a bookmark
	hasSaved : ( localStorage.getItem( 'savedProjects' ) ? true : false),

	// Retrieve saved projects
	getSaved : function() {
		if (this.hasSaved) {
				this.saved = JSON.parse(localStorage.getItem("savedProjects"));
		} else {
				this.saved = [];
		};
	},

	// Push project name pName onto the bookmarks array, (if new)
	doSave : function( pName) {
		if (this.hasSaved) {
			this.getSaved;
			for (var x = 0; x < this.saved.length; x++ ) {
				if ( this.saved[x] === pName ) {
					return;
				};
			};
		}
			// pName is new, so add to this.saved
		if (this.canSave) {
			this.saved.push(pName);
			this.hasSaved = true;
			localStorage.setItem("savedProjects", JSON.stringify(this.saved) );
		};
	},

	removeSave : function( pName) {
		if (this.canSave && !this.retrieved) {
			this.saved = this.getSaved.filter( function ( value) {
			return value !== pName;
			})
			localStorage.setItem("savedProjects", JSON.stringify(this.saved) )
		} else if (this.canSave) {
			this.saved = this.saved.filter( function ( value) {
			return value !== pName;
			})
			localStorage.setItem("savedProjects", JSON.stringify(this.saved) )
		}
	},

	show : function() {

		// Retrieve bookmarked projects
		this.getSaved();
		// Erase any previous session usage from the presentation
		// over-write with space
		$('#savedProjsModal p').each( function (index) {
			$( this ).text( (bookmarkProjs.saved[ index ] === undefined) ? ' ' : bookmarkProjs.saved[ index ] ).on('contextmenu', doBookmark	);
		});
		$('#savedProjsModal').modal('show');
	}
}


function setBookmarkedProjects( e ) {
	e.stopPropagation();
	if ( !bookmarkProjs.canSave ) {
		console.log("No local storage support")
	} else {
		bookmarkProjs.doSave ( $(e.target).attr("data-name") );
		bookmarkProjs.show();
	}
}

function doBookmark( e ) {
	e.stopPropagation();

	console.log("Bookmark list click event on: ", $(e.target).text() );

}

function toggleProjView( e ) {
	e.stopPropagation();
	console.log('event received in function is ', e);
	var moreLess = $( e.target ).parent().next();
	switch ( $( e.target ).text() ) {
		case 'Show more...' :
			$( moreLess ).removeClass('btn--hidden');
			$( e.target ).text('Show less...');
			break;
		case 'Show less...' :
			$( moreLess ).addClass('btn--hidden');
			$( e.target ).text('Show more...');
			break;
		default :
			console.log('Show more/less button name is ', $( e.target ).text() );
	}
}
