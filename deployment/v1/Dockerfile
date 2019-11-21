# Use an official Node image as our base.
FROM node:6-jessie

ENV ROOT_APP_DIR /app
ENV COMPONENTS_DIR $ROOT_APP_DIR/components

# Install Python
RUN apt-get update && \
    apt-get install -y \
    python python3 python-pip python-setuptools \
    build-essential python-dev python3-pip \
    curl git

# Install any needed packages specified in requirements.txt
ADD ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
RUN pip3 install -r /tmp/requirements.txt

# Docker trickery: npm install --verbose before copying in the main app code,
# so docker can cache the result of this "layer" between docker builds.
ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install --verbose
RUN mkdir -p $ROOT_APP_DIR && mv /tmp/node_modules $ROOT_APP_DIR/

ADD ./components/api/package.json /tmp/package.json
RUN cd /tmp && npm install --verbose
RUN mkdir -p $COMPONENTS_DIR/api && mv /tmp/node_modules $COMPONENTS_DIR/api/

ADD ./components/main_website/package.json /tmp/package.json
RUN cd /tmp && npm install --verbose
RUN mkdir -p $COMPONENTS_DIR/main_website && mv /tmp/node_modules $COMPONENTS_DIR/main_website/

ADD ./components/messaging/package.json /tmp/package.json
RUN cd /tmp && npm install --verbose
RUN mkdir -p $COMPONENTS_DIR/messaging && mv /tmp/node_modules $COMPONENTS_DIR/messaging/

ADD ./components/taxonomy/package.json /tmp/package.json
RUN cd /tmp && npm install --verbose
RUN mkdir -p $COMPONENTS_DIR/taxonomy && mv /tmp/node_modules $COMPONENTS_DIR/taxonomy/

# Copy the root directory contents into the container at /app
# If anything in the directory has changed, Docker will invalidate the cache
# at this point, so it's good that all our npm install --verboses have already happened.
# This "." is evaluated within the build context, which should
# always be the root directory of our git repo.
ADD . /app

# Configure the REST API
COPY etc/env.js.default $ROOT_APP_DIR/development.js

# We're going to run as this node user, instead of root.
RUN chown -R node:node /app
USER node

WORKDIR $ROOT_APP_DIR
CMD ["/bin/bash", "-c", "/app/deployment/v1/start-in-docker.sh"]
