define(['jquery', 'projlistview','projlistmodel','taxsel', 'taxselmodel'],
	function(jQuery, ProjectView, ProjectModel, TaxonomySelector, TaxonomyModel){

	// ProjectMatch closure
	(function (PM) {

		/* 
			init

			Main client initialization
			Should be called from HTML
			
		*/

		PM.init = function (attr) {
			console.log('ProjectMatch.init()');

	    // project list component
	    projView = new ProjectView({ skills:[], learnSkills:[], interests:[] });

	    // init the taxonomy selector component
	    var taxonomySel = ProjectMatch.TaxonomySelector;
	    taxonomySel.init({

	    	// config (from the configuration set in the web app)
	    	config: attr.config,


	      // callback when the user clicks on the generate match button
	      generateMatchCb: function () {

	        // retracts the selector so the user can focus on the results
	        taxonomySel.closeSelector();

	        // search with the current user's taxonomy selection
	        projView.searchProjects(taxonomySel.getSelection());
	      }
	    });

  	} // END init


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

	}) (( window.ProjectMatch=window.ProjectMatch || {})); // END ProjectMatch closure


	// return the object to requirejs
	return window.ProjectMatch;

});