import Ember from 'ember';

export default Ember.Route.extend({
  model: function() { 
  	console.log('route projects.new');

		let project = this.store.createRecord('project', {});
		
		return project;

  }
});
