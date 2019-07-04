# Project Match: Continue Developing

This assumes you have installed Project Match and dependencies.

See [docs/installation.md](https://github.com/designforsf/brigade-matchmaker/tree/master/docs/installation.md) for the full instructions.

MongoDB:

```
cd brigade-matchmaker/components/mongodb
./bin/start-mongodb.sh
```

REST API:

```
cd brigade-matchmaker/components/api
nvm use v6.12.2
NODE_ENV=development node app.js
```

Main Website:

```
cd brigade-matchmaker/components/main
nvm use v6.12.2
NODE_ENV=development node app.js
```

Messaging:

```
cd brigade-matchmaker/components/messaging
nvm use v6.12.2
NODE_ENV=development node app.js
```

