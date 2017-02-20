# "Matching Hat"

A prototype service that matches newly arriving members to the appropriate civic projects.

# Status

This software is actively under development and is not yet ready for release.

---

# Origin

The Matching Hat concept is the result of user experience research conducted at [Code For San Francisco](http://codeforsanfrancisco.org). This research included interviews with new members and project leaders, structured brainstorming, and wireframe prototyping. 

User experience research at Code4SF is run by the [UX Research Group](https://github.com/sfbrigade/research-group).

# Concept

Matching Hat is intended for use by a newly arriving member at a [Code For America "brigade"](http://brigade.codeforamerica.org/brigade/), which is a collecting point for local civic projects. 

## Application Flow

Local civic projects are asked to maintain data about what their volunteer needs are in terms of skills and goals. Other information is also tracked about projects, including what interest category they belong to.

When a new member arrives, he/she is asked to open a URL and begins the matching process. The new member is asked to select from three sets of keywords:

* Interests:  elections, homelessness, housing, infrastructure, etc.
* Skills: javascript, civic organizing, machine learning, legal, etc.
* Goals: to learn, to help, to build, to manage, to lead, etc.

A matching algorithm is employed to generate a sorted list of projects. This algorithm uses the interests, skills, and goals entered by the new member to score every project based on keyword matching. 

A list of projects sorted by the matching scores is presented to the new member. There is information describing each project and how it fits what he/she is looking for. Within this list, the new member is then able to select projects that interest them and send messages to project leaders. 

## Wireframe Prototype

Check out our [Wireframe Prototype](https://www.justinmind.com/usernote/tests/10742872/22268666/23072489/index.html#/screens/d12245cc-1680-458d-89dd-4f0d7fb22724)... start by clicking on the white "Hack Night Check In" button.

---

# Architectural Overview

Matching Hat is implemented as a theme within a clone of an alpha version of [BrigadeHub](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11) (before many improvements were made). As it is a technical demonstration, Matching Hat does not track changes to BrigadeHub. However a future version will be properly tracking changes to BrigadeHub Beta.

## Major Components

Matching Hat is a system consisting of the following parts:

* MongoDB Database 
* Data models representing users, projects, project needs
* Node.js Web Application aka "the webapp"
* Matchmaking function (currently python) aka "the algorithm"
* Test scripts

## MongoDB Database

[MongoDB](https://www.mongodb.com/) is used as the back-end database for all user, brigade, and project data.

## Data Models

Data in MongoDB is queried and updated in the webapp using [Mongoose](http://mongoosejs.com/).

## The webapp

The webapp generates the web interface for users, controls how data is updated, and accesses the matchmaking function.

Key dependencies include:

* [Express](http://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [Jade/Pug](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)
* [Bootstrap](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)
* [jQuery](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)

## The algorithm

Currently the matching function is written in python. It accepts input representing a user's preferences for skills, interests, and goals. The algorithm outputs a sorted list of projects.

The webapp directly interacts with the algorithm, providing a JSON web API.

The matching function is currently being re-written in javascript.

---

# Installation

Installing Matching Hat requires the following installations and configurations:

* Project files on GitHub
* MongoDB
* Node.js - via the Node Version Manager
* Node.js dependencies - via the Node Package Manager
* Web application configuration
* Python

## Project files on GitHub

Create a general project directory. You'll want to keep the code separate from notes, diagrams, and media assets that are related to the project.

In the command line terminal:

```
cd <WHERE YOUR CODE SHOULD GO>
git checkout git@github.com:designforsf/brigade-matchmaker.git
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

## MongoDB

If you do not want to just download and install the latest mongodb, for OSX systems there is a way to install it in components/mongo. 

In the command line terminal:

```
cd brigade-matchmaker/components/mongo
./bin/download-mongodb.sh
./bin/install-mongodb.sh
```

To start mongodb:
```
cd brigade-matchmakercomponents/mongo
./bin/start-mongodb.sh
```

MongoDB will components/mongo/var for the data, although there is no data yet for Matching Hat. The first time you run the webapp, it will be populated. To query mongodb directly, use a different terminal and type:

```
cd brigade-matchmaker/components/mongo
./bin/mongo-client.sh
> show dbs;
```

SEE: [mongo shell reference](https://docs.mongodb.com/manual/reference/mongo-shell/)

## Node.js - via the Node Version Manager

Node.js is server-side javascript. We are targeting a particular version and you can use the Node Version Manager to make sure you use v6.9.5. 

In the command line terminal:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install v6.9.5
nvm use v6.9.5
node --version
```

## Node.js dependencies - via the Node Package Manager

The webapp has many dependencies that can be easily installed with the Node Package Manager. It uses [package.json](https://github.com/designforsf/brigade-matchmaker/blob/99bf7aef75542391f5c1630faa7611553345feba/components/web/package.json) to know what dependencies to install. Remember to make sure to be using node v6.9.5 when installing!

In the command line terminal:

```
cd brigade-matchmaker/components/web
nvm use v6.9.5
npm install
```

## Web application configuration

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

This should now allow you to interact with the Matching Hat webapp at [http://localhost:5465](http://localhost:5465).

The matching algorithm can be called at: [http://localhost:5465/api/user/matches](http://localhost:5465/api/user/matches?skills=javascript,python&interests=housing&goals=developer,presenter).

## Python

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
cd brigade-matchmaker/components/algorithms
python --version
pip --version
pip install pymongo==3.4.1
python match-algo.py javascript housing developer
```

If the database is running and the webapp has been fired up (at least once), you should be able to interact with the matching algorithm using pre-loaded test project data. 

In the command line terminal:

```
cd brigade-matchmaker/components/algorithms
python db-match-algo.py javascript housing developer
```
