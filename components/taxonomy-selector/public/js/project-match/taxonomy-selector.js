

(function (PM) {

  ProjectMatch.TaxonomySelector = {};
  var self = ProjectMatch.TaxonomySelector;

  var Handlebars;


  self.generateMatchCb = undefined;

  /*
    
    useful data

  */

  self.taxonomies = [
    "skills",
    "learnSkills",
    "interests"
  ];
  self.selectedTaxonomy = undefined;
  self.selectedItemsData = {};
  /* NOTE: this is for rendering selected items
    EXAMPLE selectedItemsData:
    {
      skills: {
        itemsBySection: {
          
          sectionName1: {
            name: name,
            title: title,
            items: [
              {name: name}
            ]
          },

          sectionName2: {
            name: name,
            title: title,
            items: [
              {name: name}
            ]
          },

        }
      }

    }
  */
  
  self.taxonomies.forEach(function (taxonomyName) {
    self.selectedItemsData[taxonomyName] = {
      name: taxonomyName,
      itemsBySection: {}
    };
  });

  /*
    init

    loads click handlers
    loads taxonomy data into the UI
    

    attrs:
      generateMatchCb

  */


  self.init = function (attr) {

    // generate match function
    self.generateMatchCb = attr.generateMatchCb || function () {
      console.log('default generate match callback');
    }

    // wait until page loads
    jQuery(document).ready(function () {

      console.log('ProjectMatch.TaxonomySelector.init()');

      self.renderContainer(function (err, output) {
        console.log('called renderContainer ', output)

        // loop over taxonomies
        // then load the UI click handlers

        self.taxonomies.forEach(function (selectedTaxonomy) {

          //console.log('Load onClick for ' + 'taxonomy-selector-' + taxonomyName + '-container');
          jQuery('#taxonomy-selector-' + selectedTaxonomy + '-container').click(function() {
            
            var prevTaxonomy = self.selectedTaxonomy;


            // user has clicked twice on a taxonomy
            //    retract the previously selected taxonomy display

            if (prevTaxonomy == selectedTaxonomy) {
              console.log('Unselect ' + 'taxonomy-selector-' + selectedTaxonomy + '-container');
              self.selectedTaxonomy = undefined;

              // copy the content back to its scratchpad
              var prevHtml = jQuery('#taxonomy-selection-display').html();
              jQuery('#taxonomy-selection-' + prevTaxonomy + '-container').html(prevHtml);

              // clear out the display
              jQuery('#taxonomy-selection-display').html("");              

            // user has clicked on a new taxonomy
            //    display the selected taxonomy

            } else {
              console.log('Select ' + 'taxonomy-selector-' + selectedTaxonomy + '-container');
              self.selectedTaxonomy = selectedTaxonomy;

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

            }


          });
        })
        

        // load the selection containers

        ProjectMatch.TaxonomyModel.getSkills(function (taxonomy) {
          self.renderSelection(taxonomy, 'skills');
          self.renderSelection(taxonomy, 'learnSkills');
        });

        ProjectMatch.TaxonomyModel.getInterests(function (taxonomy) {
          self.renderSelection(taxonomy, 'interests');
        });

      }); // END get container

    });
    


  }


  /*
    render container

    renders the container for the taxonomy selector
    should be run early-on in the initialization
    
  */

  self.renderContainer = function (cb) {
    console.log('ProjectMatch.TaxonomySelector.renderContainer()');
    
    require(['taxseltemplate'],
      function(Template){

        //var template = Handlebars.compile(hbrTemplate);

        var context = {};
        var renderedHtml = Template(context);
        console.log(Template);
        jQuery('#taxonomy-selector-container').html(renderedHtml);
        cb(null,{
          template: Template,
          context: context,
          renderedHtml: renderedHtml
        });

    });

  }

  /*
    render taxonomy data

		function must be called with the taxonomy array
		requires a div with id=taxonomy-selection-container
    
  */

  self.renderSelection = function (taxonomy, taxonomyName) {
    console.log('ProjectMatch.TaxonomySelector.renderSelection taxonomy=' + taxonomyName);
    console.log(taxonomy);

    require(['handlebars', 'masonry'],
      function(Handlebars, Masonry){

        //console.log(taxonomy);
        var hbrTemplate = self.templates.selection;

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
        // ----------------------------------------------------
        var template = Handlebars.compile(hbrTemplate);

        var context = {
          taxonomy: taxonomy,
          taxonomyName: taxonomyName,
          itemsBySection: itemsBySection,
        };

        var renderedHtml = template(context);
        $('#taxonomy-selection-' + taxonomyName).html(renderedHtml);
        //console.log(renderedHtml);


        // masonry
        // ----------------------------------------------------
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
              //console.log( 'Masonry item ', item);
            });
            
          }
        );

        // init masonry layout
        msnry.layout();

      }
    ); // END require


  };

  /*
    select item
  
    Indicates that the user has made a selection from the taxonomy
    
  */

  self.selectItem = function (taxonomyName, parentItemName, itemName) {
    console.log('selectItem ' + taxonomyName + ': ' + parentItemName + '/' + itemName);
    //self.selectedItemsData[taxonomyName];


  /* example selectedItemsData
    {
      skills: {
        itemsBySection: {
          name: name,
          title: title,
          items: [
            {name: name}
          ]
        }
      }

    }
  */


    var data = self.selectedItemsData[taxonomyName];

    // new parent: create the parent section 
    if (!data['itemsBySection'][parentItemName]) {
      console.log('ADD section')
      data['itemsBySection'][parentItemName] = {
        name: parentItemName,
        items: []
      }
    }

    // new item
    if (data['itemsBySection'][parentItemName]['items'].indexOf(itemName)) {
      console.log('ADD item');
      data['itemsBySection'][parentItemName]['items'].push({
        'name': itemName
      });
    } else {

    }

    //console.log(data);


    self.renderSelected();

  } // END self.selectItem

  /*
    unselect item
  
    Indicates that the user has removed a selection from the taxonomy
    
  */

  self.unselectItem = function (taxonomyName, parentItemName, itemName) {
    console.log('unselectItem ' + taxonomyName + '/' + parentItemName + '/' + itemName);
    
    var data = self.selectedItemsData[taxonomyName];
    console.log(data);

    if (data['itemsBySection'][parentItemName]) {
      //var itemIndex = data['itemsBySection'][parentItemName]['items'].indexOf(itemName);
      var itemIndex = self.indexOfNamedItems(data['itemsBySection'][parentItemName]['items'], itemName);
      console.log('REMOVE item ' + itemIndex);

      delete data['itemsBySection'][parentItemName]['items'][itemIndex];
      console.log(data['itemsBySection']);
    }

    self.renderSelected();

  } // END self.unselectItem


  /* 
    index of named items
  */

  self.indexOfNamedItems = function (items, name) {
    for (i=0; i<items.length; i++) {
      console.log('index of named item ' + i +  ' ', items[i]);
      console.log(items[i].name + ' == ' + name + ' ', (items.name == name));
      if (items[i].name == name) return i;
    }
    return -1;
  },



  /*
    get selection

    returns a hash containing arrays of user-selected items from the taxonomies:
    skills, learnSkills, and interests

    {
      "skills":["client-dev/javascript","server-dev/nodejs"],
      "learnSkills":[],
      "interests":[],
    }

  */

  self.getSelection = function () {
    var selection = {};
    self.taxonomies.forEach(function (taxonomyName) { 
      
      // set up the taxonomy array
      selection[taxonomyName]=[]; 

      // taxonomy data (hierarchical)
      var data = self.selectedItemsData[taxonomyName];

      // sections
      for (var section in data.itemsBySection) {
        // items
        data.itemsBySection[section]['items'].forEach(function(itemData) {
          // push in the selected item
          selection[taxonomyName].push(section + '/' + itemData.name);
        });
      }


    });

    return selection;

  }



  /*
    render selected

    function must be called with a taxonomy array and a taxonomy name
    requires a div with id=taxonomy-selected-<TAXONOMY NAME>-container

  */

  self.renderSelected = function (selectedTaxonomy) {

    require(['handlebars'],
      function(Handlebars){

        var hbrTemplate = self.templates.selected;
        var template = Handlebars.compile(hbrTemplate);
        selectedTaxonomy = selectedTaxonomy || self.selectedTaxonomy;
        //console.log('renderSelected ' + selectedTaxonomy);

        var context = {
          taxonomyName: selectedTaxonomy,
          itemsBySection: self.selectedItemsData[selectedTaxonomy]['itemsBySection'],
        };

        //console.log(self.selectedItems);
        //console.log(context);

        var renderedHtml = template(context);
        //console.log(renderedHtml);
        $('#taxonomy-selected-' + selectedTaxonomy).html(renderedHtml);
      }
    ); // END require
  }


  /*
    generate match
  */

  self.generateMatch = function (attr) {
    console.log('ProjectMatch.TaxonomySelector.generateMatch()');
    self.generateMatchCb(attr);
  }


  /*
    handlebars templates
  */

  self.templates = {

    // for those taxonomy items that are selected
    selected: `<div id="taxonomy-selected">
      {{#each itemsBySection}}

          <div class="taxonomy-selected-parent">
            <strong>{{name}}</strong>

            {{#each items}}
              <div class="row">
                <div class="col-md-10 taxonomy-selected-item">&nbsp;{{name}}</div>
                <div>
                  <a class="col-md-2 nav-close pull-right" 
                    <a onClick="ProjectMatch.TaxonomySelector.unselectItem('{{../../taxonomyName}}', '{{../name}}','{{name}}');">&times;</a>
                </div>
              </div>
            {{/each}}

          </div>

      {{/each}}
    </div>`,

    // full selection of available items within a taxonomy
    selection: `<div id="taxonomy-selection" class="container">
      {{#each itemsBySection}}

          <div class="item">
            <p>
              <strong>{{title}}</strong>
            </p>

            {{#each items}}
              <p><a onClick="ProjectMatch.TaxonomySelector.selectItem('{{../../taxonomyName}}', '{{../name}}','{{name}}'); return undefined;">{{name}}</a></p>
            {{/each}}

          </div>

      {{/each}}
    </div>
  `
  };

}) (( window.ProjectMatch=window.ProjectMatch || {}));