**Attention new developers on the project!** - check out [docs/start-developing.md](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/v1/start-developing.md).
This explains how components are developed and walks you through the steps to get this project running. You can refer back to this page later to learn about how Docker
starts the project.

How to run the project w/o Docker? See [docs/installation.md](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/v1/installation.md) for the non-docker installation instructions.

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

Now you understand what the Dockerfile is doing, and how to build and deploy it locally. You know what happens when you run
the `build-docker-stack.sh` and `deploy-docker-stack.sh` scripts. And you're ready to start making changes!
