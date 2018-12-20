#!/bin/bash

cd /app
npm rebuild node-sass --force
export NODE_ENV=development

# Load the required seed data.
( cd components/api ; node scripts/load-seed-data.js )

# Run the system in development mode.
echo "Starting api component in start-in-docker.sh."
( cd components/api ; node app.js ) &
echo "Starting messaging component in start-in-docker.sh."
( cd components/messaging ; node app.js ) &
echo "Starting main_website component in start-in-docker.sh."
( cd components/main_website ; node app.js )
echo "Started app!"
