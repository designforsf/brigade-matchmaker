var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * BrigadeProject Model
 * =============
 */

var BrigadeProject = new keystone.List('BrigadeProject', {
  label: 'Project',
  plural: 'Projects',
});

BrigadeProject.add({
	slug: { 
    type: Types.Key, 
    required: true, 
    initial: true, 
    max: 50 
  },
  name: { 
    type: String, 
    required: true, 
    initial: true, 
    max: 100
  },
	state: { 
    type: Types.Select, 
    options: 'draft, published, archived', 
    default: 'draft', 
    index: true,
  },
	author: { 
    type: Types.Relationship, 
    ref: 'Y', 
    index: true 
  },
	publishedDate: { 
    type: Types.Date, 
    index: true, 
    dependsOn: { state: 'published' } 
  },
  whyCare: { 
    type: Types.Textarea, 
    wysiwyg: true, 
    initial: true,
    max: 140,
    height: 25,
    label: 'Value proposition',
    note: 'Why should new members care about what your project is doing?'
  },
  commitmentLevel: { 
    type: Types.Textarea, 
    wysiwyg: true, 
    initial: true, 
    max: 140, 
    height: 25,
    label: 'Work pattern',
    note: 'What kind of commitment is expected?'
  },
  content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	//categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

BrigadeProject.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

//BrigadeProject.defaultColumns = 'slug, name, state|20%, author|20%, publishedDate|20%';

BrigadeProject.register();
