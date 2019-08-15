import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
  	console.log('route projects.list');
    let projects = this.get('store').findAll('project');
    return projects;
  }
});
