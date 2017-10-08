(function (projectMatch) {


	projectMatch.TaxonomySelector = {};

  /*
    render taxonomy data

		function must be called with the taxonomy array
		requires a div with id=taxonomy-selector-container

  */

  ProjectMatch.TaxonomySelector.render = function (taxonomy) {
    //console.log(taxonomy);

    // handlebars template
    var hbrTemplate = ProjectMatch.TaxonomySelector.template;

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
    $('#taxonomy-selector-container').html(renderedHtml);
    //console.log(renderedHtml);

    // masonry
    // SEE: https://masonry.desandro.com

    // configure masonry obj
    var msnry = new Masonry( '#taxonomy-selector', {
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
    handlebars template
  */

  ProjectMatch.TaxonomySelector.template = `
    <div id="taxonomy-selector" class="container">
      {{#each itemsBySection}}

          <div class="item">
            <strong>{{title}}</strong>

            {{#each items}}
              <p>{{name}}</p>
            {{/each}}

          </div>

      {{/each}}
    </div>
  `;


}) (( window.ProjectMatch=window.ProjectMatch || {}));