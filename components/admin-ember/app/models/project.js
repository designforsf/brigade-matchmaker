import DS from 'ember-data';
import {
  fragment
//, fragmentArray
//, array
} from 'ember-data-model-fragments/attributes';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  matchingDescr: fragment('project-matching-descr')
});
