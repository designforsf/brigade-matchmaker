#!/bin/bash

VERSION=3.2.3
MONGO_DBPATH=./var/mongodb-data

# move to the mongo directory, no matter where the script is run from
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../

[ -d "${MONGO_DBPATH}" ] || mkdir -p "${MONGO_DBPATH}"

./mongodb-$VERSION/bin/mongod --dbpath "${MONGO_DBPATH}"
