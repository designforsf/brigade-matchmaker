#!/usr/bin/env bash

# defaults
SCREENID="project-match-v1"
ENV=""

# directory
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR
cd ../../
DIR=`pwd`
echo $DIR
cd $DIR

echo "Start developing project match v1!"

# start screen
echo "Start a screen session"
CMD="bash -c 'sleep 2; screen -d $SCREENID' & screen -c $DIR/devel/v1/devel.screenrc -m"
eval $CMD

# configure individual screens

# bash
echo "Start bash"
CMD="screen -S $SCREENID -p0 -X stuff \$'\03 cd $DIR \015'"
eval $CMD

# git
echo "Start git dev"
CMD="screen -S $SCREENID -p1 -X stuff \$'\03 cd $DIR \015'"
eval $CMD

# mongodb
echo "Start mongodb"
START_MONGODB="./bin/start-mongodb.sh \015"
CMD="screen -S $SCREENID -p2 -X stuff \$'\03 cd $DIR/components/mongodb \015 $START_MONGODB'"
eval $CMD

# proxy
echo "Start proxy"
START_PROXY=""
CMD="screen -S $SCREENID -p3 -X stuff \$'\03 cd $DIR/components/system-proxy \015 $START_PROXY'"
eval $CMD

# api
echo "Start api"
START_API="cd brigade-matchmaker/components/api \015
nvm use v6.12.2 \015
NODE_ENV=development node app.js \015"
CMD="screen -S $SCREENID -p4 -X stuff \$'\03 cd $DIR/components/api \015 $START_API'"
eval $CMD

# website
echo "Start website"
CMD="screen -S $SCREENID -p5 -X stuff \$'\03 cd $DIR/components/main_website \015'"
eval $CMD

# messaging
echo "Start messaging"
CMD="screen -S $SCREENID -p5 -X stuff \$'\03 cd $DIR/components/messaging \015'"
eval $CMD


# wrap up

# leave a message in screen 0
CMD="screen -S $SCREENID -p0 -X stuff \$'\03 cat $DIR/devel/v1/devel-message.txt \015'"
eval $CMD

echo "Done."
echo "Now launching the session..."

# wait a moment
sleep 2

# now load the screen up
CMD="screen -dr $SCREENID"
eval $CMD



