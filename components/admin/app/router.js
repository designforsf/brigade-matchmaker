import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('projects', function() {
    this.route('new');
    this.route('list');
    this.route('edit', { path: '/:id' });
  });
  this.route('login');
});

export default Router;
