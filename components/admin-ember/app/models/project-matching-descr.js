import DS from 'ember-data';
import MF from 'ember-data-model-fragments';

export default MF.Fragment.extend({
  thumbnailUrl: DS.attr('string'),
  summary: DS.attr('string'),
  contactName: DS.attr('string'),
  contactEmail: DS.attr('string'),
  contactRole: DS.attr('string'),
  contactThumbnailUrl: DS.attr('string'),
  tasks: DS.attr('array'),
  progress: DS.attr('array'),
  repository: DS.attr('string'),
  link: DS.attr('string')  
});
