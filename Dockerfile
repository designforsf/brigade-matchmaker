# Use an official Node runtime as a parent image
FROM node:6.14.4-jessie

# Set the working directory to /app
ENV ROOT_APP_DIR /app
WORKDIR $ROOT_APP_DIR

# Copy the current directory contents into the container at /app
ADD . /app

# Install Python
RUN apt-get update && \
    apt-get install -y \
    python python-pip python-setuptools \
    build-essential python-dev

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Install node.js dependencies
WORKDIR components/web
RUN nvm use v6.14.4 && \
    npm install
WORKDIR $ROOT_APP_DIR

# Make port 80 available to the world outside this container
EXPOSE 80

# Run the app
CMD ["node", "components/web/app.js"]
