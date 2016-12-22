#!/usr/bin/env bash

echo "Reset the test directory, database objects, cookies, etc."

# move to the directory of the script
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR

rm ./*cookies*

echo "Done!"
