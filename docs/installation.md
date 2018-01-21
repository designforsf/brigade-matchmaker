
# Project Match: Installation

There are many components that come together to create the Project Match service. To run the service, or to develop Project Match, you must first install the Web App and dependencies, including the database.

After Web App is running, the UI components and Messaging component can be installed.

**Attention new developers on the project!** - check out [docs/start-developing.md](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/start-developing.md). This explains how components are developed and involves a simpler installation.

# Installing Web App

Installing the core Project Match components requires the following installations and configurations:

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


Currently, active development is merged into the dev branch. Please create a branch <YOUR GIT USERNAME>-dev and push commits to that branch if you work on code.

In the command line terminal:

```
cd brigade-matchmaker
git fetch --all
git branch <YOUR GIT USERNAME>-dev
git checkout <YOUR GIT USERNAME>-dev
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

Node.js is server-side javascript. We are targeting a particular version and you can use the Node Version Manager to make sure you use v6.12.2.

In the command line terminal:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install v6.12.2
nvm use v6.12.2
node --version
```

## 4. Install Node.js dependencies

The webapp has many dependencies that can be easily installed with the Node Package Manager. It uses [package.json](https://github.com/designforsf/brigade-matchmaker/blob/master/components/web/package.json) to know what dependencies to install. Remember to make sure to be using node v6.12.2 when installing!

In the command line terminal:

```
cd brigade-matchmaker/components/web
nvm use v6.12.2
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
python db-match-algo.py client-dev/javascript null housing null
python db-match-algo.py data-sci/python data-science/machine-learning null developer
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

# Installing UI Components

Beyond the new member front-end aspect, the Project Match system also relies on messaging, bookmarks, and project content management.

## Project List

This is a user interface component presenting a list of projects. The project list interacts with the REST API, and by extension, the matching algorithm.

### Installing dependencies

This installs, along with basic dependencies for a Node.js express application, the handlebars utility.

```
cd components/project-list
nvm use v6.12.2


```

### Precompiling the HBS template

Project List uses handlebars templates. When updating the template, the handlebars compile command must be run in order to use the template within the application.

```
cd components/project-list
nvm use v6.12.2
./node_modules/handlebars/bin/handlebars -amd js/templates/projects.html -f js/templates/projects.js

```

For more info, SEE: [Using Handlebars with Backbone and RequireJS and Precompiling templates](http://www.remwebdevelopment.com/blog/javascript/using-handlebars-with-backbone-and-requirejs-and-precompiling-templates-182.html)

---

## Installing Admin / Project CMS

This service enables project leaders to manage content stored in MongoDB. The data which project leaders manage here is displayed to new members in the Front-End.

Project Content Management makes use of [EmberJS framework](http://emberjs.com/) and [Ember Bootstrap](http://www.ember-bootstrap.com/#/components) with the JSON API.

### Dependencies

EmberJS 2.14 is tested with Node.js v6.12.2 and requires a global install:

```
nvm install v6.12.2
nvm use v6.12.2
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

---

# Installing Messaging Service

The messaging service relies on the Slack Web API. Therefore testing the messaging service requires a Slack Web API token. You can find more information about those at https://api.slack.com/web

As with all API keys, please make sure that the credential file is listed in your .gitignore file. You can find out more about best practices at https://api.slack.com/docs/oauth-safety
