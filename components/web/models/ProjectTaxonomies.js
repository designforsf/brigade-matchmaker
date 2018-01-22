/* jshint esversion: 6 */

var mongoose = require('mongoose');

class T {
  constructor(i_title) {
    this._synonyms = [];
    this._title = i_title;
  }

  get name() {
    return T._toKey(this._title);
  }

  get synonyms() {
    return this._synonyms;
  }

  get title() {
    return this._title;
  }

  /*
  synonyms(i_synonyms) {
    this._synonyms = i_synonyms;
  }
  */

  serializeArray(i_parent, i_top) {
    return [this.serializeThis(i_parent, i_top)];
  }

  serializeThis(i_parent, i_top) {
    return {
      name: this.name,
      synonyms: this.synonyms,
      parent: i_top.name,
      title: this.title,
      className: i_parent.className,
    };
  }

  static _toKey(i_string) {
    return i_string
      .replace(/\ /g, '-')
      .replace(/\\/g, '_')
      .replace(/\'/g, '')
      .replace(/\&/g, 'and')
      .toLowerCase();
  }
  
  static toplevel(i_title, i_children) {
    return new TTop(i_title, i_children);
  }

  static category(i_title, i_children) {
    return new TCategory(i_title, i_children);
  }

  static item(i_title) { 
    return new TItem(i_title);
  }
}

class TItem extends T {
  constructor(i_title) {
    super(i_title);
  }
}

class TCategory extends T {
  constructor(i_title, i_children) {
    super(i_title);
    this._children = i_children;
  }

  get className() {
    return this.name;
  }

  serializeArray(i_parent, i_top) {
    var out = [
      this.serializeThis(i_parent, i_top)
    ];

    var currentParent = this;
    this._children.forEach(function(child) {
      out = out.concat(child.serializeArray(currentParent, i_top));
    });

    return out;
  }
}

class TTop extends TCategory {
  constructor(i_title, i_children) {
    super(i_title);
    this._children = i_children;
  }

  get className() {
    return this.title.split(" ").pop();
  }

  serializeAll() {
    var out = [
      this.serializeThis()
    ];

    var currentParent = this;
    this._children.forEach(function(child) {
      out = out.concat(child.serializeArray(currentParent, currentParent));
    });

    return out;
  }

  serializeThis() {
    return {
        name: this.name,
        synonyms: this.synonyms,
        parent: undefined,
        title: this.title,
        className: this.className,
    };
  }
}

const TAXONOMIES = {
  skills: T.toplevel('Skills', [
    T.category('Frontend Development', [
      T.item('CSS'),
      T.item('D3'),
      T.item('Data Visualization'),
      T.item('HTML'),
      T.item('Jade'),
      T.item('JavaScript'),
      T.item('Other Tools And Technologies'),
      T.item('Rails'),
      T.item('React'),
    ]),
    T.category('Backend Development', [
      T.item('API Design'),
      T.item('Express'),
      T.item('Flask'),
      T.item('Go'),
      T.item('Java'),
      T.item('MongoDB'),
      T.item('Node'),
      T.item('Other Tools And Technologies '),
      T.item('PHP'),
      T.item('Parse'),
      T.item('Python'),
      T.item('Rails'),
      T.item('Ruby'),
      T.item('SQL'),
      T.item('XML'),
      T.item('Algorithm Design'),
      T.item('Databases'),
    ]),
    T.category('Full Stack', [
      T.item('Distributed Systems'),
    ]),
    T.category('QA', [
      T.item('Automated Testing'),
      T.item('Manual Testing'),
    ]),
    T.category('DevOps', [
      T.item('Amazon Web Services'),
      T.item('Azure'),
      T.item('Cloud Services'),
      T.item('Google Cloud Services'),
    ]),
    T.category('Mobile Development', [
      T.item('Android'),
      T.item('Objective-C'),
      T.item('Swift'),
      T.item('IOS'),
    ]),
    T.category('UI/UX Design', [
      T.item('Prototyping'),
      T.item('Visual Design'),
      T.item('Wireframes'),
    ]),
    T.category('User Research', [
      T.item('User Interviewing'),
      T.item('User Research'),
      T.item('User Testing'),
    ]),
    T.category('Marketing', [
      T.item('Content Development'),
      T.item('Copy Writing'),
      T.item('Communications'),
      T.item('Community Engagement'),
    ]),
    T.category('Data Science', [
      T.item('Machine Learning'),
      T.item('Other Tools And Technologies'),
      T.item('Python'),
      T.item('R'),
      T.item('Big Data'),
      T.item('Data Analysis'),
      T.item('Data Management'),
      T.item('Data Modeling'),
      T.item('Predictive Modeling'),
      T.item('Tableau'),
    ]),
    T.category('General', [
      T.item('Health'),
      T.item('Legal Knowledge'),
      T.item('Lobbying'),
      T.item('Government Budgeting And Operations'),
      T.item('Public Speaking'),
      T.item('Urban Planner'),
      T.item('Proficiency In A Language Other Than English'),
      T.item('Public Health'),
      T.item('Compliance'),
    ]),
    T.category('Product Management', [
      T.item('Requirements Gathering'),
      T.item('Scheduling And Planning'),
      T.item('Product Structure/Strategy'),
      T.item('Testing'),
    ]),
    T.category('Operations / Project Management', [
      T.item('Requirements Gathering'),
      T.item('Documentation'),
      T.item('Scheduling And Planning'),
    ]),
  ]),
  interests: T.toplevel('Civic Interests', [
    T.item('Arts And Culture'),
    T.category('Business, Finance & Economics', [
      T.item('Risk Assessments'),
      T.item('Economic Development'),
      T.item('Debt'),
      T.item('Stock Market'),
      T.item('Small Business Resources'),
    ]),
    T.item('Children And Youth'),
    T.category('Community Issues', [
      T.item('Homelessness'),
      T.item('Poverty'),
      T.item('Civic Rights'),
      T.item('Civic Engagement'),
    ]),
    T.category('Education', [
      T.item('K-12'),
      T.item('Extracurricular Programs'),
      T.item('College'),
      T.item('Continuing Education'),
    ]),
    T.category('Environment', [
      T.item('Natural Resources'),
      T.item('Climate Change'),
      T.item('Energy'),
      T.item('Sustainability'),
      T.item('Waste Management'),
      T.item('Parks And Preservation'),
    ]),
    T.category('Employment', [
      T.item('Unemployment'),
      T.item('Continuing Education'),
    ]),
    T.category('Human Rights', [
      T.item('Women\'s Rights'),
      T.item('Human Rights'),
      T.item('Veterans\' Rights'),
      T.item('LGBT Rights'),
      T.item('Racism & Discrimination'),
      T.item('Immigration & Refugees'),
      T.item('Civic Rights'),
      T.item('Workers\' Rights'),
      T.item('Legal Rights'),
      T.item('Income Inequality'),
      T.item('Labor Unions'),
    ]),
    T.category('Health & Healthcare', [
      T.item('Nutrition & Food'),
      T.item('Mental Health'),
      T.item('Health Care System'),
      T.item('Public Health'),
      T.item('Fitness'),
      T.item('Obesity'),
    ]),
    T.category('Housing & Urban Development', [
      T.item('Housing'),
      T.item('Gentrification'),
      T.item('Infrastructure'),
      T.item('Affordability'),
      T.item('Homelessness'),
    ]),
    T.item('International'),
    T.category('Justice & Law', [
      T.item('Criminal Justice'),
      T.item('Police'),
      T.item('Legal Rights'),
      T.item('Drug Regulation'),
    ]),
    T.category('Municipal Services', [
      T.item('Sanitation'),
      T.item('Social Services'),
      T.item('Waste Management'),
      T.item('Public Spaces'),
    ]),
    T.category('Politics', [
      T.item('Government Policy'),
      T.item('Government Operations'),
      T.item('Transparency And Corruption'),
      T.item('Crime Policy'),
      T.item('Drug Regulation'),
      T.item('Elections / Voting'),
      T.item('Budget Process'),
    ]),
    T.category('Transportation', [
      T.item('Public Transit'),
      T.item('Traffic'),
      T.item('Bicycling'),
      T.item('Parking'),
      T.item('Ride Shares'),
    ]),
  ]),
};

var ptSchema = new mongoose.Schema({
  name: {type: String, default: ''},
  title: {type: String, default: ''},
  parent: {type: String, default: ''},
  className: {type: String, default: ''},
  synonyms: {type: Array, default: []}
});


/*
  top-level taxonomies
*/
ptSchema.methods.getTaxonomies = function (cb) {
  var taxonomies = Array.from(Object.keys(TAXONOMIES).map(t => TAXONOMIES[t].serializeThis()));
  return cb(null, taxonomies);
};


/*
  skills taxonomy
*/
ptSchema.methods.getSkills = function (cb) {
  var skillz = TAXONOMIES.skills.serializeAll();
  return cb(null, skillz);
};


/*
  skills taxonomy
*/

ptSchema.methods.getInterests = function (cb) {
  var interestz = TAXONOMIES.interests.serializeAll();
  return cb(null, interestz);
};

module.exports = mongoose.model('ProjectTaxonomies', ptSchema);
