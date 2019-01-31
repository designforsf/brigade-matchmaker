cd /app
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use v6.14.4
npm rebuild node-sass --force

# Load the required seed data.
( cd components/api ; NODE_ENV=development node scripts/load-seed-data.js )

# Run the system in development mode.
echo "Starting api component in start-in-docker.sh."
( cd components/api ; NODE_ENV=development node app.js ) &
echo "Starting messaging component in start-in-docker.sh."
( cd components/messaging ; NODE_ENV=development node app.js ) &
echo "Starting main_website component in start-in-docker.sh."
( cd components/main_website ; NODE_ENV=development node app.js )
echo "Started app!"
