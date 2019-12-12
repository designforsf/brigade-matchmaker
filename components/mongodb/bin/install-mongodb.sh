#!/usr/bin/env bash


echo "Install mongodb for developers."

# defaults

VERSION="3.4.20"
SYSTEM=""
TARGET=""

# set the system for the binaries
if [[ "$OSTYPE" == "linux-gnu" ]]; then
	echo "Error: Cannot install mongodb for windows"
elif [[ "$OSTYPE" == "darwin"* ]]; then
	SYSTEM="osx"
    TARGET="x86_64"
elif [[ "$OSTYPE" == "win32" ]]; then
	echo "Error: Cannot install mongodb for windows."
else
	echo "Error: Cannot install mongodb for this plaform."
fi

# let the installing user know that this cannot be installed
if [[ "$SYSTEM" == "" ]]; then
	echo "Try downloading and installing the community edition from https://www.mongodb.com/download-center#community."
	exit 1
fi

# directory
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../
DIR=`pwd`

echo "Installing mongodb in $DIR"

cp downloads/mongodb-$SYSTEM-ssl-$TARGET-$VERSION.tgz install/
cd install
tar -zxvf mongodb-$SYSTEM-ssl-$TARGET-$VERSION.tgz

mv mongodb-$SYSTEM-$TARGET-$VERSION ../mongodb-$VERSION

cd $DIR

echo "Done! mongodb is installed in $DIR/mongodb-$VERSION"
echo "You can start mongidb using $DIR/bin/run-mongodb.sh"
