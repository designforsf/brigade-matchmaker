import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    let projects = this.get('store').findAll('project');
    return projects;
  }
});
