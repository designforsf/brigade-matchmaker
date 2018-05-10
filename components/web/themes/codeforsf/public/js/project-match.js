define([
	'jquery',
	'projlistview',
	'projlistmodel',
	'messagingview',
	'messagingtemplate',
	'minmax',
	'minmaxtemplate',
	'selector',
	'selectormodel'
	],
	function(
		jQuery,
		ProjectView,
		ProjectModel,
		MessagingView,
		MessagingTemplate,
		MinMaximizer,
		MinMaximizerTemplate,
		SelectorView,
		SelectorModel
		){

	// ProjectMatch closure
	(function (PM) {


		/*

		config variable

			web
				host
				port
				protocol

		*/

		PM.config = undefined;

		/*
			instances of backbone views
		*/

		PM.projectListView = undefined;
		PM.messagingView = undefined;

		// selectors (each has a backbone model)
		PM.skillsSel = undefined;
		PM.interestsSel = undefined;
		PM.learnSkillsSel = undefined;


		/*
			init

			Main client initialization
			Should be called from HTML

			attrs:

				config
					web
						host
						port
						protocol

		*/

		PM.init = function (attr) {
			console.log('ProjectMatch.init()');

			// set the config variable
			PM.config = attr.config;

			// initialize the minmaximizer
			ProjectMatch.MinMaximizer.init({ });

	    // project list component
	    PM.projectListView = new ProjectView({
	    	config: attr.config,
	    	skills:[], learnSkills:[], interests:[],
	    	initiateContactCb: PM.initiateContact
	    });

	    var baseUrl = attr.config.web.protocol + '://' + attr.config.web.host + ':' + attr.config.web.port;

			PM.skillsSelector = new SelectorView({
				'id': 'skills-selector-view',
			  'component_name':'Skills',
			  'display-title' : 'Skills to Contribute',
			  'tag-color':'#AA193A',
			  'url' : baseUrl + '/api/project/taxonomy/skills-for-ui'
			});

			PM.interestsSelector = new SelectorView({
				'id': 'interests-selector-view',
			  'component_name':'Interests',
			  'display-title' : 'Civic Interests',
			  'tag-color':'#3DA1D2',
			  'url' : baseUrl + '/api/project/taxonomy/interests-for-ui',
			  'el' : '#container2'
			});

			PM.learnSkillsSelector = new SelectorView({
				'id': 'learnSkills-selector-view',
			  'component_name':'Learnings',
			  'display-title' : 'Skills to Learn',
			  'tag-color':'#123D51',
			  'url' : baseUrl + '/api/project/taxonomy/skills-for-ui',
			  'el' : '#container3'
			});

  	} // END PM.init


  	/*
  		initiate contact

        event:
        project:
        recordNo:

        skills:
        learnSkills:
        interests:

		*/
  	PM.initiateContact = function (attr) {
  		console.log('initiate contact to projectID=' + attr.project.id + ' user clicked on item=' + attr.recordNo);


      // fire up the minmaximizer
  		ProjectMatch.MinMaximizer.displayModal({
  			event: attr.event,
  			title: '', // + attr.project.name
  			body: '<div id="messaging-container">&nbsp;</div>',
  			renderCb: function () {

  				console.log(PM.skillsSel.model.get('selectedItems'));

		  		// fire up the messaging form
		      PM.messagingView = new MessagingView({
		         config: PM.config,
		         skills: PM.skillsSelector.model.get('selectedItems'),
		         interests: PM.interestsSelector.model.get('selectedItems'),
		         learning: PM.learnSkillsSelector.model.get('selectedItems')
		      });

  			}
  		});




  	},


		// UI activate landing

	  PM.uiActivateLanding = function () {

	      // show top nav
	      //jQuery('#top-nav').hide();

	      // hide the landing page intro
	      jQuery('#landing-intro').slideDown({
	        duration: 350,
	        complete:function () {}
	      });

	  }; // END uiActivateLanding


	  // UI activate navigation

	  PM.uiActivateNavigation = function () {

	      // hide the landing page intro
	      jQuery('#landing-intro').slideUp({
	        duration: 350,
	        complete:function () {

	        	// show top nav
	      		//jQuery('#top-nav').show();

	        }
	      });

	  }; // END uiActivateNavigation


    // called when the user clicks on the generate match button
    PM.generateMatch = function () {
    	
    	// run the search
			PM.projectListView.searchProjects({
				skills: PM.skillsSelector.model.get('selectedItems'),
				interests: PM.interestsSelector.model.get('selectedItems'),
				learnSkills: PM.learnSkillsSelector.model.get('selectedItems')
			});

    }; // END generateMatch

	}) (( window.ProjectMatch=window.ProjectMatch || {})); // END ProjectMatch closure


	// return the object to requirejs
	return window.ProjectMatch;

});
