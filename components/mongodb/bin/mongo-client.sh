#!/bin/bash

VERSION=3.6.16

# move to the mongo directory, no matter where the script is run from
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../

./mongodb-$VERSION/bin/mongo
