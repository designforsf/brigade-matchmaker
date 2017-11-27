/* jshint esversion: 6 */

var mongoose = require('mongoose');

class T {
  constructor(i_title) {
    this._synonyms = [];
    this._title = i_title;
  }
  get name() {
    T._toKey(self._title);
  }

  get title() {
    return self._title;
  }
  /*
  get synonyms() {
    return this._synonyms;
  }

  synonyms(i_synonyms) {
    this._synonyms = i_synonyms;
  }
  */

  static _toKey(i_string) {
    return i_string.replace(' ', '-').replace('\\', '_').replace('\'', '').replace('&', 'and');
  }
  
  static toplevel(i_title) {
    return new TTop(i_title);
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

  serialize(i_parent) {
    return {
      name: this.name,
      synonyms: this.synonyms,
      parent: i_parent.topmost(),
      title: this.title,
      className: i_parent.className,
    };
  }
}

class TCategory extends T {
  constructor(i_title, i_children) {
    super(i_title);
    this._children = i_children;
  }

  get className() {
    return this.name();
  }

  serialize(i_parent) {
    for (var child in this._children) {
      out.concat(child.serialize(this));
    }
  }

  topmost() {
    var current = this;
    while(current != nullptr) {
      if(current instanceof T.toplevel) {
        break;
      }
    }

    return current;
  }
}

class TTop extends TCategory {
  get className() {
    this.title().split().pop();
  }

  serializeAll() {
    var out = [
      this.serializeThis()
    ];

    for (var child in this._children) {
      out.concat(child.serialize(this));
    }
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
  roles: T.toplevel('Roles', [
    T.category('Software Engineer', [
      T.item('Frontend'),
      T.item('Backend'),
      T.item('Full-stack'),
      T.item('QA'),
      T.item('DevOps'),
      T.item('Mobile'),
    ]),
    T.category('Design', [
      T.item('UI/UX Designer'),
      T.item('User Researcher'),
      T.item('Visual Designer'),
    ]),
    T.item('Data Science'),
    T.item('Operations'),
    T.item('Marketing'),
    T.item('Product Management'),
    T.item('Project Management'),
    T.category('General', [
      T.item('Government Employee'),
      T.item('Attorney / Legal Knowledge'),
      T.item('Partnerships'),
      T.item('Urban Planner'),
    ]),
  ]),
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
  return cb(null, TAXONOMIES.map(t => t.serializeThis()));
};


/*
  skills taxonomy
*/

ptSchema.methods.getSkills = function (cb) {
  return cb(null, TAXONOMIES.skills.serializeAll());
};


/*
  skills taxonomy
*/

ptSchema.methods.getInterests = function (cb) {
  return cb(null, TAXONOMIES.interests.serializeAll());
};


/*
  skills taxonomy
*/

ptSchema.methods.getGoals = function (cb) {
  return cb(null, TAXONOMIES.goals.serializeAll());
};

module.exports = mongoose.model('ProjectTaxonomies', ptSchema);
