import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveProject() {
      //alert(this.get("project.name"));
      //alert(this.get("project.id"));
      var ember = this;
      ember.get('store').findRecord('project', ember.get("project.id")).then(function(project) {
        project.set('name', ember.get("project.name"));
        project.save().then(function() {
          Ember.getOwner(ember).lookup('router:main').transitionTo('projects.edit');
        });
      });
      
    }
  },
});
