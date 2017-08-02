import Ember from 'ember';

export default Ember.Route.extend({
  model: function(args) {
    let project = this.get('store').findRecord('project', args.id); 
    return project;
  },
  renderTemplate: function() {
    this.render('projects/new')         
  }
});
