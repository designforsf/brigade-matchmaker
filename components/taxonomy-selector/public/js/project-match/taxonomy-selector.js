(function (PM) {


	PM.TaxonomySelector = {};

  /*
    
    useful data

  */

  PM.TaxonomySelector.taxonomies = ["skills","learnSkills","interests"];
  PM.TaxonomySelector.selectedTaxonomy = undefined;


  /*
    init

    loads click handlers
    loads taxonomy data into the UI
    
  */


  ProjectMatch.TaxonomySelector.init = function (attr) {

    // wait until page loads
    jQuery(document).ready(function () {

      // load the UI click handlers
      PM.TaxonomySelector.taxonomies.forEach(function (selectedTaxonomy) {

        //console.log('Load onClick for ' + 'taxonomy-selector-' + displayName + '-container');
        jQuery('#taxonomy-selector-' + selectedTaxonomy + '-container').click(function() {
          console.log('Click ' + 'taxonomy-selector-' + selectedTaxonomy + '-container');
          
          var prevTaxonomy = PM.TaxonomySelector.selectedTaxonomy;
          PM.TaxonomySelector.selectedTaxonomy = selectedTaxonomy;

          /* 
            NOTE: issues with masonry required the use of scratchpads
          */

          // copy the content back to its scratchpad
          var prevHtml = jQuery('#taxonomy-selection-display').html();
          jQuery('#taxonomy-selection-' + prevTaxonomy + '-container').html(prevHtml);

          // cut/paste the content in from its scratchpad
          var selectedHtml = jQuery('#taxonomy-selection-' + selectedTaxonomy + '-container').html();
          jQuery('#taxonomy-selection-display').html(selectedHtml);
          jQuery('#taxonomy-selection-' + selectedTaxonomy + '-container').html('');

        });
      })
      

      // load the selection containers
      ProjectMatch.TaxonomyModel.getSkills(function (taxonomy) {
        ProjectMatch.TaxonomySelector.renderSelection(taxonomy, 'skills');
        ProjectMatch.TaxonomySelector.renderSelection(taxonomy, 'learnSkills');
      });

    });
    


  }

  /*
    render taxonomy data

		function must be called with the taxonomy array
		requires a div with id=taxonomy-selection-container
    
  */

  ProjectMatch.TaxonomySelector.renderSelection = function (taxonomy, displayName) {
    //console.log(taxonomy);

    // handlebars template for "taxonomy selection"
    var hbrTemplate = ProjectMatch.TaxonomySelector.templates.selection;

    // render the taxonomy into something more easily used by handlebars
    itemsBySection = {};
    var taxonomySet, currSection;
    taxonomy.forEach(function (item) {
      
      // the root item
      if (!item.parent) {
        taxonomySet = item.name
      } 

      // item section
      if (item.parent == taxonomySet && item.title) {
        //console.log('section ' + item.name + ' - ' + item.title);
        currSection = item.name;
        itemsBySection[item.name] = {
          name: item.name,
          title: item.title,
          parent: item.parent,
          items: []
        };
        //console.log(itemsBySection[item.name]);
      }

      // item (has parent, parent is current section)
      if (item.parent && item.parent == currSection) {
        //console.log('item parent=' + item.parent);
        //console.log(' > ' + item.name);
        itemsBySection[item.parent].items.push(item);
      }

    });

    // handlebars rendering
    var template = Handlebars.compile(hbrTemplate);

    var context = {
      taxonomy: taxonomy,
      
      itemsBySection: itemsBySection,
    };

    var renderedHtml = template(context);
    $('#taxonomy-selection-' + displayName).html(renderedHtml);
    //console.log(renderedHtml);

    // masonry
    // SEE: https://masonry.desandro.com

    // configure masonry obj
    var msnry = new Masonry( '#taxonomy-selection', {
      initLayout: false, // delays the layout so that events can be defined
      horizontalOrder: true,
      itemSelector: '.item'
    });

    // define masonry events
    msnry.on( 'layoutComplete',
      function( laidOutItems ) {
        laidOutItems.forEach(function (item) {
          console.log( 'Masonry item ', item);
        });
        
      }
    );

    // init masonry layout
    msnry.layout();


  };

  /*
    render selected

    function must be called with a taxonomy array and a taxonomy name
    requires a div with id=taxonomy-selected-<TAXONOMY NAME>-container

  */

  ProjectMatch.TaxonomySelector.renderSelected = function () {

  }

  /*
    handlebars templates
  */

  ProjectMatch.TaxonomySelector.templates = {
    selected: `<div id="taxonomy-selection" class="container">
      {{#each itemsBySection}}

          <div class="item">
            <strong>{{title}}</strong>

            {{#each items}}
              <p>{{name}}</p>
            {{/each}}

          </div>

      {{/each}}
    </div>`,
    selection: `<div id="taxonomy-selection" class="container">
      {{#each itemsBySection}}

          <div class="item">
            <strong>{{title}}</strong>

            {{#each items}}
              <p>{{name}}</p>
            {{/each}}

          </div>

      {{/each}}
    </div>
  `
  };


}) (( window.ProjectMatch=window.ProjectMatch || {}));