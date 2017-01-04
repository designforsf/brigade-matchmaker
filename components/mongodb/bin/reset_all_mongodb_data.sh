#!/bin/bash

# move to the mongo directory, no matter where the script is run from
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../
pwd
rm -rf ./var/mongodb-data/* 
