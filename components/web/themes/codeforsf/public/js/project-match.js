define(['jquery', 'projlistview','projlistmodel','selector', 'selectormodel'],
	function(jQuery, ProjectView, ProjectModel, SelectorView, SelectorModel){

	// ProjectMatch closure
	(function (PM) {

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

	    // project list component
	    projView = new ProjectView({ 
	    	config: attr.config,
	    	skills:[], learnSkills:[], interests:[],
	    	initiateContactCb: PM.initiateContact
	    });

	    var baseUrl = attr.config.web.protocol + '://' + attr.config.web.host + ':' + attr.config.web.port;
	    
			var skillsSel = new SelectorView({
			  'component_name':'Skills',
			  'display-title' : 'Skills to Contribute',
			  'tag-color':'#AA193A',
			  'url' : baseUrl + '/api/project/taxonomy/skills-for-ui'
			});

			var interestsSel = new SelectorView({
			  'component_name':'Interests',
			  'display-title' : 'Civic Interests',
			  'tag-color':'#3DA1D2',
			  'url' : baseUrl + '/api/project/taxonomy/interests',
			  'el' : '#container2'
			});

			var learnSkillsSel = new SelectorView({
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

		*/
  	PM.initiateContact = function (attr) {
  		console.log('initiate contact to projectID=' + attr.project.id + ' user clicked on item=' + attr.recordNo);
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

    	console.log('ProjectMatch.generateMatch');
			var selectorUI = ProjectMatch.SelectorUI;

    	// UI: matching started
    	selectorUI.indicateMatchingStarted();

      // search with the current user's taxonomy selection
      projView.searchProjects(selectorUI.getSelection());

      // UI: matching finished
      setTimeout(function () {
      	selectorUI.indicateMatchingFinished();
      }, 1000);
      
    }; // END generateMatch

	}) (( window.ProjectMatch=window.ProjectMatch || {})); // END ProjectMatch closure


	// return the object to requirejs
	return window.ProjectMatch;

});