// NOTE: put the dot after script(). and the js is rendered only for client interpretation
	var html
	var pix_idx = 0;
	var project_pix = ["https://avatars1.githubusercontent.com/u/8534106?v=3&s=200", "https://avatars1.githubusercontent.com/u/8534106?v=3&s=200", "http://i.imgur.com/JUmCJ5L.png", "http://i.imgur.com/KOY0XD0.jpg", "https://avatars1.githubusercontent.com/u/8534106?v=3&s=200",
	"https://avatars1.githubusercontent.com/u/8534106?v=3&s=200"];

//jQuery(document).ready(function () {
function initMatchingSearch(searchStr) {
	console.log("Create the criteria true/false object here");
	jQuery.ajax({
		url: searchStr
	}).done( function ( {
			spitOutSkillIntGoalSelectors(matchresults);
		 	return matchresults;
			}
	)).fail(function (err) {
		console.error(err); return;
	});

	console.log("Got the matching results: ", matchresults);
//Get all projects now
	var allProjects = jQuery.ajax({
		url: '/api/projects'
	}).done(console.log("Got all projects")).fail(function (err) {
		console.error(err); return;
	});
}

function getDataFor (matchresults) {
		if (typeof matchresults.projects !== 'undefined' && matchresults.projects[0]) {
			pix_idx = 0 // reset each time outputting projects
			spitOutSkillIntGoalSelectors(matchresults); //Lists them at top of results
			//Now retrieve all projects to fill in missing data(not needed
			//when the matching algo returns better project data)
			jQuery.ajax({
				url: '/api/projects'
			}).done(fillInData (allProjects) {
					return allProjects; })
					for (var q = 0; q < matchresults.projects.length; q++) {
						//console.log(matchresults.projects[q].id);
						allProjects.projects.forEach(function (proj, idx) {
							if(proj.name === matchresults.projects[q].id) { // this is a hit,
								//extend matchresults with more data
								matchresults.project[q].name = proj.name;
								matchresults.project[q].leader = "Missing";
								matchresults.project[q].image = project_pix[pix_idx];
								matchresults.project[q].matchingConfig = proj.matchingConfig;
								console.log('matchingProject.id is ', matchingProject.id, proj.name);
							}
						})
						//
						// This looping should be replaced by having the matching wizard return the necessary // project details in its API
				}
			}

}

	function listMatchingProjects(matchingProject) {

		jQuery.ajax({
			url: '/api/projects'

			//
			// For now, retrieving all projects and then selecting
			// the matching information to output.
			// Projects object here are returned as var "results"
			// The matching query should instead return project details.
			//

		}).done(function (results) {
			//
			// This looping should be replaced by having the matching wizard return the necessary // project details in its API
			//
			var proj_exists = 'false';
			html = '';
			if (typeof results.projects !== 'undefined' && results.projects[0]) {
				results.projects.forEach(function (proj, idx) {
					if(proj.name === matchingProject.id) { // this is a hit, add details and output
						//showProjListHeadings() //Contact Team, Team Leader, Project Name etc

						console.log('matchingProject.id is ', matchingProject.id, proj.name)
						matchingProject.name =
						//outputProjectInfo(proj);
						proj_exists = 'true';
					}
				})

				if (proj_exists === 'false') {   //This should only occur with test data
					//showProjListHeadings()
					console.log('Not found project matchingProject.id is', matchingProject.id);
					outputNotFoundInfo(matchingProject);

				}
			}

			// click event listener placed on class "#mailModal" buttons
			//
			//$('#mailModal').on('submit', function(e) {
			//$('#mailModal').modal('show');
			//	setTimeout( $('#mailModal').modal('hide')
			//	)
			//})

			$("#mailModal").on('hidden.bs.modal', function(e) {
				$('#confirm_sent').css("visibility", "hidden" ); //hide confirmation
				$('#comment').text('Go ahead and start a conversation about how you can help!').removeProp('disabled');
				console.log("Completed the on.hidden tasks");
			});
			// click event on the contact form "X" element and Cancel
			//$('button[data-dismiss="modal"]').on('click', function(e) {
			//	cancelContactForm(e);
			//})

		}).fail(function (err) {
			console.error(err); return;
		})
	}

	//function showContactForm(e) {
	//	$("#comment").removeProp("disabled").text("Go ahead and start a conversation about how you can help!");
	//	$('#mailModal').modal('show');
	//}

	//function cancelContactForm(e) {
	//	$('#mailModal').modal('hide').modal({dimmerSettings: { opacity: 0 }} //).modal('show');

	//	$('#confirm_sent').css("visibility", "hidden" );
	//	$('#comment').removeProp('disabled');
	//}

	function prefillContactForm() {

	}

	function outputNotFoundInfo(projNotFound) {
		var not_proj = {}
			not_proj.name = projNotFound.id,
			not_proj.description = 'I need a mission statement!';
			not_proj.matchingConfig = {};
		outputProjectInfo(not_proj);
	}

	function outputProjectInfo(proj) {
		//
		html+= '<div class="projects-list__row-projects"><div class="row row__projects-list--info-1">';

		html+= '<section class="col-xs-2 col-xs-push-0"><img class="project-thumbnail" src="' + project_pix[ pix_idx ] + '" alt="Project Image Here" title="Project Image Here"></img></section>';
		pix_idx++;
		html+= '<section class="col-xs-4 col-xs-push-0">';
		html+= '<a href="#" class="btn btn-large btn-primary mail-icon__centered" role="button" data-toggle="modal" data-target="#mailModal"> Contact Team </a>';
		html+= '</section>';
		html+= '<section class="col-xs-6 col-xs-push-0">';
		html+= '<span class="row text-center">' + 'Project Leader\'s Name' + '</span></section></div>';

		html+= '<div class="row row__projects-list--info-2">';
		html+= '<section class="col-xs-2 col-xs-push-0"></section>';

		html+= '<section class="col-xs-4 col-xs-push-0">';
		html+= '<span class="row text-center">' + proj.name + '</span></section>';

		html+= '<section class="col-xs-6 col-xs-push-0">';
		html+= '<span class="row">' + proj.description + ' This project needs a mission statement showing how the team will foster social progress.' + '</span></section></div>';

		var Configs = proj.matchingConfig;
		html+= '<div class="row row__projects-list--cfg">';  //Start next row for the same project - configs
		//
		// Print out the project needs/interest headings
		//
		html+= '<section class="section__matchGoal col-xs-4 col-xs-push-0">';
		html+= '<span class="text-center"><strong> ' + 'Seeking: ' + '</strong></span></section>';
		html+= '<section class="section__matchSkill col-xs-4 col-xs-push-0">';
		html+= '<span class="text-center"><strong> ' + 'Skills Needed: ' + '</strong></span></section>';
		html+= '<section class="section__matchInterest col-xs-4 col-xs-push-0">';
		html+= '<span class="text-center"><strong> ' + 'Our Areas of Focus: ' + '</strong></span></section>';
		html+= '</div>';
		//
		// Print out the goals / skills / interests
		//
		var Configs = proj.matchingConfig;
		html+= '<div class="row row__projects-list--cfg-2">';  //Start next row for the same project - configs
		var cfgClass = ['section__matchGoal', 'section__matchSkill', 'section__matchInterest'];
		for(i = 0; i < 3 ; i++ ) {
			html+= '<section class="' + cfgClass[i] + ' col-xs-4 col-xs-push-0">';
			Object.keys(Configs).forEach(key => {
				for(k = 0; k < proj.matchingConfig[key].length; k++ ) {
					html+= '<span class="capital">' + proj.matchingConfig[key][k] + ' ' + '</span>';
				}
			});
			html+= '</section>'; //close the section for this category of matching configs;
		}

		html+= '</div>'; //close project needs
		html+= '</div>'; //close projects-list__project-container div
		html+= '<div "class=row row--separator"><br /><br /><br /></div>';
		jQuery('#projects-list').append(html);


	}

	function showProjListHeadings() {

		html = '';
		html+= '<div class="row__projects-list-box">'; //contain entire project
		html += '<div class="row  row__projects-list--info">';
		html+= '<section  class="text-center col-xs-2 col-xs-push-0">';
		html+= '<span>Contact</span></section>';

		html+= '<section class="col-xs-3 col-xs-push-0">';
		html+= '<span class="text-center">Team Leader</span></section>';
		html+= '<section class="col-xs-3 col-xs-push-0">';
		html+= '<span class="text-center">Project Name</span></section>';

		html+= '<section class="col-xs-4 col-xs-push-0">';
		html+= '<span class="text-center">Project Mission Statement</span></section></div>';

		//jQuery('#projects-list').append(html);

		}

		//Handle email form submit event. For now,  we just clear any user-entered text from form and display a confirming message.
		//

function spitOutSkillIntGoalSelectors(matchresults) {
	$("#mailModal").on("shown.bs.modal", function(e) {
		$("button#sendMsg").click(function(e) {
			$('#confirm_sent').css("visibility", "visible" );
			$('textarea[name=message-to-team]').val('Go ahead and start a conversation about how you can help!');
			$('textarea[name=message-to-team]').prop('disabled', true); //set to readonly
		})
	});
	var html = '<div class="row match-cfg-heading">';
	//html+= '<section class="col-sm-2"></section>';
	html+= '<section class="section__matchGoal col-sm-3 col-xs-push-0"><h4 class="config">Goals</h3></section>';
	html+= '<section class="section__matchSkill col-sm-3 col-xs-push-0"><h4 class="config">Skills</h3></section>';
	html+= '<section class="section__matchInterest col-sm-3 col-xs-push-0"><h4 class="config">Interests</h3></section><section class="col-sm-3"></section><br />';
	html+= '</div>';

	html+= '<div class="row matchingConfigs-list">'

	//html+= '<section class="col-sm-2 col-xs-push-0"></section>';
	html+= '<section class="section__matchGoal col-sm-3 col-xs-push-0">';
		for (i = 0; i < matchresults.goals.length; i++ ) {
			html += '<span class="mitem">' + matchresults.goals[i] + '</span>';
		}
		html += '  </section>';
		html+= '<section class="section__matchSkill col-sm-3 col-xs-push-0">';
		for (i = 0; i < matchresults.skills.length; i++ ) {
			html += '<span class="mitem">' + matchresults.skills[i] + '</span>';
		}
		html += '  </section>';
		html+= '<section class="section__matchInterest col-sm-3 col-xs-push-0">';
		for (i = 0; i < matchresults.interests.length; i++ ) {
			html += '<span class="mitem">' + matchresults.interests[i] + '</span>';
		}
	html += '</section>';
	html+= '</div>';
	jQuery('#matchingConfigs-list').append(html);

	return matchresults;

}
