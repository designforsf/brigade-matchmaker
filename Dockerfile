# Use an official Node image as our base.
FROM node:6-jessie

# Install Python
RUN apt-get update && \
    apt-get install -y \
    python python-pip python-setuptools \
    build-essential python-dev \
    curl git

# Install pymongo
RUN apt-get install -y python-pymongo

# Copy the current directory contents into the container at /app
ADD . /app

# Set the working directory to /app
ENV ROOT_APP_DIR /app
WORKDIR $ROOT_APP_DIR

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Install node and npm dependencies
WORKDIR $ROOT_APP_DIR/components/api
RUN npm install

WORKDIR $ROOT_APP_DIR/components/main_website
RUN npm install

WORKDIR $ROOT_APP_DIR/components/messaging
RUN npm install

WORKDIR $ROOT_APP_DIR/components/taxonomy
RUN npm install

WORKDIR $ROOT_APP_DIR/components/models
RUN npm install

# Configure the REST API
COPY etc/env.js.default $ROOT_APP_DIR/development.js

WORKDIR $ROOT_APP_DIR
CMD ["/bin/bash", "-c", "/app/start-in-docker.sh"]
