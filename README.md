# "Project Match"

A prototype service that matches newly arriving members to the appropriate civic projects.

# Status

This software is a technical prototype and is actively under development. It is not yet ready for release.

---

# Background

**The notion of matching users to projects emerged from an effort to improve the experience of new members at Code For SF.**

The Project Match concept is the result of ongoing user experience research conducted at [Code For San Francisco](http://codeforsanfrancisco.org). This research included interviews with new members and project leaders, structured brainstorming, and wireframe prototyping. 

User experience research at Code4SF is run by members of the [UX Research Group](https://github.com/sfbrigade/research-group).

# Concept

The Project Match web application is intended for new members first arriving at a [Code For America "brigade"](http://brigade.codeforamerica.org/brigade/), a collecting point for local civic projects. The app connects new members with those civic projects which are likely to appeal to their skills, interests, and needs.

## Application Flow

### Project data

Local civic projects are asked to maintain data about their volunteer needs in terms of skills needed, learning offered, and goals. Other information is also tracked about projects to form a profile, including what interest category they belong to.

### Project match form

When a new member arrives, he/she is asked to open a URL and begins the matching process. The new member is asked to select from three sets of keywords:

* **Civic interests:**  elections, homelessness, housing, infrastructure, etc.
* **Skills needed:** javascript, civic organizing, machine learning, legal, etc.
* **Learning opportunities:** javascript, civic organizing, machine learning, legal, etc.

### Project match

A matching algorithm is employed to generate a sorted list of projects. This algorithm uses the civic interests, skills, and learning opportunities entered by the new member to score every project based on keyword matching. 

Based on what was entered in the project match form, list of projects sorted by the matching scores is presented. 

### Project profile

There is brief information describing each project and how it fits what he/she is looking for. Within this list, the new member is then able to select projects that interest them and send messages to project leaders. 

### Messaging

A user can message the project leads. This is mediated using a common email account, enabling messages to me passed back and forth without revealing the new member's email address.

### Bookmarks

A user can bookmark projects that interest him/her. This is retained in the browser temporarily, until the user chooses to create an account with their email address.

## Wireframe Prototype

The UX Research 

Check out our [Wireframe Prototype](https://www.justinmind.com/usernote/tests/10742872/22268666/23072489/index.html#/screens/d12245cc-1680-458d-89dd-4f0d7fb22724)... start by clicking on the white "Hack Night Check In" button.

---

# Architectural Overview

## Major Components

Project Match is a system consisting of the following parts:

* **Database** - MongoDB
* **Data Models** - Mongoose
* **New Member Front-End** and **JSON API** -  Node.js / Express / Pug / jQuery
* **Matching algorithm** - python
* **Messaging service** - Node.js / Express
* **Project Content Management** - EmberJS / Bootstrap
* **Test scripts** - bash and wget

## Database

[MongoDB](https://www.mongodb.com/) is used as the back-end database for all of the other components of the Project Match system.

## Data Models

Defines users, projects, and project taxonomy. Data in MongoDB is queried and updated in the webapp using [Mongoose](http://mongoosejs.com/).

## New Member Front-End and JSON API

The webapp generates the web interface for users, controls how data is updated, and accesses the matchmaking function.

### Origins

The Project Match new member front-end is based on the alpha version of [BrigadeHub](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11) (before many improvements were made). 

As it is only a technical demonstration, Project Match does not track changes to BrigadeHub.

### Key dependencies 

* [Express](http://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [Jade/Pug](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)
* [Bootstrap](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)
* [jQuery](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)

## Matching Algorithm

Currently the matching function is written in python. It accepts input representing a user's preferences for skills, opportunities to learn, and interests. The algorithm outputs a sorted list of projects.

The New Member Front-End directly interacts with the algorithm, providing a JSON web API.

---

# Installation

Installing Project Match requires the following installations and configurations:

* Project files on GitHub
* MongoDB
* Node.js - via the Node Version Manager
* Node.js dependencies - via the Node Package Manager
* Web application configuration
* Python

## 1. Clone the project files

Create a general project directory. You'll want to keep the code separate from notes, diagrams, and media assets that are related to the project.

In the command line terminal:

```
cd <WHERE YOUR CODE SHOULD GO>
git clone https://github.com/designforsf/brigade-matchmaker.git
```

You will need to get familiar with git and GitHub if you'd like to contribute code changes to the project. To learn more, SEE the [Hello World GitHub Intro](https://guides.github.com/activities/hello-world/) and [GitHub Video Guides](https://www.youtube.com/githubguides).

Please create a branch and push commits to that branch if you work on code.

In the command line terminal:

```
cd brigade-matchmaker
git fetch --all
git branch <YOUR GIT USERNAME>
git checkout <YOUR GIT USERNAME>
git status
git add <SOME CHANGED FILE>
git commit -m 'I updated some file.'
git push origin <YOUR GIT USERNAME>
```

## 2. Install the database

If you do not want to just download and install the latest mongodb, for OSX systems there is a way to install it in components/mongodb. 

In the command line terminal:

```
cd brigade-matchmaker/components/mongodb
./bin/download-mongodb.sh
./bin/install-mongodb.sh
```

To start mongodb:
```
cd brigade-matchmakercomponents/mongodb
./bin/start-mongodb.sh
```

MongoDB will components/mongodb/var for the data, although there is no data yet for Project Match. The first time you run the webapp, it will be populated. To query mongodb directly, use a different terminal and type:

```
cd brigade-matchmaker/components/mongodb
./bin/mongo-client.sh
> show dbs;
```

SEE: [mongo shell reference](https://docs.mongodb.com/manual/reference/mongo-shell/)

## 3. Install Node.js 

Node.js is server-side javascript. We are targeting a particular version and you can use the Node Version Manager to make sure you use v6.9.5. 

In the command line terminal:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install v6.9.5
nvm use v6.9.5
node --version
```

## 4. Install Node.js dependencies

The webapp has many dependencies that can be easily installed with the Node Package Manager. It uses [package.json](https://github.com/designforsf/brigade-matchmaker/blob/99bf7aef75542391f5c1630faa7611553345feba/components/web/package.json) to know what dependencies to install. Remember to make sure to be using node v6.9.5 when installing!

In the command line terminal:

```
cd brigade-matchmaker/components/web
nvm use v6.9.5
npm install
```


## 5. Configure the New Member Front-End

Once Node.js and the dependencies are installed, the webapp is very close to being runnable. What it needs first is the .env comfiguration file.

In the command line terminal:

```
cd brigade-matchmaker/components/web
cp .env.example .env
```

The webapp is now ready to be run. Make sure MongoDB is already running in a different command line terminal.

```
cd brigade-matchmaker/components/web
node app.js
```

Please now visit the new member front-end at [http://localhost:5465](http://localhost:5465). Doing so will now load the test data!

**NOTE: the Project Match front-end won't work until the Matching Algoritm is installed**

## 6. Install the Matching Algorithm

Python is included in OSX, however to install packages you will need pip. The best way to get pip installed on OSX is to use [homebrew](https://brew.sh/).

First install homebrew (if it has not already been installed). In the command line terminal:

```
which python
which pip
which brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```

Now use homebrew to install python and pip. In the command line terminal:

```
brew install python
which python
which pip
```

Both python and pip should now be located in /usr/local/bin/.

Now you are ready to install pymongo. In the command line terminal:

```
cd brigade-matchmaker/components/matching
python --version
pip --version
pip install pymongo==3.4
python match-algo.py javascript housing developer
```

If the database is running and the webapp has been fired up (at least once), you should be able to interact with the matching algorithm using pre-loaded test project data. 

In the command line terminal:

```
cd brigade-matchmaker/components/matching
python db-match-algo.py javascript housing developer
```

## 7. Running and testing the Project Match system

### Terminal 1: Start MongoDB

This needs to be running (if it isn't running already).

### Terminal 2: New Member Front-End / JSON API

This needs to be running, (if it isn't running already).

### Terminal 3: Test the matching algorithm

The following interacts with the JSON API, querying with three sets of criteria and returning matching projects for each.

```
./test/matching/test_matching.sh
```

### Browser 1: Test the JSON API

The matching algorithm can be called at: [http://localhost:5465/api/user/matches](http://localhost:5465/api/user/matches?skills=javascript,python&interests=housing&goals=developer,presenter).

### Browser 2: Test the New Member Front-End

The New Member Front-End interacts with the JSON API to generate the search criteria and to return the project list.

[http://localhost:5465](http://localhost:5465)

---

# Installing Additional Components

Beyond the new member front-end aspect, the Project Match system also relies on messaging, bookmarks, and project content management.

## Project Content Management

This service enables project leaders to manage content stored in MongoDB. The data which project leaders manage here is displayed to new members in the Front-End. 

Project Content Management makes use of [EmberJS framework](http://emberjs.com/) and [Ember Bootstrap](http://www.ember-bootstrap.com/#/components) with the JSON API. 

### Install dependencies

EmberJS 2.14 is tested with Node.js v6.11.1 and requires a global install:

```
nvm install v6.11.1
nvm use v6.11.1
npm install -g ember-cli@2.14
```

### Run the service

```
cd brigade-matchmaker/components/ember-client
ember build
ember serve
```

To interact with the Project Content Management UI:

[http://localhost:4200](http://localhost:4200)


## Messaging Service

This is a technical demo and starting the service currently only attempts to send a message using a GMail account. 

### Install dependencies:

```
cd brigade-matchmaker/components/messaging
nvm use v6.9.5
npm install
```

### Start the service

```
NODE_ENV=development node app.js
```

## Bookmarks

This service has not been defined yet.




