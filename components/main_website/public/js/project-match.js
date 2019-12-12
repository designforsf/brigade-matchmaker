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

			api
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
		PM.skillsSelector = undefined;
		PM.interestsSelector = undefined;
		PM.learnSkillsSelector = undefined;


		/*
			init

			Main client initialization
			Should be called from HTML

			attrs:

				config
					api
						host
						port
						protocol

		*/

		PM.init = function (attr) {
			//console.log('ProjectMatch.init()');

			// set the config variable
			PM.config = attr.config;

			// API URL
			var baseUrl = attr.config.api.exposed_protocol + '://' + attr.config.api.host + ':' + attr.config.api.exposed_port;
                        console.log('API URL: ' + baseUrl);

			// initialize the minmaximizer
			ProjectMatch.MinMaximizer.init({ });
	    
			PM.skillsSelector = new SelectorView({
				'appContainer': PM,
				'id': 'skills-selector-view',
			  'component_name':'skills',
			  'display-title' : 'Skills to Contribute',
			  'tag-color':'#AA193A',
			  'url' : baseUrl + '/api/project/taxonomy/skills-for-ui',
			  'el' : '#selector-container1'
			});

			PM.interestsSelector = new SelectorView({
				'appContainer': PM,
				'id': 'interests-selector-view',
			  'component_name':'interests',
			  'display-title' : 'Civic Interests',
			  'tag-color':'#3DA1D2',
			  'url' : baseUrl + '/api/project/taxonomy/interests-for-ui',
			  'el' : '#selector-container2'
			});

			PM.learnSkillsSelector = new SelectorView({
				'appContainer': PM,
				'id': 'learnSkills-selector-view',
			  'component_name':'learnSkills',
			  'display-title' : 'Skills to Learn',
			  'tag-color':'#123D51',
			  'url' : baseUrl + '/api/project/taxonomy/skills-for-ui',
			  'el' : '#selector-container3'
			});

	    // project list component
	    PM.projectListView = new ProjectView({
				appContainer: PM,
	    	config: attr.config,
	    	skills:[], learnSkills:[], interests:[],
	    	initiateContactCb: PM.initiateContact
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

  				console.log(PM.skillsSelector.model.get('selectedItems'));

		  		// fire up the messaging form
		      PM.messagingView = new MessagingView({
						appContainer: PM,
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
    	console.log('ProjectMatch.generateMatch()');
    	
			var searchCriteria = {
			  skills: PM.skillsSelector.model.get('selectedItems'),
			  interests: PM.interestsSelector.model.get('selectedItems'),
			  learnSkills: PM.learnSkillsSelector.model.get('selectedItems')
			};

			// flatten interests
			for (i=0; i < searchCriteria.interests.length; i++) {
				var critElems = searchCriteria.interests[i].split('/');
				searchCriteria.interests[i] = critElems[1];
			}
			// in the selector, interests are given a root level for simplicity

    	// run the search
			PM.projectListView.searchProjects(searchCriteria);

    }; // END generateMatch

	}) (( window.ProjectMatch=window.ProjectMatch || {})); // END ProjectMatch closure


	// return the object to requirejs
	return window.ProjectMatch;

});
