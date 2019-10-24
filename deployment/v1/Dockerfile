# Use an official Node image as our base.
FROM node:6-jessie

# Install Python
RUN apt-get update && \
    apt-get install -y \
    python python3 python-pip python-setuptools \
    build-essential python-dev python3-pip \
    curl git

# Copy the root directory contents into the container at /app
# This "." is evaluated within the build context, which should
# always be the root directory of our git repo.
ADD . /app

# Set the working directory to /app
ENV ROOT_APP_DIR /app
WORKDIR $ROOT_APP_DIR

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt
RUN pip3 install -r requirements.txt

# Install node and npm dependencies
WORKDIR $ROOT_APP_DIR/components/api
RUN npm install --verbose

WORKDIR $ROOT_APP_DIR/components/main_website
RUN npm install --verbose

WORKDIR $ROOT_APP_DIR/components/messaging
RUN npm install --verbose

WORKDIR $ROOT_APP_DIR/components/taxonomy
RUN npm install --verbose

WORKDIR $ROOT_APP_DIR/components/models
RUN npm install --verbose

# Configure the REST API
COPY etc/env.js.default $ROOT_APP_DIR/development.js

# We're going to run as this node user, instead of root.
RUN chown -R node:node /app
USER node

WORKDIR $ROOT_APP_DIR
CMD ["/bin/bash", "-c", "/app/start-in-docker.sh"]
