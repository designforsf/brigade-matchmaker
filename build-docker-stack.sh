#!/bin/bash
echo "Note: this doesn't quite work yet. It'll bring everything up, but"
echo "you have to go into the Docker containers and install Mongo client,"
echo "then restart the components to get it to work."
docker build -t sfbrigade/brigade-matchmaker:app .
