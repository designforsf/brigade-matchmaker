#!/usr/bin/env bash

# defaults

VERSION="3.2.3"
SYSTEM="osx-x86_64"

# directory
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../
DIR=`pwd`

wget https://fastdl.mongodb.org/osx/mongodb-$SYSTEM-$VERSION.tgz
mv mongodb-$SYSTEM-$VERSION.tgz downloads/

