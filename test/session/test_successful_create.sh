#!/usr/bin/env bash

echo "Test the create user and session"
EPOCH=`date +%s`
echo "TestID=$EPOCH, Using cookies-$EPOCH.txt"

# move to the directory of the script
BINDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BINDIR

URL="http://localhost:5455/api/user/create_and_login"
echo "Calling $URL"
wget -qO- \
--save-cookies cookies-$EPOCH.txt \
--keep-session-cookies \
--post-data "email=designforsf#$EPOCH@gmail.com&username=designforsf#$EPOCH@gmail.com&password=$EPOCH" \
$URL

sleep 1

echo

URL="http://localhost:5455/api/user/session"
echo "Calling $URL"
wget -qO- \
--load-cookies cookies-$EPOCH.txt \
$URL

echo
echo "Done!"
