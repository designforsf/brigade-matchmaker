import DS from 'ember-data';

/*
	
	This handles the convention for dasherizing the camel-cased field names

	SEE: https://guides.emberjs.com/release/models/customizing-serializers/

*/

export default DS.JSONSerializer.extend({
  attrs: {
  	thumbnailUrl: 'thumbnailUrl',
  	summary: 'summary',
  	contactName: 'contactName',
  	contactEmail: 'contactEmail',
  	contactRole: 'contactRole',
  	contactThumbnailUrl: 'contactThumbnailUrl',
  	tasks: 'tasks',
  	progress: 'progress',
  	repository: 'repository',
  	link: 'link' 
  }
});