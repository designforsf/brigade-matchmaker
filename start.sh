cd /app/components/web
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use v6.14.4
npm rebuild node-sass --force
node app.js
