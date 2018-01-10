# Project Participation Taxonomies

Project participation is a complicated subject but it is at the core of how we can successfully connect members with projects. 

When matching new members to appropriate projects, we may first focus on understanding a user's skills, skills to learn, interests, and possible roles in a project. Then, knowing what projects have to offer new members, we can sort projects according to best match. To simplify all of this, we classify ways of participating using [taxonomies](https://en.wikipedia.org/wiki/Taxonomy_(general)).

The project participation taxonomies are simply groups of keywords that describe how a new member might fit into a project. 

* **Skills**
* **Learn Skills**
* **Interests**
* **Roles** (not currently used)

Each project is assigned keywords according to skills needed, skills that can be learned, and civic interests. In the UI of Project Match, these same keywords are selected by the new member before their search. 

# Taxonomy Data Structure

For certain taxonomies with many keywords (e.g. skills), keywords can be arranged into sections. Not all taxonomies are arranged in this way; interests for example do not need sections.

"Skills" keywords are organized into sections:

* Skills
  * Non-Technical Skills
    * Advocacy
    * Legal
    * Writing
  * Data Science
    * Python
    * R
  * Server Development
    * Python
    * Node.js
  * Client Development
    * iOS
    * HTML
    * CSS
    * Javascript
    	* EmberJS
    	* jQuery

"Interests" keywords do not need sections:

* Interests
  * Elections
  * Healthcare
  * Housing

These keywords, their sections, keyword synonyms, and other data are all stored in the database as JSON data. The UI and match algorithm can retrieve this data via API calls and make extensive use of it.

## Tree Structure with Parent References

The project participation taxonomies are stored in the database as tree structures with parent references. This allows a particular taxonomy to be organized into a hierarchy.

This [example of tree with parent references](https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-parent-references/) shows how such a hierarchy may be formed.

Both the underlying database and [JSON API](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/json-api.md) use a similar array of objects to represent the taxonomy in a hierarchy. However, more data is present in each object. An object may represent a section, or it may represent a keyword item.

In each object, the parent is identified by the name field. Also, if there is an object without a parent, this is the root record.

```
[

	{name:"skills", synonyms:[], 
		title:"Skills"},

	{name":"non-technical", synonyms:["general"], parent:"skills", 
		title:"Non-Technical Skills"},

	{name:"advocacy", synonyms:["organizing"], parent:"non-technical",
		title: "Advocacy"}

	{name:"legal",synonyms:["law"], parent:"non-technical",
		title: "Legal"}

	{name:"writing",synonyms:["copy"], parent:"non-technical",
		title: "Writing"}

]
```


## Tree Structure for UI Rendering

The taxonomy is stored in the database as a tree structure with parent references. However, this can be difficult to work with in the UI. Therefore there is an API for retrieving the same taxonomy data as a tree structure for UI rendering.

This format formats the taxonomy into "sections" and "items".


```
{
  skills: {
    itemsBySection: {
      
      "non-technical": {
        name: "non-technical", //redundant
        title: "Non-Technical Skills",
        items: [
          {name: "advocacy", title: "Advocacy"},
          {name: "legal", title: "Legal"},
          {name: "writing", title: "Writing"}
        ]
      },

      "server-dev": {
        name: "server-dev", // redundant
        title: "Server Development",
        items: [
          {name: "nodejs", title: "Node.js"},
          {name: "python", title: "Python"}
        ]
      },

      "client-dev": {
        name: "client-dev", // redundant
        title: "Client Development",
        items: [
          {name: "jquery", title: "JQuery"},
          {name: "emberjs", title: "EmberJS"},
          {name: "bootstrap", title: "Bootstrap"}
        ]
      },
	  
    }
  }

};
 ```
