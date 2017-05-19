$(document).ready(function () {
  // Make the "You are checked in" item visible (enables logout)
  if ( localStorage.getItem("checkedIn") === "true" ) {
    $("li.dropdown").removeClass("btn--hidden");
  } else {
    $("li.dropdown").addClass("btn--hidden");
  };

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
  });

  $("[role='start_matching']").click(function () {
     user_data = "matching";
     initMatchingStep( selectorsObj.projTax );
  })

/***********??? these parts of the old 'wizard no longer active
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
  ********************************/

  /*************************
  /* Establish the main taxonomy selection
  /* object and methods...

  // Create the html for the selector taxonomy divs (hidden until
  // activated by a user click).
  //
  // Set selection glyph click handlers, for showing the selector divs
  //
  // userProfile.taxType is the main object for selector taxonomy properties
  // and methods. selectorsObj.formIDs array contains the div ids related to
  // each taxonomy class. The current open div#formIDs[] gets saved in
  // userProfile.formID also

  /******************
    The taxonomies arrive as globals during form load
    matchSkills, matchGoals, matchInterests. These then are
    placed into selectorsObj.projTax (project taxonomies)
    and used to create the selection forms for the user
  ******************/

  var selectorsObj = {
    formIDs : ['s2cselections', 's2lselections', 'intSelections', 'goalSelections'],
    myForm : '',
    projTax : {  // all taxonomies from across all BrigadeHub projects
      taxSkills : matchSkills,
      taxGoals : matchGoals,
      taxInts : matchInterests
    },
    goCreateSelectForms : function( taxObjToUse, idx ) {
    // these help with jQuery selections to load the selection forms
      var taxSelectors = {
        s2cselections : 'taxSkills',
        s2lselections : 'taxSkills',
        intSelections : 'taxInts',
        goalSelections : 'taxGoals'
      };

      userProfile.formID = this.formIDs[idx];
      //var taxObjToUse = this.projTax[ taxSelectors[ userProfile.formID ] ]; //the respective taxonomy for this form
      console.log('Forming the taxonomy choices html now!', userProfile.formID);
      userProfile.doCreateForm( taxObjToUse, userProfile.formID );

      //Set the listener on the selector glyph to show the forms
      $("div#label" + userProfile.formID ).on('click', function() {
        userProfile.doShow( event );
      });
    }
  };

  selectorsObj.goCreateSelectForms( selectorsObj.projTax.taxSkills, 0 ); // for user's skills to Contribute
  selectorsObj.goCreateSelectForms( selectorsObj.projTax.taxSkills, 1 ); // for skills to Learn
  selectorsObj.goCreateSelectForms( selectorsObj.projTax.taxInts, 2 ); // for user's interests

/*********** End Doc Ready function*************/

});

/*********** Establish the userProfile*************
/*           properties and methods related to the
/*           user's ability to see, select and save taxomony choices
/*/

var userProfile = {

  formID : '',
  formActive : '',
  doShow : function( e) {
    var label=event.target.id.split('label');
    if ( this.formActive === label[1] ) {  //trying to close the open form
      this.doDismiss( this.formActive );
      return;
    };
    if ( this.formActive ) {
      this.doDismiss( this.formActive )
    };
    console.log(' Trying to open form ', label[1]);
    this.formID = label[1];
    $('div#' + this.formID ).slideToggle();
    this.formActive = this.formID;
    $('div#label' + this.formActive ).addClass('selection_bar_active');
  },

  doDismiss : function( formID ) {
    this.formID = formID;
    console.log('Trying to dismiss form ', formID);
    $('div#' + this.formID ).slideToggle();
    $('div#label' + this.formActive ).removeClass('selection_bar_active');
    this.formActive = '';
    // ??? add code to load up the chosenBox items to searchStr
  },

  //
  //tracking array for user selected taxonomies
  chosen2 : [], //maintained during selection and de-deselection

  outputSelection: function( jDestination, mainSubDtl, originID ) {
    //
    // jDestination is a jQuery hook to where the button is to be output
    // mainSubDtl is mainCat.subCat.detail
    // mainSubDtl will be parsed for display in the selection box
    // and stored so if user wants to remove the selector, we know
    // the entire context of choices to udpate.

    var newBtn = '', displayName = [];
    //
    // Use a template button at section#pS to model the new button
    newBtn = $('section#pS button').filter(':first').clone('false');
    displayName = mainSubDtl.split('.');
    displayName[3] = (displayName[2] ? displayName[2] : displayName[1])
    newBtn = $(newBtn).text(displayName[3]).removeClass('btn--hidden').appendTo($('div#chosen' + jDestination ));
    $(newBtn).attr( 'name', originID ).attr('id', getUniqueId() ).removeClass('disabled');
    $(newBtn).attr( 'info', mainSubDtl);
    console.log('just output one button')
    $(newBtn).click( function () {
      userProfile.toggleSelection(this, 'chosenBox');
    });
  },

  removeSelection(event) {
    console.log('removing selection');
    $(event).remove();
  },


  doCreateForm : function( taxType, formID )  { //html for taxonomy select forms
    //
    // taxType: taxSkills, taxGoals, taxInterests
    // formID = the html id property for the relevant modal form
    var myBase = '#' + formID; // used for jQuery
    var mainSub, mainSubDtl;
    //
    //Set the stored data for the form: taxType
    $(myBase).data('taxType', taxType); //???gives the object not the name

    //Build the selector form
    taxType.mainCat.forEach(function(mainCat) {

      taxType.subCat[mainCat].forEach(function(subCat) {
        mainSub = mainCat + '.' + subCat;
        $(myBase + ' div.model:first').clone().insertBefore(myBase + ' div.nic:first');
        jItem = $(myBase + ' ' + ' div.model:last').text(mainCat + ' ' + subCat).addClass('catg');
        $(jItem).data('name', mainSub ); //label category
        //
        taxType.details[ subCat ].forEach(function( detail ) {
          mainSubDtl = mainSub + '.' + detail;
          //
          // Output all the taxType -- at end, clone and append to the selectForm.jade
          $(myBase + ' div.model:first').clone().insertBefore(myBase + ' div.nic:first');
          jItem = $(myBase + ' div.model:last').text(detail).addClass('dtlItm').data('name', mainSubDtl );

        });
        // ??? possible changes to get row separation for flex containers
        //jItem=$('div#s2cselections div.row:first').clone().appendTo('div#s2cselections')


        jItem = $(myBase + ' div.nic:first');
        //$(jItem).clone().insertAfter($(myBase + ' div.nic:last'));
        $(myBase + ' div.row:first').clone(true).appendTo(myBase);
        //
        // New taxonomy selector form now created and Initiatlized showing
        //  all items not selected (yet!)
        // Now we clean up the newly created div
        $(myBase + ' div.row:last').children('div.model').removeClass('model');
        //
        // And now we remove the original div items except the very first
        $(myBase + ' div.row:first').children('div.model:not(:first)').remove(); //clean out model divs
      });
    });
    //
    // New taxonomy selector form created. Now attach all the click handlers
    // Each catg div (main+subcat) and dtlItm (lowest level item) gets a handler

    /***??? Leave for future work to enable selection by subCat
    $("#s2cselections div.catg").each(function( ) {
      $(this).attr("id", getUniqueId() );
      //$(this).click(function() {
        userProfile.toggleSelection(this, 'selForm');
      });
    }); ***/

    $(myBase + ' div.dtlItm').each(function( ) {
      $(this).attr("id", getUniqueId() );
      $(this).click(function() {
        event.stopPropagation();
        userProfile.toggleSelection(this, 'selForm');
      });
    });

  },

  toggleSelection: function( event, whereClicked ) {

    //
    // whereClicked is either selForm (selecting and removing)  or chosenBox (removing only):
    var itemAdded = false;
    mainSubDtl = $(event).data().name; //in form 'main.sub.detail' as a string
    console.log('Toggle switch clicked at ', mainSubDtl + ' ' + whereClicked );
    //
    // invert the selection:
    // If the item was NOT chosen now it IS
    // If it was ALREADY chosen, now it is NOT
    if (whereClicked === 'selForm') {
      var audioAdd = document.getElementById("audioAdd");
         audioAdd.play();

      // This will cause the item to be hidden from
      // the selection form, until / unless the user deletes the selection
      $(event).removeClass('dtlItm');

      // Now set this item to 'selected' (true) in chosen2 array
      // ??? may still have to include userProfile.formID in the equality test
      //  if the selection algo will distringuish "to contribute" and "to learn" skills
      //  For now, the skills are treated as the same, whichever form they are selected
      //  from.
      if (!itemAdded) {
        for (idx=0; idx < userProfile.chosen2.length; idx++ ) {
          if ( userProfile.chosen2[idx].detail === mainSubDtl ) {
            userProfile.chosen2[idx].chosen = true;
            itemAdded = true;
          };
        };
        if (!itemAdded) {
          userProfile.chosen2.push( { detail: mainSubDtl, type: userProfile.formID, chosen: true }); // Add to selected
        };
      }
      //
      // Now add this to the chosenBox as a button.
      // Include the id of the div that is creating this button,
      // so that this item can be revealed later, if the user removes this
      // from chosenBox.
      userProfile.outputSelection(userProfile.formID, mainSubDtl, $(event).attr('id'));
    };

    if (whereClicked === 'chosenBox') {
      var audioAdd = document.getElementById("audioRem");
         audioRem.play();
      //Set this item to 'unselected' (false) in chosen2 array
      for (idx=0; idx < userProfile.chosen2.length; idx++ ) {
        if ( userProfile.chosen2[idx].detail === $(event).attr('info') ) {
          userProfile.chosen2[idx].chosen = false;
        };
      };
      //
      //Now add back the dtlItm class to reveal the respective item in selForm
      $('div#' + $(event).attr('name') ).addClass('dtlItm');
      $(event).remove(); // Remove the button from the chosenBox
    };
  }

};

/******************End of userProfile ****************/

// taxonomies: array of objects [ { detail: main.sub.detail, formID, chosen: boolean}]
//
function initMatchingStep( taxonomies ) {

  $("[role='start_matching']").click(function () {
     $("div#pList").children().remove();
  })

  var searchStr = parseSelections( userProfile.chosen2 );
  $("[role='in_progress_message']").attr("value", searchStr); //pass the users search through this button's value attr
  initMatchingSearch(searchStr);
}

function parseSelections( ) {
  var baseURL
  if ( window.location ) {
    baseURL = window.location.origin + "/api/user/matches?"
  } else {
      baseURL = "http://localhost:5465/api/user/matches?"
  }
  var skills = "skills=", interests = "interests=", goals = "goals=";
  var searchSkills, searchInterests, searchGoals = '';

    //selectorsObj.formIDs = ['s2cselections', 's2lselections', 'goalSelections', 'intSelections'];
  function buildSrchStr( catg ) {
    var srchCriteria = [];
    var name = [];
    for (i = 0; i < userProfile.chosen2.length; i++ ) {
      if (userProfile.chosen2[i].chosen) {
        if (userProfile.chosen2[i].type === catg) {
          name = userProfile.chosen2[i].detail.split('.');
          srchCriteria.push( name[2] ); // ??? detail still has to be parsed
        };
      };
    };
    return srchCriteria.toString() ;
  };

  skills+= buildSrchStr( 's2cselections' );
  skills = ( skills === "skills=" ) ? "" : skills + "&";
  console.log('Skills search string: ', skills);
  interests+= buildSrchStr( 'intSelections' , interests);
  interests = ( interests === "interests=" ) ? "" : interests + "&";
  console.log('Interests search string: ', interests);
  var searchStr = baseURL+skills+interests+goals;
  console.log('Search string is ', searchStr)
  return searchStr;

/** ??? must still complete when taxonomy settled
  skills = ( skills === "skills=" ) ? "" : skills + "&";
  interests+= buildSrchStr( userProfile.intSelections );
  interests = ( interests === "interests=" ) ? "" : interests + "&";
  goals+= buildSrchStr( userProfile.goalSelections );
  goals = ( goals === "goals=" ) ? "" : goals;
  var searchStr = baseURL+skills+interests+goals;
  console.log('Search string is ', searchStr)
  return searchStr;
***/
};


function restartWizard () {
  $("li#start_matching").addClass("active");
  $("li#matched").removeClass("active");
  $("button#backToWizard").addClass("btn--hidden");

  $("[role='start_matching']").removeClass("btn--hidden");
  $("[role='see_results']").addClass("btn--hidden");
}



// wizard.js above | matching.js below

function initMatchingSearch(searchStr) {

  var userMatchProjects = []; //create array of matching project objects
	userMatchProjects = jQuery.ajax({
				url: searchStr,
				success: [getAllProjs, function() {  //Use array of fn()s

        $("#match_res").removeClass("btn--hidden");
				}]
	}) //function getAllProjs gets passed the user matching projects
}

/******************
/* ??? getAllProjs won't be needed when the selection algo sends
/* back project details as part of the API
/*
*/
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

	// This is the callback function for the Ajax call to /api/projects
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
		//for v02 use glyphicons
    //and move into primary project box
    //$("div#pList button#teamAddr").attr("id", getUniqueId() ).on('click', msgFormToTeam );
    $("div#pList span#contactTeam").attr("id", getUniqueId() ).on('click', msgFormToTeam );
    $("div#pList a#Repo").attr("id", getUniqueId() );

		if (bookmarkProjs.isItSaved(fullProjInfo.name))
			$("div#pList span#saveIt").attr("id", getUniqueId() ).attr('data-name', fullProjInfo.name).on('click', $.proxy( bookmarkProjs.show, bookmarkProjs) ).next().text('Saved')
		else
    //for v02 use glyphicon-pushpin (save it) and glyphicon-saved (saved)
    //and move into primary project box
    //$("div#pList button#teamAddr").attr("id", getUniqueId() ).on('click', msgFormToTeam );
			$("div#pList span#saveIt").attr("id", getUniqueId() ).attr('data-name', fullProjInfo.name).on('click', $.proxy( bookmarkProjs.doSave, bookmarkProjs, fullProjInfo.name) ).next().text('Save it');

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

/*********???
/* message functions could be placed in a messaging object
/* as was done with the bookmark properties and methods
*/

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
			$( e.target ).off('click', bookmarkProjs.doSave ).on('click', $.proxy( bookmarkProjs.show, bookmarkProjs) ).next().text('Saved');
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

/* ??? properly this function belows to bookmarkProjs object*/
function contextmenuBookmark( e ) {
	e.stopPropagation();

	console.log("Bookmark list click event on: ", $(e.target).text() );

}

/*??? This belongs with an object for all the functions related
/* to creating the project list
*/
function toggleProjView( e ) {
	e.stopPropagation();
	var moreLess = $( e.target ).parent().siblings('#moreInfo');
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
};
