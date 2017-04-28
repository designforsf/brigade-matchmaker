$(document).ready(function () {
  if ($(".alert-info")[0]) {
		location.href = '/projects'
  }
  // Make the "You are checked in" item visible (enables logout)
  if ( localStorage.getItem("checkedIn") === "true" ) {
    $("li.dropdown").removeClass("btn--hidden");
  } else {
    $("li.dropdown").addClass("btn--hidden");
  }

  //retrieve the environment settings
  var envData;
  (function initEnv() {
    console.log('Executing initEnv');
  	//
  	// retrieve a JSON with server domain and port
  	$.get({
  		url: '/apiEnv'
    }).done( function( envData ) {
      console.log('Call for apiEnv: ', envData.result + ' ' + envData.Node_env + ' ' + envData.port + ' ' + envData.domain)
      })
    }) ();

  $("div.dropdown-menu").click(function (e) {
    //
    // e.target === My saved projects:  display localStorage project namespace
    // e.target === Sign out:  set localStorage checkedIn to "false" and
    //    go back to /
    switch( $(e.target).text() ) {
    case "My saved projects":
      bookmarkProjs.show();
      break;
    case "Sign out":
      localStorage.setItem("checkedIn", "false");
      // Make the "You are checked in" item invisible
      $("li.dropdown").addClass("btn--hidden");
      window.location="/";
      break;
    default:
      break;
   }
  })

  $("[role='start_matching']").click(function () {
  	 user_data = "matching";
     initMatchingStep( taxonomies );
  })

  $("[role='see_results']").click(function () {
  	 user_data = "results";
     $("#match_res").removeClass("btn--hidden");
     $("button#backToWizard").removeClass("btn--hidden");
     $("#wizardcards").addClass("btn--hidden");
  })

  $("[id='backToWizard']").click(function () {
  	 user_data = "restartWizard";
     $("#match_res").addClass("btn--hidden");
     $("#backToWizard").addClass("btn--hidden");
     $("#wizardcards").removeClass("btn--hidden");
     $("div#pList").children().remove();
     //
     // this id no longer used: all the children are under #pList
     //$("#projects-list").children().remove();
     restartWizard();
  })

  $("[role='home']").click(function(){
    user_data = "home";
    location.href = '/test/api/projects'; //go back to home page
  })

//handle synonyms in list selections
  var taxonomies = registerTaxonomies();
  //
  // taxonomies now holds all the primary keywords
  // and will track state of chosen/not chosen
  // in selection boxes/ setCount tracks the number
  // of chosen keywords per box
  //

  for (var i = 0; i < taxonomies.length; i++ ) {
    taxonomies[i].setCount = 0;
    //
    //set handlers on each box, using the div ids
    //

    $(document).on('change', '#'+taxonomies[i].setType, function(evt, params ) {
      if (params.selected != undefined) {
        for (var q = 0; q < taxonomies.length; q++ ) {
          if ( evt.currentTarget.id === taxonomies[q].setType ) {
            taxonomies[q].setPrimary[params.selected].chosen = true;
            console.log('selected: ', taxonomies[q].setType + ' ' + taxonomies[q].setPrimary[params.selected].name );
            taxonomies[q].setCount += 1; // up to 3 allowed
            }
          }
      // Logic for tracking de-selects must be added below
      }
      if (params.deselected != undefined) {
        console.log('deselected: ' + params.deselected);
        for (var q = 0; q < taxonomies.length; q++ ) {
          if ( evt.currentTarget.id === taxonomies[q].setType ) {
            taxonomies[q].setPrimary[params.deselected].chosen = false;
            console.log('Deselected: ', taxonomies[q].setType + ' ' + taxonomies[q].setPrimary[params.deselected].name );
            taxonomies[q].setCount -= 1; // up to 3 allowed
          }
        }
      }
    })

  };

});


function initMatchingStep( taxonomies ) {
  $("li#start_matching").addClass("active").addClass("move_left");
  $("li#start").removeClass("active").addClass("move_right");
  $("[role='home']").addClass("btn--hidden");
  $("[role='in_progress_message']").removeClass("btn--hidden");
  $("[role='start_matching']").addClass("btn--hidden");
  var searchStr = parseSelections( taxonomies );
  $("[role='in_progress_message']").attr("value", searchStr); //pass the users search through this button's value attr
  initMatchingSearch(searchStr);
}

function parseSelections(taxonomies) {
  if ( process.env.DEPLOY === 'heroku' )
    var baseURL = "http://localhost:5465/api/user/matches?"
  var skills = "skills=", interests = "interests=", goals = "goals=";
  var searchSkills, searchInterests, searchGoals = '';

  buildSrchStr = function( x ) {
    var srchCriteria = [];
    for (var j = 0; j < x.setPrimary.length; j++ ) {
      if ( x.setPrimary[j].chosen ) {
        srchCriteria.push( x.setPrimary[j].name )
      }
    } return srchCriteria.toString() ;
  }

  skills+= buildSrchStr( taxonomies[0] );
  skills = ( skills === "skills=" ) ? "" : skills + "&";
  interests+= buildSrchStr( taxonomies[1] );
  interests = ( interests === "interests=" ) ? "" : interests + "&";
  goals+= buildSrchStr( taxonomies[2] );
  goals = ( goals === "goals=" ) ? "" : goals;
  var searchStr = baseURL+skills+interests+goals;
  //
  // Output the user search criteria for the matching project results header
  //
  $("#searchskills.config").text("Skills: " + buildSrchStr( taxonomies[0] ));
  $("#searchinterests.config").text("Interests: " + buildSrchStr( taxonomies[1] ));
  $("#searchgoals.config").text("Goals: " + buildSrchStr( taxonomies[2] ));

  return searchStr;
}


function registerTaxonomies() {
  var taxonomies = [], taxSet = ['skills', 'interests', 'goals'];
  var primSyns = [];
  //build taxonomies from the selectbox html
  for (i = 0; i < taxSet.length; i++ ) {
    taxonomies[i] = { setType : taxSet[i], setCount: 0, setPrimary : [ ] };
    $("div#"+ taxSet[i] + " option").each( function (index) {
      primSyns = $(this).text().split(',');
      //
      //primSyns array[0] is the "primary" keyword
      //  followed by other elements which are synonymns
      //  that are not used for searching. Only push
      //  the primary onto the taxonomies setPrimary property,
      //  with initial "chosen" property of false
      //
      taxonomies[i].setPrimary.push( { name: primSyns[0], chosen: false } ); //push the primary keyword, no need for the synonymns
    });
  }
  return taxonomies;
}

function restartWizard () {
  $("li#start_matching").addClass("active");
  $("li#matched").removeClass("active");
  $("button#backToWizard").addClass("btn--hidden");

  $("[role='start_matching']").removeClass("btn--hidden");
  $("[role='see_results']").addClass("btn--hidden");

//shortcut, but need to remove all the html
}



$(".chosen-select").chosen({no_results_text: "Oops, nothing found!"});
$(".chosen-container").css("width", "350px");

// wizard.js above | matching.js below

function initMatchingSearch(searchStr) {
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

function processMatches( allPs, userMatches ) {

	// This is the callback function the Ajaz call to /api/projects
	//
	// var allPs is an array of all project objects
	//
	// select({ _id, name, matchingConfig (rolesNeeded, skillsNeeded, interestsNeeded)
	//        description, team (username, avatar), homepage, repository, needs,
	//				thumbnailUrl, contact (name, email) })
	//

	var j = 0;
	var xProjects = [];

	//Iterate over the projects returned in the user match object userMatches
	// to complete the project info using object allPs
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
		$("a#Repo").attr("href", fullProjInfo.repository );

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


		if (userProject.goals !== undefined ) {
			userProject.goals.forEach( function (item ) {
				$('section#pG button').filter(':first').clone( 'false' ).appendTo( $('section#pG').filter(':first') );
				btnSuccess = "";
				for ( var x = 0; x < userProject.goalsMatched.length; x++ ) {
					if ( item === userProject.goalsMatched[x] ) {
						btnSuccess = "btn-success";
					};
				};
				$('div#umtemplate').find('section#pG button').filter(':last').text( item ).removeClass('btn--hidden').addClass( btnSuccess );
			});
		}

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
    $("div#pList a#Repo").attr("id", getUniqueId() );

		if (bookmarkProjs.isItSaved(fullProjInfo.name))
			$("div#pList button#saveIt").text('Saved').attr("id", getUniqueId() ).attr('data-name', fullProjInfo.name).on('click', $.proxy( bookmarkProjs.show, bookmarkProjs) );
		else
			$("div#pList button#saveIt").text('Save it!').attr("id", getUniqueId() ).attr('data-name', fullProjInfo.name).on('click', $.proxy( bookmarkProjs.doSave, bookmarkProjs, fullProjInfo.name) );
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
		console.log('In getSaved and hasSaved is: ', this.hasSaved );
		if (this.hasSaved) {
				this.saved = JSON.parse(localStorage.getItem("savedProjects"));
		} else {
				this.saved = [];
		};
	},

	// Push project name pName onto the bookmarks array, (if new)
	doSave : function( pName, e ) {
		console.log('In doSave and hasSaved is ', this.hasSaved );
		if (this.hasSaved) {
			this.getSaved();
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
			// remove the Save handler and add the Show handler
			$( e.target ).text('Saved').off('click', bookmarkProjs.doSave ).on('click', $.proxy( bookmarkProjs.show, bookmarkProjs) );
		};
	},

	isItSaved : function( pName) {
		if (this.hasSaved) {
			this.getSaved();
			for (var x = 0; x < this.saved.length; x++ ) {
				if ( this.saved[x] === pName ) {
					return true;
				};
			};
		}
		return false;
	},

	removeSave : function( pName) {
	if (this.canSave) {
			this.getSaved();
			var newSaveList = this.saved.filter( function ( value) {
			return value !== pName;
			})
			localStorage.setItem("savedProjects", JSON.stringify(newSaveList) )
		}
	},

	show : function() {

		// Retrieve bookmarked projects
		this.getSaved();
		// Erase any previous session usage from the presentation
		// over-write with space
		$('#savedProjsModal p').each( function (index) {
			$( this ).text( (bookmarkProjs.saved[ index ] === undefined) ? ' ' : bookmarkProjs.saved[ index ] ).on('contextmenu', contextmenuBookmark	);
		});
		$('#savedProjsModal').modal('show');
	}
}

function contextmenuBookmark( e ) {
	e.stopPropagation();

	console.log("Bookmark list click event on: ", $(e.target).text() );

}

function toggleProjView( e ) {
	e.stopPropagation();
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
