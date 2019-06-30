import DS from 'ember-data';

/*
	
	This handles the convention for dasherizing the camel-cased field names

	SEE: https://guides.emberjs.com/release/models/customizing-serializers/

*/

export default DS.JSONAPISerializer.extend({
  attrs: {
    matchingDescr: 'matchingDescr'
  }
});