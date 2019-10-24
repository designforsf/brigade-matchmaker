# Project Match: JSON API Documentation

All interaction with the database, including CRUD operations on projects, can be accessed from a REST API endpoint. Most REST APIs are served by the web app component, however all message-related REST endpoints will be served by the messaging component.

Project Match APIs are targeting the [JSON API v1.0 specification](http://jsonapi.org/format/).

The most important REST endpoints in Project Match are:

* [GET /api/user/matches](#get-apiusermatches) - returns a sorted list of projects based on user preferences for skills, learn skills, interests.
* [GET /api/projects](#get-apiprojects) - returns the default list of projects, contains each project's configuration for skills, learn skills, interests.
* [All project-related APIs](#web-app-api-project) - used to update project configurations.
* [All taxonomy-related APIs](#web-app-api-project-taxonomy) - returns project volunteering taxonomies. Certain taxonomies may be organized in a 2-level hierarchy with categories as parents and tags as children.

## Web App API: User Match

### GET /api/user/matches

Returns a sorted list of projects based on user preferences for skills, learn skills, interests.

In the case of "skills" and "learnSkills", the keywords reflect a hierarchy under "sections". For example, "client-dev" may include "javascript", "css", and "html". These would be represented in the API call using: "client-dev/javascript", "client-dev/css", and "client-dev/html".

Example API usage:

```
wget -qO- http://localhost:5455/api/user/matches?skills=client-dev/javascript,data-sci/python&learnSkills=client-dev/css&interests=housing
```

 
## Web App API: User Session

Note: these endpoints are implemented but not currently used by the application.

### POST /api/user/create_and_login

### POST /api/user/login

### POST /api/user/logoff

### GET /api/user/session

### POST /api/user/match_config


## Web App API: Project

### GET /api/projects

Returns the default list of projects, contains each project's attributes, including configuration for skills, learn skills, interests.

Example API usage:

```
wget -qO- http://localhost:5455/api/projects
```


### POST /api/project

### GET /api/projects/:id

### PATCH /api/projects/:id

Currently maps to "POST /api/projects/:id". In the future, the endpoint will be modified to allow for parts of the project to be updated.

### POST /api/projects/:id

Updates a project record. According to the [JSON API spec for "resource objects"](http://jsonapi.org/format/#document-resource-objects), the project would be updated using the JSON within "attributes".

```
{
	"data": {
		"type": "projects",
		"id": "550e8400-e29b-41d4-a716-446655440000",
		"attributes": {
			// the project data ///
			"name": "SF Housing Project",
 			"matchingConfig": { 
				"skillsOffered": [ "server-dev/mongodb" ],
			  "skillsNeeded": [ "server-dev/nodejs" ],
			  "interests": [ "housing" ] 
			},
			/// NOTE: many other project attributes ///
		}
	}
}
```


## Web App API: Project Taxonomy

### GET /api/project/taxonomy/skills

Returns keywords data under the parent of "skills". This taxonomy has a hierarchy of two levels in which skills are organized by category.

```
wget -qO- http://localhost:5455/api/project/taxonomy/skills
```

### GET /api/project/taxonomy/interests

Returns keywords data under the parent of "interests".

```
wget -qO- http://localhost:5455/api/project/taxonomy/interests
```

### GET /api/project/taxonomy/goals

Returns keywords data under the parent of "goals".

```
wget -qO- http://localhost:5455/api/project/taxonomy/goals
```
## Admin API

### GET /api/project/taxonomies-for-ui

Returns all keywords data, as a [Tree Structure for UI Rendering](https://github.com/designforsf/brigade-matchmaker/blob/master/docs/v1/taxonomy.md#tree-structure-for-ui-rendering).

```
wget -qO- http://localhost:5455/api/project/taxonomies-for-ui
```

The admin component utilizes the Django REST framework so any modifications made using the admin component will update the API. The following request methods and resources are available:

### GET /api/projectleads
### GET /api/projectleads/:id
### POST /api/projectleads/:id
### GET /api/projects
### GET /api/projects/:id
### POST /api/projects/:id
### GET /api/skillstaxonomy
### GET /api/skillstaxonomy/:id
### POST /api/skillstaxonomy/:id
### GET /api/intereststaxonomy
### GET /api/intereststaxonomy/:id
### POST /api/intereststaxonomy/:id
### GET /api/goalstaxonomy
### GET /api/goalstaxonomy/:id
### POST /api/goalstaxonomy/:id

API resources in the admin component have owner attributes. Only a logged in owner or the superadmin have the rights to modify any API resources.

## Messaging API

Currently under development...

