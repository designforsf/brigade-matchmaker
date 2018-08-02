# Project Match: Start Developing

Getting started developing Project Match happens in stages. It is important to not only understand the technology, but also the design and development process.

To interact with the team, please join #research on [http://c4a.me/cfsfslack](http://c4a.me/cfsfslack).

# Installing the Notifications UI

Installing the Notifications component requires the following installations:

* Project files on GitHub
* Node.js - via the Node Version Manager
* Node.js dependencies - via the Node Package Manager

## 1. Clone the project files

Create a general project directory. You'll want to keep the code separate from notes, diagrams, and media assets that are related to the project.

In the command line terminal:

```
cd <WHERE YOUR CODE SHOULD GO>
git clone https://github.com/designforsf/brigade-matchmaker.git
```

You will need to get familiar with git and GitHub if you'd like to contribute code changes to the project. To learn more, SEE the [Hello World GitHub Intro](https://guides.github.com/activities/hello-world/) and [GitHub Video Guides](https://www.youtube.com/githubguides).

Please create a branch <YOUR GIT USERNAME>-dev and push commits to that branch if you work on code.

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

## 2. Install Node.js 

Node.js is server-side javascript. We are targeting a particular version and you can use the Node Version Manager to make sure you use v6.12.2. 

In the command line terminal:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install v6.12.2
nvm use v6.12.2
node --version
```

## 3. Install Node.js dependencies

Notifications has dependencies that can be easily installed with the Node Package Manager. It uses [package.json](https://github.com/designforsf/brigade-matchmaker/blob/master/components/notifications/package.json to know what dependencies to install. Remember to make sure to be using node v6.12.2 when installing!

In the command line terminal:

```
cd brigade-matchmaker/components/notifications
nvm use v6.12.2
npm install
```


## 3. Run the Notifications dev service

The service is now ready to be run.

```
cd brigade-matchmaker/components/notifications
node app.js
```

Please now visit the Notifications component at [http://localhost:5455](http://localhost:5455).

# Client-side Development

Notifications is entirely client-side, and its functionality and UIs are used throughout the main Web App. Even though it is used throughout the Web App, the structure of this component in the system enables you to develop it independently of the other components and main Web App service.

## Key functionality

[app.js](https://github.com/designforsf/brigade-matchmaker/blob/master/components/notifications/app.js) - serves the contents of the public directory, as well as resources from "common".

[public/index.html](https://github.com/designforsf/brigade-matchmaker/blob/master/components/notifications/public/index.html) - where the client-side application is initialized.

[public/js/notifications.js](https://github.com/designforsf/brigade-matchmaker/blob/master/components/notifications/public/js/notifications.js) - functionality for just this component. Will be called by other components.


## Key dependencies 

* [Express](http://expressjs.com/)
* [Bootstrap](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)
* [jQuery](https://github.com/brigadehub/brigadehub/releases/tag/v1.0.0-alpha.11)
* [RequireJS](http://www.requirejs.org/)

Particularly important is RequireJS. See it in action at the bottom of [public/index.html](https://github.com/designforsf/brigade-matchmaker/blob/master/components/notifications/public/index.html).

# Project Management and Road Map

This development effort is organized using [GitHub project management](https://github.com/designforsf/brigade-matchmaker/projects).

Project Match design and development will be released in stages, following a road map. See our [Road Map presentation](https://designforsf.github.io/brigade-matchmaker/docs/roadmap/) for details.

