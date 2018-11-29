# "Project Match"

A prototype service that matches newly arriving members to the appropriate civic projects.

# Status

This software is actively under development. It is not yet ready for release.

# Concept

The Project Match web application is intended for new members first arriving at a [Code For America "brigade"](http://brigade.codeforamerica.org/brigade/), a collecting point for local civic projects. 

The app connects new members with those civic projects which are likely to appeal to the skills they have to offer, the skills they want to learn, and their interests.

# Background

**The notion of matching users to projects emerged from an effort to improve the experience of new members at Code For SF.**

This service is the result of extensive [UX research conducted at Code For San Francisco](http://old.codeforsanfrancisco.org/research-group/projects/NewMemberEngagement/). This research included interviews with new members and project leaders, structured brainstorming, and wireframe prototyping. 

User experience research at Code4SF is run by members of the [UX Research Group](https://github.com/sfbrigade/research-group).

# Start Developing

**Attention new developers on the project!** - get started by installing the Notifications UI component, join our Slack channel, and learn about the development process.

Currently we are working on "Phase I: MVP". This includes a basic matching service for new members, and the ability for project leads to administer the system.

See [docs/start-developing.md](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/start-developing.md) for installation details.

To interact with the team, please join #research on [http://c4a.me/cfsfslack](http://c4a.me/cfsfslack).

# Advanced Installation

To run the service, or to develop all aspects of Project Match, you must first install the Web App and dependencies, including the database.

See [docs/installation.md](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/installation.md) for the full instructions.

# Project Management and Road Map

Project Match design and development will be released in phases, following a [Road Map to MVP](https://docs.google.com/document/d/10gnvrPufouX0NxOuWwiX3hubh3asUPxTl-aMxj450tk/edit). 

Development tasks are listed out within [milestones in GitHub](https://github.com/designforsf/brigade-matchmaker/milestones?direction=asc&sort=due_date&state=open).

# Architecture

Project Match organizes its functionality into components, each of which may combine Node.js, client-side javascript, and python.

See [docs/architecture.md](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/architecture.md) for details.

# JSON API Documentation

All interaction with the database, including CRUD operations on projects, can be accessed from a REST API endpoint. 

See [docs/json-api.md](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/json-api.md) for details.






