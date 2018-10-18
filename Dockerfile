# Use an official Ubuntu image as our base.
FROM ubuntu:18.04

# Make port 80 available to the world outside this container
EXPOSE 80

# Install Python
RUN apt-get update && \
    apt-get install -y \
    python python-pip python-setuptools \
    build-essential python-dev \
    curl git

# Install NVM and node.js
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
RUN export NVM_DIR="/root/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm install v6.14.4 && \
    nvm use v6.14.4

# Copy the current directory contents into the container at /app
ADD . /app

# Set the working directory to /app
ENV ROOT_APP_DIR /app
WORKDIR $ROOT_APP_DIR

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Install node and npm dependencies
WORKDIR $ROOT_APP_DIR/components/api
RUN export NVM_DIR="/root/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm use v6.14.4 && \
    npm install

WORKDIR $ROOT_APP_DIR/components/main_website
RUN export NVM_DIR="/root/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm use v6.14.4 && \
    npm install

WORKDIR $ROOT_APP_DIR/components/messaging
RUN export NVM_DIR="/root/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm use v6.14.4 && \
    npm install

WORKDIR $ROOT_APP_DIR/components/taxonomy
RUN export NVM_DIR="/root/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm use v6.14.4 && \
    npm install

WORKDIR $ROOT_APP_DIR/components/models
RUN export NVM_DIR="/root/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm use v6.14.4 && \
    npm install

# Configure the REST API
COPY etc/env.js.default $ROOT_APP_DIR/development.js

WORKDIR $ROOT_APP_DIR
CMD ["/bin/bash", "-c", "/app/start.sh"]
