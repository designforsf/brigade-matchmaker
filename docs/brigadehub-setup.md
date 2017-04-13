
# BrigadeHub Setup

Step-by-step instructions to get BrigadeHub running with the c4sf admin and theme. This is targeting BrigadeHub v0.1.x.


SEE: https://github.com/brigadehub/brigadehub


## 0. Prerequisites

Install nvm

Install nodejs v6.9

Install Yarn:

```
brew update
brew install yarn
```

Install mongodb


## 1. Workspace

In your cli, set up separate consoles or screens.
Prepare nodejs and mongodb.

### @brigadehub-public-c4sf 
```
nvm use v6.9
```

### @brigadehub-admin-c4sf
```
nvm use v6.9
```

### @core
```
nvm use v6.9
```

### @brigadehub
```
nvm use v6.9
```

### @mongodb
```
cd components/mongodb
./bin/start-mongodb.sh
```

## 2. Clone and npm install

### @theme-public-c4sf
```
git clone https://github.com/brigadehub/theme-public-c4sf.git
cd theme-public-c4sf
npm install
```

### @theme-admin-c4sf
```
git clone https://github.com/brigadehub/theme-admin-c4sf.git
cd theme-admin-c4sf
npm install
```

### @core
```
git clone https://github.com/brigadehub/core.git
cd core
npm install
```

### @brigadehub
```
git clone https://github.com/brigadehub/brigadehub.git
cd brigadehub
npm install
```

## 3. Link

This is so you can develop what will be published as node modules.

IMPORTANT: make sure to perform these in order, and only one at a time!

### @theme-public-c4sf 
```
npm link
```

### @theme-admin-c4sf
```
npm link
```

### @core
```
make link
```

### @brigadehub
```
make link
```

## 4. Configure

### @brigadehub
```
cp .env.example .env
vi .env
```

## 5. Test

### @mongodb

Check that mongodb is running.

### @brigadehub
```
make start/develop
```

### Done!

In a browser, open: http://localhost:5465/


