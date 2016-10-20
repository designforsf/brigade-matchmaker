#!/usr/bin/env bash

# defaults

VERSION="3.2.3"
SYSTEM="osx-x86_64"

# directory
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../
DIR=`pwd`

echo "Installing mongodb in $DIR"

cp downloads/mongodb-$SYSTEM-$VERSION.tgz install/
cd install
tar -zxvf mongodb-$SYSTEM-$VERSION.tgz

mv mongodb-$SYSTEM-$VERSION ../mongodb-$VERSION

cd $DIR

echo "Done! mongodb is installed in $DIR/mongodb-$VERSION"
echo "You can start mongidb using $DIR/bin/run-mongodb.sh"
