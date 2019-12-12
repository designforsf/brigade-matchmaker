#!/usr/bin/env bash

# defaults
SCREENID="project-match-v1"
ENV=""

# directory
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../../
DIR=`pwd`

echo "Stop developing project-match-v1!"

screen -S $SCREENID -X -p2 stuff $'\003'
screen -S $SCREENID -X -p3 stuff $'\003'
screen -S $SCREENID -X -p4 stuff $'\003'
screen -S $SCREENID -X -p5 stuff $'\003'
screen -S $SCREENID -X -p6 stuff $'\003'

sleep 1

# stop screen
echo "Stop the screen session"
CMD="screen -X -S $SCREENID quit"
eval $CMD

echo "Done."

