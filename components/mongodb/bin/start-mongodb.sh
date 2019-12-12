#!/bin/bash

VERSION="3.4.20"

# move to the mongo directory, no matter where the script is run from
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../

./mongodb-$VERSION/bin/mongod --dbpath ./var/mongodb-data --bind_ip 127.0.0.1
