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

# After making a change...
git add <CHANGED FILE>
git commit -m 'I updated some file.'
git push origin <YOUR GIT USERNAME>-dev
```

## 2. Install Docker

Follow Docker's instructions for installing Docker CE on your machine:
[Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce)
[Mac OSX](https://docs.docker.com/docker-for-mac/install/)
[Windows](https://docs.docker.com/docker-for-windows/install/)

## 3. Build the Docker container

Once you've installed Docker, you can run the project's Docker containers locally.
In your terminal, navigate to the project's root directory and run:

```
./build-docker-stack.sh
```

This will take several minutes, and may generate warnings about out-of-date packages.
Do not worry about the warnings for now.

## 4. Run the project in Docker

Now that you've built the container, you can run it! In the project's root directory, run:

```
./deploy-docker-stack.sh
```

This should bring up a local instance of the project on [http://localhost:8080/](http://localhost:8080/).

## 5. Make changes

You do *not* need to rebuild or rerun the Docker container every time you change anything.
Your local source files are *mounted*, not *copied*, inside the container, so any changes
you make locally on disk will be reflected in the running server.

If you change the code of a long-running process (like any of the app.js files), you *do* need
to restart the process. We recommend restarting the whole container  with `deploy-docker-stack.sh`,
it may take a couple tries to correctly destroy and redeploy the container.

## Entering the container environment

It is sometimes necessary to enter the Docker container while it's running and muck around.
You can use `docker exec` to achieve this:

```
docker container ls
# Look for the container named sfbm_brigade-matchmaker and copy its CONTAINER ID
# Then open a bash terminal inside the container
docker exec -it <CONTAINER ID> bash
# ... do stuff ...
# press ctrl-d to exit
```

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

