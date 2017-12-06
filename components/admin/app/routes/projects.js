import Ember from 'ember';

export default Ember.Route.extend({
  model: function(args) {
    let projects = this.get('store').findAll('project'); 
    return projects;
  }
});
