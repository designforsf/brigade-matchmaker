**Attention new developers on the project!** - check out [docs/start-developing.md](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/start-developing.md).
This explains how components are developed and walks you through the steps to get this project running. You can refer back to this page later to learn about how Docker
starts the project.

# Project Match: What Happens In That Docker Container?

There are many components that come together to create the Project Match service.
There are two stages to running the Docker container:
  1. Build (build-docker-stack.sh)
  2. Deploy (deploy-docker-stack.sh)

# What happens during build-docker-stack.sh
All build-docker-stack.sh does is run this command:
```
docker build -t sfbrigade/brigade-matchmaker:app .
```
By default, this looks for a file named `Dockerfile` in the current directory.
The configuration in `Dockerfile` defines how to build our Docker stack. Our
Dockerfile implements the steps below.

## 1. Retrieve the base image(s)

We use two base images in `docker-compose.yml`:
 * Ubuntu (ubuntu:18.04) - this runs our code and is built by `Dockerfile`.
 * Mongo (mongo:3.2.20-jessie) - this runs MongoDB.

We don't modify the Mongo image at all, we just run MongoDB and interact with it from the Ubuntu image.
So the rest of these steps are happening in the Ubuntu image.

## 2. Install python, NVM, node.js, and dependencies

We install the following packages with `apt-get install`:
```
python
python-pip
python-setuptools
build-essential
python-dev
curl
git
python-pymongo
```

We install the [Node Version Manager (NVM)](https://github.com/creationix/nvm) by `curl`ing the installation script and running it. Then we use NVM to install Node.js v6.14.4.

## 3. Mount the code inside the container

These lines:
```
# Copy the current directory contents into the container at /app
ADD . /app

# Set the working directory to /app
ENV ROOT_APP_DIR /app
WORKDIR $ROOT_APP_DIR
```
mount the root source directory to mountpoint `/app` inside the container and `cd` into `/app`.

## 4. Install python dependencies

This command installs a collection of packages listed in `requirements.txt`:
```
RUN pip install -r requirements.txt
```

## 5. Install node.js dependencies

Now that we have our code mounted in the container, we tell Docker to `cd` into each of the
component directories and run 
```
npm install
```
to install the Node.js dependencies of each component.

## 6. Configure the REST API

We copy `./etc/env.js.default` to `/app/development.js`. This file contains a configuration file defining
ports, addresses, and other settings shared across the entire codebase.

## 7. Run everything

We're done building our Docker container now, and we can look at the steps that happen when you run
`deploy-docker-stack.sh` (or, equivalently, `docker stack deploy sfbm -c docker-compose.yml`).

These lines in the Dockerfile cd to the root directory of our codebase (mounted as `/app` inside
the container) and run the `start-in-docker.sh` script. The
[`CMD` keyword](https://docs.docker.com/engine/reference/builder/#cmd) is special - it sets the
command to be executed whenever Docker runs the container. This is different from the `RUN` commands
seen above, which only happen during container build time.

```
WORKDIR $ROOT_APP_DIR
CMD ["/bin/bash", "-c", "/app/start-in-docker.sh"]
```

Inside `start-in-docker.sh`, we do the following:
  1. Load the seed data - this connects to MongoDB and fills our database with projects and their corresponding information.
  2. Start the `api` component - this layer serves the data used to populate the UI.
  3. Start the `messaging` component - this serves endpoints used to message project owners.
  4. Start the `main_website` component - this serves the UI.
Note that these all run in the same container, so our "microservices" are not as independent as they could be.

## Conclusion

Now you understand what the Dockerfile is doing, and how to build and deploy it locally.


----
# Old Installation Instructions

```diff
+ Prior to Docker, we had to install and run everything manually.
- It takes a few hours.
+ The installation instructions are preserved below for posterity.
```

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

For Linux or Windows developers, you will not be able to proceed. Please download and install mongodb directly from [MongoDB community downloads](https://www.mongodb.com/download-center#community).

Installing mongodb requires wget. If you do not have wget, you may want to use [brew](https://brew.sh/) to install it. 

```
which brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install wget
```

To install mongodb, run the following in the command line terminal:

```
cd brigade-matchmaker/components/mongodb
./bin/download-mongodb.sh
./bin/install-mongodb.sh
```

To start mongodb:
```
cd brigade-matchmaker/components/mongodb
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

## 4. Install Node.js dependencies in the REST API, Main Website, Messaging

The webapp has many dependencies that can be easily installed with the Node Package Manager. It uses [package.json](https://github.com/designforsf/brigade-matchmaker/blob/master/components/web/package.json) to know what dependencies to install. Remember to make sure to be using node v6.12.2 when installing!

In the command line terminal:

```
cd brigade-matchmaker/components/api
nvm use v6.12.2
npm install
```

```
cd brigade-matchmaker/components/main
nvm use v6.12.2
npm install
```

```
cd brigade-matchmaker/components/messaging
nvm use v6.12.2
npm install
```


## 5. Configure the REST API, Main Website, Messaging

Once Node.js and the dependencies are installed, the webapp is very close to being runnable. What it needs first is the development comfiguration file. When an app is run with NODE_ENV set to development, environment configuration will be loaded data from "etc/development.js".

In the command line terminal:

```
cd brigade-matchmaker/etc
cp env.js.default development.js
```

For development, now load the required seed data:

```
cd brigade-matchmaker/components/api
./scripts/load-seed-data.js
```

### Configure the Messaging Service

The messaging service relies on the Slack Web API. Therefore testing the messaging service requires a Slack Web API token. You can find more information about those at https://api.slack.com/web

As with all API keys, please make sure that the credential file is listed in your .gitignore file. You can find out more about best practices at https://api.slack.com/docs/oauth-safety

### Run the System

The REST API, Main Website, and Messaging service are now ready to be run. Run each in its own command line terminal, and make sure MongoDB is already running in a different terminal.

```
cd brigade-matchmaker/components/api
nvm use v6.12.2
NODE_ENV=development node app.js
```

```
cd brigade-matchmaker/components/main
nvm use v6.12.2
NODE_ENV=development node app.js
```

```
cd brigade-matchmaker/components/messaging
nvm use v6.12.2
NODE_ENV=development node app.js
```

Please now visit the new member front-end at [http://localhost:8080](http://localhost:8080).

**NOTE: the Project Match main front-end won't be able to search for projects until the Matching Algoritm is installed**


## 6. Install the Matching Algorithm

Python is included in OSX, however to install packages you will need pip. The best way to get pip installed on OSX is to use [homebrew](https://brew.sh/).

First install homebrew (if it has not already been installed). In the command line terminal:

```
which python3
which pip3
which brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```

Now use homebrew to install python and pip. In the command line terminal:

```
brew install python3
which python3
which pip3
```

Both python and pip should now be located in /usr/local/bin/.

Now you are ready to install pymongo. In the command line terminal:

```
cd brigade-matchmaker/components/matching
python3 --version
pip3 --version
pip3 install pymongo==3.4
python3 match-algo.py javascript housing developer
```

If the database is running and the webapp has been fired up (at least once), you should be able to interact with the matching algorithm using pre-loaded test project data.

In the command line terminal:

```
cd brigade-matchmaker/components/matching
python db-match-algo.py client-dev/javascript null housing null
python db-match-algo.py data-sci/python data-science/machine-learning null developer
```

## 7. Running and Basic Testing

Project Match uses the microservices approach, and requires the operator to run a number of processes in order to enable users to interact with the main website.

### Terminal 1: MongoDB

MongoDB needs to be running (if it isn't already).

### Terminal 2: REST API

The api component needs to be running, (if it isn't already).

### Terminal 3: Main Website

The main component needs to be running, (if it isn't already).

### Terminal 4: Messaging

The messaging component needs to be running, (if it isn't already).

### Terminal 5: Test the matching algorithm

The following interacts with the JSON API, querying with three sets of criteria and returning matching projects for each.

```
./test/matching/test_matching.sh
```

### Browser 1: Test the JSON API

The matching algorithm can be called at: [http://localhost:5455/api/user/matches](http://localhost:5455/api/user/matches?skills=javascript,python&interests=housing&goals=developer,presenter).

### Browser 2: Test the Main Website

The main website interacts with the JSON API to generate the search criteria and to return the project list.

[http://localhost:8080](http://localhost:8080)

---

# Installing UI Components

Beyond the new member front-end aspect, the Project Match system also relies on messaging, bookmarks, and project content management.

## Project List  - components/project_list

This is a user interface component presenting a list of projects. The project list interacts with the REST API, and by extension, the matching algorithm.

### Installing dependencies

This installs, along with basic dependencies for a Node.js express application, the handlebars utility.

```
cd components/project-list
nvm use v6.12.2
npm install

```

### Precompiling the HBS template

Project List uses handlebars templates. When updating the template, the handlebars compile command must be run in order to use the template within the application.

```
cd components/project-list
nvm use v6.12.2
./node_modules/grunt-cli/bin/grunt handlebars
```

For more info, SEE: [Using Handlebars with Backbone and RequireJS and Precompiling templates](http://www.remwebdevelopment.com/blog/javascript/using-handlebars-with-backbone-and-requirejs-and-precompiling-templates-182.html)


## Taxonomy Selector - selector_ui

This is a user interface component to enable the user to sort a list of projects according to their personal preferences. The Taxonomy Selector interacts with the REST API, and by extension, the matching algorithm.


### Installing dependencies

This installs, along with basic dependencies for a Node.js express application, the handlebars utility.

```
cd components/selector_ui
nvm use v6.12.2
npm install

```

### Precompiling the HBS template

Taxonomy Selector uses handlebars templates. When updating the template, the handlebars compile command must be run in order to use the template within the application.

```
cd components/selector_ui
nvm use v6.12.2
./node_modules/grunt-cli/bin/grunt handlebars
```

For more info, SEE: [Using Handlebars with Backbone and RequireJS and Precompiling templates](http://www.remwebdevelopment.com/blog/javascript/using-handlebars-with-backbone-and-requirejs-and-precompiling-templates-182.html)


