import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  
  init() {
    this._super(...arguments);
    this.errors = [];
    Ember.Logger.log('init project-edit');
  },
  
  actions: {
      
    queryParams: ['updated'],
    updated: false,
    
    saveProject() {
      //alert(this.get("project.name"));
      //alert(this.get("project.id"));
      var ember = this;
      ember.get('store').findRecord('project', ember.get('project.id')).then(function(project) {
        
        // project fields
        project.set('name', ember.get('project.name'));
        
        // matching descr fragment
        //alert('set fragment ' + ember.get('project.matching-descr.summary'));
        project.set('matching-descr', {
          summary: ember.get('project.matching-descr.summary')
        });
        
        project.save().then(function() {
          
          /*
          Ember.getOwner(ember).lookup('router:main').transitionTo(
            'projects.edit',
            {queryParams: {update: true}}
          );
          */
          
          Ember.getOwner(ember).lookup('router:main').transitionTo(
            '/projects/' + project.id + '?update=true'
          );
        });
      });
      
    }
  },
});
