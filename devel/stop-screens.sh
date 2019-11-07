#!/usr/bin/env bash

# defaults
SCREENID="project-match-v1"
ENV=""

# directory
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../
DIR=`pwd`

echo "Stop developing project-match-v1!"

# stop screen
echo "Stop the screen session"
CMD="screen -X -S $SCREENID quit"
eval $CMD

echo "Done."

