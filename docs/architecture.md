
# Project Match: Architectural Overview

Project Match is a system consisting of the following components:

* **Data Structures** - MongoDB, Mongoose, project participation taxonomy
* **Web App** and **REST API** -  Node.js, Express, Pug
* **Matching Algorithm** - python
* **UI Components** - RequireJS, Handlebars, jQuery, Backbone, Bootstrap
* **Messaging Service** - Node.js, Express, Slack API
* **Admin / Project CMS** - EmberJS, Bootstrap, Django
* **Test Scripts** - bash and wget

## Data Structures

### MongoDB Database

[MongoDB](https://www.mongodb.com/) is used as the back-end database for all of the other components of the Project Match system.

### Data Models

Defines users, projects, and project taxonomy. Data in MongoDB is queried and updated in the webapp using [Mongoose](http://mongoosejs.com/).

### Taxonomy

The project volunteering taxonomy provides sets of useful keywords which users select in order to be matched with projects.

**Skills** - 2-level hierarchy, example: "server-dev/mongodb"
**Learn Skills** - 2-level hierarchy, example: "client-dev/javascript"
**Interests** - 1-level hierarchy, example: "housing"

[Taxonomy documentation](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/taxonomy.md).

## Web App and REST API

The webapp generates the web interface for users, controls how data is updated, and accesses the matchmaking function.

All UIs make use of the REST API, which follows the [JSON API format](http://jsonapi.org/format/).

To learn more, please take a look at the [REST API documentation](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/json-api.md).

### Key dependencies

* [Express](http://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [Jade/Pug](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)
* [Bootstrap](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)
* [jQuery](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)
* [RequireJS](http://www.requirejs.org/)

### Origins of the Web App

The Project Match new member front-end is based on the alpha version of [BrigadeHub](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11) (before many improvements were made).

As it is only a technical demonstration, Project Match does not track changes to BrigadeHub.

---

## Matching Algorithm

Currently the matching function is written in python. It accepts input representing a user's preferences for skills, opportunities to learn, and interests. The algorithm outputs a sorted list of projects.

The New Member Front-End directly interacts with the algorithm, providing a JSON web API.

---

## UI Components

### Project List UI

Project List interacts with the JSON API to display a sorted list of projects. It is combined with Taxonomy Selector UI.

This UI component uses RequireJS, Handlebars, jQuery, Backbone, and Bootstrap.

### Taxonomy Selector UI

Taxonomy Selector interacts with the JSON API to enable new members to select their volunteering preferences for skills to offer, skills to learn, and interests. It is combined with Project List.

This UI component uses RequireJS, Handlebars, jQuery, and Bootstrap.

### Notifications UI

Notifications is used throughout the Web App

---

## Messaging Service

The Front-End sends messages from new members to project leads via an API hosted by the Messaging Service. This component is Node.js and securely interacts with the Slack API.

---

## Admin / Project CMS

This component uses Django to update project-related data, including the skills needed, learning opportunities, and civic interests. This component is rendered by EmberJS and interacts with the JSON API.

---

## Test Scripts

These are rudimentary bash scripts which use wget in order to perform basic tasks step-by-step.

---
